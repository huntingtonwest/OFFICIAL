import * as React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class AssociationSearch extends React.Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
     val: null,
     associations: []
   };
  }
  handleChange(value) {
    this.setState({
      val: value
    });
    console.log(value);
  }
  render() {
    return (
      <Select
        showSearch
        style={{ width: 500 }}
        placeholder="ASSOCIATION NAME"
        optionFilterProp="children"
        onChange={this.handleChange}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        <Option value="Anaheim">Anaheim</Option>
        <Option value="Brea">Brea</Option>
        <Option value="Buena Park">Buena Park</Option>
        <Option value="Corona">Corona</Option>
        <Option value="Costa Mesa">Costa Mesa</Option>
      </Select>
    );
  }
}

export default AssociationSearch;
