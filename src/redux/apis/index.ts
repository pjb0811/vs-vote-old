import firebase from '../../firebase';

async function getList(uid: string) {
  let database: any = firebase.database();
  let listRef: any;
  let list: object[] = [];

  if (uid) {
    listRef = database.ref('users').child(`${uid}/list`).orderByChild('date');
  } else {
    listRef = database.ref('list').orderByChild('date');
  }

  await listRef.once('value', (data: any) => {
    data.forEach((item: any) => {
      const val = item.val();
      list.push(val);
    });
  });
  return {
    data: list
  };
}

export default { getList };