export  type  AuthPageType = "login" | "signup"

export type UserData = {
    _id: string;
    name: string;
    email: string;
    __v: number;
  };

 export  type Note = {
    _id: string;
    user: string;
    title: string;
    description: string;
    date: string;
    __v: number;
  };