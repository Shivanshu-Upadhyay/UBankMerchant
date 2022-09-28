import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import baseUrl from '../config/baseUrl';
import './styles.css'

export default class SparkLineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
      series: [{
          name: "# of trans",
          data: [ ]
      }],
      options: {
        chart: {
          height: '100%',
          type: 'line',
          sparkline: {
            enabled: true,
            }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Deposits',
          style: {
            fontSize: '15px',
            fontWeight: '700',
            color: '#CCC'
          }
        },
        subtitle: {
            text: '',
            style: {
                fontSize: '25px',
                fontWeight: '600',
                color: '#000'
            }
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], 
            opacity: 0.5
          },
        },
        xaxis: {
          categories: ['0-4', '4-8', '8-12', '12-4', '4-8', '8-12'],
        }
      },      
    };
  }

  componentDidMount() {
    const monthly = async() => {
      try {
        const auth = localStorage.getItem("user");
        let formData = new FormData();
        
    
        const config = {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${auth}`,
          },
        };
    
        let {data} = await axios.post(`${baseUrl}/payout_icon`, formData, config);
        
        this.setState({series:[{data:data.data.dep_count}]})
        this.setState({options:{subtitle:{text:data.data.dep_total}}})
        
      } catch (error) {
        console.log(error);
      }
    }
    monthly()
  }

  render() {
    return (
      <div id="chart">
          <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={150} />
      </div>
    );
  }
}

