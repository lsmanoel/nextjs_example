import { ReactElement, useEffect, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "redux/hooks";
import { setChatNotification } from "redux/chat/reducers/notifications";
import { db } from "lib/firebase";
import {
  collection,
  getDoc,
  query,
  where,
  onSnapshot,
  getDocs,
  orderBy,
  doc,
} from "firebase/firestore";

interface Props {
  children: ReactElement;
}

export const Notifications = (props: Props): ReactElement | null => {
  const { children } = props;
  //=================================
  const session = useSession();
  const notificationsAmount = useAppSelector(
    (state) => state.notifications.amount
  );
  const dispatch = useAppDispatch();

  async function notificationsSnapshot() {
    const docRef = doc(db, "users", session.data.chatId);
    onSnapshot(docRef, (doc) => {
      if (doc.data().receivedNotifications)
        dispatch(setChatNotification(doc.data().receivedNotifications));
      else dispatch(setChatNotification(0));
    });
  }
  useEffect(() => {
    db &&
      session.data?.chatId &&
      session.data?.user.email != process.env.EMAIL_ADM &&
      notificationsSnapshot();
  }, [db, session.data?.chatId]);

  //=================================
  return children;
};
