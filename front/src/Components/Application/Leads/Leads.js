import React, { Component } from "react";
import Board from "react-trello";

import { connect } from "react-redux";

export default class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        lanes: [
          {
            id: undefined,
            title: undefined,
            cards: [
              {
                id: undefined,
                title: undefined,
                description: undefined
              }
            ]
          }
        ]
      }
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/stages");
    let result = await response.json();
    let responseLead = await fetch("/leads");
    let resultLeads = await responseLead.json();
    // console.log(resultLeads[0]._id);
    // console.log(resultLeads);
    // console.log(result);

    const lanes = [];
    const cards = [];

    resultLeads.map(element => {
      // console.log(element);
      cards.push({
        id: element._id,
        title: element.name,
        description: element.details,
        stageId: element.stageID
      });
    });

    result.map(element => {
      // console.log(element);
      lanes.push({
        id: element._id,
        title: element.name,
        cards: cards
      });
    });

    this.setState({
      data: {
        lanes
      }
    });
  };

  onLaneAdd = async params => {
    // console.log(params);
    let response = await fetch("/stages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.title
      })
    });
    // let result = await response.json();
    // console.log(result);
  };

  onLaneDelete = async params => {
    console.log(params);
    let response = await fetch(`/stages/${params}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params.id
      })
    });
  };

  onCardDelete = e => {
    alert("deleting card");
  };

  onCardAdd = e => {
    alert("adding card");
  };

  render() {
    return (
      <div>
        {!this.state.data ? (
          <div>LoADING</div>
        ) : (
          <Board
            data={this.state.data}
            /*data={data}*/
            editable
            laneDraggable={false}
            canAddLanes
            editLaneTitle
            onLaneAdd={this.onLaneAdd}
            onLaneDelete={this.onLaneDelete}
            onCardDelete={this.onCardDelete}
            onCardAdd={
              this.onCardAdd
            } /*
  components={{Card: CustomCard}}
  onCardClick={onCardClick} */
          />
        )}
      </div>
    );
  }
}

// function mapStateToProps(store) {
//   return {};
// }

// function mapDispatchToProps(dispatch) {
//   return {};
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Leads);
