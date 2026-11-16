import type { profileType } from '@redux/profilePage-reducer'

export type ProfileViewProps = {
  profile: profileType | null
  userId?: string
  ownerId: number | null
  userStatus: string | null
  updateAboutMe: (data: profileType) => Promise<void>
  updateUserPhoto: (photo: File) => unknown
  editModeAboutMe: boolean
  savePhoto?: unknown
}

export type PostViewProps = {
  postId: string
  message: string
  likesCount: number
  share: number
  img: string
}

export type ProfilePost = {
  id: string
  message: string
  likesCount: number
  share: number
  imgSrc: string
}

export type MyPostsProps = {
  profilePage: { posts: ProfilePost[] }
  ownerUserId: number | null
  router: { params: { userId?: string } }
  addPost: (text: string) => void
}
