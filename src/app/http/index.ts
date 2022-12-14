import Axios, {AxiosInstance} from "axios";

export const httpClient: AxiosInstance = Axios.create ({
    baseURL:"http://207.244.238.40:14333/"
})
