export const SESSION_COOKIE_NAME = 'bharat-cart-session-token'


export interface UserType {
  _id: string,
  email: string
  password?: string
}

export interface Store {
  _id: string;
  name: string;
  slug: string;
  domain: string | null;
  logo: string | null;
  // Add any other fields you need
};