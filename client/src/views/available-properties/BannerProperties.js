import * as React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { AutoComplete, Select, Button } from 'antd';
const { Option, OptGroup } = Select;


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
        options = ['No Min','$1000','$2000','$3000','$4000'];
        break;
      }
      case 'max': {
        options = ['$1000','$2000','$3000','$4000','No Max'];
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

  handleSelect = (menu, value) => {
    this.setState({
      [menu]: value
    }, () => {
      var title = 'Price';
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
    return(
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
              <ul className={activeMenu}>
                {menuOptions}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }
}


const dataSource = ['Los Angeles, CA', 'Orange County, CA', 'San Diego, CA'];


class SearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.onSelectBed = this.onSelectBed.bind(this);
    this.onSelectBath = this.onSelectBath.bind(this);
    this.onSelectCity = this.onSelectCity.bind(this);
    this.onSelectRentMax = this.onSelectRentMax.bind(this);
    this.onSelectRentMin = this.onSelectRentMin.bind(this);

  }

  onSelectCity(value) {
    this.props.onSelect('city', value);
  }

  onSelectBed(value) {
   this.props.onSelect('bed', value);
  }
  onSelectBath(value) {
   this.props.onSelect('bath', value);
  }
  onSelectRentMin(value) {
    var rent = (value == 'No Min') ? '-1' : value.substring(1);
    console.log("rent is", rent);
   this.props.onSelect('minRent', rent);
  }
  onSelectRentMax(value) {
    var rent = (value == 'No Max') ? Number.MAX_SAFE_INTEGER : value.substring(1);
    console.log("rent is", rent);
   this.props.onSelect('maxRent', rent);
  }

    render() {
      return (
        <div className="search-cont">
        <Row className="search-row">
          <form className="search-form">
            <Col xs={12} md={5}>
              <AutoComplete
                className="location-form"
                style={{ borderRadius: 0 }}
                dataSource={dataSource}
                placeholder="Location"
                onSelect={this.onSelectCity}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
            </Col>
            <Col xs={3} md={2}>
              <Select
                className="dropdown-form"
                showSearch
                style={{ }}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder="BED"
                onSelect={this.onSelectBed}
              >
                <OptGroup label="BED">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                  <Option value="7">7</Option>
                  <Option value="8">8</Option>
                  <Option value="9">9</Option>
                  <Option value="10">10</Option>
                </OptGroup>
              </Select>
            </Col>
            <Col xs={3} md={2}>
              <Select
                className="dropdown-form"
                showSearch
                style={{ }}
                optionFilterProp="children"
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                placeholder="BATH"
                onSelect={this.onSelectBath}
              >
                <OptGroup label="BATH">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
                <Option value="5">5</Option>
                <Option value="6">6</Option>
                <Option value="7">7</Option>
                <Option value="8">8</Option>
                <Option value="9">9</Option>
                <Option value="10">10</Option>
                </OptGroup>
              </Select>
            </Col>
            <Col xs={6} md={3}>
              <Button onClick={this.props.onClick} type="primary" className="button-form search-button " icon="search" size="large">Search</Button>
            </Col>
          </form>
        </Row>
        <Row className="search-row">
          <Col xs={12} md={12}>
          <DoubleSelect title='Price' onSelectMin={this.onSelectRentMin} onSelectMax={this.onSelectRentMax}/>
          </Col>
        </Row>
      </div>
    );
  }
}


class ControlledTabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      key: 'rent'
    };
  }

  handleSelect(key) {

    this.setState({ key }, () => {
      this.props.onSelect('type', key);
    });
  }

  render() {
    return (
      <Tabs
        activeKey={this.state.key}
        onSelect={this.handleSelect}
        id="controlled-tab-example"
        bsStyle="pills"
        className="search-tabs"
      >
        <Tab eventKey={'rent'} title="RENT">
          <SearchForm type='rent' onClick={this.props.onClick} onSelect={this.props.onSelect}/>
        </Tab>
        <Tab eventKey={'sale'} title="SALE">
          <SearchForm type='sale'onClick={this.props.onClick} onSelect={this.props.onSelect}/>
        </Tab>
      </Tabs>
    );
  }
}


class BannerProperties extends React.Component {
  render() {
    return (
          <div className="text-center search-banner">
            <div className="search-inner">
              <h1 className="search-title-banner">{this.props.title}</h1>
              <br />
              <ControlledTabs className="search-tab-container"onClick={this.props.onClick} onSelect={this.props.onSelect}/>
            </div>
          </div>
    );
  }
}


export default BannerProperties;
