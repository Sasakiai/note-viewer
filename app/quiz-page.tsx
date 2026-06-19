import { useEffect, useState } from "react";
import {
  AlertCircle,
  Bot,
  BookOpen,
  CheckCircle2,
  FileText,
  House,
  ListChecks,
  RotateCcw,
  Sparkles,
  Target,
  XCircle,
} from "lucide-react";
import { Link, useFetcher } from "react-router";

import {
  clampQuestionCount,
  createDefaultAnswer,
  getQuizNoteTitle,
  isAnswerComplete,
  selectQuestionsForMode,
  verdictScore,
} from "./quiz-bank";
import type {
  QuizCheckResponse,
  QuizEvaluation,
  QuizMode,
  QuizModeOption,
  QuizQuestion,
  SubmittedAnswer,
} from "./quiz-types";

type QuizPageProps = {
  title: string;
  description: string;
  questions: QuizQuestion[];
  backTo: string;
  backLabel: string;
  emptyTitle: string;
  emptyBody: string;
  modeOptions: QuizModeOption[];
  defaultQuestionCount: number;
};

type QuizSession = {
  mode: QuizMode;
  questions: QuizQuestion[];
};

function getVerdictLabel(evaluation: QuizEvaluation) {
  if (evaluation.verdict === "correct") {
    return "Poprawnie";
  }

  if (evaluation.verdict === "partial") {
    return "Częściowo poprawnie";
  }

  return "Niepoprawnie";
}

function getFeedbackClassName(evaluation: QuizEvaluation) {
  return `quiz-feedback quiz-feedback--${evaluation.verdict}`;
}

function getVerdictIcon(evaluation: QuizEvaluation) {
  if (evaluation.verdict === "correct") {
    return <CheckCircle2 className="quiz-icon quiz-icon--badge" aria-hidden="true" />;
  }

  if (evaluation.verdict === "partial") {
    return <AlertCircle className="quiz-icon quiz-icon--badge" aria-hidden="true" />;
  }

  return <XCircle className="quiz-icon quiz-icon--badge" aria-hidden="true" />;
}

function getGraderLabel(evaluation: QuizEvaluation) {
  return evaluation.grader === "gemini" ? "Ocena: Gemini" : "Ocena: lokalna";
}

function hasVisibleFeedback(evaluation: QuizEvaluation) {
  return evaluation.feedback.trim().length > 0;
}

function shouldShowPointBreakdown(question: QuizQuestion, evaluation: QuizEvaluation) {
  if (question.type === "openText") {
    return evaluation.matchedPoints.length > 0 || evaluation.missedPoints.length > 0;
  }

  if (question.type === "multiChoice" && evaluation.verdict === "partial") {
    return evaluation.matchedPoints.length > 0 || evaluation.missedPoints.length > 0;
  }

  return false;
}

