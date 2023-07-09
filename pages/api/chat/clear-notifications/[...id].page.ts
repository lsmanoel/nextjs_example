import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import * as admin from "firebase-admin";
import db from "lib/firebase/admin";
import { updateChatMessageResultMsg } from "lib/requests-results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user?.email) {
    res.status(401).json({ error: updateChatMessageResultMsg.BAD_CREDENTIALS });
  } else {
    if (!(req.query.id.length === 1)) {
      res.status(400).json({ error: updateChatMessageResultMsg.BAD_REQUEST });
    } else {
      const chatId = req.query.id == "self" ? session.chatId : req.query.id[0];

      const response =
        req.query.id == "self"
          ? db.collection("users").doc(chatId).update({
              receivedNotifications: admin.firestore.FieldValue.delete(),
            })
          : db.collection("users").doc(chatId).update({
              sentNotifications: admin.firestore.FieldValue.delete(),
            });

      res.status(200).json({ response });
    }
  }
}
