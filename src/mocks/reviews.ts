export type Review = {
  id: string;
  offerId: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  rating: number;
  comment: string;
  date: string;
};

export const mockReviews: Review[] = [
  {
    id: '1',
    offerId: '1',
    user: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg'
    },
    rating: 4,
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    date: '2019-04-24'
  },
  {
    id: '2',
    offerId: '1',
    user: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg'
    },
    rating: 5,
    comment: 'Perfect location, beautiful apartment, and great host. Highly recommend!',
    date: '2019-05-15'
  },
  {
    id: '3',
    offerId: '2',
    user: {
      name: 'Oliver',
      avatarUrl: 'img/avatar.svg'
    },
    rating: 4,
    comment: 'Nice place, clean and comfortable. Good value for money.',
    date: '2019-06-10'
  }
];

