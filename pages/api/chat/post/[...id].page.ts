import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import * as admin from "firebase-admin";
import db from "lib/firebase/admin";
import { Message } from "lib/chat";
import { postChatMessageResultMsg } from "lib/requests-results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session?.user?.email) {
    if (!(req.query.id.length >= 1) || !(req.query.id.length <= 2)) {
      res.status(400).json({ error: postChatMessageResultMsg.BAD_REQUEST });
    } else {
      try {
        const created = admin.firestore.FieldValue.serverTimestamp();
        const name = session.user.name;
        const email = session.user.email;
        const text = req.body.text;
        const chatId =
          req.query.id[0] == "self" ? session.chatId : req.query.id[0];
        const deleted = false;
        const { id } = await db
          .collection("chat")
          .doc(chatId)
          .collection("messages")
          .add({
            created,
            name,
            email,
            text,
            deleted,
          });
        const savedMessage: Message = {
          id,
          created,
          name,
          email,
          text,
          deleted,
        };

        await db
          .collection("users")
          .doc(session.chatId)
          .update({ lastPost: created });

        const notificationType =
          chatId === session.chatId
            ? "sentNotifications"
            : "receivedNotifications";
        const docRef = db.collection("users").doc(chatId);
        try {
          await db.runTransaction(async (t) => {
            const doc = await t.get(docRef);
            if (notificationType == "sentNotifications") {
              if (doc.data()?.sentNotifications) {
                t.update(docRef, {
                  sentNotifications: doc.data().sentNotifications + 1,
                });
              } else {
                t.set(docRef, { ...doc.data(), sentNotifications: 1 });
              }
            } else if (notificationType == "receivedNotifications") {
              if (doc.data()?.receivedNotifications) {
                t.update(docRef, {
                  receivedNotifications: doc.data().receivedNotifications + 1,
                });
              } else {
                t.set(docRef, { ...doc.data(), receivedNotifications: 1 });
              }
            }
          });
        } catch (error) {
          res.status(500).json({ error });
        }
        res.status(200).json(savedMessage);
      } catch (error) {
        res.status(400).json({ error });
      }
    }
  } else {
    res.status(401).json({ error: postChatMessageResultMsg.BAD_CREDENTIALS });
  }
}
