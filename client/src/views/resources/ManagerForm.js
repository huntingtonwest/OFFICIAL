import * as React from 'react';
import { FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import { Input } from 'antd';
import { Select } from 'antd';
import CitySearch from './CitySearch';
import ReCAPTCHA from 'react-google-recaptcha';
import { Modal } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;

function onChange(value) {
  console.log("Captcha value:", value);
}

function FieldGroup({ id, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} className="schedule-form"/>
    </FormGroup>
  );
}

class ManagerForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showAssociations: {
        display: 'none'
      },
      options: [],
      subject: '',
      association: '',
      captcha: false,
      modalVisible: false,
      errors: [],
      status: 'Error'
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.selectAssociation = this.selectAssociation.bind(this);
    this.handleCaptcha = this.handleCaptcha.bind(this);

  }


  handleCaptcha(value) {
    this.setState({captcha: true});
  }



  postForm = (e) => {
    e.preventDefault();
    if (!this.state.captcha) {
      this.setState({errors: ['Captcha is required'], status: 'Error', modalVisible: true});
      return;
    }
    const data = new FormData(e.target);
    data.set('subject', this.state.subject);
    if (this.state.subject == 'Association')
      data.set('association', this.state.association);

    fetch('https://realhwptest.herokuapp.com/contact-form', {
      method: 'POST',
      body: data
    }).then(response => response.json())
    .then(response => {

      if (response.status == 'error') {
        var arr = [];
        for(var i in response.errors)
            arr.push([i, response.errors [i]]);
        let errors = arr.map((error) => {
          return (
            <li>{error[0] + ': ' + error[1]}</li>
          );
        });
        this.setState({errors: errors, status: 'Error', modalVisible: true});
      }
      else {
        this.setState({errors: ['Form was sent!'], status: 'Success!', modalVisible: true});
      }
    });
  }

  setModalVisible(modalVisible) {
    this.setState({ modalVisible });
  }


  handleSelect(e) {
    if (e == 'Association') {
      this.setState({showAssociations: {
        display: 'block'
      }, subject: 'Association'});
    }
    else {
      this.setState({showAssociations: {
        display: 'none'
      }, subject: 'Residential Property'});
    }
  }

  selectAssociation(association) {
    this.setState({association: association});
    console.log(association);
  }

  fetchData = () => {
    fetch('https://realhwptest.herokuapp.com/get-associations')
    .then(results => {
      return results.json();
    }).then(data => {
      var cities = [];
      var options = [];
      for(var i in data.associations)
          cities.push([i, data.associations [i]]);

      cities.map((city) => {
        var asscs = city[1];
        var options = [];
        for (var i = 0; i < asscs.length; i++) {
          var opt = (<Option key={asscs[i]} value={asscs[i]}>{asscs[i]}</Option>)
          options.push(opt);
        }
        // return options;
      });
      //
      this.setState({options: options});

    });
  }

  componentWillMount() {
    this.fetchData();
  }


  render() {
    return (
      <div className="desc-container" id="consultation">
        <h1 className="title-container">{this.props.title}</h1>
        <br/>
        <br/>
        <br/>

        <Grid className="about-desc" >
          <Row className="mission-row">
            <form onSubmit={this.postForm}>
              <Col xs={12} md={6}>
                <FieldGroup
                  id="formControlsFirstName"
                  type="text"
                  placeholder="First Name*"
                  name="first_name"
                />
              </Col>
              <Col xs={12} md={6}>
                <FieldGroup
                  id="formControlsLastName"
                  type="text"
                  placeholder="Last Name*"
                  name="last_name"

                />
              </Col>
              <Col xs={12} md={12} className="form-col">
                <FieldGroup id="formControlsEmail" placeholder="Email*" type="email"  name="email"
/>
                <FieldGroup
                  id="formControlsCompany"
                  type="text"
                  placeholder="Phone Number*"
                  name="phone_num"

                />
                <FieldGroup id="formControlsNumber" placeholder="Unit Number*" type="number"
                name="unit"
/>
                <br />
                <Select placeholder="Regarding*" className="form-select" name="subject" onSelect={this.handleSelect}>
                  <Option value="Association">Association</Option>
                  <Option value="Residential">Residential Property</Option>
                </Select>

                <CitySearch style={this.state.showAssociations} selectAssociation={this.selectAssociation} name="association"/>
                <TextArea className="form-message" placeholder="Message"       name="msg"
rows={4} />
<div className="captcha-cont">
<ReCAPTCHA
ref="recaptcha"
sitekey="6LdnPVIUAAAAAPz5aMwGu0MffoRD-qQA4-R376RN"
onChange={this.handleCaptcha}
/>
</div>
<div className="button-cont">
                <button className="button-form" type="submit">SUBMIT</button>
                </div>
              </Col>
            </form>
          </Row>
        </Grid>
        <Modal
        title={this.state.status}
        wrapClassName="vertical-center-modal"
        visible={this.state.modalVisible}
        onCancel={() => this.setModalVisible(false)}
        footer={[
        ]}
        >
      {this.state.errors}
    </Modal>
      </div>
    );
  }


  // constructor(props, context) {
  //   super(props, context);
  //
  //   this.handleChange = this.handleChange.bind(this);
  //
  //   this.state = {
  //     value: ''
  //   };
  // }
  //
  // getValidationState() {
  //   const length = this.state.value.length;
  //   if (length > 10) return 'success';
  //   else if (length > 5) return 'warning';
  //   else if (length > 0) return 'error';
  //   return null;
  // }
  //
  // handleChange(e) {
  //   this.setState({ value: e.target.value });
  // }
  //
  // render() {
  //   return (
  //     <form>
  //       <FormGroup
  //         controlId="formBasicText"
  //         validationState={this.getValidationState()}
  //       >
  //         <ControlLabel>Working example with validation</ControlLabel>
  //         <FormControl
  //           type="text"
  //           value={this.state.value}
  //           placeholder="Enter text"
  //           onChange={this.handleChange}
  //         />
  //         <FormControl.Feedback />
  //         <HelpBlock>Validation is based on string length.</HelpBlock>
  //       </FormGroup>
  //     </form>
  //   );
  // }
}

export default ManagerForm;
