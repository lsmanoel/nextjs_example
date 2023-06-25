import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import db from "lib/firebase/admin";
import { deleteChatMessageResultMsg } from "lib/requests-results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session.user) {
    res.status(401).json({ error: deleteChatMessageResultMsg.BAD_CREDENTIALS });
  } else {
    if (!Array.isArray(req.query.id) || !req.query.id) {
      res.status(400).json({ error: deleteChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const deleted = true;
        await db.collection(session.user.email).doc(req.query.id[0]).update({
          deleted,
        });
        res.status(200).json({ deleted });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  }
}
