import React, { Component } from 'react'
import { Button, Container, Form } from 'react-bootstrap'

export default class EditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newBook: props.book
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
        console.log(this.state.newBook)
        event.preventDefault()

        this.props.editBook(this.state.newBook);
    }

    render() {
        return (
            <div>
                <div className="container-editBook">
                    <div className="form-box-editBook">
                        <div className="header-form">
                            <h1 className="headOne"> Edit Book </h1>
                        </div>
                        <div className="body-form-editBook">
                            <form className="form-editBook" style={{ backgroundColor: "#f0f0f0" }}>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-book"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="bookName" value={this.state.newBook.bookName} placeholder="Book Name" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-image"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="image" value={this.state.newBook.image} placeholder="URL Image" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-file"></i></span>
                                    </div>
                                    <input className="form-control" type="number" name="numberOfpages" value={this.state.newBook.numberOfpages} placeholder="Number of Pages" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-user"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="authorName" value={this.state.newBook.authorName} placeholder="Author Name" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-clone"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="category" value={this.state.newBook.category} placeholder="Category" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-edit"></i></span>
                                    </div>
                                    <input className="form-control" type="text" name="description" value={this.state.newBook.description} placeholder="Description" onChange={this.handleChange} />
                                </div>

                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i class="fa fa-calendar"></i></span>
                                    </div>
                                    <input className="form-control" type="date" name="publish" value={this.state.newBook.publish} onChange={this.handleChange} />
                                </div>
                                <button type="button" className="btn btn-secondary btn-block" onClick={this.handleSubmit}>Submit Edit</button>
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
