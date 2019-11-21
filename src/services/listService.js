import { db } from '../firebase';

const listItemRef = db.collection('listItem');

const getListItems = () =>
  new Promise((resolve, reject) => {
    listItemRef
      .where('accountId', '==', '1')
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

const createListItem = newItem =>
  new Promise((resolve, reject) => {
    listItemRef
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

const updateListItem = updatedItem => {
  const { id, ...props } = updatedItem;
  return listItemRef.doc(id).set({ ...props }, { merge: true });
};

const deleteListItem = listItemId => listItemRef.doc(listItemId).delete();

export { getListItems, createListItem, updateListItem, deleteListItem };
