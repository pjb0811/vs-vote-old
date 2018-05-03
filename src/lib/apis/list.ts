import firebaseApp from 'firebaseApp';

async function getList(params: { uid: string }) {
  let database: any = firebaseApp.firestore();
  let list: Array<object> = [];
  database.settings({
    timestampsInSnapshots: true
  });

  await database
    .collection('list')
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        list.push(doc.data());
      });
    });

  return {
    data: list
  };
}

export default { getList };
