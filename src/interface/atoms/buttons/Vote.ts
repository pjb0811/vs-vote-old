export interface Props {
  item: {
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
    uid: string;
  };
  target: string;
  onVote: Function;
}
