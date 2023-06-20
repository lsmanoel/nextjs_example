import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import db from "lib/firebase/admin";
import { Message } from "lib/chat";
import { getChatMessagesResultMsg } from "lib/requests-results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const data = await db
        .collection(session.user.email)
        .orderBy("created")
        .get();

      const messages: Message[] = data.docs.map((message) => ({
        id: message.id,
        created: message.data().created,
        name: message.data().name,
        text: message.data().text,
      }));
      res.status(200).json(messages);
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(401).json({ error: getChatMessagesResultMsg.BAD_CREDENTIALS });
  }
}
