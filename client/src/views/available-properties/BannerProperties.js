import * as React from 'react';
import { Tabs, Tab, Row, Col, Grid } from 'react-bootstrap';
import { AutoComplete, Select, Button } from 'antd';
import DoubleSelect from './DoubleSelect'
const { Option, OptGroup } = Select;
const rentMinOptions = ['No Min','$500','$750','$1,000','$1,250'];
const rentMaxOptions = ['No Max', '$500','$750','$1,000','$1,250'];
const priceMinOptions = ['No Min','$100,000','$200,000','$300,000','$400,000'];
const priceMaxOptions = ['No Max', '$100,000','$200,000','$300,000','$400,000'];

const bedMinOptions = ['No Min', 'Studio','1','2','3', '4', '5', '6', '7', '8', '9', '10'];
const bedMaxOptions = ['No Max', 'Studio','1','2','3', '4', '5', '6', '7', '8', '9', '10'];
const bathMinOptions = ['No Min', '1','1.5','2','3', '4', '5', '6', '7', '8', '9', '10'];
const bathMaxOptions = ['No Max', '1','1.5','2','3', '4', '5', '6', '7', '8', '9', '10'];


const dataSource = ['Los Angeles, CA', 'Orange County, CA', 'San Diego, CA'];

function removeCommas(str) {
  return(str.toString().replace(/,/g,''));
}

class SearchForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      rentMins: rentMinOptions,
      rentMaxs: rentMaxOptions,
      priceMins: priceMinOptions,
      priceMaxs: priceMaxOptions,
      bedMins: bedMinOptions,
      bedMaxs: bedMaxOptions,
      bathMins: bathMinOptions,
      bathMaxs: bathMaxOptions
    };
    console.log(this.state.rentMins);

    this.onSelectCity = this.onSelectCity.bind(this);
    this.onSelectBedMin = this.onSelectBedMin.bind(this);
    this.onSelectBedMax = this.onSelectBedMax.bind(this);
    this.onSelectBathMin = this.onSelectBathMin.bind(this);
    this.onSelectBathMax = this.onSelectBathMax.bind(this);
    this.onSelectRentMax = this.onSelectRentMax.bind(this);
    this.onSelectRentMin = this.onSelectRentMin.bind(this);
    this.handleReset = this.handleReset.bind(this);


  }

  handleReset() {
    // this.setState({
    //   rentMins: rentMinOptions,
    //   rentMaxs: rentMaxOptions,
    //   priceMins: priceMinOptions,
    //   priceMaxs: priceMaxOptions,
    //   bedMins: bedMinOptions,
    //   bedMaxs: bedMaxOptions,
    //   bathMins: bathMinOptions,
    //   bathMaxs: bathMaxOptions
    // });
    this.props.reset();
  }

  onSelectCity(value) {
    this.props.onSelect('city', value);
  }

  onSelectBedMin(value) {
    var numeric = Number((value == 'No Min') ? '-1' : (value == 'Studio' ? 0 : value));
    let filtered = bedMaxOptions.filter(val => {
      if (val == 'No Max') return true;
      if (val == 'Studio') return (numeric <= 0);
      return (Number(val) >= numeric);
    });

    this.setState({bedMaxs: filtered});
    this.props.onSelect('minBed', numeric);
  }
  onSelectBedMax(value) {
    var numeric = Number((value == 'No Max') ? Number.MAX_SAFE_INTEGER : (value == 'Studio' ? 0 : value));
    let filtered = bedMinOptions.filter(val => {
      if (val == 'No Min') return true;
      if (val == 'Studio') return (numeric >= 0);
      return (Number(val) <= numeric);
    });

    this.setState({bedMins: filtered});

    this.props.onSelect('maxBed', numeric);
  }
  onSelectBathMin(value) {
    var numeric = Number((value == 'No Min') ? '-1' : value);
    let filtered = bathMaxOptions.filter(val => {
      if (val == 'No Max') return true;
      return (Number(val) >= numeric);
    });

    this.setState({bathMaxs: filtered});
    this.props.onSelect('minBath', numeric);
  }
  onSelectBathMax(value) {
    var numeric = Number((value == 'No Max') ? Number.MAX_SAFE_INTEGER : value);
    let filtered = bathMinOptions.filter(val => {
      if (val == 'No Min') return true;
      return (Number(val) <= numeric);
    });

    this.setState({bathMins: filtered});

    this.props.onSelect('maxBath', numeric);
  }
  onSelectRentMin(value) {

    var rent = Number((value == 'No Min') ? '-1' : Number(removeCommas(value.substring(1))));
    var options = this.props.type == 'sale' ? priceMaxOptions : rentMaxOptions;
    let filtered = options.filter(val => {
      if (val == 'No Max') return true;
      return (Number(removeCommas(val.substring(1))) >= rent);
    });

    if (this.props.type == 'sale') this.setState({priceMaxs: filtered});
    else this.setState({rentMaxs: filtered});

    this.props.onSelect('minRent', rent);
  }
  onSelectRentMax(value) {
    var numeric = Number((value == 'No Max') ? Number.MAX_SAFE_INTEGER : removeCommas(value.substring(1)));
    var options = this.props.type == 'sale' ? priceMinOptions : rentMinOptions;
    let filtered = options.filter(val => {
      if (val == 'No Min') return true;
      return (Number(removeCommas(val.substring(1))) <= numeric);
    });
    if (this.props.type == 'sale') this.setState({priceMins: filtered});
    else this.setState({rentMins: filtered});

    this.props.onSelect('maxRent', numeric);

  }

    render() {
      return (
        <div className="search-cont">
        <Grid className="my-search-grid">
        <Row className="search-row location-row">
            <Col xs={12} sm={9} lg={9}>
            <Row>
              <AutoComplete
                className="location-form"
                id="location"
                style={{ borderRadius: 0, width:'98%', float: 'left' }}
                dataSource={dataSource}
                placeholder="Location"
                onSelect={this.onSelectCity}
                filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
              />
</Row>
<Row className="double-row">
<Col xs={12} sm={4} lg={4} className="double-col">

              <DoubleSelect
              className="r-select"
              title='PRICE'
              minOptions={this.props.type == 'sale' ? this.state.priceMins : this.state.rentMins}
              maxOptions={this.props.type == 'sale' ? this.state.priceMaxs : this.state.rentMaxs}
              onSelectMin={this.onSelectRentMin}
              onSelectMax={this.onSelectRentMax}/>
</Col>
<Col xs={12} sm={4} lg={4} className="double-col">

              <DoubleSelect
              className="b-select"
              title='BED'
              minOptions={this.state.bedMins}
              maxOptions={this.state.bedMaxs}
              onSelectMin={this.onSelectBedMin}
              onSelectMax={this.onSelectBedMax}/>
              </Col>
              <Col xs={12} sm={4} lg={4} className="double-col">
              <DoubleSelect
              className="b-select"
              title='BATH'
              minOptions={this.state.bathMins}
              maxOptions={this.state.bathMaxs}
              onSelectMin={this.onSelectBathMin}
              onSelectMax={this.onSelectBathMax}/>
              </Col>
              </Row>
            </Col>
            <Col xs={12} sm={3} lg={3} className="search-col">
            <Row>
              <Button onClick={this.props.onClick} className="button-form search-button " icon="search">Search</Button>
</Row>
<Row className="reset-col">
              <Button onClick={this.handleReset} className="button-form reset-button " >Reset</Button>
</Row>
            </Col>
        </Row>
        </Grid>
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
          <SearchForm type='rent' reset={this.props.reset} onClick={this.props.onClick} onSelect={this.props.onSelect}/>
        </Tab>
        <Tab eventKey={'sale'} title="SALE">
          <SearchForm type='sale' reset={this.props.reset} onClick={this.props.onClick} onSelect={this.props.onSelect}/>
        </Tab>
      </Tabs>
    );
  }
}


