import { ListState } from './list.reducer';

export interface AppState {
  readonly items: ListState
}