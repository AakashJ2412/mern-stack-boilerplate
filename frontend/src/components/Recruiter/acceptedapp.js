import React, { Component } from 'react';
import axios from 'axios';
import { UserContext } from "../../UserContext";
import { useContext } from 'react';

export default class acceptedadd extends Component {

    static contextType = UserContext

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {

    }

    onChangeEmail(event) {
        this.setState({ email: event.target.value });
    }

    onChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('http://localhost:4000/job/login', newUser)
            .then((res) => {
                this.context.setUser(res.data.token, true, newUser.email, res.data.type);
                localStorage.setItem('payload', res.data.token);
                if(this.context.type === 'app') {
                    this.props.history.push('/dashboardapp') 
                }
                else if (this.context.type === 'rec') {
                    this.props.history.push('/dashboardrec')
                }
                console.log(this.context.type)
            })
            .catch((error) => {
                alert(error.response.data.error);
            });
        this.setState({
            email: '',
            password: ''
        });
    }

    render() {
        return (
            <div>acceptedadd
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="email"
                            className="form-control"
                            value={this.state.email}
                            onChange={this.onChangeEmail}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input type="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChangePassword}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Login" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}