#PJATK

## 1. Słownik

- **Słownik** jest abstrakcyjną strukturą danych służącą do operowania na parach **klucz-wartość**.
- Podstawowe operacje:
    - `search(K key)`
        - zwraca wartość związaną z kluczem `key`
        - jeśli klucza nie ma, może zwrócić specjalną wartość albo rzucić wyjątek
    - `insert(K key, V value)`
        - umieszcza nową parę klucz-wartość w słowniku
    - `delete(K key)`
        - usuwa parę związaną z kluczem `key`
- Zakłada się, że **klucze są unikatowe**.

### Przykłady zastosowań

- baza kontaktów:
    - klucz: osoba
    - wartość: numer telefonu
- system konfiguracji:
    - klucz: nazwa cechy
    - wartość: wartość cechy
- kompilatory/interpretery:
    - klucz: nazwa zmiennej
    - wartość: typ i adres w pamięci
- słownik języka obcego:
    - klucz: słowo
    - wartość: tłumaczenie/znaczenie

---

## 2. Proste implementacje słownika

### Dwie tablice: `keys` i `values`

- `keys` przechowuje klucze
- `values` przechowuje wartości pod odpowiadającymi indeksami

### Tablice nieposortowane

- `search`: `O(n)`
- `insert`: `O(1)`
- `delete`: `O(n)`

### Tablice posortowane

- `search`: `O(log n)`
    - można użyć wyszukiwania binarnego
- `insert`: `O(n)`
    - trzeba znaleźć miejsce i przesunąć elementy
- `delete`: `O(n)`
    - trzeba znaleźć element i przesunąć pozostałe

### Problem

- W prostych implementacjach część operacji ma złożoność liniową `O(n)`.
- To jest zbyt wolne dla dużych danych.
- Listy dowiązaniowe nie rozwiązują problemu.

---

## 3. Adresowanie bezpośrednie

- Zakładamy, że klucze są liczbami naturalnymi z zakresu:

```
[0, ..., m - 1]
```

- Możemy wtedy użyć jednej tablicy:
    - klucz jest bezpośrednio indeksem
    - wartość zapisujemy pod tym indeksem

### Złożoność

- `search`: `O(1)`
- `insert`: `O(1)`
- `delete`: `O(1)`

### Problemy

- pamięć zależy od największej możliwej wartości klucza, czyli od `m`
- działa tylko dla kluczy będących liczbami naturalnymi
- jeśli mamy mało faktycznych elementów, ale ogromny zakres kluczy, marnujemy pamięć

---

## 4. Tablice mieszające, czyli Hash Tables

- Tablice mieszające rozszerzają adresowanie bezpośrednie o **funkcję mieszającą**.
- Funkcja mieszająca przelicza klucz na indeks tablicy:

```
hash: U -> [0, ..., m - 1]
```

- `U` to uniwersum wszystkich możliwych kluczy.
- `m` to rozmiar tablicy.

### Po co hash?

- klucze nie muszą być liczbami naturalnymi
- pamięć zależy od rozmiaru tablicy `m`, a nie od całego uniwersum `U`
- dzięki temu można efektywnie implementować słownik

---

## 5. Kolizje

- Ponieważ zwykle:

```
m < |U|
```

- to różne klucze mogą dostać ten sam indeks:

```
hash(k1) == hash(k2)
```

- Taką sytuację nazywamy **kolizją**.

### Problem kolizji

- kilka różnych kluczy chce trafić w to samo miejsce tablicy
- trzeba mieć sposób na przechowywanie wielu wartości dla jednego indeksu

---

## 6. Sposoby rozwiązywania kolizji

### 1. Mieszanie wielokrotne

- jeśli miejsce jest zajęte, funkcja szuka kolejnego miejsca w powtarzalny sposób
- robi to aż znajdzie wolną pozycję
- wada:
    - w tablicy można przechować maksymalnie `m` elementów

### 2. Metoda łańcuchowa

- w każdej komórce tablicy znajduje się lista elementów
- jeśli kilka kluczy ma ten sam hash, trafiają do tej samej listy
- lista może być przeszukiwana liniowo

---

## 7. Własności dobrej funkcji mieszającej

Funkcja mieszająca powinna:

- być bardzo szybko obliczalna
    - najlepiej w czasie stałym `O(1)`
- równomiernie rozkładać klucze po tablicy
    - dla losowego klucza z `U` każda pozycja `[0, ..., m - 1]` powinna być równie prawdopodobna

### Współczynnik obciążenia

```
α = n / m
```

gdzie:

- `n` - liczba aktualnie przechowywanych par klucz-wartość
- `m` - rozmiar tablicy

### Znaczenie `α`

- im większe `α`, tym większe przeciętne listy w metodzie łańcuchowej
- jeśli hash dobrze rozkłada klucze, operacje mają złożoność bliską:

```
O(α)
```

---

## 8. Przykład prostej funkcji mieszającej

Dla kluczy całkowitych można użyć:

