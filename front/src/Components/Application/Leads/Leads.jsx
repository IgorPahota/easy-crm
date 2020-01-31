import React, { Component } from "react";
import Board, { createTranslate } from "react-trello";
import { Icon } from "antd";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { leadRedirect } from "../../../redux/leadRedirect";
import Loading from "../Loading/Loading";

const customTranslation = createTranslate({
  "Add another lane": "Новый этап",
  "Click to add card": "Новая сделка",
  "Delete lane": "Удалить этап",
  "Lane actions": <Icon type="delete" />, // ????
  "button.Add lane": "Добавить",
  "button.Add card": "Добавить",
  "button.Cancel": "Отменить",
  "placeholder.title": "Название сделки",
  "placeholder.description": "Описане",
  "placeholder.label": ""
});

class Leads extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stageId: undefined,
      redirect: false,
      redirectedLeadID: "",
      data: {
        lanes: []
      }
    };
  }

  componentDidMount = async () => {
    let response = await fetch("/stages");
    let result = await response.json();
    console.log(result);
    for (let stageIndex = 0; stageIndex < result.length; stageIndex++) {
      result[stageIndex].id = result[stageIndex]._id;
      for (
        let cardIndex = 0;
        cardIndex < result[stageIndex].cards.length;
        cardIndex++
      ) {
        result[stageIndex].cards[cardIndex].id =
          result[stageIndex].cards[cardIndex]._id;
        result[stageIndex].cards[cardIndex].title =
          result[stageIndex].cards[cardIndex].name;
        result[stageIndex].cards[cardIndex].description =
          result[stageIndex].cards[cardIndex].details;
      }
    }
    this.setState({
      data: { ...this.state.data, lanes: result }
    });
  };

  onCardClick = params => {
    console.log(params);
    this.props.set(params);
  };

  onCardMoveAcrossLanes = async (fromLaneId, toLaneId, cardId, index) => {
    let response = await fetch("/leads", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fromLaneId,
        toLaneId,
        cardId,
        index
      })
    });
  };

  onLaneAdd = async params => {
    let response = await fetch("/stages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: params.title
      })
    });

  };

  onLaneDelete = async params => {
    let response = await fetch(`/stages`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: params
      })
    });
    let result = response.json();
  };

  onLaneClick = params => {
    this.setState({
      stageId: params
    });
  };

  onCardAdd = async params => {
    let response = await fetch("/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardId: params.id,
        title: params.title,
        description: params.description,
        stageId: this.state.stageId
      })
    });
  };

  onCardDelete = async (cardId, laneId) => {
    let leadResponse = await fetch("/leads", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cardId: cardId,
        stageId: laneId
      })
    });
  };

  render() {
    const fontfamily =
      "font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'";
    const style = {
      backgroundColor: "#efefef",
      fontFamily: fontfamily
    };
    const laneStyle = {
      backgroundColor: "white",
      fontFamily: fontfamily,
      borderRadius: "4px",
      fontWeight: 500,
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 20
    };
    const cardStyle = {
      fontFamily: fontfamily,
      borderRadius: "4px"
    };

    return (
      <div>
        {this.props.idLeadForRedirect && (
          <Redirect to={`/leads/${this.props.idLeadForRedirect}`} />
        )}

        {!this.state.data.lanes.length ? (
          <Loading/>

        ) : (
          <Board
            data={this.state.data}
            editable
            laneDraggable={false}
            canAddLanes
            // editLaneTitle={this.props.userType == 'admin'}
            onLaneAdd={this.onLaneAdd}
            onLaneClick={this.onLaneClick}
            onLaneDelete={this.onLaneDelete}
            onCardDelete={this.onCardDelete}
            onCardAdd={this.onCardAdd}
            onCardMoveAcrossLanes={this.onCardMoveAcrossLanes}
            onCardClick={this.onCardClick}
            style={style}
            laneStyle={laneStyle}
            cardStyle={cardStyle}
            hideCardDeleteIcon={this.props.userType == 'user'}
            t={customTranslation}

          />
        )}
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    idLeadForRedirect: store.idLeadForRedirect,
    userType: store.userType

  };

}

function mapDispatchToProps(dispatch) {
  return {
    set: id => {
      dispatch(leadRedirect(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Leads);
