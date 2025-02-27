import axios from "axios"
import { photosType, profileType } from "../Redux/profilePage-reducer";
// import { subscribe } from "diagnostics_channel";

const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': 'd79b7d16-0a4f-4534-8f76-b96d60b582a1' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});
const beerInstance = axios.create({
    baseURL: 'https://api.punkapi.com/v2/beers/',
});

type subScriberType = {
    [key: string]: Array<string>
}
export const userAPI = {
    getUsers: async (pageSize: number, pagesCount: number) => {
        const response = await instance.get(`users?count=${pageSize}&page=${pagesCount}`);
        return response.data.items;
    },
    getTotalusersCount: async () => {
        const response = await instance.get(`users`)
        return response.data.totalCount
    },
    getPageUsers: async (pageSize: number, truePage: number) => {
        const response = await instance.get(`users?count=${pageSize}&page=${truePage}`);
        return response.data;
    }

}
// API для подписки/отписки *******************************************
export const followAPI = {
    delete: async (userId: number) => {
        const response = await instance.delete(`follow/${userId}`)
        return response.data;
    },

    post: async (userId: number) => {
        const response = await instance.post(`follow/${userId}`)
        return response.data;
    }
}
// API для страницы авторизации*******************************************
export const authAPI = {
    auth: async () => {
        const response = await instance.get(`auth/me`)
        return response.data
    },
    login: async (email: string, password: string, rememberMe: boolean, captcha: string) => {
        const response = await instance.post(`auth/login`, { email, password, rememberMe, captcha })
        return response.data
    },
    logout: async () => {
        const response = await instance.delete(`auth/login`)
        return response.data
    },
    getCaptchaUrl: () => {
        return instance.get('/security/get-captcha-url')
    }
}
// API для страницы профиля*******************************************
export const profileAPI = {
    getUserProfile: async (userId: number | null) => {
        const response = await instance.get(`profile/` + userId)
        return response.data
    },
    getUserProfileStatus: async (userId: number) => {
        const response = await instance.get(`profile/status/` + userId);
        return response.data;
    },
    updateUserProfileStatus: async (status: string) => {
        const response = await instance.put(`profile/status`, { status });
        return response.data;
    },
    // updateAboutMe: async (lookingForAJobDescription, fullName, aboutMe) => {
    //     const response = await instance.put(`profile`, { lookingForAJobDescription, fullName, aboutMe });
    //     return response.data;
    // },
    updateAboutMe: async (profile: profileType) => {
        const response = await instance.put(`profile`, profile);
        return response.data;
    },
    updateUserPhoto: async (photo: string | Blob) => {
        const formData = new FormData();
        formData.append("image", photo);
        const response = await instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data

    }
}
// API для страницы чата*******************************************
let subscribers: subScriberType = {
    'messages-received': [],
    'status-changed': []
}
let ws: WebSocket | null = null

const setMessageHandler = (e: { data: string; }) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach((s: any) => s(newMessages))
}
const openHandler = () => {
    notifySubscribersAaboutStatus('ready')
}
const closeHandler = () => {
    console.log('CLOSE WS')
    notifySubscribersAaboutStatus('pending')
    // setTimeout(createChannel, 3000);
}

const errorHandler = () => {
    notifySubscribersAaboutStatus('error')
    console.error('Refresh page (Какая-то ошибка)')
}

const notifySubscribersAaboutStatus = (status: string) => {
    subscribers['status-changed'].forEach((s: any) => s(status))
}
const cleanUp = (ws?: WebSocket) => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', setMessageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
    ws?.close()
}

function createChannel() {
    cleanUp()
    // ws?.close()
    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAaboutStatus('pending')
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', setMessageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
    console.log('Channel is OPEN')
}
export const chatAPI = {
    start: () => {
        createChannel()
    },
    stop: () => {
        subscribers['messages-received'] = []
        subscribers['status-changed'] = []
        cleanUp()
        ws?.close()
        console.log('Channel is closed')

    },
    subscribe: (eventName: string, callback: any) => {
        subscribers[eventName].push(callback)
        return () => {
            subscribers[eventName] = subscribers[eventName].filter((s: any) => s !== callback)
        }
    },
    unsubscribe: (eventName: string, callback: any) => {
        subscribers[eventName] = subscribers[eventName].filter((s: any) => s !== callback)
    },
    sendMessage: (message: string) => {
        ws?.send(message)
    }
}

export const beerAPI = {
    getBeer: async () => {
        const response = await beerInstance.get('random')
        return response.data
    }
}