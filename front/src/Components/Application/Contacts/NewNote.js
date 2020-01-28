import React, {Component} from 'react';

import {connect} from 'react-redux';
import AddNoteToList from '../../../redux/addNote'
import { Input, Button } from 'antd';
const { TextArea } = Input;

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    }
  }

  onChange = (name) => (e) => {
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState)
  };

  onSubmit = () => {

    this.props.submit([this.state.text, this.props.id]);
    this.setState({text: ''});

    console.log('rrr', this.props.notes)
  };

  render() {
    return (
      <div>
          <TextArea value={this.state.text} onChange={this.onChange('text')} />
        <Button onClick={this.onSubmit} style={{marginTop: '10px'}} block>Коммент!</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.id,
    currentContact: state.currentContact,
    notes: state.notes
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submit: (data) => {
      dispatch( AddNoteToList(data) )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddNote)
