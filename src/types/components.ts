export type User = {
  id: number
  name: string
  status: string | null
  followed: boolean
  photos: {
    small: string | null
    large: string | null
  }
}

export type Dialog = {
  id: string
  name: string
  imgSrc: string
}
