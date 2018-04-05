import firebase from '../../firebase';

async function getList(params: {uid: string, type: string}) {
  let database: any = firebase.database();
  let listRef: any;
  let list: object[] = [];
  const { uid, type } = params;

  if (uid) {
    listRef = database.ref('users').child(`${uid}/list`).orderByChild('date');
  } else {
    listRef = database.ref('list').orderByChild('date');
  }

  await listRef[type]('value', (data: any) => {
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