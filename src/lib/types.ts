export const SESSION_COOKIE_NAME = 'bharat-cart-session-token'


export type User ={
    _id:string,
    email:string
    password?:string
} 

export type Store = {
    _id:string,
    name:string,
    slug:string,
    
}