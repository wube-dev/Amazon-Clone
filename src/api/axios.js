import axios from "axios";
const axiosInstance = axios.create({
  // baseURL: "http://127.0.0.1:5001/e-clone-6c5eb/us-central1/api",
  baseURL: "https://amazon-clone-backend-1-b7na.onrender.com",
});
export { axiosInstance };