import React, {Component} from 'react';

import {connect} from 'react-redux';
import AddNoteToList from '../../../redux/addNote'
import { Input, Button } from 'antd';
const { TextArea } = Input;

class NewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: ''
    }
  }

  fetchAddNote = async (formData) => {
    const {text, creatorId} = formData;
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text,
        creatorId
      })
    });

    const data = await response.json();
    if (data) {
      const dataToProps = data.newNote;
      this.props.submit(dataToProps);
    } else {
      console.log('Wrong username or password!');
    }
  };

  onChange = (name) => (e) => {
    const newState = {};
    newState[name] = e.target.value;
    this.setState(newState)
  };

  onSubmit = () => {
    this.setState({text: ''});
    this.fetchAddNote({
      text: this.state.text,
      creatorId: this.props.currentContact._id
    });
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

export default connect(mapStateToProps, mapDispatchToProps)(NewNote)
