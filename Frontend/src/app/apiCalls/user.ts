import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./login";

const userPath = "/api/auth";

export const getUserData = async () => {
    try {
        const response = await axios.post(
            `${BASE_URL}${userPath}/getuser`,
            {},
            {
                headers: {
                    "auth-token": Cookies.get("notify"),
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};