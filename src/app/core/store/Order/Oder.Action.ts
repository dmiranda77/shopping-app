import { createAction, props } from "@ngrx/store";
import { Order } from "../../../shared/models/order";

export const LOAD_ORDER = '[Order Page] Load Order';
export const LOAD_ORDER_SUCCESS = '[Order Page] Load Order Success';
export const LOAD_ORDER_FAIL = '[Order Page] Load Order Fail';
export const ADD_ORDER = '[Order Page] Add Order';
export const ADD_ORDER_SUCCESS = '[Order Page] Add Order Success';
export const UPDATE_ORDER = '[Order Page] Update Order';
export const UPDATE_ORDER_SUCCESS = '[Order Page] Update Order Success';

export const DELETE_ORDER = '[Order Page] Delete Order';
export const DELETE_ORDER_SUCCESS = '[Order Page] Delete Order Success';

export const GET_ORDER = '[Order Page] Get Order';
export const GET_ORDER_SUCCESS = '[Order Page] Get Order Success';
export const OPEN_POPUP = '[Order Page] Open Popup';
export const REORDER_ORDERS = '[Order Page] Reorder Orders';

export const loadorder = createAction(LOAD_ORDER);
export const loadordersuccess = createAction(LOAD_ORDER_SUCCESS, props<{ list: Order[] }>());
export const loadorderfail = createAction(LOAD_ORDER_FAIL, props<{ errorMessage: string }>());

export const addorder = createAction(ADD_ORDER, props<{ inputData: Order }>());
export const addordersuccess = createAction(ADD_ORDER_SUCCESS, props<{ inputData: Order }>());

export const updateorder = createAction(UPDATE_ORDER, props<{ inputData: Order }>());
export const updateordersuccess = createAction(UPDATE_ORDER_SUCCESS, props<{ inputData: Order }>());

export const deleteorder = createAction(DELETE_ORDER, props<{ code: number }>());
export const deleteordersuccess = createAction(DELETE_ORDER_SUCCESS, props<{ code: number }>());

export const getorder = createAction(GET_ORDER, props<{ id: number }>());
export const getordersuccess = createAction(GET_ORDER_SUCCESS, props<{ obj: Order }>());

export const openpopup = createAction(OPEN_POPUP);
export const reorderorders = createAction(REORDER_ORDERS);
