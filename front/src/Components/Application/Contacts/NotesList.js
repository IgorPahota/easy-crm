import React, {Component} from 'react';
import Note from "./Note";
import {connect} from 'react-redux'
import NewNote from './NewNote';
import DeleteNote from '../../../redux/deleteNote';

class NotesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: ''
    }
  }

  fetchDeleteNote = async (id) => {
    const response = await fetch(`/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data) {
    }
  };

  deleteOneNote = (id) => {
    this.fetchDeleteNote(id);
    this.props.deleteNote(id);
  };

  render() {
    return (
      <div className="notes-content">
        <ul className="notes-list">
        {this.props.notes.map( (note, i) =>
          <Note userId={this.props.currentContact._id}
                note={note}
                key={i}
                id={note._id}
                onDeleted={this.deleteOneNote}
                />
        )}
        </ul>
        <NewNote userId={this.props.currentContact._id} />
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentContact: state.currentContact,
    notes: state.notes,
    id: state.id
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNote: (id) => {
      dispatch( DeleteNote(id) )
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList)
