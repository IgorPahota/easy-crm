import React, { Component } from 'react';
import G2 from '@antv/g2';


class Chart extends Component {
  componentDidMount() {
    const data = [
      { type: 'завершено', value: 56.4 },
      { type: '女性', value: 43.6 }
    ];
    const chart = new G2.Chart({
      container: 'c1',
      forceFit: true,
      height: 400,
      padding: 'auto'
    });
    chart.source(data);
    chart.legend(false);
    chart.facet('rect', {
      fields: [ 'type' ],
      padding: 20,
      showTitle: false,
      eachView: function eachView(view, facet) {
        const data = facet.data;
        let color;
        if (data[0].type === 'завершено') {
          color = '#0a9afe';
        } else {
          color = '#f0657d';
        }
        data.push({ type: '其他', value: 100 - data[0].value });
        view.source(data);
        view.coord('theta', {
          radius: 0.8,
          innerRadius: 0.5
        });
        view.intervalStack()
          .position('value')
          .color('type', [ color, '#eceef1' ])
          .opacity(1);
        view.guide().html({
          position: [ '50%', '50%' ],
          html: `
        <div class="g2-guide-html">
          <p class="title">${data[0].type}</p>
          <p class="value">${data[0].value}</p>
        </div>
      `
        });
      }
    });
    chart.render();
  }

  render() {

    return (
      <div>
        <div id="c1"></div>
      </div>
    );
  }
}

export default Chart;
