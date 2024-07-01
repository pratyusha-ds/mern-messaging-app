import axios from "axios";
const instance = axios.create({
  baseURL: "https://mern-messaging-app-k1lv.onrender.com/",
});
export default instance;
