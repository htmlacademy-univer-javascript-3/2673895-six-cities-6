// This file is kept for backward compatibility to export types
// The actual reducers are now in slices/

export type { City } from './slices/city-slice';
export type SortType = 'Popular' | 'Price: low to high' | 'Price: high to low' | 'Top rated first';
