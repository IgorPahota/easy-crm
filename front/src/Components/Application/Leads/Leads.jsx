import React, { Component } from "react";
import Board from "react-trello";

export default class Leads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stageId: undefined,
            data: {
                lanes: []
            }
            // stageId: undefined,
            // data: {
            //     lanes: [
            //         {
            //             id: undefined,
            //             title: undefined,
            //             cards: [
            //                 {
            //                     id: undefined,
            //                     title: undefined,
            //                     description: undefined
            //                 }
            //             ]
            //         }
            //     ]
            // }
        };
    }

    componentDidMount = async () => {
        let response = await fetch("/stages");
        let result = await response.json();
        for (let stageIndex = 0; stageIndex < result.length; stageIndex++) {
            result[stageIndex].id = result[stageIndex]._id;
            for (let cardIndex = 0; cardIndex < result[stageIndex].cards.length; cardIndex++) {
                result[stageIndex].cards[cardIndex].id = result[stageIndex].cards[cardIndex]._id;
                result[stageIndex].cards[cardIndex].title = result[stageIndex].cards[cardIndex].name;
                result[stageIndex].cards[cardIndex].description = result[stageIndex].cards[cardIndex].details
            }
        }
        this.setState({
          data: {...this.state.data, lanes: result}
        });

    };

    onCardMoveAcrossLanes = async (fromLaneId, toLaneId, cardId, index) => {
        console.log(fromLaneId, toLaneId, cardId, index);
        let response = await fetch("/leads", {
            method: "PATCH",
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
        console.log(params);
        let response = await fetch("/stages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: params.title
            })
        });
        // let result = await response.json();
        // console.log(result);
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
        if (result.isDeleted) {
            alert('Этап удален')
        } else {
            alert ('Невозможно удалить этап в котором есть сделки')
        }
    };


    onLaneClick = params => {
        this.setState({
            stageId : params
        })
    };

    onCardAdd = async params => {
        console.log('adding',params);
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
        console.log(cardId, laneId);
        let leadResponse = await fetch('/leads', {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                cardId: cardId,
                stageId: laneId
            })
        })

    };

    render() {
        return (
            <div>
                {this.state.data.lanes === 0 ? (
                    <div>Loading</div>
                ) : (
                    <Board
                        data={this.state.data}
                        editable
                        onCardMoveAcrossLanes={this.onCardMoveAcrossLanes}
                        laneDraggable={false}
                        canAddLanes
                        onLaneClick={this.onLaneClick}
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