export const SESSION_COOKIE_NAME = 'bharat-cart-session-token'
export const CUSTOMER_SESSION_COOKIE_NAME = 'bharat-cart-customer-session-token'


export interface UserType {
  _id: string,
  email: string
  password?: string
}

export interface StoreType {
  _id: string;
  name: string;
  slug: string;
  domain?: string ;
  logo?: string ;
  description?: string ;
  favicon?: string ;
};
export interface ImageType {
  _id: string;
  url: string;
};

export interface CategoryType {
  _id: string,
  name: string
}

export interface ProductType {
  _id:string,
  name:string,
  description?:string,
  price:number,
  salePrice?:number,
  images:string[],
  categories:string[]
}

export interface CartItemType{
  _id:string,
  name:string,
  price:number,
  quantity:number
}


export interface CustomerType {
  _id: string,
  email: string
  password?: string
}

export interface OrderType {
  _id: string;
  customer: string;
  customerEmail?: string;
  type:string;
  store?: string;
  items:[],
  details:any,
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}