class BannerProperties extends React.Component {
  render() {
    return (
          <div className="text-center search-banner-2">
            <div className="search-inner">
              <h1 className="search-title-banner">{this.props.title}</h1>
              <br />
              <ControlledTabs className="search-tab-container" reset={this.props.reset} onClick={this.props.onClick} onSelect={this.props.onSelect}/>
            </div>
          </div>
    );
  }
}


export default BannerProperties;

//
//
// <div className="search-cont">
// <Row className="search-row location-row">
//     <Col xs={12} md={9}>
//       <AutoComplete size={'lg'}
//         className="location-form"
//         id="location"
//         style={{ borderRadius: 0, width:734, float: 'left' }}
//         dataSource={dataSource}
//         placeholder="Location"
//         onSelect={this.onSelectCity}
//         filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
//       />
//     </Col>
//     <Col xs={12} md={3} className="search-col">
//       <Button onClick={this.props.onClick} className="button-form search-button " icon="search">Search</Button>
//     </Col>
// </Row>
// <Row className="search-row">
//   <Col xs={12} md={3}>
//   <DoubleSelect
//   className="r-select"
//   title='PRICE'
//   minOptions={this.props.type == 'sale' ? this.state.priceMins : this.state.rentMins}
//   maxOptions={this.props.type == 'sale' ? this.state.priceMaxs : this.state.rentMaxs}
//   onSelectMin={this.onSelectRentMin}
//   onSelectMax={this.onSelectRentMax}/>
//   </Col>
//   <Col xs={12} md={3}>
//   <DoubleSelect
//   className="b-select"
//   title='BED'
//   minOptions={this.state.bedMins}
//   maxOptions={this.state.bedMaxs}
//   onSelectMin={this.onSelectBedMin}
//   onSelectMax={this.onSelectBedMax}/>
//   </Col>
//   <Col xs={12} md={3}>
//   <DoubleSelect
//   className="b-select"
//   title='BATH'
//   minOptions={this.state.bathMins}
//   maxOptions={this.state.bathMaxs}
//   onSelectMin={this.onSelectBathMin}
//   onSelectMax={this.onSelectBathMax}/>
//   </Col>
//   <Col xs={12} md={3} className="reset-col">
//     <Button onClick={this.handleReset} className="button-form reset-button " >Reset</Button>
//   </Col>
// </Row>
// </div>
