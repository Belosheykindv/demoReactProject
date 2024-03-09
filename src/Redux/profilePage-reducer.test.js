import profileReducer, { addPostTextActionCreator, deletePostTextActionCreator } from "./profilePage-reducer"
let state = {
    posts: [
        { id: 1, message: 'Reducers 1', likesCount: 11, share: 777, imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: 2, message: 'Hello world 2', likesCount: 22, share: 333, imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: 3, message: 'Hello world 3', likesCount: 33, share: 535, imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: 4, message: 'Hello world 4', likesCount: 44, share: 33, imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: 5, message: 'Hello world 5', likesCount: 55, share: 31, imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }
    ]
}

it('new post shoud be added', () => {
    let action = addPostTextActionCreator('new post')
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(6)
})
it('new post message is correct', () => {
    let action = addPostTextActionCreator('new post')

    let newState = profileReducer(state, action)
    expect(newState.posts[5].message).toBe('new post')
})
it('new post shoud be deleted', () => {
    let action = deletePostTextActionCreator(5)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(4)

})
it(`new post shoudn't be deleted if postId incorrect`, () => {
    let action = deletePostTextActionCreator(123)
    let newState = profileReducer(state, action)
    expect(newState.posts.length).toBe(5)

})