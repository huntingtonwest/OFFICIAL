import * as React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { AutoComplete, Select, Button } from 'antd';
import DoubleSelect from './DoubleSelect'
const { Option, OptGroup } = Select;
const rentMinOptions = ['No Min','$500','$750','$1,000','$1,250'];
const rentMaxOptions = ['$500','$750','$1,000','$1,250', 'No Max'];
const bedMinOptions = ['No Min', 'Studio','1','2','3', '4', '5', '6', '7', '8', '9', '10'];
const bedMaxOptions = ['Studio','1','2','3', '4', '5', '6', '7', '8', '9', '10','No Max'];
const bathMinOptions = ['No Min', '1','1.5','2','3', '4', '5', '6', '7', '8', '9', '10'];
const bathMaxOptions = ['1','1.5','2','3', '4', '5', '6', '7', '8', '9', '10','No Max'];


const dataSource = ['Los Angeles, CA', 'Orange County, CA', 'San Diego, CA'];


class SearchForm extends React.Component {

  constructor(props) {
    super(props);

    this.onSelectCity = this.onSelectCity.bind(this);
    this.onSelectBedMin = this.onSelectBedMin.bind(this);
    this.onSelectBedMax = this.onSelectBedMax.bind(this);
    this.onSelectBathMin = this.onSelectBathMin.bind(this);
    this.onSelectBathMax = this.onSelectBathMax.bind(this);
    this.onSelectRentMax = this.onSelectRentMax.bind(this);
    this.onSelectRentMin = this.onSelectRentMin.bind(this);

  }

  onSelectCity(value) {
    this.props.onSelect('city', value);
  }

  onSelectBedMin(value) {
    this.props.onSelect('minBed', (value == 'No Min') ? '-1' : value);
  }
  onSelectBedMax(value) {
    this.props.onSelect('maxBed', (value == 'No Max') ? Number.MAX_SAFE_INTEGER : value);
  }
  onSelectBathMin(value) {
    this.props.onSelect('minBath', (value == 'No Min') ? '-1' : value);
  }
  onSelectBathMax(value) {
    this.props.onSelect('maxBath', (value == 'No Max') ? Number.MAX_SAFE_INTEGER : value);
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
            <Col xs={12} md={12}>
              <AutoComplete
                className="location-form"
                style={{ borderRadius: 0, width:734, float: 'left' }}
                dataSource={dataSource}
                placeholder="Location"
                onSelect={this.onSelectCity}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
            </Col>

          </form>
        </Row>
        <Row className="search-row">
          <Col xs={12} md={3}>
          <DoubleSelect
          className="r-select"
          title='PRICE'
          minOptions={rentMinOptions}
          maxOptions={rentMaxOptions}
          onSelectMin={this.onSelectRentMin}
          onSelectMax={this.onSelectRentMax}/>
          </Col>
          <Col xs={6} md={3}>
          <DoubleSelect
          className="b-select"
          title='BED'
          minOptions={bedMinOptions}
          maxOptions={bedMaxOptions}
          onSelectMin={this.onSelectBedMin}
          onSelectMax={this.onSelectBedMax}/>
          </Col>
          <Col xs={6} md={3}>
          <DoubleSelect
          className="b-select"
          title='BATH'
          minOptions={bathMinOptions}
          maxOptions={bathMaxOptions}
          onSelectMin={this.onSelectBathMin}
          onSelectMax={this.onSelectBathMax}/>
          </Col>
          <Col xs={12} md={3}>
            <Button onClick={this.props.onClick} type="primary" className="button-form search-button " icon="search" size="large">Search</Button>
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
