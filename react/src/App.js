import React from 'react';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import List from './component/List';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            useritems: []
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
                        items: result.items,
                        useritems: result.useritems
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
        const { error, isLoaded, items, useritems } = this.state;
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
                    <br></br>
                    <br></br>
                    <br></br>
                    <body>
                        <div className="App">
                            <h1>Global Rankings</h1>

                            <List users={items} />


                            <h1>New York Winder's Rankings</h1>

                            <List users={useritems} />
                        </div>
                    </body>
                    <br></br>
                    <br></br>
                    <br></br>
                    <footer>
                        <p class="footer-copyright">© Hasan Mahir ATEŞ 2021</p>
                        <ul class="footer-links">
                            <li><a href="https://github.com/hasanmahira" target="_blank" rel="noopener noreferrer">Source on GitHub</a></li>
                        </ul>
                    </footer>
                </main>

            );
        }
    }
}

export default App;
