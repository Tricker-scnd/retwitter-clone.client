import { ActualThemesState, LoadingState } from './contracts/state';

interface RootState {
  actualThemes: {
    items: ActualThemesState['items'];
    loadingState: LoadingState;
  };
}

export const selectActualThemes = (state: RootState) => state.actualThemes;

export const selectActualThemesItems = (state: RootState) => state.actualThemes.items;

export const selectActualThemesLoadingState = (state: RootState) => state.actualThemes.loadingState;
