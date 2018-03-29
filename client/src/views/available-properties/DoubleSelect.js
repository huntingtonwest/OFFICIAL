import * as React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { AutoComplete, Select, Button } from 'antd';
const { Option, OptGroup } = Select;
const enhanceWithClickOutside = require('react-click-outside');


class DoubleSelect extends React.Component {

  state = {
    activeMenu: 'min',
    open: false,
    min: 'No Min',
    max: 'No Max',
    title: this.props.title
  };

  toggleMenu = e => {
    this.setState({
      activeMenu: e.target.name
    });
  };

  toggleOpen = () => {
    this.setState( prevState => {
      return { open: !prevState.open }
    });
  };

  getMenuOptions = () => {
    let options = [];
    switch(this.state.activeMenu){
      case 'min': {
        options = this.props.minOptions;
        break;
      }
      case 'max': {
        options = this.props.maxOptions;
        break;
      }
    }

    return options.map( (option, i) => {
      return (
        <li key={i} onClick={this.handleSelect.bind(this, this.state.activeMenu, option)}>
          {option}
        </li>
      )
    });
  };

  handleClickOutside = () => {
    this.setState({
       open: false
    });
  };

  handleSelect = (menu, value) => {
    this.setState({
      [menu]: value
    }, () => {
      var title = this.props.title;
      if (this.state.min != 'No Min' || this.state.max != 'No Max') {
        if (this.state.max == 'No Max')
          title += ': ' + this.state.min + '+';
        else if (this.state.min == 'No Min')
          title += ': < ' + this.state.max;
        else title += ': ' + this.state.min + ' - ' + this.state.max;
      }
      this.setState({
        title: title
      });
    });

    if(this.state.activeMenu == 'min') {
      this.setState({
        activeMenu: 'max'
      });
      this.props.onSelectMin(value);
    }
    else {
      this.setState({
        activeMenu: 'min'
      });
      this.toggleOpen();
      this.props.onSelectMax(value);
    }
  };

  render() {
    const { open, min, max, activeMenu, title } = this.state;
    const menuOptions = this.getMenuOptions();
    return (
      <div className="search-select">
        <span onClick={this.toggleOpen} >{title}</span>
        {open && (
          <div className="search-content">
            <div className="search-content-inputs">
              <input className="search-content-input input-left" type="text" name="min" value={min} onFocus={this.toggleMenu} autoFocus />
              —
              <input className="search-content-input input-right" type="text" name="max" value={max} onFocus={this.toggleMenu} />
            </div>
            <div>
              <ul className={activeMenu} onBlur={ this.toggleOpen }>
                {menuOptions}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default enhanceWithClickOutside(DoubleSelect);
