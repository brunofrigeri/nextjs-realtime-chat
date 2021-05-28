import { useEffect, useState } from 'react'

interface UseDatabaseProps<T> {
  asyncFunction(): Promise<T>
}

export default function useDatabase<T>({ asyncFunction }: UseDatabaseProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = async () => {
    setLoading(true)
    try {
      const response = await asyncFunction()
      setData(response)
      setLoading(false)
      setError(null)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading) {
      fetch()
    }
  }, [])

  return {
    loading,
    error,
    data,
    refetch: fetch,
  }
}
