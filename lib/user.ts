import db from "lib/firebase/admin";

export interface User {
  id?: string;
  created?: string;
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

  const created = new Date().toISOString();
  if (docId) {
    await db
      .collection("users")
      .doc(docId)
      .update({ created, ...user });
  } else {
    const { id } = await db.collection("users").add({ created, ...user });
  }
};
