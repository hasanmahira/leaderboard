import React, { Component } from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import Board from './component/Board';
import List from './component/List';
import { Grid } from '@progress/kendo-react-grid';
var babala;

class App extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     apiResponse: ""
        //     , data: [
        //         { "playerId": 123547689, "username": "AllGoodNamesRGone", "country": "Ukraine", "money": 6436 },
        //         { "playerId": 123574959, "username": "Definitely_not_an_athlete", "country": "Turkey", "money": 4566 },
        //         { "playerId": 123529509, "username": "YellowSnowman", "country": "Canada", "money": 4563 },
        //         { "playerId": 123729489, "username": "hogwartsfailure", "country": "Turkey", "money": 2657 }
        //     ]
        // }
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

    }
    // callAPI() {
    //     fetch("http://localhost:9000/server")
    //         .then(res => res.json())
    //         // .then(
    //         //     (result) => {
    //         //         this.setState({
    //         //             isLoaded: true,
    //         //             items: result.items
    //         //         });
    //         //     })
    //         // .then(res => console.log("res", this.state))
    //     // .then(res => babala = res)
    //     // .then(res => console.log("babala", babala))
    //      .then(res => this.setState({ apiResponse : res }))

    // }

    componentWillMount() {
        // this.callAPI();
        fetch("http://localhost:9000/board")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                    console.log("items", this.state.items);
                },
                // Not: Burada hataları yakalamak önemlidir.
                // Bileşenimizde bug bulunmaması için, 'catch ()' bloğu yerine bulunan
                // bu blok içinde hatalar yakalanır.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items } = this.state;
        console.log("yasa",this.state);
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="App">
                    <Grid data={items} />
                    {/* {items} */}

                    {/* <Board name="Mehmet" state="online" metod={ConsoleLog}></Board> */}

                    <h1>Hello KendoReact!</h1>
                    {/* <ul>
                        {this.state.apiResponse.valueOf().map(item => (
                            <li key={item.id}>
                                {item.name} {item.price}
                            </li>
                        ))}
                    </ul> */}
                    {/* <List users={this.state.data} /> */}
                </div>
            );
       }
    }
}

// function ConsoleLog(data) {
//     console.log("from APP module");
// }


export default App;
