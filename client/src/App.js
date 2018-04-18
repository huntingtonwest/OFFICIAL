import React from 'react';
// import logo from './logo.svg';
import ReactDOM from 'react-dom'
import './css/bootstrap/css/bootstrap.min.css';
import './css/bootstrap/css/bootstrap-theme.min.css';
import './css/index.css';
import Main from './Router'
import 'antd/dist/antd.css';
import Header from './components/Navigation/Header';
import MyNav from './components/Navigation/Navbar';
import { ParallaxProvider } from 'react-scroll-parallax';


class App extends React.Component {

  render() {

    return (
      <div id="holder">
        <MyNav />
          <ParallaxProvider>

    <Main />
  </ParallaxProvider>
      </div>
    );
  }
}

export default App;
