import React from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import baseUrl from '../config/baseUrl';

export default class WeeklyBarGraph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
      
            series: [{
            name: 'Deposit',
            data: []
            }, {
            name: 'Payout',
            data: []
            }],
            options: {
            chart: {
                type: 'bar',
                height: '100%'
            },
            plotOptions: {
                bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
            },
            xaxis: {
                categories: ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            },
            // yaxis: {
            //     title: {
            //     text: '$ (thousands)'
            //     }
            // },
            fill: {
                opacity: 1
            },
            // tooltip: {
            //     y: {
            //     formatter: function (val) {
            //         return "$ " + val + " thousands"
            //     }
            //     }
            // }
            },
        };
    }

    componentDidMount() {
        const weekly = async() => {
    
            try {
                const auth = localStorage.getItem("user");
                let formData = new FormData();
                
            
                const config = {
                  headers: {
                    "content-type": "multipart/form-data",
                    Authorization: `Bearer ${auth}`,
                  },
                };
            
                let {data} = await axios.post(`${baseUrl}/weekly_transaction`, formData, config);
                console.log(data.data);
               
                this.setState({series:[{data:data.data.deposit},{data:data.data.payout}]})
                
                // console.log(this.state.series[0].data);
                // console.log(this.state.series[0].data);
                // console.log(this.state.series[1].data);
                
              } catch (error) {
                console.log(error);
              }
            }
            weekly()
            
      }

    render() {
      return (
        <div>
          <div id="chart">
            <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={350} />
          </div>
        </div>
      );
    }
}
