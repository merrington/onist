import React, { Component } from 'react';
import Text from './components/Text';
import Radio from './components/RadioButton';
import Module from './components/views/Module';

const TitleStep = Text.extend`
  display: block;
  font-size: 17px;
  font-weight: 500;
  margin: 21px 15px 21px 0px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasChildren: undefined,
      children: [],
      editing: false
    };
  }

  setHasChildren = event => {
    const hasChildren = event.currentTarget.value === 'true';
    this.setState({
      hasChildren,
      children: [{}],
      editing: true
    });
  };

  handleOtherChildren = event => {
    if (event.currentTarget.value === 'true') {
      const children = this.state.children.slice();
      children.push({});
      this.setState({
        children,
        editing: true
      });
    }
  };

  saveChild = idx => {
    return child => {
      const children = this.state.children.slice();
      children.splice(idx, 1, child);

      this.setState({
        children,
        editing: false
      });
    };
  };

  deleteChild = childIdx => {
    const children = this.state.children.slice();
    children.splice(childIdx, 1);
    this.setState({
      children
    });
  };

  render() {
    return (
      <div>
        <TitleStep>Children</TitleStep>
        <Text>Do you have any children?</Text>
        <Radio
          name="hasChildren"
          options={[
            {
              label: 'Yes',
              value: 'true'
            },
            {
              label: 'No',
              value: 'false'
            }
          ]}
          onChange={this.setHasChildren}
        />

        {this.state.hasChildren && (
          <Module
            children={this.state.children}
            editing={this.state.editing}
            saveChild={this.saveChild}
            deleteChild={this.deleteChild}
          />
        )}
        {this.state.hasChildren && !this.state.editing ? (
          <span>
            <Text>Do you have any other children?</Text>
            <Radio
              name="hasOtherChildren"
              options={[
                {
                  label: 'Yes',
                  value: 'true'
                },
                {
                  label: 'No',
                  value: 'false'
                }
              ]}
              onChange={this.handleOtherChildren}
            />
          </span>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default App;
