import { createFeatureSelector } from "@ngrx/store";

const items = createFeatureSelector('list');
const lists = createFeatureSelector('lists');
const loading = createFeatureSelector('loading');
const error = createFeatureSelector('error');
const selectedList = createFeatureSelector('selectedList');

