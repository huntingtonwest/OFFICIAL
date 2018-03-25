import * as React from 'react';
import { DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

class Areas extends React.Component {

  render() {
    return (
      <div class="centerBlock">
        <ButtonToolbar className="areas">
          <DropdownButton className="areas" title={this.props.title} id="split-button-basic-1">
            <MenuItem className="areas" eventKey="1">Action</MenuItem>
            <MenuItem className="areas" eventKey="2">Another action</MenuItem>
            <MenuItem className="areas" eventKey="3">Something else here</MenuItem>
            <MenuItem className="areas" eventKey="4">Separated link</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}


export default Areas;
