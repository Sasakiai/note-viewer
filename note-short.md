#PJATK

## 1. Słownik

**Słownik** = struktura danych na parach:

```
klucz -> wartość
```

Podstawowe operacje:

|Operacja|Znaczenie|
|---|---|
|`search(key)`|znajdź wartość po kluczu|
|`insert(key, value)`|dodaj parę klucz-wartość|
|`delete(key)`|usuń parę po kluczu|

Założenie:

- klucze są unikatowe

---

## 2. Naiwne implementacje słownika

### Tablica/lista nieposortowana

|   |   |   |
|---|---|---|
|Operacja|Złożoność|Dlaczego|
|`search`|`O(n)`|trzeba przejrzeć elementy|
|`insert`|`O(1)`|można dodać na koniec|
|`delete`|`O(n)`|trzeba znaleźć element|

### Tablica/lista posortowana

|   |   |   |
|---|---|---|
|Operacja|Złożoność|Dlaczego|
|`search`|`O(log n)`|wyszukiwanie binarne|
|`insert`|`O(n)`|trzeba przesuwać elementy|
|`delete`|`O(n)`|trzeba przesuwać elementy|

Keyword:

```
problem: operacje liniowe O(n)
```

---

## 3. Adresowanie bezpośrednie

Działa, gdy klucze są liczbami naturalnymi z zakresu:

```
[0, ..., m - 1]
```

Idea:

```
key = indeks w tablicy
```

Złożoność:

|   |   |
|---|---|
|Operacja|Złożoność|
|`search`|`O(1)`|
|`insert`|`O(1)`|
|`delete`|`O(1)`|

Problemy:

- pamięć zależy od `m`, czyli zakresu możliwych kluczy
- działa tylko dla kluczy naturalnych

Keyword:

```
super szybkie, ale często marnuje pamięć
```

---

## 4. Hash Table

Hash table = adresowanie bezpośrednie + funkcja mieszająca.

```
hash: U -> [0, ..., m - 1]
```

Gdzie:

- `U` = uniwersum możliwych kluczy
- `m` = rozmiar tablicy

Przykład:

```
hash(key) = key mod m
```

Złożoność przy dobrym hashowaniu:

|   |   |
|---|---|
|Operacja|Średnio|
|`search`|`O(α)`|
|`insert`|`O(α)`|
|`delete`|`O(α)`|

Współczynnik obciążenia:

```
α = n / m
```

Gdzie:

- `n` = liczba elementów
- `m` = rozmiar tablicy

Jeśli `m` jest dobrze dobrane, często traktuje się operacje jako bliskie:

```
O(1)
```

---

## 5. Kolizje

Kolizja:

```
hash(k1) == hash(k2)
```

czyli dwa różne klucze trafiają pod ten sam indeks.

### Sposoby rozwiązywania kolizji

|   |   |   |
|---|---|---|
|Metoda|Idea|Minus|
|mieszanie wielokrotne|szukamy kolejnego wolnego miejsca|max `m` elementów|
|metoda łańcuchowa|pod indeksem trzymamy listę elementów|lista może się wydłużyć|

Keyword:

```
kolizje są nieuniknione, bo zwykle m < |U|
```

---

## 6. Słownik uporządkowany

Słownik uporządkowany = słownik + operacje na porządku kluczy.

Dodatkowe operacje:

|   |   |
|---|---|
|Operacja|Znaczenie|
|`minimum()`|najmniejszy klucz|
|`maximum()`|największy klucz|
|`predecessor(key)`|poprzednik klucza|
|`successor(key)`|następnik klucza|

Hash table słabo się do tego nadaje, bo nie przechowuje porządku.

Keyword:

```
dla operacji uporządkowanych lepsze są drzewa
```

---

## 7. BST

BST = Binary Search Tree.

Warunek BST:

```
lewe poddrzewo <= węzeł <= prawe poddrzewo
```

Przy unikatowych kluczach:

```
lewe < węzeł < prawe
```

### Operacje BST

