import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`text-align: right;`;

const Button = styled.button`
  background-color: ${props => (props.primary ? '#5b779e' : '#e0e0e0')};
  color: ${props => (props.primary ? '#eeeeee' : '#616161')};

  width: 140px;
  height: 30px;
  margin: 5px 20px 0px 0px;
  border: 0;
  padding: 0;
  border-radius: 4px;

  font-size: 12px;
  font-weight: 500;
  transition: ease 0.3s;

  &:hover,
  &:focus {
    opacity: 0.5;
  }
`;

class FormControls extends Component {
  render() {
    return (
      <Div>
        <Button>CANCEL</Button>
        <Button primary onClick={this.props.onSave}>
          SAVE
        </Button>
      </Div>
    );
  }
}

export default FormControls;
