import React, { Component } from 'react'
import './HomeStyle.css'

export default class Home extends Component {
  render() {
    return (
      <main>

        <img src="landingPage_BookClub.png" alt="book club header" className="landing" />
        <br />

        <div className="text-over-image">
          <p className="title">SHARE YOUR JOURNEY THROUGH PAPERS</p>
          <button className="button" onClick={this.props.goToBooks}>GO TO BOOKS</button>
        </div>

        <p className="content">Book-club is to share your thoughts, comments, and your suggestions about the book with others.</p>

        <footer className="footer">

          <h5 className="fancy">
            <span>Book-Club</span>
          </h5>

          <br />
          <div className="footer-text">
            <a href="#" className="footer-linkes"><img src="https://i.pinimg.com/originals/bb/18/bd/bb18bdbbef437b2d50518db5a8292c94.png" alt="email" className="icon" /> book-club@admin.com</a>
            <p><img src="https://image.flaticon.com/icons/png/512/104/104663.png" className="icon" /> 2021 | Book-Club</p>
          </div>
        </footer>
      </main >
    )
  }
}
