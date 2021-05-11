enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
}

const authFetch = async (
  url: string,
  token: string,
  args?: RequestInit,
  method?: Method
) => {
  const res = await fetch(url, {
    method: method || Method.GET,
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
    ...args,
  })

  return res.json()
}

export const fetcherGET = async (url: string, token: string) => {
  const res = await authFetch(url, token)

  return res
}

export const fetcherPOST = async (url: string, token: string, body: any) => {
  const res = await authFetch(url, token, body, Method.POST)

  return res
}
