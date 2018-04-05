import * as React from 'react';
import { FormGroup, FormControl, Grid, Row, Col} from 'react-bootstrap';
import { Input } from 'antd';
import { Select } from 'antd';

const Option = Select.Option;
const { TextArea } = Input;


function FieldGroup({ id, ...props }) {
  return (
    <FormGroup controlId={id}>
      <FormControl {...props} className="schedule-form"/>
    </FormGroup>
  );
}

class ManagerForm extends React.Component {

  render() {
    return (
      <div className="desc-container" id="consultation">
        <h1 className="title-container">{this.props.title}</h1>
        <br/>
        <Grid>
          <Row className="form-row">
            <form>
              <Col xs={12} md={6}>
                <FieldGroup
                  id="formControlsFirstName"
                  type="text"
                  placeholder="First Name*"
                />
              </Col>
              <Col xs={12} md={6}>
                <FieldGroup
                  id="formControlsLastName"
                  type="text"
                  placeholder="Last Name*"
                />
              </Col>
              <Col xs={12} md={12}>
                <FieldGroup id="formControlsEmail" placeholder="Email*" type="email" />
                <FieldGroup
                  id="formControlsCompany"
                  type="text"
                  placeholder="Phone Number*"
                />
                <FieldGroup id="formControlsNumber" placeholder="Unit Number*" type="number" />
                <br />
                <Select placeholder="Regarding*" className="form-select" >
                  <Option value="Association Management">Association</Option>
                  <Option value="Residential Property Management">Residential Property</Option>
                </Select>
                <Select placeholder="Associations (will be hidden)" className="form-select" >
                  <Option value="Association1">Association 1</Option>
                  <Option value="Assc 2">Association 2</Option>
                </Select>
                <TextArea className="form-message" placeholder="Message"  rows={4} />
                <button className="button-form" type="submit">SUBMIT</button>
              </Col>
            </form>
          </Row>
        </Grid>
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
