import axios from 'axios';

const baseURL = import.meta.env.VITE_API
export const Axios = axios.create({
    baseURL:baseURL,
    withCredentials:true
})

const SummaryAPI = {
    allData:{
        url:"/api/form/get-all-data",
        method:'get'
    },
    storeData:{
        url:"/api/form/post-data",
        method:'post'
    }
}

export default SummaryAPI
