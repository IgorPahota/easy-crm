import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { Statistic, Row, Col, Alert, Spin, Card } from 'antd';
import { Typography } from 'antd';

// const { Text } = Typography;

class Dashboard extends Component {

  state = {
    leads: [],
    stages: [],
    // visible: false
  };

  componentDidMount = async () => {
    let responseLeads = await fetch('/leads');
    let responseStages = await fetch('/stages');
    let leads = await responseLeads.json();
    let stages = await responseStages.json();
    this.setState({ leads, stages })
  };

  render() {
    let sum = 0;
    // let sumStages = 0;
    const { leads, stages } = this.state;
    // leads.map(lead => sum += lead.price || 0);
    // const numberOfLeads = leads.length;
    return (
      <div>
        <h1></h1>

        {!this.props.isLoggedIn && <Redirect to={'login'}/>}
        {!this.state.stages.length ?
          <Spin tip="Loading...">
            <Alert
              message="Сейчас загрузится!"
              description="Ещё чуть-чуть)"
              type="info"
            />
          </Spin>
          :
          <>
            {/* <h3>Your leads </h3>
            <p>Общая сумма: {sum}</p>
            <p> Всего сделок: {numberOfLeads} </p>
            {leads.map((lead) =>
              <div key={lead._id}>
                <Link to={`/lead/${lead.stageId}`}>{lead.name}</Link>
              </div>
            )}*/}

            {/*<Row gutter={16}>
              {stages.map((stage) =>
                <Col span={4}>
                  <Text mark>{stage.title}</Text>
                  <Statistic
                    title={stage.name}
                    value={stage.cards.length}
                    valueStyle={{ color: "#1890ff" }}/>
                </Col>
              )}
            </Row>*/}


            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <Row gutter={16} style={{ overflowX: 'auto ', display: 'flex' }}>
                {stages.map((stage) => {
                  let sumStages = 0;
                    stage.cards.forEach(card => {
                      sumStages += card.price;
                    });

                    return (
                      <Col span={6} key={stage._id} style={{ marginBottom: '30px', width: 'auto' }}>
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
