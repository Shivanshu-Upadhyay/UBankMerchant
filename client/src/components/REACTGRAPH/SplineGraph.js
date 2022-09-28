import React from "react";
import ReactApexChart from 'react-apexcharts';
import axios from "axios";
import baseUrl from "../config/baseUrl";

export default class SplineGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          series: [{
            name: 'Amount',
            data: [ ]
          }],
          options: {
            chart: {
              height: '100%',
              type: 'area'
            },
            dataLabels: {
              enabled: false
            },
            title: {
                text: 'Daily Sales Count',
                align: 'center',
                style: {
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#CCC'
                }
            },
            stroke: {
                width: 3,
                curve: 'smooth'
            },
            fill: {
                type: 'solid',
                opacity: 0.5
            },
            xaxis: {
              type: 'weekly',
              categories: [ ]
            },
            tooltip: {
              x: {
                format: 'dd/MM/yy HH:mm'
              },
            },
          },
        };
      }

      componentDidMount() {
        const perDayPayout = async() => {
          try {
            const auth = localStorage.getItem("user");
            let formData = new FormData();
            
        
            const config = {
              headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${auth}`,
              },
            };
        
            let {data} = await axios.post(`${baseUrl}/daily_sale_count_icon`, formData, config);
            

            this.setState({series:[{data:Object.values(data.data)}]})

            this.setState({options:{xaxis:{categories:Object.keys(data.data)}}})

            // this.setState({series:[{data:[data.data[0].count,data.data[1].count,data.data[2].count,data.data[3].count,data.data[4].count,data.data[5].count,data.data[6].count]}]})

            // this.setState({options:{xaxis:{categories:[data.data[0].day, data.data[1].day, data.data[2].day, data.data[3].day, data.data[4].day, data.data[5].day, data.data[6].day]}}})
            
          } catch (error) {
            console.log(error);
          }
        }
        perDayPayout()
      }

      render() {
        return (
          <div id="chart">
              <ReactApexChart options={this.state.options} series={this.state.series} type="area" height={200} />
          </div>
        );
    }
}

