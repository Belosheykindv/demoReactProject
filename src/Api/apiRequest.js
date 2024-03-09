import axios from "axios"
// import { subscribe } from "diagnostics_channel";

const instance = axios.create({
    withCredentials: true,
    headers: { 'API-KEY': 'd79b7d16-0a4f-4534-8f76-b96d60b582a1' },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});
const beerInstance = axios.create({
    // withCredentials: true,
    // headers: { 'API-KEY': 'd79b7d16-0a4f-4534-8f76-b96d60b582a1' },
    baseURL: 'https://api.punkapi.com/v2/beers/random',
});
export const userAPI = {
    getUsers: async (pageSize, pagesCount) => {
        const response = await instance.get(`users?count=${pageSize}&page=${pagesCount}`);
        return response.data.items;
    },
    getTotalusersCount: async () => {
        const response = await instance.get(`users`)
        return response.data.totalCount
    },
    getPageUsers: async (pageSize, truePage) => {
        const response = await instance.get(`users?count=${pageSize}&page=${truePage}`);
        return response.data;
    }

}
// API для подписки/отписки *******************************************
export const followAPI = {
    delete: async (userId) => {
        const response = await instance.delete(`follow/${userId}`)
        return response.data;
    },

    post: async (userId) => {
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
    login: async (email, password, rememberMe, captcha) => {
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
    getUserProfile: async (userId) => {
        const response = await instance.get(`profile/` + userId)
        return response.data
    },
    getUserProfileStatus: async (userId) => {
        const response = await instance.get(`profile/status/` + userId);
        return response.data;
    },
    updateUserProfileStatus: async (status) => {
        const response = await instance.put(`profile/status`, { status });
        return response.data;
    },
    // updateAboutMe: async (lookingForAJobDescription, fullName, aboutMe) => {
    //     const response = await instance.put(`profile`, { lookingForAJobDescription, fullName, aboutMe });
    //     return response.data;
    // },
    updateAboutMe: async (profile) => {
        const response = await instance.put(`profile`, profile);
        return response.data;
    },
    updateUserPhoto: async (photo) => {
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
let subscribers = {
    'messages-received': [],
    'status-changed': []
}
let ws = null

const setMessageHandler = (e) => {
    let newMessages = JSON.parse(e.data)
    subscribers['messages-received'].forEach(s => s(newMessages))
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

const notifySubscribersAaboutStatus = (status) => {
    subscribers['status-changed'].forEach(s => s(status))
}
const cleanUp = (ws) => {
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
        ws.close()
        console.log('Channel is closed')

    },
    subscribe: (eventName, callback) => {
        subscribers[eventName].push(callback)
        return () => {
            subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
        }
    },
    unsubscribe: (eventName, callback) => {
        subscribers[eventName] = subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage: (message) => {
        ws?.send(message)
    }
}

export const beerAPI = {
    getBeer: async () => {
        const response = await beerInstance.get()
        console.log(response.data)
        return response.data
    }
}