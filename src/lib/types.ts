export const SESSION_COOKIE_NAME = 'bharat-cart-session-token'


export interface UserType {
  _id: string,
  email: string
  password?: string
}

export interface StoreType {
  _id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo: string | null;
  // Add any other fields you need
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
  description:string,
  price:number,
  salePrice:number,
  images:string[],
  categories:string[]
}