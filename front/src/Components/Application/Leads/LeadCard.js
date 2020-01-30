import React, {Component} from 'react';
import { AutoComplete } from 'antd';
import {connect} from 'react-redux';

function onSelect(value) {
  console.log('onSelect', value);
}

class LeadCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      dataSource: '',
      leadDetails: '',
      isLoading: true,
    }
  }

  onChange = value => {
    this.setState({value});
  };


  componentDidMount() {
    fetch("/contacts/created/5e31adb7809d007eb9954cae")
      .then(res => res.json())
      .then(dataSource =>
        this.setState({dataSource, isLoading: false}));

    fetch("/leads/5e319ec8d3f9467a39ed643a")
      .then(res => res.json())
      .then(leadDetails =>
        this.setState({leadDetails: leadDetails.lead, isLoading: false}));
  }

  render() {
    const {dataSource, value, isLoading} = this.state;
    const data = dataSource ? dataSource.map(el => el.name) : null;
    const stage = this.state.leadDetails.stageId;


    return (
      <div>
        { !isLoading ?
          <div>
          <AutoComplete
            style={{ width: 200 }}
            dataSource={data}
            placeholder="Print"
            filterOption={(inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
            <p>Цена {this.state.leadDetails.price}</p>
            <p>Айди {this.state.leadDetails._id}</p>
            <p>Имя {this.state.leadDetails.name}</p>
            <p>стейдж название (из попьюлейт) {this.state.leadDetails.stageId && this.state.leadDetails.stageId.title}</p>
            <p>Детали {this.state.leadDetails.details}</p>
            <p>Создатель {this.state.leadDetails.creatorId}</p>
            <p>Создана {this.state.leadDetails.created}</p>
            <p>Обновлена{this.state.leadDetails.updated}</p>
          </div>
          :
          <h3>Loading</h3>
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contacts
  }
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addOneContact: (contact) => {
//       dispatch(ShowContact(contact))
//     }
//   }
// };

export default connect(mapStateToProps)(LeadCard)
