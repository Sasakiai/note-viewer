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
