import React from 'react';
// import logo from './logo.svg';
import './index.css';
import Main from './Router'
import 'antd/dist/antd.css';
import Header from './components/Navigation/Header';
import MyNav from './components/Navigation/Navbar';


class App extends React.Component {
  static defaultProps = {
    headerHeight: 200,
    fadeInDistance: 40
  };

  constructor(props) {
    super(props);
    this.state = { navOpacity: 0 };
    this.updateNavOpacity = this.updateNavOpacity.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.updateNavOpacity);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.updateNavOpacity);
  }

  updateNavOpacity() {
    const navbarHeight = 70; // Bootstrap default
    const { headerHeight, fadeInDistance } = this.props;
    const endFade = headerHeight - navbarHeight;
    const startFade = endFade - fadeInDistance;
    const scrolly = window.scrollY;

    if (scrolly < startFade) {
      if (this.state.opacity === 0) return;
      this.setState({ navOpacity: 0 });
      return;
    }

    if (scrolly > endFade) {
      if (this.state.opacity === 1) return;
      this.setState({ navOpacity: 1 });
      return;
    }

    const pxPastStartFade = scrolly - startFade;
    const navOpacity = pxPastStartFade / (endFade - startFade);
    this.setState({ navOpacity });
  }

  render() {
    return (
      <div>
        <MyNav opacity={ this.state.navOpacity } />
        <Header height={ this.props.headerHeight } />
        <Main />
      </div>
    );
  }
}

export default App;
