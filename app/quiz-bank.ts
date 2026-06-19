import { getNoteBySlug, notes } from "./notes";
import type { QuizMode, QuizQuestion, QuizVerdict, SubmittedAnswer } from "./quiz-types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "algorytmy-specyfikacja-elementy",
    noteSlug: "algorytmy",
    prompt: "Który zestaw poprawnie opisuje elementy specyfikacji algorytmu?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Nazwa algorytmu, lista argumentów, warunek początkowy, warunek końcowy" },
      { id: "b", label: "Nazwa algorytmu, złożoność czasowa, złożoność pamięciowa, przykład użycia" },
      { id: "c", label: "Typ danych, implementacja w kodzie, testy jednostkowe, wynik przykładowy" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Specyfikacja obejmuje nazwę algorytmu i listę argumentów oraz warunek początkowy i końcowy.",
    explanation: "To rozdziela opis zadania od implementacji. Specyfikacja mówi, co ma być policzone i dla jakich danych, a nie jak to zaprogramować.",
  },
  {
    id: "algorytmy-warunek-poczatkowy",
    noteSlug: "algorytmy",
    prompt: "Co określa warunek początkowy?",
    type: "shortText",
    acceptedAnswers: [
      "jakie dane wejściowe są poprawne",
      "poprawne dane wejściowe",
      "które dane wejściowe są poprawne",
      "warunki poprawności danych wejściowych",
    ],
    referenceAnswer: "Warunek początkowy określa, jakie dane wejściowe są poprawne.",
    explanation: "To filtr na wejście. Zanim zaczniesz dowodzić poprawności, musisz wiedzieć, dla jakich danych w ogóle wolno uruchomić algorytm.",
  },
  {
    id: "algorytmy-warunek-koncowy",
    noteSlug: "algorytmy",
    prompt: "Co określa warunek końcowy?",
    type: "shortText",
    acceptedAnswers: [
      "jaki wynik ma zostać zwrócony dla poprawnych danych wejściowych",
      "poprawny wynik dla poprawnych danych wejściowych",
      "jaki wynik ma zwrócić algorytm dla poprawnych danych wejściowych",
    ],
    referenceAnswer: "Warunek końcowy określa, jaki wynik ma zostać zwrócony dla poprawnych danych wejściowych.",
    explanation: "Warunek końcowy opisuje cel działania algorytmu. To właśnie do niego później odnosi się dowód częściowej poprawności.",
  },
  {
    id: "algorytmy-wlasnosc-stopu-definicja",
    noteSlug: "algorytmy",
    prompt: "Kiedy algorytm ma własność stopu?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Gdy dla każdych poprawnych danych wejściowych kończy działanie po skończonej liczbie kroków" },
      { id: "b", label: "Gdy dla części danych wejściowych daje poprawny wynik" },
      { id: "c", label: "Gdy zawsze używa pętli z licznikiem" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Własność stopu oznacza zakończenie działania po skończonej liczbie kroków dla każdych poprawnych danych wejściowych.",
    explanation: "Nie chodzi o poprawność wyniku, tylko o samo zakończenie obliczeń. Algorytm może się zatrzymywać i nadal zwracać zły wynik, więc to osobna własność.",
  },
  {
    id: "algorytmy-czesciowa-poprawnosc",
    noteSlug: "algorytmy",
    prompt: "Które stwierdzenie najlepiej opisuje częściową poprawność?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Jeśli algorytm się zatrzyma, to zwrócony wynik jest poprawny" },
      { id: "b", label: "Algorytm na pewno się zatrzyma i da poprawny wynik" },
      { id: "c", label: "Algorytm wykonuje się w czasie liniowym" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Częściowa poprawność mówi: jeśli algorytm się zatrzyma, to wynik będzie poprawny.",
    explanation: "Najczęstsza pułapka to pomylenie tego z całkowitą poprawnością. Częściowa poprawność nie obiecuje zatrzymania, tylko jakość wyniku pod warunkiem zatrzymania.",
  },
  {
    id: "algorytmy-calkowita-poprawnosc",
    noteSlug: "algorytmy",
    prompt: "Dokończ zależność: całkowita poprawność = ...",
    type: "shortText",
    acceptedAnswers: [
      "własność stopu + częściowa poprawność",
      "czesciowa poprawnosc + wlasnosc stopu",
      "własność stopu i częściowa poprawność",
      "częściowa poprawność + własność stopu",
    ],
    referenceAnswer: "Całkowita poprawność to własność stopu plus częściowa poprawność.",
    explanation: "To połączenie dwóch niezależnych pytań: czy algorytm się kończy i czy po zakończeniu daje dobry wynik.",
  },
  {
    id: "algorytmy-uzasadnianie-stopu",
    noteSlug: "algorytmy",
    prompt: "Które elementy zwykle pojawiają się w uzasadnieniu własności stopu?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Wskazanie zmiennej sterującej, np. i albo n" },
      { id: "b", label: "Pokazanie, że w każdej iteracji zmienia się w stronę końca" },
      { id: "c", label: "Pokazanie, że nie może zmieniać się w nieskończoność" },
      { id: "d", label: "Wyznaczenie złożoności pamięciowej" },
      { id: "e", label: "Napisanie implementacji rekurencyjnej" },
    ],
    correctOptionIds: ["a", "b", "c"],
    referenceAnswer: "Typowy schemat to: wskazać zmienną sterującą, pokazać że zbliża się do końca i że nie może robić tego w nieskończoność.",
    explanation: "To praktyczny wzorzec egzaminowy. Nie trzeba od razu budować formalnego dowodu, ale trzeba pokazać miarę postępu i jej ograniczenie.",
  },
  {
    id: "algorytmy-niezmiennik-petli",
    noteSlug: "algorytmy",
    prompt: "Które zdanie najlepiej opisuje niezmiennik pętli?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Warunek logiczny, który pozostaje prawdziwy po każdej iteracji pętli" },
      { id: "b", label: "Instrukcja, która kończy działanie pętli" },
      { id: "c", label: "Zmienna przechowująca liczbę iteracji" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Niezmiennik pętli to warunek logiczny, który pozostaje prawdziwy po każdej iteracji, jeśli był prawdziwy przed nią.",
    explanation: "Niezmiennik nie opisuje jednego kroku, tylko stan, który jest zachowywany przez całą pętlę. Dzięki temu można połączyć przebieg iteracji z poprawnością wyniku końcowego.",
  },
  {
    id: "algorytmy-sumlist-stop",
    noteSlug: "algorytmy",
    prompt: "Dlaczego pseudokod `sumList(head)` ma własność stopu?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Bo w każdej iteracji przechodzimy do następnego węzła, a lista ma skończoną liczbę węzłów" },
      { id: "b", label: "Bo zmienna sum zawsze rośnie" },
      { id: "c", label: "Bo lista jednokierunkowa zawsze jest posortowana" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`sumList(head)` kończy działanie, bo wskaźnik `node` przesuwa się do przodu i po skończonej liczbie kroków osiąga `null`.",
    explanation: "Kluczowy jest ruch wskaźnika `node`, nie sama operacja dodawania. To właśnie przechodzenie po kolejnych węzłach stanowi miarę postępu algorytmu.",
  },

];

