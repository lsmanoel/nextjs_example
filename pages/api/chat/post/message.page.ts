import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import db from "lib/firebase/admin";
import { Message } from "lib/chat";
import { postChatMessageResultMsg } from "lib/requests-results";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session.user) {
    try {
      const name = session.user.name;
      const email = session.user.email;
      const created = new Date().toISOString();
      const text = req.body.text;
      const emailKey = req.body.emailKey;
      const deleted = false;
      console.log(emailKey);
      const { id } = await db.collection(emailKey).add({
        created,
        name,
        email,
        text,
        deleted,
      });
      const savedMessage: Message = { id, created, name, email, text, deleted };
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(401).json({ error: postChatMessageResultMsg.BAD_CREDENTIALS });
  }
}
