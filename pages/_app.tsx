import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/dist/next-server/lib/router/router'
import { AuthProvider } from '../lib/auth'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
