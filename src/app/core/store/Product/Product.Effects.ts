import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service"; 
import { catchError, exhaustMap, of, map, switchMap } from "rxjs";
import { addproduct, addproductsuccess, deleteproduct, deleteproductsuccess, getproduct, getproductsuccess, loadproduct, loadproductfail, loadproductsuccess, updateproduct, updateproductsuccess } from "./Product.Action";
import { showalert } from "../Common/App.Action";

@Injectable()
export class ProductEffects {
    constructor(private actin$: Actions, private service: ProductService) {

    }

    _loadproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(loadproduct),
            exhaustMap((action) => {
                return this.service.GetAll().pipe(
                    map((data) => {
                        return loadproductsuccess({ list: data })
                    }),
                    catchError((_error) => of(loadproductfail({ errormessage: _error.message })))
                )
            })
        )
    )

    _getproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(getproduct),
            exhaustMap((action) => {
                return this.service.Getbycode(action.id).pipe(
                    map((data) => {
                        return getproductsuccess({ obj: data })
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to fetch data :' + _error.message, resulttype: 'fail' })))
                )
            })
        )
    )

    _addproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(addproduct),
            switchMap((action) => {
                return this.service.Create(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(addproductsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Created successfully.', resulttype: 'pass' }))
                        
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to create associate', resulttype: 'fail' })))
                )
            })
        )
    )
    _updateproduct = createEffect(() =>
        this.actin$.pipe(
            ofType(updateproduct),
            switchMap((action) => {
                return this.service.Update(action.inputdata).pipe(
                    switchMap((data) => {
                        return of(updateproductsuccess({ inputdata: action.inputdata }),
                            showalert({ message: 'Upadted successfully.', resulttype: 'pass' }))
                    }),
                    catchError((_error) => of(showalert({ message: 'Failed to update associate', resulttype: 'fail' })))
                )
            })
        )
    )
    _deleteproduct = createEffect(() =>
    this.actin$.pipe(
        ofType(deleteproduct),
        switchMap((action) => {
            return this.service.Delete(action.code).pipe(
                switchMap((data) => {
                    return of(deleteproductsuccess({ code: action.code }),
                        showalert({ message: 'Deleted successfully.', resulttype: 'pass' }))
                }),
                catchError((_error) => of(showalert({ message: 'Failed to delete associate', resulttype: 'fail' })))
            )
        })
    )
)



}