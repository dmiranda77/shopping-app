import { CartModel } from "../../../shared/models/cart";

export const CartState:CartModel={
    list:[],
    errormessage:'',
    cartobj:{
        id: 0,
        orderId: 0,
        productId: 0,
        productname: '',
        userId: 0,
        username: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        status: '',
    },
    maxId: 0
}