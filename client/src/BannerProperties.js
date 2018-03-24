import * as React from 'react';
import { Image, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import './index.css';
import { AutoComplete, Select, Button, Slider } from 'antd';
const { Option, OptGroup } = Select;

const marks = {
  0: '$0',
  1000000: '$1,000,000'
};

class MySlider extends React.Component {

  render() {
    return (
      <div>
        <Slider range marks={marks} max={1000000} step={100} defaultValue={[0, 1000000]} />
      </div>
    );
  }
}

function FieldGroup({ id, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} className="schedule-form"/>
    </FormGroup>
  );
}

const dataSource = ['Los Angeles, CA', 'Orange County, CA', 'San Diego, CA'];


class SearchForm extends React.Component {



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
              <Button type="primary" className="button-form search-button " icon="search" size="large">Search</Button>
              </Col>
          </form>
        </Row>
        <Row className="search-row">
          <Col xs={12} md={12}>
            <MySlider />
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
      key: 1
    };
  }

  handleSelect(key) {
    this.setState({ key });
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
        <Tab eventKey={1} title="RENT">
          <SearchForm />
        </Tab>
        <Tab eventKey={2} title="SALE">
          <SearchForm />
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
              <ControlledTabs/>
            </div>
          </div>
    );
  }
}


export default BannerProperties;
