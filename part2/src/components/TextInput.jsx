import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './Text';

const Wrapper = styled.span`
  display: inline-block;
  margin: 0px 20px 15px 0px;
`;

const Label = Text.extend`
  font-size: 13px;
  font-weight: 300;
  margin-bottom: 10px;
  display: block;
`;

const Input = styled.input`
  width: 220px;
  height: 16px;
  font-size: 13px;
  font-weight: 500;
  color: #616161;
  border-radius: 2px;
  border: solid 1px #e0e0e0;
  padding: 8px 0px 10px 10px;
`;

class TextInput extends Component {
  render() {
    console.log(this.props.readonly);
    return (
      <Wrapper>
        <label htmlFor={this.props.name}>
          <Label>{this.props.label}</Label>
        </label>
        <Input
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}
          readOnly={this.props.readonly}
          required
        />
      </Wrapper>
    );
  }
}

export default TextInput;
