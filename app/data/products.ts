
export type Product = {
  id: number;
  name: string;
  category: string;
  price: number | null;
  color: string;
  image: string | null;
  available: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'ILUZIR — Sérum facial',
    category: 'VITAMINA C • EXTRATO DE ALECRIM • 30 ML',
    price: null,
    color: '#D39A73',
    image: '/produtos/iluzir.jpeg',
    available: true,
  },
  {
    id: 2,
    name: 'Próximo produto',
    category: 'EM BREVE',
    price: null,
    color: '#C1CD96',
    image: null,
    available: false,
  },
  {
    id: 3,
    name: 'Próximo produto',
    category: 'EM BREVE',
    price: null,
    color: '#C2726F',
    image: null,
    available: false,
  },
];
