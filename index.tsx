import React, { useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Highcharts3d from 'highcharts/highcharts-3d';
import { createRoot } from 'react-dom/client';

import Funnel3d from 'highcharts/modules/funnel3d';
import Highcharts3dModules from 'highcharts/modules/cylinder';

Highcharts3d(Highcharts);
Funnel3d(Highcharts);
Highcharts3dModules(Highcharts);

const Chart: React.FC = () => {
  const chartData = [
    ['Website visits', 25000],
    ['Downloads', 6000],
    ['Requested price list', 3500],
    ['Invoice sent', 2000],
    ['Finalized', 1500],
  ];

  const secondSeriesData = [
    ['Website visits', 15654],
    ['Downloads', 4064],
    ['Requested price list', 1987],
    ['Invoice sent', 976],
    ['Finalized', 846],
  ];

  const [annotations] = useState<any>([
    {
      labels: [
        {
          point: {
            x: 3,
            y: 1500,
            xAxis: 0,
            yAxis: 0,
          },
          text: 'Important milestone reached',
          style: {
            color: '#FF0000',
          },
        },
      ],
    },
  ]);

  const options: Highcharts.Options = {
    chart: {
      type: 'funnel3d',
      options3d: {
        enabled: true,
        alpha: 10,
        depth: 50,
        viewDistance: 50,
      },
      backgroundColor: {
        linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
        stops: [
          [0, '#eb9dfb'],
          [0.5, '#9eedfb'],
          [1, '#824ef8'],
        ],
      },
      height: 1024,
    },
    title: {
      text: 'Highcharts Funnel3D Chart with Multiple Series and Annotations',
    },
    accessibility: {
      screenReaderSection: {
        beforeChartFormat:
          '<{headingTagName}>' +
          '{chartTitle}</{headingTagName}><div>{typeDescription}</div>' +
          '<div>{chartSubtitle}</div><div>{chartLongdesc}</div>',
      },
    },
    plotOptions: {
      funnel3d: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          allowOverlap: true,
          verticalAlign: 'middle',
          style: {
            textOverflow: 'ellipsis',
          },
        },
        neckWidth: '20%',
        neckHeight: '80%',
        width: '70%',
        height: '100%',
      } as Highcharts.PlotFunnel3dOptions,
    },
    series: [
      {
        name: 'Website Visitors',
        type: 'funnel3d',
        data: chartData,
        color: '#FF5733',
        zIndex: 1,
        dataLabels: {
          y: -5,
        },
        plotOptions: {
          funnel3d: {
            width: '70%',
            height: '80%',
          },
        },
      },
      {
        name: 'Returning Users',
        type: 'funnel3d',
        data: secondSeriesData,
        color: '#33B5FF',
        zIndex: 2,
        dataLabels: {
          y: 10,
        },
        plotOptions: {
          funnel3d: {
            width: '60%',
            height: '70%',
          },
        },
      },
    ],
    annotations: annotations,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Chart />);
}
