import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '@progress/kendo-theme-default/dist/all.css';
import { Calendar } from '@progress/kendo-react-dateinputs'
import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import products from './products.json';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import categories from './categories.json';
import { Window } from '@progress/kendo-react-dialogs';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.stateApi = { apiResponse: "" }
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
    }

    componentWillMount() {
        this.callAPI();
    }




    state = {
        dropdownlistCategory: null,
        gridDataState: {
            sort: [
                { field: "ProductName", dir: "asc" }
            ],
            skip: 0,
            take: 10
        },
        windowVisible: false,
        gridClickedRow: {}
    }

    handleDropDownChange = (e) => {
        let newDataState = { ...this.state.gridDataState }
        if (e.target.value.CategoryID !== null) {
            newDataState.filter = {
                logic: 'and',
                filters: [{ field: 'CategoryID', operator: 'eq', value: e.target.value.CategoryID }]
            }
            newDataState.skip = 0
        } else {
            newDataState.filter = []
            newDataState.skip = 0
        }
        this.setState({
            dropdownlistCategory: e.target.value.CategoryID,
            gridDataState: newDataState
        });
    }

    handleGridDataStateChange = (e) => {
        this.setState({ gridDataState: e.dataState });
    }

    handleGridRowClick = (e) => {
        this.setState({
            windowVisible: true,
            gridClickedRow: e.dataItem
        });
    }

    closeWindow = (e) => {
        this.setState({
            windowVisible: false
        });
    }

    render() {
        return (
            <div className="App">
                {/* <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header> */}
                <h1>Hello KendoReact!</h1>
                <p>
                    <DropDownList
                        data={categories}
                        dataItemKey="CategoryID"
                        textField="CategoryName"
                        defaultItem={{ CategoryID: null, CategoryName: "Product categories" }}
                        onChange={this.handleDropDownChange}
                    />
                    &nbsp; Selected category ID: <strong>{this.state.dropdownlistCategory}</strong>
                </p>

                <p>{this.stateApi.apiResponse}</p>

                <Grid
                    data={process(products, this.state.gridDataState)}
                    pageable={true}
                    sortable={true}
                    {...this.state.gridDataState}
                    onDataStateChange={this.handleGridDataStateChange}
                    style={{ height: "400px" }}>
                    <GridColumn field="ProductName" title="Product Name" />
                    <GridColumn field="UnitPrice" title="Price" format="{0:c}" />
                    <GridColumn field="UnitsInStock" title="Units in Stock" />
                    <GridColumn field="Discontinued" cell={checkboxColumn} />
                </Grid>

                {this.state.windowVisible &&
                    <Window
                        title="Product Details"
                        onClose={this.closeWindow}
                        height={250}>
                        <dl>
                            <dt>Product Name</dt>
                            <dd>{this.state.gridClickedRow.ProductName}</dd>
                            <dt>Product ID</dt>
                            <dd>{this.state.gridClickedRow.ProductID}</dd>
                            <dt>Quantity per Unit</dt>
                            <dd>{this.state.gridClickedRow.QuantityPerUnit}</dd>
                        </dl>
                    </Window>
                }
                
            </div>
        );
    }
}

class checkboxColumn extends Component {
    render() {
        return (
            <td>
                <input type="checkbox" checked={this.props.dataItem[this.props.field]} disabled="disabled" />
            </td>
        );
    }
}

export default App;