```
hash(key) = key mod m
```

- wynik zawsze należy do zakresu:

```
[0, ..., m - 1]
```

- funkcja jest szybka
- dla dobrze dobranych danych może równomiernie rozkładać klucze

---

## 9. Podsumowanie tablic mieszających

### Zalety

- efektywne operacje słownikowe
- możliwość regulowania kompromisu pamięć/czas przez dobór `m`
- elastyczne działanie dla różnych typów kluczy

### Ograniczenia

- hash table nie wspiera efektywnie operacji zależnych od porządku kluczy
- przykładowo operacje:
    - minimum
    - maximum
    - predecessor
    - successor
- miałyby złożoność liniową `O(n)`

---

## 10. Słownik uporządkowany

- **Słownik uporządkowany** rozszerza zwykły słownik o operacje korzystające z porządku kluczy.
- Zakładamy, że typ klucza `K` jest liniowo uporządkowany.

### Operacje

- `search(K key)`
- `insert(K key, V value)`
- `delete(K key)`
- `minimum()`
    - zwraca minimalny klucz
- `maximum()`
    - zwraca maksymalny klucz
- `predecessor(K key)`
    - zwraca bezpośredni poprzednik klucza
- `successor(K key)`
    - zwraca bezpośredni następnik klucza

---

## 11. Drzewo BST

- **BST**, czyli Binary Search Tree, to drzewo binarne spełniające warunek porządku BST.
- Każdy węzeł przechowuje:
    - klucz
    - wartość
    - wskaźnik do rodzica
    - wskaźnik do lewego syna
    - wskaźnik do prawego syna

### Warunek BST

Dla każdego węzła `x`:

- wszystkie klucze w lewym poddrzewie są `<= x.key`
- wszystkie klucze w prawym poddrzewie są `>= x.key`

W praktyce, przy unikatowych kluczach:

- lewe poddrzewo: mniejsze klucze
- prawe poddrzewo: większe klucze

### Ważne obserwacje

- drzewo BST nie musi być zupełne
- wolne miejsca są reprezentowane przez `null`
- minimum znajduje się, idąc cały czas w lewo
- maximum znajduje się, idąc cały czas w prawo

---

## 12. Operacje na BST

### `search(key)`

- zaczynamy od korzenia
- porównujemy `key` z kluczem aktualnego węzła
- jeśli równe:
    - znaleziono element
- jeśli `key` jest mniejsze:
    - idziemy do lewego syna
- jeśli `key` jest większe:
    - idziemy do prawego syna
- jeśli dojdziemy do `null`:
    - klucza nie ma w drzewie

### `insert(key, value)`

- działa podobnie jak `search`
- szukamy miejsca, gdzie powinien znajdować się klucz
- jeśli klucz już istnieje:
    - można zaktualizować wartość
- jeśli dojdziemy do `null`:
    - wstawiamy tam nowy węzeł
    - aktualizujemy wskaźniki rodzica i dziecka

### `minimum()`

- startujemy od korzenia
- idziemy cały czas w lewo
- ostatni węzeł przed `null` zawiera minimum

### `maximum()`

- startujemy od korzenia
- idziemy cały czas w prawo
- ostatni węzeł przed `null` zawiera maximum

### `successor(node)`

- jeśli węzeł ma prawe poddrzewo:
    - następnikiem jest minimum w prawym poddrzewie
- jeśli nie ma prawego poddrzewa:
    - idziemy w górę drzewa do pierwszego przodka, dla którego aktualny węzeł leży w lewym poddrzewie

### `predecessor(node)`

- jeśli węzeł ma lewe poddrzewo:
    - poprzednikiem jest maximum w lewym poddrzewie
- jeśli nie ma lewego poddrzewa:
    - idziemy w górę drzewa do pierwszego przodka, dla którego aktualny węzeł leży w prawym poddrzewie

---

## 13. Usuwanie z BST

Po znalezieniu węzła do usunięcia mamy 3 przypadki.

### 1. Węzeł nie ma synów

- usuwamy węzeł
- wskaźnik rodzica ustawiamy na `null`

### 2. Węzeł ma 1 syna

- usuwamy węzeł
- jego jedynego syna podpinamy do rodzica usuwanego węzła
- trzeba zaktualizować wskaźniki

### 3. Węzeł ma 2 synów

- można zastąpić usuwany węzeł:
    - jego następnikiem, czyli minimum z prawego poddrzewa
    - albo poprzednikiem, czyli maximum z lewego poddrzewa
- potem usuwamy ten przeniesiony węzeł z jego starego miejsca
- ten przeniesiony węzeł ma co najwyżej jednego syna, więc jego usunięcie jest prostsze

---

## 14. Złożoność BST

### Przeciętny przypadek

- dla losowego BST wysokość drzewa jest logarytmiczna:

```
O(log n)
```

- wszystkie operacje zależą od wysokości drzewa
- dlatego przeciętna złożoność operacji wynosi:

```
O(log n)
```

