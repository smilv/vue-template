import axios from "axios";
const instance = axios.create();
axios.defaults.withCredentials = true;
//请求拦截器
instance.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//响应拦截器
instance.interceptors.response.use(
    response => {
        return Promise.reject(response.data);
    },
    error => {
        return Promise.reject(error);
    }
);
export default {
    egPost: (data, params) => {
        return instance.post("/user/info/", data, {
            headers: {
                cs: 12345
            },
            params
        });
    },
    egGet: (data, params) => {
        return instance.post(_skuPath + "/user/info/", data, {
            headers: {
                cs: 12345
            },
            params
        });
    }
};