function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const copy = [...questions];

  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = copy[index];
    copy[index] = copy[swapIndex];
    copy[swapIndex] = current;
  }

  return copy;
}

export function getAllQuizQuestions() {
  return quizQuestions;
}

export function getQuestionById(questionId: string) {
  return quizQuestions.find((question) => question.id === questionId);
}

export function getQuestionsForNoteSlug(noteSlug: string) {
  return quizQuestions.filter((question) => question.noteSlug === noteSlug);
}

export function getQuizNoteTitle(noteSlug: string) {
  const note = getNoteBySlug(noteSlug);
  return note ? note.title : noteSlug;
}

export function getQuizTopicOptions() {
  return notes
    .map((note) => {
      const questionCount = getQuestionsForNoteSlug(note.slug).length;

      return {
        slug: note.slug,
        title: note.title,
        questionCount,
      };
    })
    .filter((item) => item.questionCount > 0);
}

export function clampQuestionCount(rawValue: number, maxCount: number) {
  if (maxCount <= 0) {
    return 0;
  }

  if (Number.isNaN(rawValue) || rawValue < 1) {
    return 1;
  }

  if (rawValue > maxCount) {
    return maxCount;
  }

  return rawValue;
}

export function selectQuestionsForMode(input: {
  questions: QuizQuestion[];
  mode: QuizMode;
  questionCount: number;
}) {
  const { questions, mode, questionCount } = input;

  if (mode === "randomExam") {
    return shuffleQuestions(questions).slice(0, clampQuestionCount(questionCount, questions.length));
  }

  return questions;
}

export function createDefaultAnswer(question: QuizQuestion): SubmittedAnswer {
  if (question.type === "multiChoice") {
    return [];
  }

  return "";
}

export function isAnswerComplete(question: QuizQuestion, answer: SubmittedAnswer) {
  if (question.type === "multiChoice") {
    return Array.isArray(answer) && answer.length > 0;
  }

  return typeof answer === "string" && answer.trim().length > 0;
}

export function verdictScore(verdict: QuizVerdict) {
  if (verdict === "correct") {
    return 1;
  }

  if (verdict === "partial") {
    return 0.5;
  }

  return 0;
}
