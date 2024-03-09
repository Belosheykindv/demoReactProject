
import { profileAPI } from "../Api/apiRequest";
import { stopSubmit } from "redux-form";
import { FORM_ERROR } from "final-form";
import Anonym from '../Images/userPhoto.png'
import { v1 } from 'uuid'
import { Dispatch } from "react";
const ADD_POST = 'ADD-POST';
const DELETE_POST = 'DELETE_POST';
const ADD_LIKE = 'ADD-LIKE';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_PROFILE_STATUS = 'SET_USER_PROFILE_STATUS';
const UPDATE_ABOUT_ME = 'UPDATE_ABOUT_ME';
const SET_USER_ABOUT_ME = 'SET_USER_ABOUT_ME'
const UPDATE_PROFILE_PHOTO = 'UPDATE_PROFILE_PHOTO'
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
type profileType = {
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
type actionType = {
    type: string,
    newPostText: string,
    postId: number | string,
    profile: profileType,
    profileStatus: string | null,
    aboutMe: string | null,
    photos: photosType


}
const profileReducer = (state = initialState, action: actionType): initialStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: v1(),
                message: action.newPostText,
                likesCount: getRandomInt(100),
                share: getRandomInt(100),
                imgSrc: Anonym
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case DELETE_POST: {

            return {
                ...state,
                posts: state.posts.filter(p => p.id != action.postId),

            };
        }
        case ADD_LIKE: {
            console.log(action.postId)
            let stateCopy: initialStateType = {
                ...state,
                posts: [...state.posts]
            };
            let post = stateCopy.posts.find(p => p.id === action.postId)
            if (!post) return stateCopy
            post.likesCount += 1;
            return stateCopy;
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case SET_USER_PROFILE_STATUS: {
            return { ...state, profileStatus: action.profileStatus }
        }
        case SET_USER_ABOUT_ME: {
            return { ...state, aboutMe: action.aboutMe }
        }
        // case UPDATE_ABOUT_ME: {
        //     return {
        //         ...state, profile: {
        //             ...state.profile, profile: action.profileAboutMe
        //         }
        //     }
        // }
        case UPDATE_PROFILE_PHOTO: {
            return { ...state, profile: { ...state.profile, photos: action.photos } as profileType }
        }
        default: return state;
    }
}
type addPostTextActionCreatorType = {
    type: typeof ADD_POST
    newPostText: string
}
type deletePostTextActionCreatorType = {
    type: typeof DELETE_POST
    postId: number
}
type addPostLikeActionCreatorType = {
    type: typeof ADD_LIKE
    postId: number
}
type setUserProfileType = {
    type: typeof SET_USER_PROFILE
    profile: profileType
}
type setUserProfileStatusType = {
    type: typeof SET_USER_PROFILE_STATUS
    profileStatus: string
}
type setUserAboutMeType = {
    type: typeof SET_USER_ABOUT_ME
    aboutMe: string
}
type updateProfilePhotoType = {
    type: typeof UPDATE_PROFILE_PHOTO
    photos: photosType
}
export const addPostTextActionCreator = (newPostText: string): addPostTextActionCreatorType => {
    return { type: ADD_POST, newPostText }
}
export const deletePostTextActionCreator = (postId: number): deletePostTextActionCreatorType => {
    return { type: DELETE_POST, postId }
}
export const addPostLikeActionCreator = (postId: number): addPostLikeActionCreatorType => {
    return { type: ADD_LIKE, postId: postId }
}

export const setUserProfile = (profile: profileType): setUserProfileType => {
    return { type: SET_USER_PROFILE, profile }
}
export const setUserProfileStatus = (profileStatus: string): setUserProfileStatusType => {
    return { type: SET_USER_PROFILE_STATUS, profileStatus }
}
export const setUserAboutMe = (aboutMe: string): setUserAboutMeType => {
    return { type: SET_USER_ABOUT_ME, aboutMe }
}
// export const updateProfileAboutMee = (profileAboutMe) => {
//     return { type: UPDATE_ABOUT_ME, profileAboutMe };
// }
export const updateProfilePhoto = (photos: photosType): updateProfilePhotoType => {
    return { type: UPDATE_PROFILE_PHOTO, photos };
}
export const addPost = (post: string) => (dispatch: Dispatch<addPostTextActionCreatorType>) => {
    dispatch(addPostTextActionCreator(post));
}
export const addLike = (likes: number) => (dispatch: Dispatch<addPostLikeActionCreatorType>) => {
    dispatch(addPostLikeActionCreator(likes));
}
export const deletePost = (postId: number) => (dispatch: Dispatch<deletePostTextActionCreatorType>) => {
    dispatch(deletePostTextActionCreator(postId));
}
export const getUserProfile = (userId: number) => (dispatch: Dispatch<setUserProfileType>) => {
    profileAPI.getUserProfile(userId).then(data => {
        dispatch(setUserProfile(data));
    });
}
export const getUserProfileStatus = (userId: number) => (dispatch: Dispatch<setUserProfileStatusType>) => {
    profileAPI.getUserProfileStatus(userId).then(data => {
        dispatch(setUserProfileStatus(data));
    });
}
export const getUserAboutMe = (userId: number) => (dispatch: Dispatch<setUserAboutMeType>) => {
    profileAPI.getUserProfile(userId).then(data => {
        dispatch(setUserAboutMe(data.aboutMe));
    });
}
export const updateUserProfileStatus = (status: string) => (dispatch: Dispatch<setUserProfileStatusType>) => {
    profileAPI.updateUserProfileStatus(status).then(respone => {
        if (respone.resultCode === 0) {
            dispatch(setUserProfileStatus(status))
        }
        //  else {
        //     const errorMessage = respone.messages
        //     if (errorMessage === 0) return
        //     dispatch(stopSubmit())
        // }
    }
    )
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
export const updateUserPhoto = (photos: photosType) => async (dispatch: any) => {
    const response = await profileAPI.updateUserPhoto(photos)
    if (response.resultCode === 0) { dispatch(updateProfilePhoto(response.data.photos)) } else {
        const messages = response.messages
        if (messages.length === 0) return
        dispatch(stopSubmit('userPhoto', { 'photoError': messages }));
        return Promise.reject(messages)
    }
}

export default profileReducer;

