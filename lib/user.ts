import db from "lib/firebase/admin";
import * as admin from "firebase-admin";

export interface User {
  id?: string;
  created?: number;
  name: string;
  email: string;
  image?: string;
}

export const saveUser = async (user: User) => {
  let docId: string | boolean = false;
  await db
    .collection("users")
    .where("email", "==", user.email)
    .get()
    .then((snapshot) => {
      snapshot &&
        snapshot.forEach((doc) => {
          if (doc.exists) docId = doc.id;
        });
    });

  const created = admin.firestore.FieldValue.serverTimestamp();
  if (docId) {
    await db
      .collection("users")
      .doc(docId)
      .update({ created, ...user });
  } else {
    const { id } = await db.collection("users").add({ created, ...user });
  }
};

export const getUserId = async (email: string): Promise<string> => {
  const user = await db.collection("users").where("email", "==", email).get();
  return user?.docs[0]?.id;
};