function QuestionAnswerInput(input: {
  question: QuizQuestion;
  answer: SubmittedAnswer;
  disabled: boolean;
  onChange: (answer: SubmittedAnswer) => void;
}) {
  const { question, answer, disabled, onChange } = input;

  if (question.type === "singleChoice" && question.options) {
    return (
      <div className="quiz-question-card__options">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={typeof answer === "string" && answer === option.id ? "quiz-choice quiz-choice--active" : "quiz-choice"}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={option.id}
              checked={typeof answer === "string" && answer === option.id}
              onChange={() => onChange(option.id)}
              disabled={disabled}
            />
            <span className="quiz-choice__text">{option.label}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "multiChoice" && question.options) {
    const selectedOptions = Array.isArray(answer) ? answer : [];

    return (
      <div className="quiz-question-card__options">
        {question.options.map((option) => {
          const isChecked = selectedOptions.includes(option.id);

          return (
            <label key={option.id} className={isChecked ? "quiz-choice quiz-choice--active" : "quiz-choice"}>
              <input
                type="checkbox"
                value={option.id}
                checked={isChecked}
                onChange={() => {
                  if (isChecked) {
                    onChange(selectedOptions.filter((selectedOption) => selectedOption !== option.id));
                    return;
                  }

                  onChange([...selectedOptions, option.id]);
                }}
                disabled={disabled}
              />
              <span className="quiz-choice__text">{option.label}</span>
            </label>
          );
        })}
      </div>
    );
  }

  if (question.type === "shortText") {
    return (
      <input
        className="quiz-input"
        type="text"
        value={typeof answer === "string" ? answer : ""}
        onChange={(event) => onChange(event.currentTarget.value)}
        disabled={disabled}
        placeholder="Wpisz krótką odpowiedź"
      />
    );
  }

  return (
    <textarea
      className="quiz-textarea"
      value={typeof answer === "string" ? answer : ""}
      onChange={(event) => onChange(event.currentTarget.value)}
      disabled={disabled}
      placeholder="Wpisz odpowiedź otwartą"
    />
  );
}

export function QuizPage(props: QuizPageProps) {
  const { title, description, questions, backTo, backLabel, emptyTitle, emptyBody, modeOptions, defaultQuestionCount } = props;

  const fetcher = useFetcher<QuizCheckResponse>();
  const [mode, setMode] = useState<QuizMode>(modeOptions[0]?.value ?? "mixed");
  const [questionCountInput, setQuestionCountInput] = useState(String(clampQuestionCount(defaultQuestionCount, questions.length)));
  const [session, setSession] = useState<QuizSession | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, SubmittedAnswer>>({});
  const [evaluations, setEvaluations] = useState<Record<string, QuizEvaluation>>({});

  useEffect(() => {
    const response = fetcher.data;

    if (!response) {
      return;
    }

    setEvaluations((currentEvaluations) => ({
      ...currentEvaluations,
      [response.questionId]: response.evaluation,
    }));
  }, [fetcher.data]);

  if (questions.length === 0) {
    return (
      <main className="site-shell">
        <div className="floating-orb floating-orb--sky" />
        <section className="empty-state">
          <h1 className="empty-state__title">{emptyTitle}</h1>
          <p className="empty-state__body">{emptyBody}</p>
          <Link to={backTo} className="ghost-button ghost-button--wide">
            {backLabel}
          </Link>
        </section>
      </main>
    );
  }

  const totalAvailableQuestions = questions.length;
  const currentQuestion = session ? session.questions[currentIndex] : null;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] ?? createDefaultAnswer(currentQuestion) : "";
  const currentEvaluation = currentQuestion ? evaluations[currentQuestion.id] : undefined;
  const isRandomMode = mode === "randomExam";

  const totalQuestions = session ? session.questions.length : 0;
  const progressPercentage = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const correctCount = Object.values(evaluations).filter((evaluation) => evaluation.verdict === "correct").length;
  const partialCount = Object.values(evaluations).filter((evaluation) => evaluation.verdict === "partial").length;
  const incorrectCount = Object.values(evaluations).filter((evaluation) => evaluation.verdict === "incorrect").length;
  const totalScore = Object.values(evaluations).reduce((sum, evaluation) => sum + verdictScore(evaluation.verdict), 0);

  const reviewQuestions = session
    ? session.questions.filter((question) => {
        const evaluation = evaluations[question.id];
        return evaluation ? evaluation.verdict !== "correct" : false;
      })
    : [];

  const masteredQuestions = session
    ? session.questions.filter((question) => {
        const evaluation = evaluations[question.id];
        return evaluation ? evaluation.verdict === "correct" : false;
      })
    : [];

  function startQuiz() {
    const parsedCount = Number.parseInt(questionCountInput, 10);
    const selectedQuestions = selectQuestionsForMode({
      questions,
      mode,
      questionCount: clampQuestionCount(parsedCount, questions.length),
    });

    const initialAnswers: Record<string, SubmittedAnswer> = {};

    for (const question of selectedQuestions) {
      initialAnswers[question.id] = createDefaultAnswer(question);
    }

    setAnswers(initialAnswers);
    setEvaluations({});
    setCurrentIndex(0);
    setSession({
      mode,
      questions: selectedQuestions,
    });
  }

  function restartQuiz() {
    setSession(null);
    setCurrentIndex(0);
    setAnswers({});
    setEvaluations({});
  }

  function goToNextQuestion() {
    if (!session) {
      return;
    }

    if (currentIndex >= session.questions.length - 1) {
      setCurrentIndex(session.questions.length);
      return;
    }

    setCurrentIndex((index) => index + 1);
  }

  if (!session) {
    return (
      <main className="site-shell site-shell--reading">
        <div className="floating-orb floating-orb--blossom" />
        <div className="floating-orb floating-orb--mint" />

        <div className="reading-layout quiz-shell">
          <header className="quiz-shell__header reading-card quiz-panel">
            <div className="reading-toolbar__heading">
              <h1 className="reading-card__title">{title}</h1>
              <p className="quiz-header__meta">{description}</p>
            </div>

            <div className="quiz-header__actions">
              <Link to={backTo} className="ghost-button">
                <House className="quiz-icon" aria-hidden="true" />
                {backLabel}
              </Link>
            </div>
          </header>

          <section className="quiz-setup">
            <div className="quiz-section-intro">
              <span className="quiz-section-intro__eyebrow">Zakres</span>
              <p className="quiz-header__meta">Dostępne jest teraz {totalAvailableQuestions} pytań.</p>
            </div>

            <div className="quiz-setup__options">
              {modeOptions.map((option) => (
                <label
                  key={option.value}
                  className={mode === option.value ? "quiz-option-card quiz-option-card--active" : "quiz-option-card"}
                >
                  <input
                    type="radio"
                    name="quiz-mode"
                    value={option.value}
                    checked={mode === option.value}
                    onChange={() => setMode(option.value)}
                  />
                  <span className="quiz-option-card__content">
                    <span className="quiz-option-card__title">{option.title}</span>
                    <span className="quiz-option-card__body">{option.description}</span>
                  </span>
                </label>
              ))}
            </div>

            {isRandomMode ? (
              <label className="quiz-inline-field">
                <span className="quiz-option-card__title">Liczba pytań</span>
                <input
                  className="quiz-input"
                  type="number"
                  min="1"
                  max={String(totalAvailableQuestions)}
                  value={questionCountInput}
                  onChange={(event) => setQuestionCountInput(event.currentTarget.value)}
                />
                <span className="quiz-inline-field__hint">
                  Możesz ustawić od 1 do {totalAvailableQuestions} pytań.
                </span>
              </label>
            ) : null}

            <div className="quiz-question-card__actions">
              <button type="button" className="ghost-button" onClick={startQuiz}>
                <Sparkles className="quiz-icon" aria-hidden="true" />
                Zacznij quiz
              </button>
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (currentIndex >= session.questions.length) {
    return (
      <main className="site-shell site-shell--reading">
        <div className="floating-orb floating-orb--sky" />

        <div className="reading-layout quiz-shell">
          <section className="quiz-summary quiz-summary__hero">
            <div className="quiz-summary__intro">
              <span className="quiz-summary__eyebrow">Podsumowanie</span>
              <h1 className="quiz-summary__title">Wynik quizu</h1>
              <p className="quiz-header__meta">
                Zdobyte punkty: {totalScore} / {session.questions.length}. Sprawdź, co warto jeszcze powtórzyć.
              </p>
            </div>

            <div className="quiz-summary__stats">
              <div className="quiz-summary__stat">
                <Target className="quiz-icon quiz-icon--stat" aria-hidden="true" />
                <span className="quiz-summary__label">Punkty</span>
                <span className="quiz-summary__value">{totalScore}</span>
              </div>
              <div className="quiz-summary__stat">
                <CheckCircle2 className="quiz-icon quiz-icon--stat" aria-hidden="true" />
                <span className="quiz-summary__label">Poprawne</span>
                <span className="quiz-summary__value">{correctCount}</span>
              </div>
              <div className="quiz-summary__stat">
                <AlertCircle className="quiz-icon quiz-icon--stat" aria-hidden="true" />
                <span className="quiz-summary__label">Częściowe</span>
                <span className="quiz-summary__value">{partialCount}</span>
              </div>
              <div className="quiz-summary__stat">
                <XCircle className="quiz-icon quiz-icon--stat" aria-hidden="true" />
                <span className="quiz-summary__label">Błędne</span>
                <span className="quiz-summary__value">{incorrectCount}</span>
              </div>
            </div>

            <div className="quiz-summary__actions">
              <button type="button" className="ghost-button" onClick={restartQuiz}>
                <RotateCcw className="quiz-icon" aria-hidden="true" />
                Nowy quiz
              </button>
              <Link to={backTo} className="ghost-button">
                <House className="quiz-icon" aria-hidden="true" />
                {backLabel}
              </Link>
            </div>
          </section>

          <div className="quiz-summary__sections">
            <section className="quiz-summary-block">
              <div className="quiz-summary-block__header">
                <div className="quiz-summary-block__title-wrap">
                  <AlertCircle className="quiz-icon quiz-icon--section" aria-hidden="true" />
                  <div>
                    <h2 className="quiz-summary-block__title">Do powtórki</h2>
                    <p className="quiz-summary-block__meta">Pytania błędne albo częściowo poprawne.</p>
                  </div>
                </div>
              </div>

              {reviewQuestions.length > 0 ? (
                <ol className="quiz-summary__questions">
                  {reviewQuestions.map((question) => {
                    const evaluation = evaluations[question.id];

                    return (
                      <li key={question.id} className="quiz-summary__question">
                        <div className="quiz-summary__question-topline">
                          <div className="quiz-summary__question-heading">
                            <span className="quiz-summary__question-number">{getQuizNoteTitle(question.noteSlug)}</span>
                            <strong>{question.prompt}</strong>
                          </div>
                          {evaluation ? (
                            <span className={`quiz-result-badge quiz-result-badge--${evaluation.verdict}`}>
                              {getVerdictIcon(evaluation)}
                              {getVerdictLabel(evaluation)}
                            </span>
                          ) : null}
                        </div>
                        <p className="quiz-summary__question-meta">Wróć do tego działu, jeśli chcesz go jeszcze utrwalić.</p>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="quiz-summary-block__empty">Nic nie wpada do tej sekcji. Wszystkie pytania masz już dobrze opanowane.</p>
              )}
            </section>

            <section className="quiz-summary-block">
              <div className="quiz-summary-block__header">
                <div className="quiz-summary-block__title-wrap">
                  <CheckCircle2 className="quiz-icon quiz-icon--section" aria-hidden="true" />
                  <div>
                    <h2 className="quiz-summary-block__title">Dobrze opanowane</h2>
                    <p className="quiz-summary-block__meta">Pytania rozwiązane poprawnie.</p>
                  </div>
                </div>
              </div>

              {masteredQuestions.length > 0 ? (
                <ol className="quiz-summary__questions">
                  {masteredQuestions.map((question) => {
                    const evaluation = evaluations[question.id];

                    return (
                      <li key={question.id} className="quiz-summary__question">
                        <div className="quiz-summary__question-topline">
                          <div className="quiz-summary__question-heading">
                            <span className="quiz-summary__question-number">{getQuizNoteTitle(question.noteSlug)}</span>
                            <strong>{question.prompt}</strong>
                          </div>
                          {evaluation ? (
                            <span className={`quiz-result-badge quiz-result-badge--${evaluation.verdict}`}>
                              {getVerdictIcon(evaluation)}
                              {getVerdictLabel(evaluation)}
                            </span>
                          ) : null}
                        </div>
                      </li>
                    );
                  })}
                </ol>
              ) : (
                <p className="quiz-summary-block__empty">Tu pojawią się pytania, które przejdziesz bezbłędnie.</p>
              )}
            </section>
          </div>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <main className="site-shell site-shell--reading">
      <div className="floating-orb floating-orb--blossom" />
      <div className="floating-orb floating-orb--sky" />

        <div className="reading-layout quiz-shell">
          <header className="reading-card quiz-panel quiz-shell__header">
            <div className="reading-toolbar__heading">
              <span className="quiz-question-card__eyebrow">Pytanie {currentIndex + 1} z {session.questions.length}</span>
              <h1 className="reading-card__title">{title}</h1>
            <p className="quiz-header__meta">{description}</p>
          </div>

          <div className="quiz-progress" aria-hidden="true">
            <div className="quiz-progress__bar" style={{ width: `${progressPercentage}%` }} />
          </div>

          <div className="quiz-header__actions">
            <Link to={backTo} className="ghost-button">
              {backLabel}
            </Link>
            <button type="button" className="ghost-button" onClick={restartQuiz}>
              Zmień ustawienia
            </button>
          </div>
        </header>

        <section className="quiz-question-card">
          <div className="reading-toolbar__heading">
            <span className="quiz-question-card__eyebrow">Temat: {getQuizNoteTitle(currentQuestion.noteSlug)}</span>
            <h2 className="quiz-question-card__title">{currentQuestion.prompt}</h2>
            <p className="quiz-question-card__body">
              Typ pytania: {currentQuestion.type === "singleChoice"
                ? "jednokrotny wybór"
                : currentQuestion.type === "multiChoice"
                  ? "wielokrotny wybór"
                  : currentQuestion.type === "shortText"
                    ? "krótka odpowiedź"
                    : "odpowiedź otwarta"}
            </p>
          </div>

          <QuestionAnswerInput
            question={currentQuestion}
            answer={currentAnswer}
            disabled={Boolean(currentEvaluation)}
            onChange={(nextAnswer) => {
              setAnswers((currentAnswers) => ({
                ...currentAnswers,
                [currentQuestion.id]: nextAnswer,
              }));
            }}
          />

          {currentEvaluation ? (
            <section className={getFeedbackClassName(currentEvaluation)}>
              <div className="quiz-feedback__header">
                <div className="quiz-feedback__title-wrap">
                  <FileText className="quiz-icon quiz-icon--section" aria-hidden="true" />
                  <h3 className="quiz-feedback__title">Ocena odpowiedzi</h3>
                </div>
                <div className="quiz-feedback__badges">
                  <span className={`quiz-result-badge quiz-result-badge--${currentEvaluation.verdict}`}>
                    {getVerdictIcon(currentEvaluation)}
                    {getVerdictLabel(currentEvaluation)}
                  </span>
                  <span className="quiz-source-badge">
                    {currentEvaluation.grader === "gemini" ? <Bot className="quiz-icon quiz-icon--badge" aria-hidden="true" /> : <Sparkles className="quiz-icon quiz-icon--badge" aria-hidden="true" />}
                    {getGraderLabel(currentEvaluation)}
                  </span>
                </div>
              </div>

              {hasVisibleFeedback(currentEvaluation) ? (
                <div className="quiz-feedback__section quiz-feedback__section--highlight">
                  <strong>Komentarz</strong>
                  <p className="quiz-feedback__body">{currentEvaluation.feedback}</p>
                </div>
              ) : null}

              <div className="quiz-feedback__grid">
                <div className="quiz-feedback__section quiz-feedback__section--primary">
                  <div className="quiz-feedback__section-title">
                    <ListChecks className="quiz-icon" aria-hidden="true" />
                    <strong>Wyjaśnienie</strong>
                  </div>
                  <p className="quiz-feedback__body">{currentEvaluation.explanation}</p>
                </div>

                <div className="quiz-feedback__section quiz-feedback__section--primary">
                  <div className="quiz-feedback__section-title">
                    <BookOpen className="quiz-icon" aria-hidden="true" />
                    <strong>Wzorcowa odpowiedź</strong>
                  </div>
                  <p className="quiz-feedback__body">{currentEvaluation.referenceAnswer}</p>
                </div>
              </div>

              {shouldShowPointBreakdown(currentQuestion, currentEvaluation) ? (
                <div className="quiz-feedback__grid">
                  {currentEvaluation.matchedPoints.length > 0 ? (
                    <div className="quiz-feedback__section">
                      <div className="quiz-feedback__section-title">
                        <CheckCircle2 className="quiz-icon" aria-hidden="true" />
                        <strong>Trafione punkty</strong>
                      </div>
                      <ul className="quiz-summary__list">
                        {currentEvaluation.matchedPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {currentEvaluation.missedPoints.length > 0 ? (
                    <div className="quiz-feedback__section">
                      <div className="quiz-feedback__section-title">
                        <AlertCircle className="quiz-icon" aria-hidden="true" />
                        <strong>Brakujące punkty</strong>
                      </div>
                      <ul className="quiz-summary__list">
                        {currentEvaluation.missedPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              <div className="quiz-reference-link-wrap">
                <span className="quiz-feedback__eyebrow">Powiązana notatka</span>
                <Link to={`/notes/${currentQuestion.noteSlug}`} className="quiz-reference-link">
                  <BookOpen className="quiz-icon" aria-hidden="true" />
                  {getQuizNoteTitle(currentQuestion.noteSlug)}
                </Link>
              </div>
            </section>
          ) : null}

          <div className="quiz-question-card__actions">
            {!currentEvaluation ? (
              <button
                type="button"
                className="ghost-button"
                disabled={!isAnswerComplete(currentQuestion, currentAnswer) || fetcher.state !== "idle"}
                onClick={() => {
                  fetcher.submit(
                    {
                      questionId: currentQuestion.id,
                      answerJson: JSON.stringify(currentAnswer),
                    },
                    {
                      method: "post",
                      action: "/quiz/check",
                    },
                  );
                }}
              >
                <Sparkles className="quiz-icon" aria-hidden="true" />
                {fetcher.state === "submitting" ? "Sprawdzam..." : "Sprawdź"}
              </button>
            ) : null}

            {currentEvaluation ? (
              <button type="button" className="ghost-button" onClick={goToNextQuestion}>
                <Target className="quiz-icon" aria-hidden="true" />
                {currentIndex === session.questions.length - 1 ? "Zobacz wynik" : "Następne pytanie"}
              </button>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
