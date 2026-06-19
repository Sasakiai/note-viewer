import { getNoteBySlug, notes } from "./notes";
import type { QuizMode, QuizQuestion, QuizVerdict, SubmittedAnswer } from "./quiz-types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "alg-partial-correctness",
    noteSlug: "algorytmy",
    prompt: "Która odpowiedź najlepiej definiuje częściową poprawność algorytmu?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Algorytm zawsze kończy się po skończonej liczbie kroków." },
      { id: "b", label: "Jeśli algorytm się zatrzyma, to zwraca poprawny wynik." },
      { id: "c", label: "Algorytm ma poprawny warunek początkowy i końcowy." },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "Algorytm jest częściowo poprawny, jeśli dla poprawnych danych, jeżeli się zatrzyma, to zwraca poprawny wynik.",
    explanation: "Częściowa poprawność nic nie mówi o tym, czy algorytm na pewno się zatrzyma.",
  },
  {
    id: "alg-total-correctness-formula",
    noteSlug: "algorytmy",
    prompt: "Dokończ wzór: całkowita poprawność = ...",
    type: "shortText",
    acceptedAnswers: [
      "własność stopu + częściowa poprawność",
      "częściowa poprawność + własność stopu",
    ],
    referenceAnswer: "Całkowita poprawność = własność stopu + częściowa poprawność.",
    explanation: "Trzeba jednocześnie wykazać, że algorytm się kończy i że po zatrzymaniu daje poprawny wynik.",
  },
  {
    id: "complexity-dominating-operation",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Czym jest operacja dominująca?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Operacja, która zużywa najwięcej pamięci." },
      { id: "b", label: "Operacja, której liczba wykonań najlepiej opisuje czas działania algorytmu." },
      { id: "c", label: "Operacja wykonywana tylko w pesymistycznym przypadku." },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "Operacja dominująca to operacja, której liczba wykonań najlepiej opisuje czas działania algorytmu.",
    explanation: "To na niej zwykle opiera się wyznaczanie wzoru na złożoność czasową.",
  },
  {
    id: "asymptotic-strict-notations",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Które notacje są ścisłe? Zaznacz wszystkie poprawne.",
    type: "multiChoice",
    options: [
      { id: "a", label: "O" },
      { id: "b", label: "o" },
      { id: "c", label: "Ω" },
      { id: "d", label: "ω" },
      { id: "e", label: "Θ" },
    ],
    correctOptionIds: ["b", "d"],
    referenceAnswer: "Ścisłe są notacje o oraz ω.",
    explanation: "O i Ω dają zwykłe ograniczenia, a o i ω oznaczają odpowiednio wyraźnie wolniejszy albo wyraźnie szybszy wzrost.",
  },
  {
    id: "search-binary-complexity",
    noteSlug: "wyszukiwanie",
    prompt: "Jaka jest pesymistyczna złożoność czasowa wyszukiwania binarnego?",
    type: "shortText",
    acceptedAnswers: ["theta(log n)", "θ(log n)", "th(log n)"],
    referenceAnswer: "Pesymistyczna złożoność czasowa wyszukiwania binarnego to Θ(log n).",
    explanation: "W każdej iteracji przeszukiwany przedział zmniejsza się mniej więcej o połowę.",
  },
  {
    id: "search-jump-best-k",
    noteSlug: "wyszukiwanie",
    prompt: "Dla jakiej wartości k wyszukiwanie skokami co k ma rząd Θ(√n)?",
    type: "singleChoice",
    options: [
      { id: "a", label: "k = log n" },
      { id: "b", label: "k = √n" },
      { id: "c", label: "k = n" },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "Najlepszy wybór to k = √n.",
    explanation: "Wtedy koszty n/k i k są zrównoważone.",
  },
  {
    id: "sorting-stability-selection",
    noteSlug: "sortowanie",
    prompt: "Dlaczego SelectionSort zwykle nie jest stabilny?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Bo zawsze używa dodatkowej tablicy pomocniczej." },
      { id: "b", label: "Bo zamiana minimum z początkiem może przestawić równe elementy." },
      { id: "c", label: "Bo działa tylko na listach, a nie na tablicach." },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "SelectionSort zwykle nie jest stabilny, bo zamiana minimum z początkiem nieposortowanej części może przestawić równe elementy.",
    explanation: "Jedna zamiana może zmienić wzajemną kolejność dwóch równych elementów.",
  },
  {
    id: "sorting-countsort-open",
    noteSlug: "sortowanie",
    prompt: "Wyjaśnij krótko, co zawiera tablica counts po sumowaniu prefiksowym w CountSort i co zawiera result po ostatniej pętli.",
    type: "openText",
    requiredPoints: [
      "counts[x] = liczba elementów <= x",
      "result to posortowany ciąg wejściowy",
    ],
    niceToHavePoints: [
      "po pierwszym przejściu counts[x] to liczba wystąpień x",
      "ostatnia pętla wpisuje elementy na właściwe pozycje",
    ],
    referenceAnswer: "Po sumowaniu prefiksowym counts[x] oznacza liczbę elementów mniejszych lub równych x. Po ostatniej pętli result zawiera już posortowany ciąg wejściowy.",
    explanation: "To jedno z klasycznych pytań o CountSort: trzeba rozróżnić counts po zliczaniu i po prefiksach.",
  },
  {
    id: "sorting-lower-bound",
    noteSlug: "sortowanie",
    prompt: "Jakie jest dolne ograniczenie dla sortowań przez porównania?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Ω(n)" },
      { id: "b", label: "Ω(log n)" },
      { id: "c", label: "Ω(n log n)" },
    ],
    correctOptionIds: ["c"],
    referenceAnswer: "Dolne ograniczenie dla sortowań przez porównania wynosi Ω(n log n).",
    explanation: "Dlatego CountSort i RadixSort mogą być szybsze tylko dlatego, że nie są wyłącznie sortowaniami przez porównania.",
  },
  {
    id: "ads-vs-concrete",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Co opisuje abstrakcyjna struktura danych?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Dokładne ułożenie danych w pamięci." },
      { id: "b", label: "Zestaw operacji i sens pracy na danych." },
      { id: "c", label: "Wyłącznie sposób implementacji w tablicy." },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "ASD opisuje co można zrobić z danymi, czyli zestaw operacji i ich sens.",
    explanation: "Konkretna struktura danych opisuje dopiero realne przechowywanie.",
  },
  {
    id: "list-node-next",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Jaką instrukcję najczęściej wykonujemy, żeby przejść do następnego węzła w liście jednokierunkowej?",
    type: "shortText",
    acceptedAnswers: ["node = node.next", "node=node.next"],
    referenceAnswer: "Najczęściej przechodzimy dalej instrukcją node = node.next.",
    explanation: "To też klasyczny argument przy uzasadnianiu własności stopu dla przejścia po liście.",
  },
  {
    id: "queue-vs-stack-scenario",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Klient chce móc podejrzeć i usunąć najdawniej dodane zgłoszenie. Jaka ASD pasuje najlepiej?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Stos" },
      { id: "b", label: "Kolejka" },
      { id: "c", label: "Kopiec" },
    ],
    correctOptionIds: ["b"],
    referenceAnswer: "Najlepiej pasuje kolejka, bo działa według FIFO: first in, first out.",
    explanation: "Najdawniej dodany oznacza porządek czasu dodania, a nie priorytet.",
  },
  {
    id: "heap-delmin-open",
    noteSlug: "kolejka-priorytetowa-i-kopiec-binarny",
    prompt: "Opisz przebieg operacji delMin na min-kopcu binarnym.",
    type: "openText",
    requiredPoints: [
      "minimum jest w korzeniu",
      "ostatni element przenosimy do korzenia",
      "usuwamy ostatnią pozycję",
      "wykonujemy downheap",
      "zamieniamy z mniejszym dzieckiem",
    ],
    niceToHavePoints: [
      "zwracamy zapamiętane minimum",
      "własność kopca musi zostać przywrócona",
    ],
    referenceAnswer: "W delMin zapamiętujemy korzeń jako wynik, przenosimy ostatni element do korzenia, usuwamy ostatnią pozycję i wykonujemy downheap, zamieniając element z mniejszym dzieckiem, aż własność kopca wróci.",
    explanation: "To bardzo typowe pytanie opisowe z kopca.",
  },
  {
    id: "heap-findmin-complexity",
    noteSlug: "kolejka-priorytetowa-i-kopiec-binarny",
    prompt: "Jaka jest złożoność operacji findMin w min-kopcu?",
    type: "singleChoice",
    options: [
      { id: "a", label: "O(1)" },
      { id: "b", label: "O(log n)" },
      { id: "c", label: "O(n)" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "findMin ma złożoność O(1), bo minimum jest w korzeniu.",
    explanation: "Nie trzeba przeszukiwać całej struktury.",
  },
  {
    id: "dict-ordered-operations",
    noteSlug: "slownik-hashmap-bst-i-avl",
    prompt: "Które operacje sugerują BST albo AVL zamiast HashMap? Zaznacz wszystkie poprawne.",
    type: "multiChoice",
    options: [
      { id: "a", label: "minimum" },
      { id: "b", label: "wyszukiwanie po id" },
      { id: "c", label: "następnik" },
      { id: "d", label: "wyszukiwanie zakresu" },
    ],
    correctOptionIds: ["a", "c", "d"],
    referenceAnswer: "BST albo AVL są lepsze, gdy ważny jest porządek kluczy, np. minimum, następnik albo wyszukiwanie zakresu.",
    explanation: "HashMap jest bardzo dobra do szybkiego dostępu po kluczu, ale nie daje uporządkowania kluczy.",
  },
  {
    id: "avl-balance-factor",
    noteSlug: "slownik-hashmap-bst-i-avl",
    prompt: "Jakie wartości może przyjmować współczynnik zrównoważenia bf w AVL?",
    type: "shortText",
    acceptedAnswers: ["-1, 0, 1", "-1 0 1", "-1,0,1"],
    referenceAnswer: "W AVL dopuszczalne wartości bf to -1, 0, 1.",
    explanation: "Jeśli wyjdziemy poza ten zakres, trzeba wykonać rotacje.",
  },
  {
    id: "summary-client-scenario",
    noteSlug: "podsumowanie",
    prompt: "Firma chce szybko znaleźć klienta po id, ale też dla każdego klienta osobno podejrzeć ostatnio dodaną operację. Jakie połączenie struktur pasuje najlepiej?",
    type: "openText",
    requiredPoints: [
      "hashmap",
      "stos",
      "po id szukamy w hashmap",
      "ostatnio dodana operacja sugeruje stos",
    ],
    niceToHavePoints: [
      "stos może być wartością w hashmap",
      "to rozdziela wyszukiwanie klienta od historii jego operacji",
    ],
    referenceAnswer: "Najlepiej użyć HashMap do wyszukiwania klienta po id, a jako wartość trzymać stos operacji, jeśli chcemy widzieć ostatnio dodaną operację dla danego klienta.",
    explanation: "To jest dokładnie typ zadania opisowego w stylu starego sprawdzianu.",
  },
  {
    id: "summary-pseudocode-list-sum",
    noteSlug: "podsumowanie",
    prompt: "Co powinna robić pętla w pseudokodzie sumującym wartości listy jednokierunkowej? Opisz dwa kluczowe kroki.",
    type: "openText",
    requiredPoints: [
      "dodajemy wartość bieżącego węzła do sumy",
      "przechodzimy do następnego węzła",
    ],
    niceToHavePoints: [
      "node = node.next",
      "kończymy, gdy node == null",
    ],
    referenceAnswer: "W każdej iteracji dodajemy wartość bieżącego węzła do sumy i przechodzimy do następnego węzła, np. node = node.next, aż do null.",
    explanation: "To streszcza sedno typowego zadania z pisania pseudokodu na liście jednokierunkowej.",
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
