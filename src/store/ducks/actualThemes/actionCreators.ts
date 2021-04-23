import { Action } from 'redux';
import { LoadingState, ActualThemesState } from './contracts/state';

export enum ActualThemesActionsType { 
  SET_ITEMS = 'actualThemes/SET_ITEMS',
  FETCH_ITEMS = 'actualThemes/FETCH_ITEMS',
  SET_LOADING_STATE = 'actualThemes/SET_LOADING_STATE',
}

export interface SetActualThemesActionInterface extends Action<ActualThemesActionsType> {
  type: ActualThemesActionsType.SET_ITEMS;
  payload: ActualThemesState['items'];
}
export interface FetchActualThemesActionInterface extends Action<ActualThemesActionsType> {
  type: ActualThemesActionsType.FETCH_ITEMS;
}
export interface SetActualThemesLoadingActionInterface extends Action<ActualThemesActionsType> {
  type: ActualThemesActionsType.SET_LOADING_STATE;
  payload: LoadingState;
}

export const setActualThemes = (payload: ActualThemesState['items']): SetActualThemesActionInterface => ({
  type: ActualThemesActionsType.SET_ITEMS,
  payload,
});
export const setActualThemesLoading = (payload: LoadingState): SetActualThemesLoadingActionInterface => ({
  type: ActualThemesActionsType.SET_LOADING_STATE,
  payload,
});
export const fetchActualThemes = (): FetchActualThemesActionInterface => ({
  type: ActualThemesActionsType.FETCH_ITEMS,
});

export type ActualThemesActions =
  | SetActualThemesActionInterface
  | SetActualThemesLoadingActionInterface
  | FetchActualThemesActionInterface;
