import firebase from '../lib/firebase'

const db = firebase.database()
const storage = firebase.storage()

export async function getUserData(uid: string) {
  const res = await db.ref('users').child(uid).get()

  return res.val()
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

export async function putProfilePhoto(uid: string, photoURL: File) {
  return storage
    .ref(`users/${uid}/profile.jpg`)
    .put(photoURL)
    .then((res) => console.log('SUCCESS', res))
}
