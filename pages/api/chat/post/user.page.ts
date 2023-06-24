import { NextApiRequest, NextApiResponse } from "next";
import db from "lib/firebase/admin";
import { User } from "lib/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Marina é perfeita");
  try {
    const created = new Date().toISOString();
    const user: User = req.body.user;
    // const { id } = await db.collection("users").add({ created, ...user });
    // const savedUser: User = { id, created, ...user };

    // const sessionsRef = db.collection("sessions");

    const alreadySaved = await db
      .collection("users")
      .where("email", "==", user.email)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.exists) {
            return true;
          }
        });
        return false;
      });

    console.log(alreadySaved);
    console.log("ssss");

    // await db.runTransaction(async (t) => {
    //   const data = await t.getAll(sessionsRef);

    //   let alreadySaved = false;
    //   data.docs.map((s) => {
    //     if (s.data().email === session.email) alreadySaved = true;
    //   });

    //   if (!alreadySaved) {
    //     t.create(sessionsRef, session);
    //   }

    //   // t.update(messageRef, {
    //   //   text,
    //   //   oldTexts: admin.firestore.FieldValue.arrayUnion(oldMessage),
    //   // });
    // });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error });
  }
}
