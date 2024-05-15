import axios from "axios";

class AxiosInit
{
    constructor()
    {
        //API URL
        axios.defaults.baseURL = "http://"+import.meta.env.VITE_SERVER_URL+":"+import.meta.env.VITE_SERVER_PORT
    }
}

export default AxiosInit;