import React, {Component} from 'react';
import './Login.css';
import axios from 'axios'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            pass: ""
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value,
        });
    }
    handleSubmit = async event => {
        event.preventDefault();
        // fetch na bazu (backend)...
        try {
            let res = await axios.post('http://localhost:5000/login', {
                user: this.state.user,
                pass: this.state.pass
            })

            if(res.data.data){
                console.log("check ", res.data.data[0].id)
                await axios.post('http://localhost:5000/logs', {
                    id_user: res.data.data[0].id
                })
                let logs = await axios.get(`http://localhost:5000/logs/${res.data.data[0].id}`)
                console.log(logs.data)
                this.props.setUserLogin(true, logs.data);

            }
            else{
                this.state.user=""
                this.state.pass=""
            }
        } catch (err) {
            console.log(err)
        }
    }

    validateForm() {
        const {user, pass} = this.state;
        return user.length === 0 || pass.length === 0;
    }

    render() {
        return (
            <div className="Login">
                <form method="POST" onSubmit={this.handleSubmit} className="Form">
                    <input type="text" id="user" placeholder="User name" onChange={this.handleChange}
                           value={this.state.user}/>
                    <input type="password" id="pass" placeholder="Password" onChange={this.handleChange}
                           value={this.state.pass}/>
                    <input type="submit" value="Login" disabled={this.validateForm()}/>
                </form>
            </div>
        );
    }
}

export default Login;
