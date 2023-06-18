import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth].page";
import db from "lib/firebase";
import { Message } from "lib/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    try {
      const name = session.user.name;
      const created = new Date().toISOString();
      const text = req.body.text;
      const { id } = await db.collection(session.user.email).add({
        created,
        text,
      });
      const savedMessage: Message = { id, created, name, text };
      res.status(200).json(savedMessage);
    } catch (error) {
      res.status(400).json({ error });
    }
  } else {
    res.status(401);
  }
}
