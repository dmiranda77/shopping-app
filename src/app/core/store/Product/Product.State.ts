import { ProductModel } from "../../../shared/models/products";

export const ProductState:ProductModel={
    list:[],
    errormessage:'',
    productobj:{
        id: 0,
        productname: "",
        description: "",
        price: 0,
        category: "",
        brand: "",
        stockCount: 0,
        orderCount: 0,
        status: "",
        image: ""
    }
}