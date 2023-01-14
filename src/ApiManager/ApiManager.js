import axios from "axios";

const ApiManager = axios.create({
    baseURL: "http://103.226.249.210:3022/api",
    responseType: "json",
    withCredentials: true,
});

export default ApiManager;
