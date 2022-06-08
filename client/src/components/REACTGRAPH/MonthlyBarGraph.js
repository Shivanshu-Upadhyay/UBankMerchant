import React, { Component } from 'react'
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export default class MonthlyBarGraph extends Component {
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
            data :[
                {
                    name: 'Page A',
                    No_of_transaction: 4000,
                    Total_transaction_amount: 1,
                    amt: 2400,
                },
                {
                    name: 'Page B',
                    No_of_transaction: 3000,
                    Total_transaction_amount: 1398,
                    amt: 2210,
                },
                {
                    name: 'Page C',
                    No_of_transaction: 2000,
                    Total_transaction_amount: 20800,
                    amt: 2290,
                },
                {
                    name: 'Page D',
                    No_of_transaction: 2780,
                    Total_transaction_amount: 3908,
                    amt: 2000,
                },
                {
                    name: 'Page E',
                    No_of_transaction: 1890,
                    Total_transaction_amount: 4800,
                    amt: 2181,
                },
                {
                    name: 'Page F',
                    No_of_transaction: 2390,
                    Total_transaction_amount: 3800,
                    amt: 2500,
                },
                {
                    name: 'Page G',
                    No_of_transaction: 3490,
                    Total_transaction_amount: 4300,
                    amt: 2100,
                },
            ],
        }
    }
    montharray = () => {
        const DateToMonth = (month) => {
            var temp = ''
            switch (month) {
                case '01':
                    temp += 'Jan'
                    break;
                case '02':
                    temp += 'Feb'
                    break;
                case '03':
                    temp += 'Mar'
                    break;
                case '04':
                    temp += 'Apr'
                    break;
                case '05':
                    temp += 'May'
                    break;
                case '06':
                    temp += 'Jun'
                    break;
                case '07':
                    temp += 'Jul'
                    break;
                case '08':
                    temp += 'Aug'
                    break;
                case '09':
                    temp += 'Sep'
                    break;
                case '10':
                    temp += 'Oct'
                    break;
                case '11':
                    temp += 'Nov'
                    break;
                case '12':
                    temp += 'Dec'
                    break;
                case 'asp':
                    temp += 'Dec'
                    break;
                default:
                    break;
            }
            return temp;
        }
        var dataray = [];
        var d = new Date();
        d.setMonth(d.getMonth() - 11)
        let start_date = d.getMonth() + 1;
        while (dataray.length < 12) {
            if (start_date < 10) {
                dataray.push(DateToMonth("0" + start_date))
            } else {
                dataray.push(DateToMonth("" + start_date))
            }
            if (start_date === 12) {
                start_date = 1
            } else {
                start_date += 1
            }
        }
        return (dataray);
    }

    graphData() {
        axios.post(this.state.base_url + "monthly_transaction", { }, this.state.header).then((res) => {
            const mongtharr = this.montharray();
            const datamongth2 = []
            for (let i of mongtharr) {
                datamongth2.push({
                    "Total_transaction_amount": 0, "No_of_transaction": 0, "name": i
                })
            }
            for (let i of res.data.data) {
                let index = mongtharr.indexOf(i.name.slice(0, 3));
                datamongth2[index].No_of_transaction = i.No_of_transaction;
                datamongth2[index].Total_transaction_amount = i.Total_transaction_amount;
            }
            this.setState({ data: datamongth2
})
        })
    }
    componentDidMount(){
        this.graphData()
    }
  render() {
    return (
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={this.state.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Total_transaction_amount" fill="#8884d8" />
                    <Bar dataKey="No_of_transaction" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
    )
  }
}
