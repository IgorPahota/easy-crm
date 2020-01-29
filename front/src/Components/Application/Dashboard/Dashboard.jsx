import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Modal, Row, Col, Alert, Spin, Card, Button } from 'antd';


class Dashboard extends Component {

  state = {
    stages: [],
    visible: false,
    stage: {}
  };

  showModal = (data) => {
    this.setState({
      visible: true,
      stage: data
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  componentDidMount = async () => {
    let responseStages = await fetch('/stages');
    let stages = await responseStages.json();
    this.setState({ stages })
  };

  render() {

    const { stages } = this.state;

    return (
      <div>
        <h1></h1>

        {!this.props.isLoggedIn && <Redirect to={'login'}/>}
        {!this.state.stages.length
          ? <Spin tip="Loading...">
            <Alert
              message="Сейчас загрузится!"
              description="Ещё чуть-чуть)"
              type="info"
            />
          </Spin>
          : <>
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Row gutter={16} style={{ overflowX: 'auto ', display: 'flex' }}>
                {stages.map((stage) => {
                    let sumStages = 0;
                    stage.cards.forEach(card => {
                      sumStages += card.price;
                    });

                    return (
                      <Col span={6} key={stage._id} onClick={() => this.showModal(stage)}
                           style={{ marginBottom: '30px', width: 'auto' }}>

                        <Card title={stage.title} bordered={false} style={{ marginTop: '8px' }}>
                          <p>Количество сделок: {stage.cards.length}</p>
                          <p>На сумму: {sumStages} руб.</p>

                        </Card>
                      </Col>
                    );
                  }
                )}
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
                {this.state.stage.cards && this.state.stage.cards.map(card =>
                  // <p> {card.name}</p>
                  <p><Link to={`/lead/${card._id}`}>{card.name}</Link> на сумму: {card.price} </p>
                )}
              </Modal>
            </div>

          </>
        }
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps)(Dashboard);
