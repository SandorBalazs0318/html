import axios from "axios";

const ApiClient = axios.create({
    baseUrl: "https://surveys-5jvt.onrender.com/api"
})

export default ApiClient;