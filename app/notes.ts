import note01 from "./assets/01. Algorytmy.md?raw";
import note02 from "./assets/02. Złożoność algorytmów.md?raw";
import note03 from "./assets/03. Notacja asymptotyczna.md?raw";
import note04 from "./assets/04. Wyszukiwanie.md?raw";
import note05 from "./assets/05. Sortowanie.md?raw";
import note06 from "./assets/06. Abstrakcyjne struktury danych i konkretne struktury danych.md?raw";
import note07 from "./assets/07. Listy dowiązaniowe.md?raw";
import note08 from "./assets/08. Stos, kolejka i deque.md?raw";
import note09 from "./assets/09. Kolejka priorytetowa i kopiec binarny.md?raw";
import note10 from "./assets/10. Słownik, HashMap, BST i AVL.md?raw";
import note11 from "./assets/11. Najważniejsze operacje i złożoności.md?raw";

export type Note = {
  slug: string;
  title: string;
  content: string;
  order: number;
};

export const notes: Note[] = [
  {
    slug: "algorytmy",
    title: "Algorytmy",
    content: note01,
    order: 1,
  },
  {
    slug: "zlozonosc-algorytmow",
    title: "Złożoność algorytmów",
    content: note02,
    order: 2,
  },
  {
    slug: "notacja-asymptotyczna",
    title: "Notacja asymptotyczna",
    content: note03,
    order: 3,
  },
  {
    slug: "wyszukiwanie",
    title: "Wyszukiwanie",
    content: note04,
    order: 4,
  },
  {
    slug: "sortowanie",
    title: "Sortowanie",
    content: note05,
    order: 5,
  },
  {
    slug: "abstrakcyjne-i-konkretne-struktury-danych",
    title: "Abstrakcyjne i konkretne struktury danych",
    content: note06,
    order: 6,
  },
  {
    slug: "listy-dowiazaniowe",
    title: "Listy dowiązaniowe",
    content: note07,
    order: 7,
  },
  {
    slug: "stos-kolejka-i-deque",
    title: "Stos, kolejka i deque",
    content: note08,
    order: 8,
  },
  {
    slug: "kolejka-priorytetowa-i-kopiec-binarny",
    title: "Kolejka priorytetowa i kopiec binarny",
    content: note09,
    order: 9,
  },
  {
    slug: "slownik-hashmap-bst-i-avl",
    title: "Słownik, HashMap, BST i AVL",
    content: note10,
    order: 10,
  },
  {
    slug: "najwazniejsze-operacje-i-zlozonosci",
    title: "Najważniejsze operacje i złożoności",
    content: note11,
    order: 11,
  },
];

export function getNoteBySlug(slug: string) {
  return notes.find((note) => note.slug === slug);
}

export function getAdjacentNotes(slug: string) {
  const index = notes.findIndex((note) => note.slug === slug);

  if (index === -1) {
    return { previousNote: undefined, nextNote: undefined };
  }

  return {
    previousNote: index > 0 ? notes[index - 1] : undefined,
    nextNote: index < notes.length - 1 ? notes[index + 1] : undefined,
  };
}
