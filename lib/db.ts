import firebase from '../lib/firebase'
import { User, UserAuthentication } from '../lib/auth'

const db = firebase.database()
const storage = firebase.storage()

export type Message = {
  createdAt: string
  from: string
  message: string
}

export type Chat = {
  data: User
  lastMessage: Message
}

export type UserRTDatabase = {
  uid: string
  email: string
  name?: string
  chats: { [key in string]: Chat }
}

export type UserRT = {
  uid: string
  email: string
  name?: string
  chat: Chat | null
}

export async function getUserData(uid: string) {
  const res = await db.ref('users').child(uid).get()

  return res.val()
}

export async function getUsers(uid?: string): Promise<Array<UserRT>> {
  if (uid) {
    try {
      const value = await firebase
        .database()
        .ref('users')
        .get()
        .then((data) => {
          return Object.values<UserRTDatabase>(data.val())
            .filter((val) => val.uid !== uid)
            .map((val) => {
              const chat =
                val.chats && Object.keys(val.chats).find((chat) => chat === uid)

              return {
                uid: val.uid,
                email: val.email,
                name: val?.name,
                chat: !!chat ? val.chats[chat] : null,
              }
            })
        })
      return value
    } catch (err) {
      throw err.message
    }
  } else {
    return []
  }
}

export async function postMessage(uid?: string, data?: Chat): Promise<void> {
  if (uid && data && data.data.uid) {
    try {
      const value = await firebase
        .database()
        .ref('users')
        .child(uid)
        .child('chats')
        .child(data.data.uid)

      value.once('value').then((response) => {
        const val: Chat = response.val()
        const {
          data: { uid, name, email },
          lastMessage,
        } = data

        if (!val?.data) {
          value.set({
            data: { uid: uid, name: name, email: email },
            lastMessage,
          })
        } else {
          value.set({
            lastMessage,
          })
        }
      })

      await firebase
        .database()
        .ref('chats')
        .child(uid)
        .child(data.data.uid)
        .push(data.lastMessage)
    } catch (err) {
      throw err.message
    }
  }
}

export async function getChatsByUserId(uid?: string): Promise<Array<any>> {
  if (uid) {
    try {
      const value = await firebase
        .database()
        .ref('users')
        .child(uid)
        .child('chats')
        .once('value')
        .then((data) => {
          const value = data.val()
          return Object.values<Chat>(value).map(({ data, lastMessage }) => {
            return {
              chatWith: data,
              lastMessage: lastMessage,
            }
          })
        })
      return value
    } catch (err) {
      throw err.message
    }
  } else {
    return []
  }
}

export async function getMessagesWith(
  uid?: string,
  chatWithId?: string
): Promise<Array<Message>> {
  if (uid && chatWithId) {
    try {
      const value = await firebase
        .database()
        .ref('chats')
        .child(uid)
        .child(chatWithId)
        .once('value')
        .then((data) => {
          console.log('oi', data.val())
          const value = data.val()
          return Object.values<Message>(value).map((message) => {
            return {
              ...message,
            }
          })
        })
      return value
    } catch (err) {
      throw err.message
    }
  } else {
    return []
  }
}

export async function createUser(
  email: string,
  password: string,
  data: { name: string; photoURL: File }
) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      if (res.user) {
        let user = res.user
        storage.ref(`users/${user.uid}/profile.jpg`).put(data.photoURL)
      }
    })
}

export async function createUserInRealtimeDatabase(
  uid: string,
  user: UserAuthentication
) {
  return firebase
    .database()
    .ref('users')
    .child(uid)
    .set({ uid, email: user.email, name: user.name })
}

export async function updateUserProfile(user: UserAuthentication) {
  const authUser = firebase.auth().currentUser

  await authUser?.updateProfile({
    displayName: user.name,
    photoURL: (user.photoURL as string) || null,
  })
}

export async function putProfilePhoto(uid: string, photoURL?: File) {
  return photoURL
    ? await storage.ref(`users/${uid}/profile.jpg`).put(photoURL)
    : null
}
