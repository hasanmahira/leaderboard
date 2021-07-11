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
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };

    }

    componentWillMount() {
        this.ApiCall();
    }

    ApiCall() {
        fetch("http://localhost:9000/board")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, items } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <main>
                    <header>
                        <ul>
                            <li><a class="nav-selected" href="#/">Leader Board</a></li>
                        </ul>
                    </header>
                    <h1>Global Rankings</h1>

                    <div className="App">
                        <List users={items} />
                    </div>
                    <footer><p class="footer-copyright">© Hasan Mahir ATEŞ 2021</p>
                        <ul class="footer-links">
                            <li><a href="https://github.com/hasanmahira" target="_blank" rel="noopener noreferrer">Source on GitHub</a></li>
                        </ul>
                    </footer>
                </main>

            );
        }
    }
}

// function ConsoleLog(data) {
//     console.log("from APP module");
// }


export default App;
