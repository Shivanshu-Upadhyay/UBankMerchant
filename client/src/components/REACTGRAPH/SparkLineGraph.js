
import React from "react";
import Chart from "react-apexcharts";
import './styles.css'
import axios from "axios";
import baseUrl from "../config/baseUrl";

export default class SparkLineGraph extends React.Component {
   
    constructor(props) {
        super(props);
        
        this.state = {
            base_url: `${baseUrl}/`,
            // formData: new FormData(),
            header: {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            },
            graph_data:[],
            name: '# of Trxn',
            data: [0,0,0,0,0,0],
 
            totalpayout: 0,
        };
    }

  graphData() {
    
    axios.post(this.state.base_url + "payout_icon", {type:"deposit"}, this.state.header).then((res) => {
        let temp = res.data.data[0];
        // let deta = [10, 20, 8, 15, 30, 12]
        let deta=[temp.first,temp.second,temp.third,temp.fourth,temp.fifth,temp.sixth]
        this.setState({
            data: deta,
            totalpayout: temp.total_deposit === null ? 0 : temp.total_deposit
        })
    })
  }



  componentDidMount() {
      this.graphData();

}

    render() {
        return (
            <div className="row">
                <div className="col-md-12 sparkline2" >
                    <div id="chart-spark2">
                        <Chart 
                        options={{
                            chart: {
                                type: 'area',
                                height: 160,
                                sparkline: {
                                    enabled: true
                                },
                            },
                            stroke: {
                                curve: 'smooth'
                            },
                            fill: {
                                type: 'solid',
                                opacity: 0,
                            },
                            yaxis: {
                                min: 0
                            },
                            colors: ['#1EAAE7'],
                            title: {
                                text: 'Deposits',
                                style: {
                                    fontSize: '15px',
                                    fontWeight: '700',
                                    color: '#CCC'
                                }
                            },
                            subtitle: {
                                text: this.state.totalpayout,
                                style: {
                                    fontSize: '25px',
                                    fontWeight: '600',
                                    color: '#000'
                                }
                            },
                            xaxis: {
                                crosshairs: {
                                    width: 1
                                },
                                type: 'hours',
                                categories: ["12-4AM", "4-8AM", "8-12PM", "12-4PM", "4-8PM", "8-12AM", "8-12AM", "8-12AM", "8-12AM", "8-12AM"]
                            }
                        }} series={[{
                            name: '# of Trxn',
                            data: this.state.data,
                        }]} type="area" height={160} />
                    </div>
                </div>
            </div>
        );
    }
}
