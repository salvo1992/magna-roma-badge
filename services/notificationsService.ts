// ✅ 1. Notifiche tra dipendenti e direzione (realtime)
// services/notificationsService.ts
import firestore from '@react-native-firebase/firestore';

export const sendNotification = async (toUid, message) => {
  await firestore().collection('notifiche').add({
    to: toUid,
    message,
    timestamp: Date.now(),
    read: false,
  });
};

export const listenToNotifications = (uid, callback) => {
  return firestore()
    .collection('notifiche')
    .where('to', '==', uid)
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(data);
    });
};
