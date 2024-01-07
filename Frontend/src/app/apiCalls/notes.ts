import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./login";

const notesPath = "/api/notes";

export const getAllNotes = async () => {
    try {
        const response = await axios.get(`${BASE_URL}${notesPath}/fetchnotes`, {
            headers: {
                "auth-token": Cookies.get("notify"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createNote = async (title: string, content: string) => {
    try {
        const response = await axios.post(`${BASE_URL}${notesPath}/addnotes`, {
            "title": title,
            "description": content
        }, {
            headers: {
                "auth-token": Cookies.get("notify"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateNote = async (id: string, title: string, content: string) => {
    try {
        const response = await axios.put(`${BASE_URL}${notesPath}/updatenotes/${id}`, {
            "title": title,
            "description": content
        }, {
            headers: {
                "auth-token": Cookies.get("notify"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteNote = async (id: string) => {
    try {
        const response = await axios.delete(`${BASE_URL}${notesPath}/deletenote/${id}`, {
            headers: {
                "auth-token": Cookies.get("notify"),
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}