import axios from "axios";
import Cookies from "js-cookie";

export const BASE_URL = "http://127.0.0.1:3010"
const authPath = "/api/auth";
export const login = async (email: string, password: string) => {
    const response = await axios.post( `${BASE_URL}`+`${authPath}`+"/login", {
        "email": email,
        "password": password
    });
    if(response.data.error) {
        return false;
    }
    const authHeaderCookie = response.data.authtoken;
    Cookies.set("notify", authHeaderCookie, { expires: 1 });
    return true;
}

export const signup = async (username:string , email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}`+`${authPath}`+"/createuser", {
        "username": username,
        "email": email,
        "password": password
    });
    if(response.data.error) {
        return false;
    }
    const authHeaderCookie = response.data.authtoken;
    Cookies.set("notify", authHeaderCookie, { expires: 1 })
    return true;
}

export const handleLogout = () => {
    Cookies.remove("notify");
    if(!Cookies.get("notify")) {
        return true;
    } 
    return false;
}