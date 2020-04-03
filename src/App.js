import React, {Component} from 'react';
import Login from './Login.js';
import './App.css';
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.min.css';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogged: false,
            data: []
        }
        this.setUserLogin = this.setUserLogin.bind(this);
    }

    setUserLogin(isLogged, data) {
        console.log(isLogged);
        this.setState({
            isLogged: isLogged,
            data: data
        });
    }


    render() {
        const {isLogged} = this.state;
        const items = this.state.data.map((item, index) => {
            return <tr>
                <td><b>{index + 1}.</b></td>
                <td>{moment.unix(item.timestamp).format('h:mm:ss a - DD.MM.YYYY')}</td>
            </tr>;
        });
        return (
            <div className="App" style={{width: "100%", height: "100%"}}>
                {isLogged === true ?
                    <table className="table table-striped" style={{margin: "0 auto", border: "1px solid black", width: "50%"}}>
                        <thead>
                        <tr>
                            <th style={{width: "25%"}}>#</th>
                            <th style={{width: "75%"}}>Log time</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items}
                        </tbody>
                    </table>
                    :
                    <Login setUserLogin={this.setUserLogin}/>
                }
            </div>
        );
    }
}
