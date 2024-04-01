import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductModel } from "../../../shared/models/products";

const getproductstate = createFeatureSelector<ProductModel>('product');

export const getproductlist = createSelector(getproductstate, (state) => {
    return state.list;
})

export const getproduct = createSelector(getproductstate, (state) => {
    return state.productobj;
})