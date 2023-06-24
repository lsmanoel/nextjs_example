import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import * as admin from "firebase-admin";
import db from "lib/firebase/admin";
import { updateChatMessageResultMsg } from "lib/requests-results";
import { Message, OldMessage } from "lib/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ error: updateChatMessageResultMsg.BAD_CREDENTIALS });
  } else {
    if (!Array.isArray(req.query.id) || !req.query.id) {
      res.status(400).json({ error: updateChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const text = req.body.text;
        const updatedDate = new Date().toISOString();
        const messageRef = db
          .collection(session.user.email)
          .doc(req.query.id[0]);

        await db.runTransaction(async (t) => {
          const oldText = (await t.get(messageRef)).data().text;
          const oldMessage: OldMessage = {
            text: oldText,
            updatedDate,
          };

          t.update(messageRef, {
            text,
            oldTexts: admin.firestore.FieldValue.arrayUnion(oldMessage),
          });
        });

        res.status(200).json({ text });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  }
}
