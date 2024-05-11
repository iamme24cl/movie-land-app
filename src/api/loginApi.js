import axios from "./axios";
import { baseUrl } from "./constants";
import requests from "./requests";

const login = async (email, password) => {
    try {
        const resp = await axios.post(baseUrl + requests.loginUser, {email, password})
        localStorage.setItem("token", "sadkafhdskjfhskjhf12e298e7")
        localStorage.setItem("user", JSON.stringify(resp.data))
        return {"success": true, "data": resp.data}
    } catch (error) {
        return {"success": false, "error": error}
    }
}

export default login;