import * as React from 'react';
import { Image, Tabs, Tab, FormGroup, ControlLabel, FormControl, HelpBlock, Grid, Row, Col } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import './index.css';
import Slider from 'react-rangeslider'

class MySlider extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      horizontal: 1000000
    }
  }

  handleChangeHorizontal = value => {
    this.setState({
      horizontal: value
    })
  };

  render () {
    const { horizontal } = this.state
    const horizontalLabels = {
      0: '$0',
      1000000: '$1,000,000'
    }

    const formatkg = value => '$' + value

    return (
      <div className='slider custom-labels'>
        <Slider
          min={0}
          max={1000000}
          step={100}
          value={horizontal}
          labels={horizontalLabels}
          format={formatkg}
          onChange={this.handleChangeHorizontal}
        />
        <div className='value'>{formatkg(horizontal)}</div>
      </div>
    )
  }
}

function FieldGroup({ id, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} className="schedule-form"/>
    </FormGroup>
  );
}

class SearchForm extends React.Component {

    render() {
      return (
        <div>
        <Row className="search-row">
          <form className="search-form">
            <Col xs={12} md={5}>
              <FieldGroup
                id="formControlsLocation"
                type="text"
                placeholder="LOS ANGELES, CA"
              />
              </Col>
              <Col xs={3} md={2}>
              <FormGroup controlId="formControlsBed">
                <FormControl componentClass="select" placeholder="BED">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </FormControl>
              </FormGroup>
              </Col>

              <Col xs={3} md={2}>

              <FormGroup controlId="formControlsBath">
                <FormControl componentClass="select" placeholder="BATH">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </FormControl>
              </FormGroup>
              </Col>

              <Col xs={6} md={3}>
              <button className="button-form search-button" type="submit">Search</button>
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
