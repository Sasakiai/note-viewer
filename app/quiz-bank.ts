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
    explanation: "",
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
    explanation: "",
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
    explanation: "",
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
    explanation: "",
  },
  {
    id: "zlozonosc-operacja-dominujaca-definicja",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Czym jest operacja dominująca?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Operacja, której liczba wykonań najlepiej opisuje czas działania algorytmu" },
      { id: "b", label: "Operacja, która zawsze występuje dokładnie raz" },
      { id: "c", label: "Najbardziej pamięciożerna instrukcja w programie" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Operacja dominująca to taka operacja, której liczba wykonań najlepiej opisuje czas działania algorytmu.",
    explanation: "",
  },
  {
    id: "zlozonosc-operacja-dominujaca-przyklad",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "W podanym przykładzie wyszukiwania sekwencyjnego jaka jest operacja dominująca?",
    type: "shortText",
    acceptedAnswers: [
      "porównanie a[i] == x",
      "a[i] == x",
      "porownanie a[i] == x",
      "porównanie elementu z x",
    ],
    referenceAnswer: "Operacją dominującą jest porównanie `A[i] == x`.",
    explanation: "",
  },
  {
    id: "zlozonosc-typowe-operacje-dominujace",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Które z poniższych są podane w notatce jako typowe przykłady operacji dominujących?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Porównanie elementów" },
      { id: "b", label: "Przypisanie do tablicy" },
      { id: "c", label: "Sprawdzenie warunku w pętli" },
      { id: "d", label: "Renderowanie interfejsu użytkownika" },
      { id: "e", label: "Porównanie kluczy" },
    ],
    correctOptionIds: ["a", "b", "c", "e"],
    referenceAnswer: "W notatce podano m.in. porównanie elementów, przypisanie do tablicy, sprawdzenie warunku w pętli i porównanie kluczy.",
    explanation: "",
  },
  {
    id: "zlozonosc-rozmiar-danych-definicja",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Co opisuje rozmiar danych?",
    type: "shortText",
    acceptedAnswers: [
      "wielkość wejścia",
      "wielkosc wejscia",
      "funkcja opisująca wielkość wejścia",
      "funkcja opisujaca wielkosc wejscia",
    ],
    referenceAnswer: "Rozmiar danych to funkcja opisująca wielkość wejścia.",
    explanation: "",
  },
  {
    id: "zlozonosc-countsort-parametry",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Jakie dwa parametry rozmiaru danych są podane w notatce dla CountSort?",
    type: "multiChoice",
    options: [
      { id: "a", label: "`n` = długość ciągu" },
      { id: "b", label: "`m` = maksymalna wartość" },
      { id: "c", label: "`h` = wysokość drzewa" },
      { id: "d", label: "`k` = liczba kubełków użytych w implementacji" },
    ],
    correctOptionIds: ["a", "b"],
    referenceAnswer: "Dla CountSort w notatce użyto dwóch parametrów: `n` jako długości ciągu i `m` jako maksymalnej wartości.",
    explanation: "",
  },
  {
    id: "zlozonosc-pesymistyczna-oznaczenie",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Jakie oznaczenie ma pesymistyczna złożoność czasowa?",
    type: "shortText",
    acceptedAnswers: ["w(n)", "w(n) ", "W(n)"],
    referenceAnswer: "Pesymistyczna złożoność czasowa ma oznaczenie `W(n)`.",
    explanation: "",
  },
  {
    id: "zlozonosc-przecietna-oznaczenie",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Jakie oznaczenie ma przeciętna złożoność czasowa?",
    type: "shortText",
    acceptedAnswers: ["a(n)", "a(n) ", "A(n)"],
    referenceAnswer: "Przeciętna złożoność czasowa ma oznaczenie `A(n)`.",
    explanation: "",
  },
  {
    id: "zlozonosc-wyszukiwanie-sekwencyjne",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Jaka jest według notatki pesymistyczna złożoność czasowa zwykłego wyszukiwania sekwencyjnego?",
    type: "shortText",
    acceptedAnswers: ["theta(n)", "Θ(n)", "th(n)", "teta(n)"],
    referenceAnswer: "Dla zwykłego wyszukiwania sekwencyjnego w najgorszym przypadku `W(n) = Θ(n)`.",
    explanation: "Najgorszy przypadek jest wtedy, gdy elementu nie ma albo stoi na końcu, więc trzeba przejrzeć całą tablicę.",
  },
  {
    id: "zlozonosc-pamieciowa-definicja",
    noteSlug: "zlozonosc-algorytmow",
    prompt: "Co opisuje złożoność pamięciowa `S(n)`?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Ile dodatkowej pamięci zużywa algorytm jako funkcję rozmiaru danych" },
      { id: "b", label: "Ile czasu zajmuje zapis wyniku na dysk" },
      { id: "c", label: "Ile instrukcji ma implementacja algorytmu" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`S(n)` opisuje, ile dodatkowej pamięci zużywa algorytm jako funkcję rozmiaru danych.",
    explanation: "Słowo 'dodatkowej' jest tu ważne. Chodzi o pamięć potrzebną poza samymi danymi wejściowymi.",
  },
  {
    id: "notacja-o-duze-definicja",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Co oznacza zapis `f(n) = O(g(n))`?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Funkcja `f` rośnie co najwyżej tak szybko jak `g`" },
      { id: "b", label: "Funkcja `f` rośnie dokładnie tak samo szybko jak `g`" },
      { id: "c", label: "Funkcja `f` rośnie istotnie szybciej niż `g`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`f(n) = O(g(n))` oznacza, że funkcja `f` rośnie co najwyżej tak szybko jak `g`.",
    explanation: "`O` daje tylko ograniczenie z góry. Nie mówi jeszcze, że obie funkcje rosną w tym samym tempie.",
  },
  {
    id: "notacja-o-male-definicja",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Co oznacza zapis `f(n) = o(g(n))`?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Funkcja `f` rośnie istotnie wolniej niż `g`" },
      { id: "b", label: "Funkcja `f` rośnie co najwyżej tak szybko jak `g`" },
      { id: "c", label: "Funkcja `f` rośnie co najmniej tak szybko jak `g`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`f(n) = o(g(n))` oznacza, że funkcja `f` rośnie istotnie wolniej niż `g`.",
    explanation: "Małe `o` jest mocniejsze niż duże `O`. Nie wystarcza bycie 'nie szybszym' od `g`; wzrost musi być wyraźnie wolniejszy.",
  },
  {
    id: "notacja-theta-definicja",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Co oznacza zapis `f(n) = Θ(g(n))`?",
    type: "shortText",
    acceptedAnswers: [
      "funkcje mają ten sam rząd wzrostu",
      "ten sam rząd wzrostu",
      "funkcje maja ten sam rzad wzrostu",
      "rosną tak samo szybko",
    ],
    referenceAnswer: "`f(n) = Θ(g(n))` oznacza, że funkcje mają ten sam rząd wzrostu.",
    explanation: "`Θ` spina ograniczenie z góry i z dołu. To dlatego mówi więcej niż samo `O` albo samo `Ω`.",
  },
  {
    id: "notacja-omega-duze-definicja",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Co oznacza zapis `f(n) = Ω(g(n))`?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Funkcja `f` rośnie co najmniej tak szybko jak `g`" },
      { id: "b", label: "Funkcja `f` rośnie istotnie wolniej niż `g`" },
      { id: "c", label: "Funkcja `f` rośnie dokładnie tak samo szybko jak `g`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`f(n) = Ω(g(n))` oznacza, że funkcja `f` rośnie co najmniej tak szybko jak `g`.",
    explanation: "Duże `Ω` to dolne ograniczenie. Mówi, że `f` nie rośnie wolniej od `g`, ale nie wymusza jeszcze identycznego tempa wzrostu.",
  },
  {
    id: "notacja-omega-male-definicja",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Co oznacza zapis `f(n) = ω(g(n))`?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Funkcja `f` rośnie istotnie szybciej niż `g`" },
      { id: "b", label: "Funkcja `f` rośnie co najmniej tak szybko jak `g`" },
      { id: "c", label: "Funkcja `f` rośnie nie szybciej niż `g`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`f(n) = ω(g(n))` oznacza, że funkcja `f` rośnie istotnie szybciej niż `g`.",
    explanation: "Małe `ω` jest mocniejsze niż duże `Ω`. Nie chodzi tylko o brak wolniejszego wzrostu, ale o wyraźnie szybszy wzrost.",
  },
  {
    id: "notacja-o-duze-jako-jakie-ograniczenie",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Jakim ograniczeniem jest `O(g(n))`?",
    type: "shortText",
    acceptedAnswers: ["górne ograniczenie", "gorne ograniczenie", "ograniczenie górne", "ograniczenie gorne"],
    referenceAnswer: "`O(g(n))` jest górnym ograniczeniem.",
    explanation: "",
  },
  {
    id: "notacja-o-male-jako-jakie-ograniczenie",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Jakim ograniczeniem jest `o(g(n))`?",
    type: "shortText",
    acceptedAnswers: [
      "ścisłe górne ograniczenie",
      "scisle gorne ograniczenie",
      "górne ścisłe ograniczenie",
      "gorne scisle ograniczenie",
    ],
    referenceAnswer: "`o(g(n))` jest ścisłym górnym ograniczeniem.",
    explanation: "",
  },
  {
    id: "notacja-przyklady-poprawne",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Które przykłady są podane w notatce jako poprawne?",
    type: "multiChoice",
    options: [
      { id: "a", label: "`n^2 + 5n + 2 = O(n^2)`" },
      { id: "b", label: "`n = o(n log n)`" },
      { id: "c", label: "`n log n = ω(n)`" },
      { id: "d", label: "`n^2 + 5n + 2 = O(n)`" },
    ],
    correctOptionIds: ["a", "b", "c"],
    referenceAnswer: "W notatce jako poprawne podano `n^2 + 5n + 2 = O(n^2)`, `n = o(n log n)` i `n log n = ω(n)`.",
    explanation: "",
  },
  {
    id: "notacja-nie-jest-o-n",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Dlaczego `n^2 + 5n + 2` nie jest `O(n)`?",
    type: "shortText",
    acceptedAnswers: [
      "bo rośnie szybciej niż funkcja liniowa",
      "rośnie szybciej niż funkcja liniowa",
      "bo rośnie szybciej niż n",
      "jest kwadratowa a nie liniowa",
    ],
    referenceAnswer: "`n^2 + 5n + 2` nie jest `O(n)`, bo rośnie szybciej niż funkcja liniowa.",
    explanation: "To dobre miejsce na odróżnienie wielomianu kwadratowego od liniowego. Składnik `n^2` dominuje wzrost całej funkcji.",
  },
  {
    id: "notacja-hierarchia-rzedow",
    noteSlug: "notacja-asymptotyczna",
    prompt: "Ułóż od wolniejszego do szybszego wzrostu: `O(log n)`, `O(n)`, `O(2^n)`.",
    type: "shortText",
    acceptedAnswers: [
      "o(log n), o(n), o(2^n)",
      "o(log n) o(n) o(2^n)",
      "log n, n, 2^n",
      "o(log n) < o(n) < o(2^n)",
    ],
    referenceAnswer: "Od wolniejszego do szybszego: `O(log n)`, `O(n)`, `O(2^n)`.",
    explanation: "To porównanie trzech różnych klas wzrostu: logarytmicznej, liniowej i wykładniczej. Pomylenie ich łatwo prowadzi do złej oceny skalowalności algorytmu.",
  },
  {
    id: "wyszukiwanie-sekwencyjne-gdzie-dziala",
    noteSlug: "wyszukiwanie",
    prompt: "Na jakim ciągu działa wyszukiwanie sekwencyjne według notatki?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Na ciągu nieposortowanym i posortowanym" },
      { id: "b", label: "Tylko na ciągu posortowanym" },
      { id: "c", label: "Tylko na ciągu nieposortowanym" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Wyszukiwanie sekwencyjne działa na ciągu nieposortowanym i posortowanym.",
    explanation: "Sekwencyjne nie korzysta z porządku danych, tylko sprawdza element po elemencie. Dlatego sortowanie nie jest tu warunkiem działania.",
  },
  {
    id: "wyszukiwanie-sekwencyjne-zwrot",
    noteSlug: "wyszukiwanie",
    prompt: "Co zwraca pseudokod `find(A, n, key)`, gdy nie znajdzie elementu?",
    type: "shortText",
    acceptedAnswers: ["-1"],
    referenceAnswer: "Jeśli element nie zostanie znaleziony, algorytm zwraca `-1`.",
    explanation: "",
  },
  {
    id: "wyszukiwanie-sekwencyjne-zlozonosci",
    noteSlug: "wyszukiwanie",
    prompt: "Który zestaw złożoności dla wyszukiwania sekwencyjnego jest zgodny z notatką?",
    type: "singleChoice",
    options: [
      { id: "a", label: "`W(n) = Θ(n)`, `A(n) = Θ(n)`, `S(n) = O(1)`" },
      { id: "b", label: "`W(n) = Θ(log n)`, `A(n) = Θ(log n)`, `S(n) = O(1)`" },
      { id: "c", label: "`W(n) = Θ(√n)`, `A(n) = Θ(√n)`, `S(n) = Θ(n)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Dla wyszukiwania sekwencyjnego: `W(n) = Θ(n)`, `A(n) = Θ(n)`, `S(n) = O(1)`.",
    explanation: "",
  },
  {
    id: "wyszukiwanie-sekwencyjne-lista",
    noteSlug: "wyszukiwanie",
    prompt: "Dlaczego wyszukiwanie sekwencyjne ma sens także na liście dowiązaniowej?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Bo i tak przechodzimy element po elemencie" },
      { id: "b", label: "Bo dostęp do dowolnego indeksu na liście jest stałoczasowy" },
      { id: "c", label: "Bo lista musi być posortowana" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Na liście wyszukiwanie sekwencyjne ma sens, bo i tak przechodzimy element po elemencie.",
    explanation: "To ważna różnica względem algorytmów, które potrzebują szybkiego skoku do środka albo do indeksu. Sekwencyjne nie potrzebuje takiego dostępu.",
  },
  {
    id: "wyszukiwanie-skokami-zalozenie",
    noteSlug: "wyszukiwanie",
    prompt: "Jakie podstawowe założenie ma wyszukiwanie skokami co `k`?",
    type: "shortText",
    acceptedAnswers: [
      "ciąg jest posortowany",
      "posortowany ciąg",
      "dane są posortowane",
      "ciag jest posortowany",
    ],
    referenceAnswer: "Wyszukiwanie skokami co `k` zakłada, że ciąg jest posortowany.",
    explanation: "Bez porządku danych nie da się wywnioskować, że po trafieniu na większy element trzeba wrócić tylko do ostatniego bloku.",
  },
  {
    id: "wyszukiwanie-skokami-zlozonosc",
    noteSlug: "wyszukiwanie",
    prompt: "Jaka jest ogólna złożoność wyszukiwania skokami co `k`?",
    type: "shortText",
    acceptedAnswers: ["θ(n/k + k)", "Θ(n/k + k)", "theta(n/k + k)"],
    referenceAnswer: "Ogólna złożoność wyszukiwania skokami co `k` to `Θ(n/k + k)`.",
    explanation: "Ta postać pokazuje dwa koszty naraz: skoki po blokach oraz liniowe sprawdzenie ostatniego bloku.",
  },
  {
    id: "wyszukiwanie-skokami-pierwiastek",
    noteSlug: "wyszukiwanie",
    prompt: "Jaki wybór `k` jest najlepszy według notatki i jaki daje rząd złożoności?",
    type: "singleChoice",
    options: [
      { id: "a", label: "`k = √n`, wtedy złożoność to `Θ(√n)`" },
      { id: "b", label: "`k = log n`, wtedy złożoność to `Θ(log n)`" },
      { id: "c", label: "`k = n`, wtedy złożoność to `Θ(1)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Najlepszy wybór to `k = √n`, wtedy złożoność wynosi `Θ(√n)`.",
    explanation: "Ten wybór równoważy dwa składniki kosztu: liczbę skoków `n/k` i końcowe sprawdzenie bloku długości `k`.",
  },
  {
    id: "wyszukiwanie-skokami-lista",
    noteSlug: "wyszukiwanie",
    prompt: "Dlaczego wyszukiwanie skokami co `k` traci sens na liście dowiązaniowej?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Bo skok do indeksu nie jest stałoczasowy" },
      { id: "b", label: "Bo lista nie może być posortowana" },
      { id: "c", label: "Bo na liście nie da się porównywać kluczy" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Na liście wyszukiwanie skokami traci sens, bo skok do indeksu nie jest stałoczasowy.",
    explanation: "Algorytm opłaca się tylko wtedy, gdy przeskakiwanie po danych jest naprawdę szybkie. Na liście taki 'skok' i tak zamienia się w przechodzenie po kolejnych elementach.",
  },
  {
    id: "wyszukiwanie-binarne-zalozenia",
    noteSlug: "wyszukiwanie",
    prompt: "Które warunki według notatki zakłada wyszukiwanie binarne?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Ciąg jest posortowany" },
      { id: "b", label: "Mamy szybki dostęp do środka" },
      { id: "c", label: "Dane muszą być zapisane jako lista jednokierunkowa" },
      { id: "d", label: "Tablica jest w RAM" },
    ],
    correctOptionIds: ["a", "b", "d"],
    referenceAnswer: "Wyszukiwanie binarne zakłada posortowany ciąg oraz szybki dostęp do środka, np. w tablicy w RAM.",
    explanation: "Binarne nie potrzebuje tylko porządku danych. Potrzebuje też taniego dostępu do środkowego elementu, bo bez tego zysk z dzielenia zakresu znika.",
  },
  {
    id: "wyszukiwanie-binarne-zlozonosci",
    noteSlug: "wyszukiwanie",
    prompt: "Który zestaw złożoności dla wyszukiwania binarnego jest zgodny z notatką?",
    type: "singleChoice",
    options: [
      { id: "a", label: "`W(n) = Θ(log n)`, `A(n) = Θ(log n)`, `S(n) = O(1)`" },
      { id: "b", label: "`W(n) = Θ(n)`, `A(n) = Θ(n)`, `S(n) = O(1)`" },
      { id: "c", label: "`W(n) = Θ(√n)`, `A(n) = Θ(√n)`, `S(n) = Θ(n)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Dla wyszukiwania binarnego: `W(n) = Θ(log n)`, `A(n) = Θ(log n)`, `S(n) = O(1)`.",
    explanation: "",
  },
  {
    id: "wyszukiwanie-binarne-lista",
    noteSlug: "wyszukiwanie",
    prompt: "Dlaczego wyszukiwanie binarne traci sens na liście dowiązaniowej?",
    type: "shortText",
    acceptedAnswers: [
      "bo dostęp do środka nie jest o(1)",
      "bo dostęp do środka nie jest stałoczasowy",
      "bo dostęp do środka nie jest szybki",
      "bo nie ma szybkiego dostępu do środka",
    ],
    referenceAnswer: "Wyszukiwanie binarne traci sens na liście, bo dostęp do środka nie jest `O(1)`.",
    explanation: "Tu nie wystarczy, że dane są posortowane. Bez szybkiego dojścia do `mid` każda iteracja robi się za droga.",
  },
  {
    id: "sortowanie-stabilnosc-definicja",
    noteSlug: "sortowanie",
    prompt: "Kiedy algorytm sortowania jest stabilny?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Gdy zachowuje względną kolejność elementów o tej samej wartości" },
      { id: "b", label: "Gdy zawsze działa w czasie `Θ(n log n)`" },
      { id: "c", label: "Gdy nie używa dodatkowej pamięci" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Sortowanie jest stabilne, jeśli zachowuje względną kolejność elementów o tej samej wartości.",
    explanation: "Stabilność nie mówi nic o szybkości ani pamięci. Chodzi tylko o to, czy równe elementy nie zostaną wzajemnie przestawione.",
  },
  {
    id: "sortowanie-selectionsort-zlozonosc",
    noteSlug: "sortowanie",
    prompt: "Który zestaw złożoności dla SelectionSort jest zgodny z notatką?",
    type: "singleChoice",
    options: [
      { id: "a", label: "`W(n) = Θ(n^2)`, `A(n) = Θ(n^2)`, `S(n) = O(1)`" },
      { id: "b", label: "`W(n) = Θ(n log n)`, `A(n) = Θ(n log n)`, `S(n) = Θ(n)`" },
      { id: "c", label: "`W(n) = Θ(n)`, `A(n) = Θ(n)`, `S(n) = O(1)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Dla SelectionSort: `W(n) = Θ(n^2)`, `A(n) = Θ(n^2)`, `S(n) = O(1)`.",
    explanation: "",
  },
  {
    id: "sortowanie-selectionsort-stabilnosc",
    noteSlug: "sortowanie",
    prompt: "Czy standardowy SelectionSort jest stabilny?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Nie" },
      { id: "b", label: "Tak" },
      { id: "c", label: "Tylko dla tablic posortowanych" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Standardowa wersja SelectionSort zwykle nie jest stabilna.",
    explanation: "Zamiana minimum z początkiem nieposortowanej części może przestawić równe elementy, więc ich wcześniejsza kolejność nie musi zostać zachowana.",
  },
  {
    id: "sortowanie-insertionsort-najlepszy-przypadek",
    noteSlug: "sortowanie",
    prompt: "Kiedy InsertionSort może działać w czasie `Θ(n)` według notatki?",
    type: "shortText",
    acceptedAnswers: [
      "gdy dane są już prawie posortowane",
      "dla danych prawie posortowanych",
      "kiedy dane są prawie posortowane",
      "gdy tablica jest prawie posortowana",
    ],
    referenceAnswer: "InsertionSort może spaść do `Θ(n)`, gdy dane są już prawie posortowane.",
    explanation: "To ważne odróżnienie od SelectionSort, który działa podobnie długo dla prawie każdych danych wejściowych.",
  },
  {
    id: "sortowanie-merge-stabilnosc",
    noteSlug: "sortowanie",
    prompt: "Kiedy funkcja `merge` zachowuje stabilność?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Gdy przy równości bierzemy najpierw element z lewego ciągu" },
      { id: "b", label: "Gdy zawsze bierzemy element z prawego ciągu" },
      { id: "c", label: "Gdy scalanie odbywa się bez dodatkowej pamięci" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`merge` jest stabilne, jeśli przy równości najpierw bierzemy element z lewego ciągu.",
    explanation: "Przy remisie trzeba zachować kolejność wynikającą z wcześniejszego ułożenia elementów. Właśnie to decyduje tu o stabilności.",
  },
  {
    id: "sortowanie-mergesort-lista",
    noteSlug: "sortowanie",
    prompt: "Dlaczego MergeSort bardzo dobrze pasuje do list dowiązaniowych?",
    type: "shortText",
    acceptedAnswers: [
      "bo scalanie można robić przez przepinanie wskaźników",
      "scalanie można robić przez przepinanie wskaźników",
      "bo merge można robić przez przepinanie wskaźników",
      "bo można scalać przez przepinanie wskaźników",
    ],
    referenceAnswer: "MergeSort dobrze pasuje do list dowiązaniowych, bo scalanie można robić przez przepinanie wskaźników.",
    explanation: "",
  },
  {
    id: "sortowanie-quicksort-zlozonosci",
    noteSlug: "sortowanie",
    prompt: "Który zestaw złożoności dla QuickSort jest zgodny z notatką?",
    type: "singleChoice",
    options: [
      { id: "a", label: "`A(n) = Θ(n log n)`, `W(n) = Θ(n^2)`, `S(n) = O(log n)`" },
      { id: "b", label: "`A(n) = Θ(n^2)`, `W(n) = Θ(n^2)`, `S(n) = Θ(n)`" },
      { id: "c", label: "`A(n) = Θ(log n)`, `W(n) = Θ(n log n)`, `S(n) = O(1)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Dla QuickSort: `A(n) = Θ(n log n)`, `W(n) = Θ(n^2)`, `S(n) = O(log n)`.",
    explanation: "",
  },
  {
    id: "sortowanie-quicksort-najgorszy-przypadek",
    noteSlug: "sortowanie",
    prompt: "Kiedy według notatki pojawia się najgorszy przypadek QuickSort?",
    type: "shortText",
    acceptedAnswers: [
      "przy bardzo złym wyborze pivota",
      "gdy pivot ciągle dzieli dane skrajnie nierówno",
      "kiedy pivot dzieli dane skrajnie nierówno",
      "przy skrajnie nierównym podziale",
    ],
    referenceAnswer: "Najgorszy przypadek QuickSort pojawia się przy bardzo złym wyborze pivota, np. gdy podziały są skrajnie nierówne.",
    explanation: "QuickSort jest szybki nie dlatego, że zawsze dzieli idealnie, tylko dlatego, że zwykle dzieli dość dobrze. Zły pivot psuje tę przewagę.",
  },
  {
    id: "sortowanie-countsort-stabilnosc",
    noteSlug: "sortowanie",
    prompt: "Dlaczego pokazana wersja CountSort jest stabilna?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Bo ostatnia pętla idzie od końca wejścia" },
      { id: "b", label: "Bo `counts` przechowuje sumy prefiksowe" },
      { id: "c", label: "Bo sortuje tylko liczby naturalne" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Pokazana wersja CountSort jest stabilna, bo ostatnia pętla idzie od końca wejścia.",
    explanation: "Samo liczenie wystąpień nie wystarcza do stabilności. Kluczowe jest to, w jakiej kolejności wpisywane są równe elementy do wyniku.",
  },
  {
    id: "sortowanie-radixsort-poprawnosc",
    noteSlug: "sortowanie",
    prompt: "Od czego zależy poprawność RadixSort według notatki?",
    type: "shortText",
    acceptedAnswers: [
      "od stabilności sortowania używanego na kolejnych cyfrach",
      "od stabilności sortowania po każdej cyfrze",
      "od tego czy sortowanie po każdej cyfrze jest stabilne",
      "od stabilnego sortowania kolejnych cyfr",
    ],
    referenceAnswer: "Poprawność RadixSort zależy od stabilności sortowania używanego na kolejnych cyfrach.",
    explanation: "Jeśli sortowanie po jednej cyfrze przestawi porządek ustalony wcześniej, to informacja z poprzednich kroków zostanie zniszczona.",
  },
  {
    id: "sortowanie-dolne-ograniczenie-porownania",
    noteSlug: "sortowanie",
    prompt: "Jakie dolne ograniczenie w pesymistycznym przypadku mają sortowania oparte tylko na porównaniach?",
    type: "shortText",
    acceptedAnswers: ["Ω(n log n)", "omega(n log n)", "duze omega(n log n)"],
    referenceAnswer: "Sortowania oparte tylko na porównaniach mają w pesymistycznym przypadku dolne ograniczenie `Ω(n log n)`.",
    explanation: "To tłumaczy, czemu CountSort i RadixSort mogą być szybsze: nie łamią tego ograniczenia, bo nie są sortowaniami opartymi wyłącznie na porównaniach.",
  },
  {
    id: "struktury-abstrakcyjna-definicja",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Co opisuje abstrakcyjna struktura danych?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Co można zrobić z danymi i jakie są operacje" },
      { id: "b", label: "Jak dokładnie dane są ułożone w pamięci" },
      { id: "c", label: "Jak wygląda kod konkretnej implementacji" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Abstrakcyjna struktura danych opisuje, co można zrobić z danymi, czyli głównie zestaw operacji.",
    explanation: "To rozdzielenie interfejsu od implementacji. ASD mówi, jakie operacje mają sens, ale nie narzuca jeszcze sposobu ich przechowywania.",
  },
  {
    id: "struktury-stos-operacje",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Które operacje są podane w notatce jako przykład dla stosu?",
    type: "multiChoice",
    options: [
      { id: "a", label: "`push(x)`" },
      { id: "b", label: "`pop()`" },
      { id: "c", label: "`top()`" },
      { id: "d", label: "`isEmpty()`" },
      { id: "e", label: "`enqueue(x)`" },
    ],
    correctOptionIds: ["a", "b", "c", "d"],
    referenceAnswer: "Dla stosu notatka podaje operacje `push(x)`, `pop()`, `top()` i `isEmpty()`.",
    explanation: "",
  },
  {
    id: "struktury-implementacja-stosu",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Czy to, że stos jest zrobiony tablicą albo listą, należy do poziomu abstrakcyjnego czy implementacyjnego?",
    type: "shortText",
    acceptedAnswers: [
      "implementacyjnego",
      "to szczegół implementacyjny",
      "szczegół implementacyjny",
      "poziomu implementacyjnego",
    ],
    referenceAnswer: "To, czy stos jest zrobiony tablicą czy listą, jest szczegółem implementacyjnym.",
    explanation: "To samo zachowanie abstrakcyjne może mieć wiele implementacji. Właśnie dlatego nie wolno mylić ADT z jedną konkretną reprezentacją.",
  },
  {
    id: "struktury-konkretna-definicja",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Co opisuje konkretna struktura danych?",
    type: "shortText",
    acceptedAnswers: [
      "jak dane są realnie przechowywane",
      "sposób przechowywania danych",
      "jak dane są przechowywane w pamięci",
      "realne przechowywanie danych",
    ],
    referenceAnswer: "Konkretna struktura danych mówi, jak dane są realnie przechowywane.",
    explanation: "",
  },
  {
    id: "struktury-przyklady-konkretnych",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Które z poniższych są podane w notatce jako przykłady konkretnych struktur danych?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Tablica" },
      { id: "b", label: "Lista jednokierunkowa" },
      { id: "c", label: "Drzewo binarne" },
      { id: "d", label: "Kolejka" },
      { id: "e", label: "Tablica mieszająca" },
    ],
    correctOptionIds: ["a", "b", "c", "e"],
    referenceAnswer: "W notatce jako konkretne struktury danych podano m.in. tablicę, listę jednokierunkową, drzewo binarne i tablicę mieszającą.",
    explanation: "",
  },
  {
    id: "struktury-roznica-asd-vs-konkretna",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Dokończ: ASD = ..., konkretna struktura = ...",
    type: "shortText",
    acceptedAnswers: [
      "interfejs i sens operacji, sposób przechowywania danych",
      "interfejs i sens operacji / sposób przechowywania danych",
      "interfejs i sens operacji; sposób przechowywania danych",
      "interfejs i sens operacji, a konkretna struktura to sposób przechowywania danych",
    ],
    referenceAnswer: "ASD to interfejs i sens operacji, a konkretna struktura to sposób przechowywania danych.",
    explanation: "To najważniejsze rozróżnienie z całej notatki: poziom operacji kontra poziom reprezentacji.",
  },
  {
    id: "struktury-kolejka-implementacje",
    noteSlug: "abstrakcyjne-i-konkretne-struktury-danych",
    prompt: "Jak według notatki może być zaimplementowana kolejka?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Tablicą cykliczną" },
      { id: "b", label: "Listą jednokierunkową z `head` i `tail`" },
      { id: "c", label: "Listą dwukierunkową" },
      { id: "d", label: "Wyłącznie kopcem binarnym" },
    ],
    correctOptionIds: ["a", "b", "c"],
    referenceAnswer: "Kolejka może być zaimplementowana tablicą cykliczną, listą jednokierunkową z `head` i `tail` albo listą dwukierunkową.",
    explanation: "Ten przykład pokazuje, że jedna abstrakcyjna struktura może mieć różne konkretne reprezentacje.",
  },
  {
    id: "listy-definicja-ogolna",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Z czego składa się lista dowiązaniowa według notatki?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Z węzłów przechowujących element i dowiązanie do kolejnego węzła" },
      { id: "b", label: "Z komórek pamięci dostępnych bezpośrednio po indeksie" },
      { id: "c", label: "Wyłącznie z par klucz-wartość" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Lista dowiązaniowa składa się z węzłów przechowujących element oraz dowiązanie do kolejnego węzła.",
    explanation: "",
  },
  {
    id: "listy-dwukierunkowa-dodatkowe-dowiazanie",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Co dodatkowo ma węzeł w liście dwukierunkowej?",
    type: "shortText",
    acceptedAnswers: [
      "dowiązanie do poprzedniego węzła",
      "wskaźnik do poprzedniego węzła",
      "link do poprzedniego węzła",
      "dowiazanie do poprzedniego wezla",
    ],
    referenceAnswer: "W liście dwukierunkowej węzeł ma dodatkowo dowiązanie do poprzedniego węzła.",
    explanation: "To właśnie pozwala przechodzić w obie strony, czego nie da się zrobić w zwykłej liście jednokierunkowej.",
  },
  {
    id: "listy-jednokierunkowa-kierunek",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Jak można przechodzić po liście jednokierunkowej?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Tylko w jedną stronę: od pierwszego węzła do kolejnych" },
      { id: "b", label: "W obie strony" },
      { id: "c", label: "Skokowo po indeksach w czasie `O(1)`" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Po liście jednokierunkowej przechodzimy tylko w jedną stronę: od pierwszego węzła do kolejnych.",
    explanation: "",
  },
  {
    id: "listy-jednokierunkowa-null",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Na co wskazuje ostatni węzeł w liście jednokierunkowej?",
    type: "shortText",
    acceptedAnswers: ["null"],
    referenceAnswer: "Ostatni węzeł w liście jednokierunkowej wskazuje na `null`.",
    explanation: "",
  },
  {
    id: "listy-operacje-zlozonosci",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Które operacje mają według notatki koszt `O(1)` dla listy jednokierunkowej i dwukierunkowej, jeśli miejsce jest już znane?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Dodanie na początek" },
      { id: "b", label: "Usunięcie z początku" },
      { id: "c", label: "Wstawienie po znanym węźle" },
      { id: "d", label: "Usunięcie po znanym węźle" },
      { id: "e", label: "Wyszukiwanie elementu" },
    ],
    correctOptionIds: ["a", "b", "c", "d"],
    referenceAnswer: "Dla obu list operacje `O(1)` to dodanie na początek, usunięcie z początku, wstawienie po znanym węźle i usunięcie po znanym węźle.",
    explanation: "Kluczowe jest sformułowanie 'po znanym węźle'. Sama modyfikacja wskaźników jest tania, ale dojście do miejsca wstawienia już nie musi być tanie.",
  },
  {
    id: "listy-wyszukiwanie-zlozonosc",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Jaka jest złożoność wyszukiwania elementu w liście według notatki?",
    type: "shortText",
    acceptedAnswers: ["θ(n)", "Θ(n)", "theta(n)"],
    referenceAnswer: "Wyszukiwanie elementu w liście ma złożoność `Θ(n)`.",
    explanation: "",
  },
  {
    id: "listy-zastosowania-jednokierunkowej",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Do czego według notatki dobrze pasuje lista jednokierunkowa?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Do prostego przechodzenia po elementach" },
      { id: "b", label: "Do implementacji stosu" },
      { id: "c", label: "Do implementacji kolejki przy wskaźniku na początek i koniec" },
      { id: "d", label: "Do szybkiego dostępu po indeksie" },
    ],
    correctOptionIds: ["a", "b", "c"],
    referenceAnswer: "Lista jednokierunkowa dobrze pasuje do prostego przechodzenia po elementach, implementacji stosu i kolejki przy wskaźniku na początek i koniec.",
    explanation: "",
  },
  {
    id: "listy-tablica-vs-lista-dostep",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Które porównanie dostępu do elementu jest zgodne z notatką?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Tablica: `A[i] = O(1)`, lista: dostęp do i-tego elementu `Θ(n)`" },
      { id: "b", label: "Tablica: `A[i] = Θ(n)`, lista: dostęp do i-tego elementu `O(1)`" },
      { id: "c", label: "Tablica i lista mają taki sam koszt dostępu po indeksie" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Tablica daje `A[i] = O(1)`, a lista dostęp do i-tego elementu w czasie `Θ(n)`.",
    explanation: "To podstawowa przewaga tablicy nad listą. Lista nadrabia dopiero wtedy, gdy mamy już wskaźnik na miejsce i chcemy coś lokalnie zmienić.",
  },
  {
    id: "listy-efektywne-wstawianie-usuwanie",
    noteSlug: "listy-dowiazaniowe",
    prompt: "Kiedy lista pozwala efektywnie wstawiać i usuwać elementy?",
    type: "shortText",
    acceptedAnswers: [
      "gdy mamy już wskaźnik na odpowiednie miejsce",
      "jeśli mamy wskaźnik na odpowiednie miejsce",
      "kiedy mamy wskaznik na odpowiednie miejsce",
      "gdy miejsce jest już znane",
    ],
    referenceAnswer: "Lista pozwala efektywnie wstawiać i usuwać elementy, jeśli mamy już wskaźnik na odpowiednie miejsce.",
    explanation: "Sama operacja przepięcia wskaźników jest tania. Problemem zwykle nie jest modyfikacja, tylko wcześniejsze dojście do właściwego węzła.",
  },
  {
    id: "sdk-asd-rodzaj-struktury",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Czym są stos, kolejka i deque według notatki?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Abstrakcyjnymi strukturami danych" },
      { id: "b", label: "Wyłącznie konkretnymi strukturami danych" },
      { id: "c", label: "Specjalnymi przypadkami drzew binarnych" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "Stos, kolejka i deque są abstrakcyjnymi strukturami danych.",
    explanation: "",
  },
  {
    id: "sdk-stos-zasada",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Jaka zasada działania opisuje stos?",
    type: "shortText",
    acceptedAnswers: ["lifo", "last in first out", "LIFO"],
    referenceAnswer: "Stos działa według zasady `LIFO - Last In, First Out`.",
    explanation: "To znaczy, że najpierw zdejmujesz to, co zostało dodane najpóźniej. Właśnie dlatego stos pasuje do cofania operacji czy obsługi rekurencji.",
  },
  {
    id: "sdk-stos-operacje",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Które operacje są podstawowe dla stosu według notatki?",
    type: "multiChoice",
    options: [
      { id: "a", label: "`push(x)`" },
      { id: "b", label: "`pop()`" },
      { id: "c", label: "`top()`" },
      { id: "d", label: "`isEmpty()`" },
      { id: "e", label: "`enqueue(x)`" },
    ],
    correctOptionIds: ["a", "b", "c", "d"],
    referenceAnswer: "Podstawowe operacje stosu to `push(x)`, `pop()`, `top()` i `isEmpty()`.",
    explanation: "",
  },
  {
    id: "sdk-stos-top",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Co robi operacja `top()` na stosie?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Zwraca element ze szczytu, ale nie zmienia struktury" },
      { id: "b", label: "Usuwa element ze szczytu" },
      { id: "c", label: "Dodaje nowy element na szczyt" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`top()` zwraca element ze szczytu stosu, ale nie zmienia struktury.",
    explanation: "To odróżnia `top()` od `pop()`. Jedna operacja tylko podgląda szczyt, druga go usuwa.",
  },
  {
    id: "sdk-stos-implementacje",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Które implementacje stosu są podane jako efektywne?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Tablica z indeksem szczytu `top`" },
      { id: "b", label: "Lista jednokierunkowa z dostępem do początku" },
      { id: "c", label: "Lista jednokierunkowa tylko z dostępem do końca" },
      { id: "d", label: "Drzewo binarne bez dodatkowych wskaźników" },
    ],
    correctOptionIds: ["a", "b"],
    referenceAnswer: "Efektywne implementacje stosu to tablica z indeksem szczytu `top` oraz lista jednokierunkowa z dostępem do początku.",
    explanation: "W obu przypadkach kluczowe operacje trafiają w miejsce, do którego mamy bezpośredni dostęp, więc mogą działać w `O(1)`.",
  },
  {
    id: "sdk-kolejka-zasada",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Jaka zasada działania opisuje kolejkę?",
    type: "shortText",
    acceptedAnswers: ["fifo", "first in first out", "FIFO"],
    referenceAnswer: "Kolejka działa według zasady `FIFO - First In, First Out`.",
    explanation: "To znaczy, że pierwszy wychodzi element dodany najwcześniej. To odwrotna intuicja niż w stosie.",
  },
  {
    id: "sdk-kolejka-front",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Co robi operacja `front()` w kolejce?",
    type: "singleChoice",
    options: [
      { id: "a", label: "Zwraca pierwszy element bez jego usuwania" },
      { id: "b", label: "Usuwa pierwszy element" },
      { id: "c", label: "Dodaje element na początek" },
    ],
    correctOptionIds: ["a"],
    referenceAnswer: "`front()` zwraca pierwszy element kolejki bez jego usuwania.",
    explanation: "Tak samo jak `top()` w stosie, `front()` tylko podgląda element. Usuwanie robi osobna operacja `dequeue()`.",
  },
  {
    id: "sdk-kolejka-implementacje",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Które implementacje kolejki są podane jako efektywne?",
    type: "multiChoice",
    options: [
      { id: "a", label: "Tablica cykliczna z indeksami początku i końca" },
      { id: "b", label: "Lista jednokierunkowa z `head` i `tail`" },
      { id: "c", label: "Zwykła tablica bez pamiętania końców" },
      { id: "d", label: "Lista tylko z jednym wskaźnikiem" },
    ],
    correctOptionIds: ["a", "b"],
    referenceAnswer: "Efektywne implementacje kolejki to tablica cykliczna z indeksami początku i końca oraz lista jednokierunkowa z `head` i `tail`.",
    explanation: "W kolejce trzeba mieć szybki dostęp do obu końców logicznej obsługi: dodawania z tyłu i usuwania z przodu.",
  },
  {
    id: "sdk-deque-operacje",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Które operacje są podstawowe dla deque według notatki?",
    type: "multiChoice",
    options: [
      { id: "a", label: "`pushFront(x)`" },
      { id: "b", label: "`pushBack(x)`" },
      { id: "c", label: "`popFront()`" },
      { id: "d", label: "`popBack()`" },
      { id: "e", label: "`front()`" },
      { id: "f", label: "`back()`" },
    ],
    correctOptionIds: ["a", "b", "c", "d", "e", "f"],
    referenceAnswer: "Deque ma operacje `pushFront(x)`, `pushBack(x)`, `popFront()`, `popBack()`, `front()` i `back()`.",
    explanation: "",
  },
  {
    id: "sdk-deque-jednokierunkowa-problem",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Dlaczego deque trudno zaimplementować efektywnie na zwykłej liście jednokierunkowej?",
    type: "shortText",
    acceptedAnswers: [
      "bo popback nie jest stałoczasowe",
      "bo popback nie jest o(1)",
      "bo popback nie jest stałoczasowy",
      "bo usunięcie z końca nie jest stałoczasowe",
    ],
    referenceAnswer: "Deque trudno zaimplementować efektywnie na zwykłej liście jednokierunkowej, bo `popBack` nie jest stałoczasowe.",
    explanation: "Problem nie leży w samym dodawaniu z tyłu, tylko w szybkim usuwaniu z końca bez wskaźnika do poprzedniego elementu.",
  },
  {
    id: "sdk-o-jeden-check",
    noteSlug: "stos-kolejka-i-deque",
    prompt: "Jakie wskaźniki lub indeksy trzeba zwykle przechowywać, żeby podstawowe operacje były `O(1)`?",
    type: "multiChoice",
    options: [
      { id: "a", label: "W stosie: indeks albo wskaźnik na szczyt" },
      { id: "b", label: "W kolejce: dostęp do początku i końca" },
      { id: "c", label: "W deque: dostęp do obu końców" },
      { id: "d", label: "W każdej z tych struktur wystarczy znać losowy środkowy element" },
    ],
    correctOptionIds: ["a", "b", "c"],
    referenceAnswer: "Żeby operacje były `O(1)`, zwykle trzeba mieć: w stosie wskaźnik lub indeks szczytu, w kolejce dostęp do początku i końca, a w deque dostęp do obu końców.",
    explanation: "Notatka podkreśla, że sama nazwa implementacji nie wystarcza. Trzeba jeszcze umieć wskazać, jakie referencje są potrzebne do stałoczasowych operacji.",
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
