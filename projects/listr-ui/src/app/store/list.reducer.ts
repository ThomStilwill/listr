import { state } from '@angular/animations';
import { createReducer, on } from '@ngrx/store';
import * as Actions from './list.actions';
import { ListItem } from '../models/list-item.model';

export interface ListState {
  list: ListItem[],
  loading: string,
  error: any;
}

export const initialState: ListState = {
  list: [],
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
      list: action.list, 
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
      list: [...state.list, action.item],
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
    on(Actions.EditItemSuccess,(state,action) => ({
      ...state, 
      list: [...state.list],
      loading: ''
    })),
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
      list: state.list.filter(x=>x.id !== action.id), 
      loading:''})),
    on(Actions.DeleteItemFailure,(state,action) => ({
      ...state, 
      loading:'',
      error:action.error
    }))
);    