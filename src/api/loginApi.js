import axios from "./axios";
import { baseUrl, APP_TOKEN } from "./constants";
import { generateRandomString } from "../helper/helper";
import requests from "./requests";

const login = async (email, password) => {
    try {
        const resp = await axios.post(baseUrl + requests.loginUser, {email, password})
        localStorage.setItem("token", generateRandomString(36))
        localStorage.setItem("user", JSON.stringify(resp.data.data))
        return { "success": resp.data.success, "data": resp.data }
    } catch (error) {
        console.log(error)
        return {"success": false, "error": error}
    }
}

export default login;