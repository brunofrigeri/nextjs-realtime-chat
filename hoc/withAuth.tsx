import { useRouter } from 'next/router'
import { useCallback, useEffect, useMemo } from 'react'
import { useAuth } from '../lib/auth'

export default function withAuth(Component: any) {
  return (props: any) => {
    const { auth, loading } = useAuth()
    const router = useRouter()

    const isAuthenticated = !!auth?.uid

    const shouldRedirectToApp = useMemo(
      () => isAuthenticated && !router.pathname.startsWith('/auth'),
      [isAuthenticated]
    )
    const shouldRedirectToLogin = useMemo(
      () => !isAuthenticated && router.pathname.startsWith('/auth'),
      [isAuthenticated]
    )

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
      loading,
    ])

    const isRedirecting = shouldRedirectToLogin || shouldRedirectToApp

    if (isRedirecting) return <p>Loading ... </p>

    if (loading) return null

    return <Component {...props} />
  }
}
