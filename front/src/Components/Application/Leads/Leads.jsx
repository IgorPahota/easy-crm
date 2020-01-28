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
        let responseLead = await fetch("/leads");
        let resultLeads = await responseLead.json();


        // console.log('data from back',result);

        for (let stageIndex = 0; stageIndex < result.length; stageIndex++) {
            result[stageIndex].id = result[stageIndex]._id;
            delete result[stageIndex]._id;
            delete result[stageIndex].creatorId;
            delete result[stageIndex].__v;

            for (let cardIndex = 0; cardIndex < result[stageIndex].cards.length; cardIndex++) {
                result[stageIndex].cards[cardIndex].id = result[stageIndex].cards[cardIndex]._id;
                result[stageIndex].cards[cardIndex].title = result[stageIndex].cards[cardIndex].name;
                result[stageIndex].cards[cardIndex].description = result[stageIndex].cards[cardIndex].details

                delete result[stageIndex].cards[cardIndex]._id
                delete result[stageIndex].cards[cardIndex].name
                delete result[stageIndex].cards[cardIndex].details

            }
        }
        // console.log('new result',result);


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
                cardId
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
        console.log(params);
    //     let response = await fetch(`/stages/${params}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             id: params.id
    //         })
    //     });
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
        const data = {
            lanes: [
                {
                    id: 'lane1',
                    title: 'Planned Tasks',
                    label: '2/2',
                    cards: [
                        {id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false},
                        {id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: {sha: 'be312a1'}}
                    ]
                },
                {
                    id: 'lane2',
                    title: 'Completed',
                    label: '0/0',
                    cards: []
                }
            ]
        }
        // console.log("TRASH", this.state);
        // console.log("DOUBLE TRASH", this.state.data.lanes.length);
        // console.log("TRIPLE TRASH", this.state.data);
        return (
            <div>
                {this.state.data.lanes === 0 ? (
                    <div>Loading</div>
                ) : (
                    <Board
                        data={this.state.data}
                        /*data={data}*/
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