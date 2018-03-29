import React from 'react';
// import logo from './logo.svg';
import './index.css';
import Main from './Router'
import 'antd/dist/antd.css';
import Header from './components/Navigation/Header';
import MyNav from './components/Navigation/Navbar';


class App extends React.Component {

  render() {
    return (
      <div>
        <MyNav />
        <Main />
      </div>
    );
  }
}

export default App;
