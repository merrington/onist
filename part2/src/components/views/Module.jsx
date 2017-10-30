import styled from 'styled-components';
import React, { Component } from 'react';
import Text from '../Text';
import ChildForm from './ChildForm';

const ordinals = [
  'First',
  'Second',
  'Third',
  'Fourth',
  'Fifth',
  'Sixth',
  'Seventh',
  'Eighth',
  'Ninth',
  'Tenth'
];

const ModuleBox = styled.div`
  width: 980px;
  border-radius: 2px;
  border: solid 1px #e0e0e0;
  margin: 19px 0px 20px 0px;
  background: ${props => (props.singleEditing ? '#f5f5f5' : '#ffffff')};
  display: flex;
  flex-direction: column;
`;

const ModuleTitle = Text.extend`
  display: block;
  font-size: 15px;
  margin: 11px 20px;
`;

const ChildSection = styled.span`
  background: ${props => (props.editing ? '#f5f5f5' : '#ffffff')};
  display: flex;

  &:last-of-type {
    padding-bottom: 20px;
  }
`;

const ChildHeaders = styled.span`
  display: flex;
  flex-direction: column;
  width: 238px;
  text-align: right;
  padding-right: 20px;
  border-right: solid 1px #eeeeee;
`;

const RemoveLink = styled.a`
  font-size: 13px;
  color: #939ea3;
  transition: ease 0.3s;

  &:hover {
    color: red;
    cursor: pointer;
  }
`;

function SingleChildLayout(props) {
  return (
    <ChildForm
      child={props.children[0]}
      editing={props.editing}
      saveChild={props.saveChild(0)}
      deleteChild={props.deleteChild}
    />
  );
}

function MultipleChildrenLayout(props) {
  return props.children.map((child, idx) => (
    <ChildSection
      key={idx}
      editing={idx === props.children.length - 1 && props.editing}
      className="childSection"
    >
      <ChildHeaders>
        <Text>{`${ordinals[idx] || ''} Child`}</Text>
        <RemoveLink onClick={() => props.deleteChild(idx)}>Remove</RemoveLink>
      </ChildHeaders>
      <ChildForm
        child={child}
        editing={idx === props.children.length - 1 && props.editing}
        saveChild={props.saveChild(idx)}
        deleteChild={props.deleteChild}
        header={props.children.length > 1}
      />
    </ChildSection>
  ));
}

export default class Module extends Component {
  render() {
    return (
      <ModuleBox
        singleEditing={this.props.children.length < 2 && this.props.editing}
      >
        <ModuleTitle>
          {this.props.children.length < 2 ? 'CHILD' : 'CHILDREN'}
        </ModuleTitle>
        <span style={{ paddingTop: '10px' }}>
          {this.props.children.length < 2 ? (
            <SingleChildLayout {...this.props} />
          ) : (
            <MultipleChildrenLayout {...this.props} />
          )}
        </span>
      </ModuleBox>
    );
  }
}
