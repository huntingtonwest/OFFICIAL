import React from 'react';
// import logo from './logo.svg';
import ReactDOM from 'react-dom'

import './index.css';
import Main from './Router'
import 'antd/dist/antd.css';
import Header from './components/Navigation/Header';
import MyNav from './components/Navigation/Navbar';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      background: 'white',
      opacity: '0',
      color: 'black',
      logo: 'https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/Hwp%2BLogo%2BApproved.png',
      bg: 'rgba(255, 255, 255, 0.7)'
    }
    // this.handleScroll = this.handleScroll.bind(this);
    // this.myRef = React.createRef();
    this.listenScrollEvent = this.listenScrollEvent.bind(this)
  }

  listenScrollEvent() {
      if (window.scrollY < 100) {
        this.setState({bg: 'rgba(255, 255, 255, 0.7)', background: 'white', color: 'black', opacity: '0', logo: 'https://s3-us-west-1.amazonaws.com/huntingtonwest.com/static/media/Hwp%2BLogo%2BApproved.png'
});
      }
      else {
        this.setState({bg: 'rgba(0, 0, 0, 0.7)', background: 'rgba(0, 0, 0, 0.7)', color: 'white', opacity: '1', logo: 'https://s3.us-east-2.amazonaws.com/hwp-frontend/static/media/HWP+LOGO+BLUE+WINDOWS.png'
});
      }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.listenScrollEvent);
 }
 componentWillUnmount() {
    window.removeEventListener('scroll', this.listenScrollEvent);
 }


  render() {

    return (
      <div>
        <MyNav bg={this.state.bg} background={this.state.background} display={this.state.opacity} color={this.state.color} logo={this.state.logo}/>
        <Main />
      </div>
    );
  }
}

export default App;
