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
    if (!(req.query.id.length >= 1) || !(req.query.id.length <= 2)) {
      res.status(400).json({ error: updateChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const text = req.body.text;
        const updated = new Date().toISOString();

        const chatId =
          req.query.id.length == 2 ? req.query.id[0] : session.chatId;
        const messageId =
          req.query.id.length == 2 ? req.query.id[1] : req.query.id[0];

        const messageRef = db
          .collection("chat")
          .doc(chatId)
          .collection("messages")
          .doc(messageId);

        await db.runTransaction(async (t) => {
          const oldText = (await t.get(messageRef)).data().text;
          const oldMessage: OldMessage = {
            text: oldText,
            updated,
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
