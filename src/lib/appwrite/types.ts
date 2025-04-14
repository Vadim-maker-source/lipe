export interface User {
    id?: string;
    name: string;
    email: string;
    password: string;
    age: number;
}
  
export interface Otziv {
    id?: string;
    attractionId: string;
    userId?: string;
    username: string;
    text: string;
    rating: number;
    createdAt?: string;
    imageUrl?: string;
}