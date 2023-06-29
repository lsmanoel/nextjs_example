import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import * as admin from "firebase-admin";
import db from "lib/firebase/admin";
import { updateChatMessageResultMsg } from "lib/requests-results";
import { OldMessage } from "lib/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    res.status(401).json({ error: updateChatMessageResultMsg.BAD_CREDENTIALS });
  } else {
    if (!req.query?.id[0] || !req.query?.id[1]) {
      res.status(400).json({ error: updateChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const text = req.body.text;
        const emailKey = req.query.id[0];
        const docId = req.query.id[1];
        const updatedDate = new Date().toISOString();
        const messageRef = db.collection(emailKey).doc(docId);

        await db.runTransaction(async (t) => {
          const oldText = (await t.get(messageRef)).data().text;
          const oldMessage: OldMessage = {
            text: oldText,
            updatedDate,
          };

          const notifications = (await t.get(messageRef)).data().notifications;
          t.update(messageRef, {
            text,
            oldTexts: admin.firestore.FieldValue.arrayUnion(oldMessage),
            notifications: notifications ? notifications + 1 : 1,
          });
        });
        res.status(200).json({ text });
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  }
}
