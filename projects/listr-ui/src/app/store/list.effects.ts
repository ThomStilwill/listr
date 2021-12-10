import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType  } from '@ngrx/effects';
import { of } from "rxjs";
import { map, catchError, mergeMap, tap } from "rxjs/operators";
import { ListService } from "../services/list.service";
import  * as actions  from "./list.actions";

@Injectable()
export class ListEffects{

    constructor(
        private actions$:Actions, 
        private listService: ListService
    ){}

    loadlist$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.LoadItems),
            mergeMap(() => this.listService.getlistItems()
                .pipe(
                    tap(_=>console.log('load')),
                    map(items => actions.LoadItemsSuccess({ list:items}))
                    )
                ),
                catchError(error => of(actions.LoadItemsFailure({loading:'',error})),
                )
            )
        );

    addlist$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.AddItem),
            mergeMap(payload => this.listService.addlistItem(payload.item)
                .pipe(
                        tap(_=>console.log('add')) ,
                        map(() => actions.AddItemSuccess({item:payload.item}))
                     )
                )
                ,catchError(error => of(actions.AddItemFailure({error})))
            )
        );

    editlist$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.EditItem),
            mergeMap(payload => this.listService.editlistItem(payload.item)
                .pipe(
                        tap(_=>console.log('edit')) ,
                        map(() => actions.EditItemSuccess({item:payload.item}))
                     )
                )
                ,catchError(error => of(actions.EditItemFailure({error})))
            )
        );        

    deletelistItem$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.DeleteItem),
            mergeMap(action => this.listService.deletelistItem(action.id)
                .pipe(
                        tap(_=>console.log('delete')),
                        map(() => actions.DeleteItemSuccess({id: action.id}))
                     )
                )
                ,catchError(error => of(actions.DeleteItemFailure({error})))
            )
        );
}
