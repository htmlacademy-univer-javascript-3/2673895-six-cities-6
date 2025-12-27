import { Offer } from '../types/offer';
import { AuthorizationStatus, AuthInfo } from '../types/auth';
import { Review } from '../types/review';

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
  isLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: AuthInfo | null;
  currentOffer: Offer | null;
  nearPlaces: Offer[];
  reviews: Review[];
  isOfferLoading: boolean;
  isReviewsLoading: boolean;
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
  sortType: 'Popular',
  isLoading: false,
  authorizationStatus: 'UNKNOWN',
  user: null,
  currentOffer: null,
  nearPlaces: [],
  reviews: [],
  isOfferLoading: false,
  isReviewsLoading: false
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
        offers: action.payload as Offer[],
        isLoading: false
      };
    case 'offers/setLoading':
      return {
        ...state,
        isLoading: action.payload as boolean
      };
    case 'sort/changeSortType':
      return {
        ...state,
        sortType: action.payload as SortType
      };
    case 'user/requireAuthorization':
      return {
        ...state,
        authorizationStatus: action.payload as AuthorizationStatus
      };
    case 'user/setUser':
      return {
        ...state,
        user: action.payload as AuthInfo,
        authorizationStatus: 'AUTH'
      };
    case 'user/logout':
      return {
        ...state,
        user: null,
        authorizationStatus: 'NO_AUTH'
      };
    case 'offer/loadOffer':
      return {
        ...state,
        currentOffer: action.payload as Offer | null,
        isOfferLoading: false
      };
    case 'offer/setLoading':
      return {
        ...state,
        isOfferLoading: action.payload as boolean
      };
    case 'offer/loadNearPlaces':
      return {
        ...state,
        nearPlaces: action.payload as Offer[]
      };
    case 'reviews/loadReviews':
      return {
        ...state,
        reviews: action.payload as Review[],
        isReviewsLoading: false
      };
    case 'reviews/setLoading':
      return {
        ...state,
        isReviewsLoading: action.payload as boolean
      };
    case 'reviews/addReview':
      return {
        ...state,
        reviews: [action.payload as Review, ...state.reviews]
      };
    default:
      return state;
  }
}

