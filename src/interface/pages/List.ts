export interface Props {
  ListActions: {
    requestList: (params: { uid: string }) => {};
  };
  list: ListData;
  match?: {
    params: {
      uid: string;
    };
  };
}

interface ListData {
  pending: boolean;
  error: boolean;
  data: [
    {
      key: string;
      detail: string;
      first: {
        file: string;
        title: string;
        count: number;
      };
      second: {
        file: string;
        title: string;
        count: number;
      };
    }
  ];
  toJS: Function;
}
