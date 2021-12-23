import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './list.actions';
import { ListItem } from '../models/list-item.model';

export const featureName = 'list';

export interface AppState {
  readonly listr: ListState
}

export interface ListState {
  items: ListItem[],
  lists: string[],
  selectedList: string,
  loading: string,
  error: any;
}

export const initialState: ListState = {
  items: [],
  lists: [],
  selectedList: '',
  loading: '',
  error: undefined
};

export const ListReducer = createReducer(
    initialState,
    on(Actions.LoadItems, (state) => ({
      ...state, 
      loading:'Loading items...' 
    })),
    on(Actions.LoadItemsSuccess,(state,action) => ({
      ...state, 
      items: action.items, 
      loading:''
    })),
    on(Actions.LoadItemsFailure,(state,action) => ({
      ...state, 
      error:action.error
    })),
    on(Actions.AddItem, (state) => ({
      ...state, 
      loading:'Adding item...' 
    })),
    on(Actions.AddItemSuccess,(state,action) => ({
      ...state, 
      items: [...state.items, action.item],
      loading: ''
    })),
    on(Actions.AddItemFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    })),

    on(Actions.EditItem, (state) => ({
      ...state, 
      loading:'Editing item...' 
    })),
    on(Actions.EditItemSuccess,(state,action) => {
      return {
        ...state,
        items: state.items.map(item => action.item.id === item.id ? action.item : item),
        loading: ''
        };
    }),
    on(Actions.EditItemFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    })),


    on(Actions.DeleteItem, (state) => ({
      ...state, 
      loading:'Deleting item...' 
    })),
    on(Actions.DeleteItemSuccess,(state,action) => ({
      ...state, 
      items: state.items.filter(x=>x.id !== action.id), 
      loading:''})),
    on(Actions.DeleteItemFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    })),

    on(Actions.Lists, (state) => ({
      ...state,
      loading: 'Loading lists...',
    })),
    on(Actions.ListsSuccess, (state, action) => ({
      ...state,
      lists: action.lists,
      loading: '',
    })),
    on(Actions.ListsFailure, (state, action) => ({
      ...state,
      loading: '',
      error: action.error
    })),

    on(Actions.SelectedList, (state, action) => ({
      ...state,
      selectedList: action.selectedList,
    })),
    on(Actions.SelectedListSuccess, (state, action) => ({
      ...state,
      selectedList: action.selectedList,
    })),
    on(Actions.SelectedListFailure, (state, action) => ({
      ...state,
      error: action.error
    }))

);    
