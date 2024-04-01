import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { OrderService } from "../../services/order.service"; 
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { showalert } from "../Common/App.Action";
import { addorder, addordersuccess, deleteorder, deleteordersuccess, getorder, getordersuccess, loadorder, loadorderfail, loadordersuccess, updateorder, updateordersuccess } from "./Oder.Action";

@Injectable()
export class OrderEffects {
    constructor(private actions$: Actions, private service: OrderService) {}

    _loadorder= createEffect(() =>
        this.actions$.pipe(
            ofType(loadorder),
            exhaustMap(() => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadordersuccess({ list: data })
                    }),
                    catchError((_error) => of(loadorderfail({ errorMessage: _error.message })))
                )
            })
        )
    );

    _getorder= createEffect(() =>
        this.actions$.pipe(
            ofType(getorder),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getordersuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data: ' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    );

    _addorder = createEffect(() =>
        this.actions$.pipe(
            ofType(addorder),
            switchMap((action) => {
                return this.service.Create(action.inputData).pipe(
                    switchMap(() => {
                        return [
                            addordersuccess({ inputData: action.inputData }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    );

    _updateorder = createEffect(() =>
        this.actions$.pipe(
            ofType(updateorder),
            switchMap((action) => {
                return this.service.Update(action.inputData).pipe(
                    switchMap(() => {
                        return [
                            updateordersuccess({ inputData: action.inputData }),
                            showalert({ message: 'Updated successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update associate', resulttype: 'fail' })))
                )
            })
        )
    );

    _deleteorder = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteorder),
            switchMap((action) => {
                return this.service.Delete(action.code).pipe(
                    switchMap(() => {
                        return [
                            deleteordersuccess({ code: action.code }),
                            showalert({ message: 'Deleted successfully.', resulttype: 'pass' })
                        ];
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to delete associate', resulttype: 'fail' })))
                )
            })
        )
    );
}
