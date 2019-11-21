import { db } from '../firebase';

const checklistItemRef = db.collection('checklistItem');

const getChecklistItemsByListItem = listItemId =>
  new Promise((resolve, reject) => {
    checklistItemRef
      .where('accountId', '==', '1')
      .where('listItemId', '==', listItemId)
      .get()
      .then(querySnapshot => {
        const list = [];

        querySnapshot.forEach(doc => {
          if (doc.exists) {
            list.push({
              id: doc.id,
              ...doc.data(),
            });
          }
        });

        resolve(list);
      })
      .catch(() => {
        reject();
      });
  });

const createChecklistItem = newItem =>
  new Promise((resolve, reject) => {
    checklistItemRef
      .add(newItem)
      .then(docRef => {
        resolve({
          id: docRef.id,
          ...newItem,
        });
      })
      .catch(() => {
        reject();
      });
  });

const updateChecklistItem = updatedItem => {
  const { id, ...props } = updatedItem;
  return checklistItemRef.doc(id).set({ ...props }, { merge: true });
};

const deleteChecklistItem = checklistItemId =>
  checklistItemRef.doc(checklistItemId).delete();

export {
  getChecklistItemsByListItem,
  createChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
};
