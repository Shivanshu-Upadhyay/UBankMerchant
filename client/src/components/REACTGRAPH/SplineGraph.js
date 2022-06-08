import React from "react";
import Chart from "react-apexcharts";
import axios from "axios";


export default class SplineGraph extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            base_url: "http://localhost:9240/",
            // formData: new FormData(),
            header: {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: 'Bearer ' + localStorage.getItem('user')
                }
            },
            Weekday: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
            Data: [40, 70, 28, 35, 42, 90, 40],
            series: [{
                name: '',
                data: [40, 70, 28, 35, 42, 90, 40]
            }],
            options: {
                chart: {
                    height: 170,
                    width: '100%',
                    type: 'area'
                },
                fill: {
                    type: 'solid',
                    opacity: 0.7
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
                        // margin: 5,
                        color: '#CCC'
                    }
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'week_days',
                    categories: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"]
                },
                tooltip: {
                    x: {
                        format: 'day'
                    },
                },
            },


        };
    }
    weekArray = () => {
        const days = ['monday', 'tuesday', 'wednesday', 'thursday',
            'friday', 'saterday', 'sunday'];
        var goBackDays = 7;

        var today = new Date();
        today.setDate(today.getDate() - 8)
        var daysSorted = [];

        for (var i = 0; i < goBackDays; i++) {
            var newDate = new Date(today.setDate(today.getDate() + 1));
            let str = days[newDate.getDay()].slice(0, 3)
            str = str.charAt(0).toUpperCase() + str.slice(1)
            daysSorted.push(str);
        }

        return (daysSorted);
    }

    graphData() {
        axios.post(this.state.base_url + "daily_sale_count_icon", { type: "payout" }, this.state.header).then((res) => {
            // let weekday=[];
            // let no_of_transaction=[];
            // for(let i of res.data.data){
            //     weekday.push(i.weekday+"("+i.date+")")
            //     no_of_transaction.push(i.no_of_transaction)
            // }            sql ="select count(ammount) as no_of_transaction,SUBSTRING(DAYNAME(date(created_on)),1,3) as weekday,date_format(created_on,'%d-%m') as date from tbl_merchant_transaction where DATE(created_on) BETWEEN UB(date(now()), INTERVAL 6 DAY) AND date(now()) GROUP by date(created_on)"

            let weekdaylist = this.weekArray();
        
            var noOfTrans = [0, 0, 0, 0, 0, 0, 0]
            for (let i of res.data.data) {
                noOfTrans[weekdaylist.indexOf(i.weekday)] = i.no_of_transaction
            }
            this.setState({
                Weekday: weekdaylist,
                Data: noOfTrans
            })
      
        })
    }



    componentDidMount() {
        this.graphData();

    }

    render() {
        return (
            <div>
                <div id="chart">
                    <Chart options={{
                        chart: {
                            height: 170,
                            width: '100%',
                            type: 'area'
                        },
                        fill: {
                            type: 'solid',
                            opacity: 0.7
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
                                // margin: 5,
                                color: '#CCC'
                            }
                        },
                        stroke: {
                            curve: 'smooth'
                        },
                        xaxis: {
                            type: 'week_days',
                            categories: this.state.Weekday
                        },
                        tooltip: {
                            x: {
                                format: 'day'
                            },
                        },
                    }} series={[{
                        name: '',
                        data: this.state.Data
                    }]} type="area" height={200} />
                </div>
            </div>
        );
    }
}