Dotyczy:

- `search`
- `insert`
- `delete`
- `minimum`
- `maximum`
- `successor`
- `predecessor`

### Pesymistyczny przypadek

- BST może się zdegenerować do jednej długiej gałęzi
- wtedy wysokość drzewa wynosi:

```
O(n)
```

- pesymistyczna złożoność operacji:

```
O(n)
```

### Ograniczenie BST

- zwykłe BST nie gwarantuje zrównoważenia
- kolejność wstawiania kluczy ma duży wpływ na kształt drzewa
- dlatego w pesymistycznym przypadku operacje są liniowe

---

## 15. Drzewo AVL

- **Drzewo AVL** to drzewo BST z dodatkowym warunkiem zrównoważenia.
- Nazwa pochodzi od twórców:
    - Adelson-Velsky
    - Landis

### Balance factor

Dla każdego węzła `x` definiujemy współczynnik zrównoważenia:

```
bf(x) = wysokość lewego poddrzewa - wysokość prawego poddrzewa
```

### Warunek AVL

Dla każdego węzła `x` musi zachodzić:

```
bf(x) ∈ {-1, 0, 1}
```

czyli wysokości lewego i prawego poddrzewa mogą różnić się maksymalnie o `1`.

---

## 16. Jak sprawdzić, czy drzewo jest AVL?

Dla każdego węzła:

- obliczamy wysokość lewego poddrzewa
- obliczamy wysokość prawego poddrzewa
- liczymy:

```
bf = wysokość lewego - wysokość prawego
```

- sprawdzamy, czy wynik należy do:

```
{-1, 0, 1}
```

Drzewo jest AVL tylko wtedy, gdy:

- spełnia warunek BST
- każdy węzeł ma `bf` równy `-1`, `0` albo `1`

---

## 17. Równoważenie drzewa AVL

- Operacje `insert` i `delete` działają najpierw podobnie jak w zwykłym BST.
- Po modyfikacji sprawdza się współczynniki `bf`.
- Sprawdzanie odbywa się od zmodyfikowanego węzła w górę drzewa.
- Tylko te węzły mogą mieć zmienione `bf`.

### Kiedy trzeba naprawiać drzewo?

- gdy znajdziemy węzeł z:

```
bf == 2
```

albo

```
bf == -2
```

- wtedy lokalny fragment drzewa jest niezrównoważony

### Jak naprawia się AVL?

- wykonuje się **rotacje**
- rotacja lokalnie przebudowuje fragment drzewa
- zachowuje warunek BST
- przywraca poprawne wartości `bf`
- koszt pojedynczej rotacji:

```
O(1)
```

---

## 18. Złożoność AVL

- AVL gwarantuje logarytmiczną wysokość drzewa:

```
O(log n)
```

- dlatego pesymistyczna złożoność operacji wynosi:

```
O(log n)
```

Dotyczy:

- `search`
- `insert`
- `delete`
- `minimum`
- `maximum`
- `successor`
- `predecessor`

### Korzyść z AVL

- zwykłe BST ma średnio `O(log n)`, ale pesymistycznie `O(n)`
- AVL gwarantuje `O(log n)` nawet w pesymistycznym przypadku
- koszt: trzeba utrzymywać zrównoważenie przez sprawdzanie `bf` i rotacje

---

## 19. Porównanie struktur

|Struktura|Zalety|Wady|
|---|---|---|
|Proste tablice/listy|łatwe do implementacji|część operacji `O(n)`|
|Adresowanie bezpośrednie|operacje `O(1)`|duże zużycie pamięci, tylko klucze naturalne|
|Hash table|szybkie operacje słownika|słabe dla operacji uporządkowanych|
|BST|wspiera operacje uporządkowane|pesymistycznie `O(n)`|
|AVL|gwarantuje `O(log n)`|bardziej złożona implementacja|

---

## 20. Najważniejsze rzeczy na wejściówkę

- znać definicję słownika
- znać operacje:
    - `search`
    - `insert`
    - `delete`
- umieć porównać proste implementacje:
    - tablica nieposortowana
    - tablica posortowana
- wiedzieć, czym jest adresowanie bezpośrednie
- wiedzieć, czym jest hash table
- znać problem kolizji
- znać metody rozwiązywania kolizji:
    - mieszanie wielokrotne
    - metoda łańcuchowa
- znać współczynnik obciążenia:

```
α = n / m
```

- wiedzieć, dlaczego hash table nie wystarcza dla słownika uporządkowanego
- znać definicję słownika uporządkowanego
- znać warunek BST
- umieć wykonać `insert` i `delete` na BST
- znać 3 przypadki usuwania z BST
- znać ograniczenie BST:
    - pesymistycznie może mieć wysokość `O(n)`
- znać definicję AVL
- umieć policzyć `bf`
- wiedzieć, że AVL naprawia niezrównoważenie rotacjami
- znać korzyść AVL:
    - pesymistyczna złożoność `O(log n)`
