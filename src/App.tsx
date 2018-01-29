import * as React from 'react';
import { Route } from 'react-router-dom';
import { Home, About, Counter } from './components/pages';
import Menu from './components/Menu';
import { Helmet } from 'react-helmet';

interface Props {}

interface State {
  test: string;
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      test: 'test'
    };
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>React App Starter</title>
        </Helmet>
        <div>
          <Menu/>
          <Route exact={true} path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/counter" component={Counter}/>
        </div>
      </div>
    );
  }
}

export default App;
