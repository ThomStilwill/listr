import { createAction, props } from '@ngrx/store';
import { ListItem } from '../models/list-item.model';

const prefix = "[list]";

export const LoadItems = createAction(
    `${prefix} Load Items`,
    props<{loading: string}>(),
)

export const LoadItemsSuccess = createAction(
    `${prefix} Load Items success`,
    props<{list: ListItem[]}>(),
)

export const LoadItemsFailure = createAction(
    `${prefix} Load Items failure`,
    props<{loading: string,error: Error}>(),
)

export const AddItem = createAction(
    `${prefix} Add Item`,
    props<{item: ListItem}>(),
)

export const AddItemSuccess = createAction(
    `${prefix} Add Item success`,
    props<{item: ListItem}>(),
)

export const AddItemFailure = createAction(
    `${prefix} Add Item failure`,
    props<{error: Error}>(),
)

export const DeleteItem = createAction(
    `${prefix} Delete Item`,
    props<{id: string}>(),
)

export const DeleteItemSuccess = createAction(
    `${prefix} Delete Item success`,
    props<{id: string}>(),
)

export const DeleteItemFailure = createAction(
    `${prefix} Delete Item failure`,
    props<{error: Error}>(),
)

export const EditItem = createAction(
    `${prefix} Edit Item`,
    props<{item: ListItem}>(),
)

export const EditItemSuccess = createAction(
    `${prefix} Edit Item success`,
    props<{item: ListItem}>(),
)

export const EditItemFailure = createAction(
    `${prefix} Edit Item failure`,
    props<{error: Error}>(),
)
