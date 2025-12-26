import { Offer } from '../mocks/offers';

export type City = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';

export type State = {
  city: City;
  offers: Offer[];
  sortType: SortType;
};

const initialState: State = {
  city: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  offers: [],
  sortType: 'Popular'
};

export function reducer(state = initialState, action: { type: string; payload?: unknown }): State {
  switch (action.type) {
    case 'city/changeCity':
      return {
        ...state,
        city: action.payload as City
      };
    case 'offers/loadOffers':
      return {
        ...state,
        offers: action.payload as Offer[]
      };
    case 'sort/changeSortType':
      return {
        ...state,
        sortType: action.payload as SortType
      };
    default:
      return state;
  }
}

