import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + Cookies.get("accessToken"),
  },
});

export default Axios;
