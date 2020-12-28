export interface IUserRegister {
    first_name: string,
    last_name: string,
    email: string,
    password: string
}
export interface IUserLogin {
    email: string,
    password: string
}
export interface IUser {
    id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}