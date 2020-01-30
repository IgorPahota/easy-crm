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
    fetch("/leads/5e32a22c972733a091832d87")
      .then(res => res.json())
      .then(leadDetails =>
        this.setState({leadDetails: leadDetails.lead, isLoading: false}));
  }

  render() {
    const {dataSource, value, isLoading} = this.state;
    const data = dataSource ? dataSource.map(el => el.name) : null;
    const result = [];
    const contacts = this.props.contacts ? this.props.contacts.map(el => {
      el.value = el.name;
      el.text = el._id;
      result.push(el);
      }) : null;
    console.log('this.props.contacts', this.props.contacts)
    console.log('result', result)
    const { stageId, price, _id : leadId, name, details, creatorId, created, updated } = this.state.leadDetails;


    return (
      <div>
        { !isLoading ?
          <div>
          <AutoComplete
            style={{ width: 200 }}
            dataSource={contacts}
            placeholder="Print"
            filterOption={(inputValue, option) =>
              option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
          />
            <p>Цена {price}</p>
            <p>Айди сделки{leadId}</p>
            <p>Имя {name}</p>
            <p>
              стейдж название (из попьюлейт) {stageId.title}
            </p>
            <p>Детали {details}</p>
            <p>Создатель {creatorId}</p>
            <p>Создана {created}</p>
            <p>Обновлена{updated}</p>
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
