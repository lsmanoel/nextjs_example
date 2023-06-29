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
  if (!session?.user?.email) {
    res.status(401).json({ error: deleteChatMessageResultMsg.BAD_CREDENTIALS });
  } else {
    if (!req.query?.id[0] || !req.query?.id[1]) {
      res.status(400).json({ error: deleteChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const emailKey = req.query.id[0];
        const docId = req.query.id[1];
        const deleted = true;
        await db.collection(emailKey).doc(docId).update({
          deleted,
        });
        res.status(200).json({ deleted });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  }
}
