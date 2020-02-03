import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Modal, Row, Col, Alert, Spin, Card , message} from 'antd';
import Chart from "./Chart";
import Loading from "../Loading/Loading";
import bluelogo from "./Easycrm-logo-x2.png";


class Dashboard extends Component {
  state = {
    stages: [],
    visible: false,
    stage: {}
  };

  showModal = data => {
    this.setState({
      visible: true,
      stage: data
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  componentDidMount = async () => {
    let responseStages = await fetch("/stages");
    let stages = await responseStages.json();
    this.setState({ stages });
    // this.timerID = setTimeout(() => message.success('Необходимо добавить сделки...'),3000);
  };

  // componentWillUnmount() {
  //   clearTimeout(this.timerID)
  // }

  render() {
    const { stages } = this.state;
    let allLeadsPrice = 0;
    let allLeads = 0;
    let timerId;

    return (
      <div>
        {!this.props.isLoggedIn && <Redirect to={'login'}/>}
        {!stages.length
          ? <Loading/>
          :
          <>
            <div style={{ background: "#EFEFEF", width: "100%" }}>
              <Row gutter={16} style={{ overflowX: "auto ", display: "flex" }}>
                {stages.map(stage => {
                  let sumStages = 0;
                  allLeads += stage.cards.length;
                  stage.cards.forEach(card => {
                    sumStages += card.price;
                    allLeadsPrice += card.price;
                  });
                  return (
                    <Col
                      span={6}
                      key={stage._id}
                      onClick={() => this.showModal(stage)}
                      style={{ marginBottom: "30px", width: "auto" }}
                    >
                      <Card
                        title={stage.title}
                        bordered={false}
                        style={{ marginTop: "8px", borderRadius: "4px" }}
                      >
                        <p>Количество сделок: {stage.cards.length}</p>
                        <p>На сумму: {sumStages} руб.</p>
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </div>

            <div>
              <Modal
                title={this.state.stage.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
              >
                {this.state.stage.cards &&
                this.state.stage.cards.map(card => (
                  <p>
                    <Link to={`/leads/${card._id}`}>{card.name}</Link> на
                    сумму: {card.price}{" "}
                  </p>
                ))}
              </Modal>
            </div>
            {allLeads
              ? <Chart data={stages.slice(stages.length - 2)} allLeads={allLeads}/>
              :  <>{message.success('Необходимо добавить сделки...')}
                {/*setTimeout(() => message.success('Необходимо добавить сделки...'),3000)*/}
                  <img class="bluelogo" alt="logo" src={bluelogo} width="300px" className="dashboard-logo"/>)
                </>

            }
            {/*{<p>Сумма всех сделок:{allLeadsPrice}</p>}*/}

          </>
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  };
}

export default connect(mapStateToProps)(Dashboard);