|   |   |   |
|---|---|---|
|Operacja|Średnio|Pesymistycznie|
|`search`|`O(log n)`|`O(n)`|
|`insert`|`O(log n)`|`O(n)`|
|`delete`|`O(log n)`|`O(n)`|
|`minimum`|`O(log n)`|`O(n)`|
|`maximum`|`O(log n)`|`O(n)`|
|`successor`|`O(log n)`|`O(n)`|
|`predecessor`|`O(log n)`|`O(n)`|

Dlaczego pesymistycznie `O(n)`?

- drzewo może zdegenerować się do listy

---

## 8. Minimum i maximum w BST

Minimum:

```
idź cały czas w lewo
```

Maximum:

```
idź cały czas w prawo
```

---

## 9. Delete w BST

Trzy przypadki:

|   |   |
|---|---|
|Przypadek|Co robimy|
|węzeł nie ma dzieci|usuwamy|
|węzeł ma 1 dziecko|podpinamy dziecko do rodzica|
|węzeł ma 2 dzieci|zamieniamy z następnikiem albo poprzednikiem|

Dla 2 dzieci najczęściej:

```
zamiana z successor = minimum z prawego poddrzewa
```

albo:

```
zamiana z predecessor = maximum z lewego poddrzewa
```

---

## 10. AVL

AVL = zrównoważone BST.

Dodatkowy warunek:

```
bf(x) = height(left) - height(right)
```

Dla każdego węzła musi być:

```
bf ∈ {-1, 0, 1}
```

Czyli:

```
różnica wysokości lewego i prawego poddrzewa max 1
```

### Złożoność AVL

|   |   |
|---|---|
|Operacja|Pesymistycznie|
|`search`|`O(log n)`|
|`insert`|`O(log n)`|
|`delete`|`O(log n)`|
|`minimum`|`O(log n)`|
|`maximum`|`O(log n)`|
|`successor`|`O(log n)`|
|`predecessor`|`O(log n)`|

Keyword:

```
AVL gwarantuje O(log n), bo pilnuje wysokości drzewa
```

---

## 11. Rotacje AVL

Gdy po `insert` albo `delete` mamy:

```
bf = 2
```

albo:

```
bf = -2
```

trzeba naprawić drzewo rotacją.

Typowe przypadki:

|   |   |   |
|---|---|---|
|Przypadek|Sytuacja|Naprawa|
|LL|za ciężko po lewej-lewej|rotacja w prawo|
|RR|za ciężko po prawej-prawej|rotacja w lewo|
|LR|lewa-prawa|rotacja w lewo, potem w prawo|
|RL|prawa-lewa|rotacja w prawo, potem w lewo|

Koszt pojedynczej rotacji:

```
O(1)
```

---

# Mini porównanie

|   |   |   |   |   |   |
|---|---|---|---|---|---|
|Struktura|Search|Insert|Delete|Ordered ops|Uwagi|
|tablica nieposortowana|`O(n)`|`O(1)`|`O(n)`|słabo|prosta|
|tablica posortowana|`O(log n)`|`O(n)`|`O(n)`|ok|przesuwanie elementów|
|adresowanie bezpośrednie|`O(1)`|`O(1)`|`O(1)`|słabo|duża pamięć|
|hash table|~`O(1)` / `O(α)`|~`O(1)` / `O(α)`|~`O(1)` / `O(α)`|słabo|kolizje|
|BST|avg `O(log n)`|avg `O(log n)`|avg `O(log n)`|avg `O(log n)`|worst `O(n)`|
|AVL|`O(log n)`|`O(log n)`|`O(log n)`|`O(log n)`|wymaga rotacji|

---

# Najkrótsza wersja do zapamiętania

```
Słownik:
search / insert / delete

Hash table:
hash(key) -> index
kolizje
α = n / m
średnio blisko O(1), ale brak porządku

BST:
lewe < root < prawe
średnio O(log n)
pesymistycznie O(n)

AVL:
BST + bf ∈ {-1, 0, 1}
rotacje naprawiają drzewo
pesymistycznie O(log n)
```
