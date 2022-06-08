import React, { Component } from 'react'
import axios from 'axios';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';


export default class WeeklyBarGraph extends Component {
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
            data: [
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

    weekArrayWithDate = () => {
        var dataray = [];
        var today = new Date();
        today.setDate(today.getDate() - 7)
        while (dataray.length < 7) {
            today.setDate(today.getDate() + 1)
            let newdate = today.toLocaleString()
            dataray.push(newdate.slice(0, 2) + "-" + newdate.slice(3, 5))
        }
        return (dataray);
    }

    graphData() {
        axios.post(this.state.base_url + "weekly_transaction", {}, this.state.header).then((res) => {
            let weekdaylist = this.weekArray();
            let weekdaylistDate = this.weekArrayWithDate();
            const data2 = [
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[0],
                    "date": weekdaylistDate[0]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[1],
                    "date": weekdaylistDate[1]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[2],
                    "date": weekdaylistDate[2]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[3],
                    "date": weekdaylistDate[3]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[4],
                    "date": weekdaylistDate[4]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[5],
                    "date": weekdaylistDate[5]
                },
                {
                    "Total_transaction_amount": 0,
                    "No_of_transaction": 0,
                    "name": weekdaylist[6],
                    "date": weekdaylistDate[6]
                },

            ]
            for (let i of res.data.data) {
                data2[weekdaylist.indexOf(i.name)].Total_transaction_amount = i.Total_transaction_amount;
                data2[weekdaylist.indexOf(i.name)].No_of_transaction = i.No_of_transaction;
            }
            this.setState({ data: data2 })
        })
    }
    
    componentDidMount() {
        this.graphData()
    }
    render() {
        return (
            <div style={{ height: "100%", width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
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
            </div>
        )
    }
}
