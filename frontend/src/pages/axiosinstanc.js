import axios from "axios";
const instance = axios.create({
    baseUrl:"http://localhost:3000/api",
    timeout:1000,
})
instance.interceptors.request.use(
    async(config)=>{
        try{
            const accessToken = localStorage.getItem("accessToken");
            config.headers.Authorization = `Bearer ${accessToken}`;
            return config;

     } catch (error) {
            console.error("Request Error:",error);
        }
    }
)
export default instance;