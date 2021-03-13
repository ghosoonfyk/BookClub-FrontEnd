import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Container, Form, Button } from 'react-bootstrap'
import { Alert } from 'react-bootstrap';
import './UserStyle.css';
export default class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newUser: {},
            errorMessage: null,
            successMessage:null
        }
    }
    registerHandler = () => {
        if (this.checkPassword(this.state.newUser["password"], this.state.newUser["confirm"])) {
            this.props.register(this.state.newUser);
            this.setState({
                successMessage: "Welcome to our famile"
            })
        }
        else {
            this.setState({
                errorMessage: "unmatch password"
            })
        }
    }
    // test
    changeHandler = (e) => {
        let temp = { ...this.state.newUser }
        temp[e.target.name] = e.target.value;
        temp["image"] = "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
        temp["userRole"] = "ROLE_USER"
        this.setState({
            newUser: temp,
        })
        console.log(temp);
    }
    checkPassword = (password, confirm) => {
        if (password == confirm) {
            return true
        } else {
            return false
        }
    }
    render() {
        const successMessage = this.state.successMessage ? (
            <Alert className="alert" variant="success"> {this.state.successMessage}</Alert>
        ) : null
        const errorMessage = this.state.errorMessage ? (
            <Alert className="alert" variant="danger">{this.state.errorMessage}</Alert>
        ) : null
        return (
            <div>
            {errorMessage}
            {successMessage}
            
            <div className="container-registertion">
            <div className="form-box-registertion">
                <div className="header-form">
                    <h1 className="headOne"> Register </h1>
                    <div className="image">
                    </div>
                </div>
                <div className="body-form-registertion">
                    <form className="form-registertion" style={{ backgroundColor: "#f0f0f0" }}
                    >
                        
                         <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fa fa-user"></i></span>
                            </div>
                            <input className="form-control"  type="text" name="name" onChange={this.changeHandler} placeholder="your name" />
                        </div> 

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fa fa-at"></i></span>
                            </div>
                            <input className="form-control" type="email" name="emailAddress" onChange={this.changeHandler} placeholder="Email Address" />
                        </div>


                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i class="fa fa-lock"></i></span>
                            </div>
                            <input className="form-control" type="password" name="password" onChange={this.changeHandler} placeholder="Password" />
                        </div>

                        <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                 <span className="input-group-text"><i class="fa fa-lock"></i></span>
                             </div>
                             <input className="form-control" type="password" name="confirm" onChange={this.changeHandler} placeholder="Confirm Password"/>                             </div>
                          {/* <Button variant="dark" block onClick={this.registerHandler}>Register</Button> */}
                        <button type="button" className="btn btn-secondary btn-block" onClick={this.registerHandler}>Register</button>
                        <div className="message">
                        </div>
                    </form>
                   </div>
                </div>
            </div>
        </div>
  )       
}
}
