import * as React from 'react';
import * as Loadable from 'react-loadable';
import Loading from './Loading';

const loadableComponent = (component: string) => {
  return Loadable({
    loader: () => import(`${component}`),
    modules: [component],
    webpack: () => [(require as any).resolveWeak(`${component}`)],
    loading() {
      return <Loading />;
    }
  });
};

export const Home = loadableComponent('./Home');
export const Login = loadableComponent('./Login');
export const Logout = loadableComponent('./Logout');
export const SignUp = loadableComponent('./SignUp');
export const MyPage = loadableComponent('./MyPage');
export const List = loadableComponent('./List');
export const Post = loadableComponent('./Post');
export const ResetPassword = loadableComponent('./ResetPassword');
