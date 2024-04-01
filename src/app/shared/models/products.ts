export interface Products {
    id: number,
    productname: string,
    description: string,
    price: number,
    category: string,
    brand: string,
    stockCount: number,
    orderCount: number,
    status: string,
    image: string
}
export interface ProductModel{
    list:Products[],
    productobj:Products,
    errormessage:string
}
