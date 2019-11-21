import { db } from '../firebase';

const settingsRef = db.collection('settings');

const getSettings = () =>
  new Promise((resolve, reject) => {
    settingsRef
      .doc('1')
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve(doc.data());
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });

const updateSettings = newSettings =>
  settingsRef.doc('1').set(newSettings, { merge: true });

export { getSettings, updateSettings };
