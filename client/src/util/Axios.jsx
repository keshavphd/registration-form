import axios from 'axios';

const baseURL = "https://registration-nine-mu.vercel.app"
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
