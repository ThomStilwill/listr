import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ListState } from "./list.reducer";

export const featureSelector = createFeatureSelector<ListState>('listr');

export const items = createSelector(featureSelector, state=>state.items);
export const lists = createSelector(featureSelector, state=>state.lists);
export const loading = createSelector(featureSelector, state=>state.loading);
export const error = createSelector(featureSelector, state=>state.error);
export const selectedList = createSelector(featureSelector, state=>state.selectedList);

