import React, {Component} from 'react';
import {Button, Input, Card, Icon} from 'antd';
import EditNote from '../../../redux/editNote';
import {connect} from 'react-redux';
import moment from 'moment';

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      text: '',
    }
  }

  fetchEditNote = async (id, text) => {
    const response = await fetch(`/notes/${id}`, {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: this.state.text,
      })
    });

    const data = await response.json();
    if (data) {
      const {_id, text, updated} = data.updated;

      this.props.editNote(_id, text, updated);
    } else {
      alert('Wrong username or password!')
    }
  };

  editNote = (id, text) => {
    if (!this.state.isEditing) {
      // объедините setState
      this.setState({isEditing: true});
      this.setState({text});
    } else {
      this.fetchEditNote(id, text);
      this.setState({isEditing: false});
    }
  };

  nameChanger = (e) => {
    this.setState({text: e.target.value});
  };

  render() {
    const {note, id} = this.props;
    const created = moment(note.created)
      .locale('ru')
      .format('DD.MM.YYYY, hh:mm:ss');
    const updated = (note.updated !== null) ?
      (', отредактировано ' + moment(note.updated)
        .locale('ru')
        .format('DD.MM.YYYY, hh:mm:ss')) : null;
    return (
      <div>
        <li>
          <Card className="custom-card" bordered={true} >
            <div className="note-text">
            {this.state.isEditing ?
              <p className="note"><Input type="text" onChange={this.nameChanger}
                                         value={this.state.text}
                                         className="note-input"
                                         onPressEnter = {() => this.editNote(note._id, note.text)}
                                         autoFocus={true}
              /></p> :
              <p className="note"><b>{note.text}</b><br/>
                <span className="small-note-text">Создано: {created} {updated} </span></p>}
            </div>
            <p className="note-buttons">
              <Button size="small" type="button" onClick={() => this.editNote(note._id, note.text)}
                      className="btn btn-outline-danger btn-sm">
                <Icon type="edit" theme="outlined" />
              </Button>

              <Button size="small" onClick={() => this.props.onDeleted(id)}>
                <Icon type="delete" theme="outlined" />
              </Button>
            </p>

          </Card>

        </li>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editNote: (id, data, updated) => {
      dispatch(EditNote(id, data, updated))
    },
  }
}

export default connect(null, mapDispatchToProps)(Note)
