import axios from 'axios'
import store from '@/store'

export const request = axios.create({
    baseURL:'http://zzzhong.cn:8081/Student',
    timeout:8000
})

export const teacherRequest = axios.create({
    baseURL:'http://zzzhong.cn:8081/Teacher',
    timeout:2000
})

export const adminRequest = axios.create({
    baseURL:'http://zzzhong.cn:8081/Admin',
    timeout:2000
})

request.interceptors.request.use((config)=>{
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    return config
})

request.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error(error))
})

teacherRequest.interceptors.request.use((config)=>{
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    return config
})

teacherRequest.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})

adminRequest.interceptors.request.use((config)=>{
    if(store.state.user.token){
        config.headers.token = store.state.user.token
    }

    return config
})

adminRequest.interceptors.response.use((res)=>{
    return res.data
},(error)=>{
    return Promise.reject(new Error('fail'))
})
