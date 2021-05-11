import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../lib/firebase-admin'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token as string)

    res.status(200).json({ uid })
  } catch (err) {
    res.status(401).json({ err })
  }
}
