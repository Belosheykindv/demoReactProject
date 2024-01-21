import profileReducer from "./profilePage-reducer";
import dialogsReducer from "./dialogPage-reducer";
let store = {
  _state: {
    profilePage: {
      posts: [
        { id: '1', message: 'Hello world 1', likesCount: 11, share: 777, imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: '2', message: 'Hello world 2', likesCount: 22, share: 333, imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: '3', message: 'Hello world 3', likesCount: 33, share: 5335, imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: '4', message: 'Hello world 4', likesCount: 44, share: 33, imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: '5', message: 'Hello world 5', likesCount: 55, share: 33, imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }
      ],
      users: [
        { id: 1, name: 'Alina', imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: 2, name: 'Denis', imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: 3, name: 'Egor', imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: 4, name: 'Oleg', imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: 5, name: 'Kristina', imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }
      ],
      newPostText: ''
    },
    dialogsPage: {
      dialogs: [
        { id: '1', name: 'Alina', imgSrc: 'https://project-nerd.com/wp-content/uploads/2020/05/ang.jpeg' },
        { id: '2', name: 'Denis', imgSrc: 'https://krot.info/uploads/posts/2022-01/1642691161_2-krot-info-p-dzheison-stetkhem-art-2.jpg' },
        { id: '3', name: 'Egor', imgSrc: 'https://coolsen.ru/wp-content/uploads/2021/06/76-6.jpg' },
        { id: '4', name: 'Oleg', imgSrc: 'https://skitalets.ru/upload/main/b96/b9622a5ce9ca6a011e99ee48a1a2b30b.png' },
        { id: '5', name: 'Kristina', imgSrc: 'https://catherineasquithgallery.com/uploads/posts/2021-03/thumbs/1614604937_99-p-avatarki-na-belom-fone-117.jpg' }],
      messages: [
        { id: '1', message: 'Hi' },
        { id: '2', message: 'Hello' },
        { id: '3', message: 'Hola' },],
      newDialogText: ''
    },
  },
  _callsubscriber() {
    console.log('hey');
  },

  getState() {
    return this._state
  },
  subscribe(observer) {
    this._callsubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action)
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
    this._callsubscriber()
  }

}



export default store;
Window.store = store;

