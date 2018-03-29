import * as React from 'react';
import { Tabs, Tab, Row, Col } from 'react-bootstrap';
import { AutoComplete, Select, Button } from 'antd';
const { Option, OptGroup } = Select;


const dataSource = ['Los Angeles, CA', 'Orange County, CA', 'San Diego, CA'];


class SearchForm extends React.Component {

  constructor(props) {
  super(props);

  this.onSelectBed = this.onSelectBed.bind(this);
  this.onSelectBath = this.onSelectBath.bind(this);
  this.onSelectCity = this.onSelectCity.bind(this);

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

    render() {
      return (
        <div>
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
              <ControlledTabs onClick={this.props.onClick} onSelect={this.props.onSelect}/>
            </div>
          </div>
    );
  }
}


export default BannerProperties;
