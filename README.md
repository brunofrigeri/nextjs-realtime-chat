# Next.js + Tailwind CSS + Firebase Authentication + Typescript Example

This example shows how to use [Tailwind CSS](https://tailwindcss.com/) (v2.1), [Typescript](https://www.typescriptlang.org/) (v4.2.4) and [Firebase Authentication](https://firebase.google.com/docs/auth) (v8.5.0) with Next.js. Besides that, you'll be able to see how to use Firebase Realtime Database, but you can also use Firestore.
## Getting started

### Cloning the repository (you can also fork)

- HTTPS
```bash
git clone https://github.com/brunofrigeri/with-firebase-auth.git
```

- SSH
```bash
git clone git@github.com:brunofrigeri/with-firebase-auth.git
```

### Installing all dependencies

```bash
yarn install
```


## Setting up Firebase

To setup firebase to your project, you'll need to go into your Firebase settings and get your service_account JSON, that will be able to
return all firebase keys to run our project.

If you weren't able to find it. Go to Firebase Console and then `Settings -> Service Account`, click on `Generate new private key` and then `Generate key`, after that store this JSON that contains your keys.

With that in hands, you'll need to create a `.env.local` file (example on `.env.example`) and store the values on your JSON into their respective key.

## How to use

Now you just need to run:

```bash
yarn run dev
```

Voi lá, your Firebase Authentication + Next.js application is already running, just login and test it out!!
