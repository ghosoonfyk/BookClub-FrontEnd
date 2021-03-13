import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
export default class AddBook extends Component {
    constructor(props) {
        super(props)

        this.state = {
            newBook: {}
        }
    }

    handleChange = (event) => {
        const attributeToChange = event.target.name
        const newValue = event.target.value

        const updatedBook = { ...this.state.newBook }
        updatedBook[attributeToChange] = newValue

        console.log(updatedBook)
        this.setState({
            newBook: updatedBook
        })

    }

    handleSubmit = (event) => {
        event.preventDefault()

        this.props.addBook(this.state.newBook);
    }

    render() {
        return (
            <div>
                <div className="container-addBook">
                    <div className="form-box-addBook">
                        <div className="header-form">
                            <h1 className="headOne"> Add Book </h1>
                        </div>
                        <div className="body-form-addBook">
                            <form className="form-addBook" style={{ backgroundColor: "#f0f0f0" }}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-book"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="bookName" placeholder="Book Name" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-image"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="image" placeholder="URL of Image" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-file"></i></span>
                                    </div>
                                    <input className="form-control" type="number" name="numberOfpages" placeholder="Number of Pages" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="authorName" placeholder="Author Name" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-clone"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="category" placeholder="Category" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-edit"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="description" placeholder="Description" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input className="form-control" type="date" name="publish" onChange={this.handleChange} />
                                </div>
                                <button type="button" className="btn btn-secondary btn-block" onClick={this.handleSubmit}>Add the book</button>
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
