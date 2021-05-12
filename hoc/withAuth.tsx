import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useAuth } from '../lib/auth'

export default function withAuth(Component: any) {
  return (props: any) => {
    const { auth, loading } = useAuth()
    const router = useRouter()

    const isAuthenticated = !!auth?.uid

    const shouldRedirectToApp =
      isAuthenticated && !router.pathname.startsWith('/auth')

    const shouldRedirectToLogin =
      !isAuthenticated && router.pathname.startsWith('/auth')

    const redirectToApp = useCallback(() => {
      const appRedirectDestination = '/auth'

      if (!appRedirectDestination) {
        throw new Error('The appDestinationToApp was not found.')
      }

      router.replace(appRedirectDestination)
    }, [router, auth])

    const redirectToLogin = useCallback(() => {
      const appRedirectDestination = '/'

      if (!appRedirectDestination) {
        throw new Error('The appDestinationToLogin was not found.')
      }

      router.replace(appRedirectDestination)
    }, [router, auth])

    useEffect(() => {
      if (shouldRedirectToApp) {
        redirectToApp()
      } else if (shouldRedirectToLogin) {
        redirectToLogin()
      }
    }, [
      shouldRedirectToLogin,
      shouldRedirectToApp,
      redirectToLogin,
      redirectToApp,
    ])

    const isRedirecting = shouldRedirectToLogin || shouldRedirectToApp

    if (isRedirecting) return <p>Loading ... </p>

    // if (loading) return <p>Loading ... </p>

    return <Component {...props} />
  }
}
