import { Action } from 'redux';
import { LoadingState, SearchContent } from './contracts/state';

export enum SearchActionsType {
  SEARCH_REQUEST = 'search/SEARCH_REQUEST',
  SET_SEARCH_RESULT = 'search/SET_SEARCH_RESULT',
  SET_SEARCH_STATUS = 'search/SET_SEARCH_STATUS',
  RESET_SEARCH = 'search/RESET_SEARCH',
}

export interface SearchRequestActionInterface extends Action<SearchActionsType> {
  type: SearchActionsType.SEARCH_REQUEST;
  payload: string;
}
export interface SetSearchResultActionInterface extends Action<SearchActionsType> {
  type: SearchActionsType.SET_SEARCH_RESULT;
  payload: SearchContent['items'];
}
export interface SetSearchStatusActionInterface extends Action<SearchActionsType> {
  type: SearchActionsType.SET_SEARCH_STATUS;
  payload: LoadingState;
}
export interface ResetSearchActionInterface extends Action<SearchActionsType> {
  type: SearchActionsType.RESET_SEARCH;
}

export const searchRequest = (payload: string): SearchRequestActionInterface => ({
  type: SearchActionsType.SEARCH_REQUEST,
  payload,
});

export const setSearchResult = (
  payload: SearchContent['items'],
): SetSearchResultActionInterface => ({
  type: SearchActionsType.SET_SEARCH_RESULT,
  payload,
});

export const setSearchStatus = (payload: LoadingState): SetSearchStatusActionInterface => ({
  type: SearchActionsType.SET_SEARCH_STATUS,
  payload,
});
export const resetSearch = (): ResetSearchActionInterface => ({
  type: SearchActionsType.RESET_SEARCH,
});

export type SearchActions =
  | SetSearchResultActionInterface
  | SetSearchStatusActionInterface
  | ResetSearchActionInterface;
