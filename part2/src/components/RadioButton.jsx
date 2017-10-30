import React, { Component } from 'react';
import styled from 'styled-components';
import Text from './Text';

const Container = styled.span`
  position: relative;

  label.outer {
    position: absolute;
    width: 14px;
    height: 14px;
    border: 1px solid #616161;
    border-radius: 100%;
  }

  label.value {
    position: absolute;
    width: 8px;
    height: 8px;
    border-radius: 100%;
    top: 4px;
    left: 4px;
  }

  input:checked + label.value {
    background: #616161;
  }
`;

function RadioButton(props) {
  return (
    <span style={{ marginLeft: '15px' }}>
      <Container>
        <input
          type="radio"
          name={props.name}
          value={props.value}
          id={`${props.name}_${props.value}`}
          style={{ display: 'none' }}
          onChange={props.onChange}
          checked={props.checked}
        />
        <label htmlFor={`${props.name}_${props.value}`} className="value" />
        <label htmlFor={`${props.name}_${props.value}`} className="outer" />
        <label
          htmlFor={`${props.name}_${props.value}`}
          style={{ marginLeft: '19px' }}
        >
          <Text>{props.label}</Text>
        </label>
      </Container>
    </span>
  );
}

export default class Radio extends Component {
  render() {
    return this.props.options.map((option, idx) => (
      <RadioButton
        key={idx}
        name={this.props.name}
        onChange={this.props.onChange}
        checked={this.props.value && this.props.value === option.value}
        {...option}
      />
    ));
  }
}
