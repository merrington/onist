import React, { Component } from 'react';
import styled from 'styled-components';
import TextInput from '../TextInput';
import FormControls from '../FormControls';

const Span = styled.span`
  flex-grow: 1;
  padding-left: 20px;
`;

class ChildForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.child.firstName || '',
      lastName: props.child.lastName || ''
    };
  }

  handleSave = event => {
    this.props.saveChild({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });
  };

  render() {
    const readonly = !this.props.editing;
    return (
      <Span editing={this.props.editing}>
        <TextInput
          name="firstName"
          label="First Name*"
          value={this.state.firstName}
          onChange={event =>
            this.setState({ firstName: event.currentTarget.value })}
          readonly={readonly}
        />
        <TextInput
          name="lastName"
          label="Last Name*"
          value={this.state.lastName}
          onChange={event =>
            this.setState({ lastName: event.currentTarget.value })}
          readonly={readonly}
        />
        {this.props.editing && <FormControls onSave={this.handleSave} />}
      </Span>
    );
  }
}

export default ChildForm;
