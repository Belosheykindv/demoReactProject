
import { profileAPI } from "../Api/apiRequest";
import { stopSubmit } from "redux-form";
// import { FORM_ERROR } from "final-form";
import Anonym from '../Images/userPhoto.png'
import { v1 } from 'uuid'
import { Dispatch } from "react";
import { GetState, PayloadAction, createSlice } from "@reduxjs/toolkit";

type postElType = {
    id: string,
    message: string,
    likesCount: number,
    share: number,
    imgSrc: string
}
type usersElType = {
    id: string,
    name: string,
    imgSrc: string
}
type initialStateType = {
    posts: Array<postElType>,
    users: Array<usersElType>,
    newPostText: string,
    profile: null | profileType,
    profileStatus: string | null,
    aboutMe: string | null,
    photo: null | string,
    editModeAboutMe: boolean,
    key: null | number,
    post?: postElType | null
}
type contactType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
type photosType = {
    small: string | null
    large: string | null
}
export type profileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: boolean
    fullName: string
    contacts: contactType
    photos: photosType
}
let initialState: initialStateType = {
    posts: [
        { id: v1(), message: 'Занимательный факт', likesCount: 11, share: 777, imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: v1(), message: 'Hello world 2', likesCount: 22, share: 333, imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: v1(), message: 'Hello world 3', likesCount: 33, share: 535, imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: v1(), message: 'Hello world 4', likesCount: 44, share: 33, imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: v1(), message: 'Hello world 5', likesCount: 55, share: 31, imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }
    ] as Array<postElType>,
    users: [
        { id: v1(), name: 'Alina', imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: v1(), name: 'Denis', imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: v1(), name: 'Egor', imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: v1(), name: 'Oleg', imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: v1(), name: 'Kristina', imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }
    ] as Array<usersElType>,
    newPostText: '',
    profile: null as profileType | null,
    profileStatus: '',
    aboutMe: '',
    photo: null,
    editModeAboutMe: false,
    key: null,
    post: null as postElType | null


}
function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
const profilePageSlice = createSlice({
    name: 'profilePageSlice',
    initialState,
    reducers: {
        addPost: (state, action: PayloadAction<string>) => {
            console.log('Внутри диспатча постов')
            let newPost = {
                id: v1(),
                message: action.payload,
                likesCount: getRandomInt(100),
                share: getRandomInt(100),
                imgSrc: Anonym
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        },
        deletePost: (state, action: PayloadAction<string>) => {
            console.log('Внутри диспатча удаления постов')
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.payload),
            };
        },
        addLike: (state, action: PayloadAction<String>) => {
            let stateCopy: initialStateType = {
                ...state,
                posts: [...state.posts]
            };
            let post = stateCopy.posts.find(p => p.id === action.payload)
            if (!post) return stateCopy
            post.likesCount += 1;
            // return stateCopy;
        },
        setUserProfile: (state, action: PayloadAction<profileType>) => {
            console.log('Внутри диспатча профайла')
            return { ...state, profile: action.payload }
        },
        setUserProfileStatus: (state, action: PayloadAction<string>) => {
            console.log('Внутри диспатча статуса')
            return { ...state, profileStatus: action.payload }
        },
        updateProfilePhoto: (state, action: PayloadAction<photosType>) => {
            return { ...state, profile: { ...state.profile, photos: action.payload } as profileType }
        }

    }
})
export const getUserProfile = (userId: number) => async (dispatch: Dispatch<any>) => {
    const data = await profileAPI.getUserProfile(userId)
    dispatch(setUserProfile(data));
}
export const getUserProfileStatus = (userId: number) => async (dispatch: Dispatch<any>) => {
    const data = await profileAPI.getUserProfileStatus(userId)
    dispatch(setUserProfileStatus(data));
}

export const updateUserProfileStatus = (status: string) => async (dispatch: Dispatch<any>) => {
    const response = await profileAPI.updateUserProfileStatus(status)
    if (response.resultCode === 0) {
        dispatch(setUserProfileStatus(status))
    }
}

export const updateAboutMe = (profile: profileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.id
    const response = await profileAPI.updateAboutMe(profile)
    if (response.resultCode === 0) {
        dispatch(getUserProfile(userId))
    } else {
        const messages = response.messages;
        if (messages.length === 0) return
        const contactsKeys = Object.keys(profile.contacts);
        const errors: any = {};
        contactsKeys.forEach((key) => {
            const errorMessage = messages.find((error: string) => {
                return error.toLowerCase().includes(key)
            })
            if (errorMessage) {
                errors[key] = errorMessage.replace(/.*/, `Invalid URL (example https://${key}.com/name)`)
            }
        })
        dispatch(stopSubmit('aboutMe', { 'contacts': errors }));
        return Promise.reject(errors)
    }
}
export const updateUserPhoto = (photos: File) => async (dispatch: any) => {
    const response = await profileAPI.updateUserPhoto(photos)
    if (response.resultCode === 0) { dispatch(updateProfilePhoto(response.data.photos)) } else {
        const messages = response.messages
        if (messages.length === 0) return
        dispatch(stopSubmit('userPhoto', { 'photoError': messages }));
        return Promise.reject(messages)
    }
}
export const { addPost, addLike, deletePost, setUserProfile, setUserProfileStatus, updateProfilePhoto } = profilePageSlice.actions
export default profilePageSlice.reducer
