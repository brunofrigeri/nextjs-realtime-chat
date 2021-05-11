import firebase from '../lib/firebase'

const db = firebase.database()

export async function getUserData(uid: string) {
  const res = await db.ref('users').child(uid).get()

  return res.val()
}

export async function createUser(
  email: string,
  password: string,
  data: { name: string; photoURL: string }
) {
  await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      let user = res.user
      user?.updateProfile({
        displayName: data.name,
        photoURL: data.photoURL,
      })
    })
}
