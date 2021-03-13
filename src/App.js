import React, { Component } from 'react'
import axios from 'axios';
import './book/Alert.css'
import './NavBar.css'
import './App.css';
import './HomeStyle.css'
import Index from './book/Index';
import Home from './Home';
import Login from './user/Login';
import AddBook from './book/AddBook';
import Register from './user/Register';
import Profile from './user/Profile';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { decode } from "jsonwebtoken";
import { Alert } from 'react-bootstrap';
import pictureOne from './image/Bookclub-header.png'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}, // user information will be in this object when he login successfully
      isAuth: false,
      userToken: "", // to store token when user is login
      redirect: "",
      book: null, // when clicking on some book, the details will be in this key..
      isEdit: false,
      books: [],
      successMessage: null,
      errorMessage: null,
    }
  }


  componentDidMount() {
    this.loadBook()
    console.log("did mount in App.js")
    let token = localStorage.getItem("token");
    if (token != null) {
      let user = decode(token);

      if (user) {
        this.profile(this.state.user.emailAddress)

        this.setState({
          isAuth: true,
          user: user,
        });
        this.updateProfile(user)
        this.profile(this.state.user.emailAddress)

      } else if (!user) {
        localStorage.removeItem("token");
        this.setState({
          isAuth: false,
        });

        this.logout()
      }
    }

    console.log(this.state.user)
  }

  loadBook = () => {
    axios
      .get("/bookclub/book/index")
      .then(response => {
        console.log("loadBook")
        console.log(response)
        this.setState({
          books: response.data,
          book: this.state.book
        })

      })
      .catch(error => {
        console.log("Error retreiving books !!");
        console.log(error);
      })
  }
  login = (user) => {
    axios
      .post("/bookclub/user/authenticate", user)
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        console.log("Logged in successfully !")

        if (response.data.token != null) {
          localStorage.setItem("token", response.data.token);
          let userToken = decode(response.data.token);
          this.setState({
            isAuth: true,
            user: user,
            userToken: userToken,
            redirect: './Profile',
            successMessage: "Successfully logged in!!!",
            errorMessage: null,
          });

          this.profile(user.emailAddress)


        } else {
          this.setState({
            isAuth: false,
            userToken: null,
            user: {},
            errorMessage: "Incorrect username or password",
            successMessage: null,
            
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          isAuth: false,
          errorMessage: "Error Occured while login, please try again !",
          errorMessage: null,
        });
      });

    console.log(this.state.user)

  }

  register = (user) => {
    axios.post(`/bookclub/user/registration`, user)
      .then(response => {
        console.log("response in axios of registeration")
        console.log(response)
        console.log("user information in axios of registeration")
        console.log(user)
        this.setState({
          redirect: "./Login"
        })
      })
      .catch(error => {
        console.log(" error registering user");
        console.log(error);
      })
  }

  addBook = (book) => {
    axios
      .post("/bookclub/book/add", book,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
          }
        })
      .then(response => {
        console.log("book add sucssfully")
        const updatedBookList = [...this.state.books];
        updatedBookList.push(response.data);
        this.setState({
          books: updatedBookList,
          redirect: './Index',
          successMessage: "The book added successfuly",
          errorMessage: null,

        })
        this.loadBook()
      })
      .catch(error => {
        console.log("erroe in adding book");
        console.log(error)
        this.setState({
          errorMessage: "Ooops there somthing wrong try again later " + error,
          successMessage: null,
         


        })
      })
  }

  backToBooks = () => {
    this.setState({
      book: null,
    })
    this.loadBook()
  }

  logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    this.setState({
      isAuth: false,
      user: null,
      userToken: "",
      redirect: '../',
      successMessage: "Bye Bye See you Later",
      errorMessage: null,
    });
  };

  profile = (emailAddress) => {
    console.log("emailAddress")
    console.log(emailAddress)
    if (this.state.user != null) {
      axios.get(`/bookclub/user/profile?emailAddress=${emailAddress}`)
        .then(response => {
          console.log("from function profile" + response.data)
          this.setState({
            user: response.data
          })
          console.log(this.state.user)
          // this.loadBook()
        })
        .catch(error => {
          console.log(" Error profile ");
          console.log(error);
        })
    }

  }

  updateProfile = (user) => {
    console.log(user)
    if (this.state.user != null) {
      axios.post(`/bookclub/user/updateUserInfo?emailAddress=${user.emailAddress}`, user)
        .then(response => {
          console.log("from function updateProfile")
          console.log(response)
          this.setState({
            user: user,
          })
          console.log(this.state.user)
          // this.loadBook()
        })
        .catch(error => {
          this.setState({
            // errorMessage: "Oops ! something went wrong while updating profile"
          })
          console.log(" Error profile ");
          console.log(error);
        })
    }

  }

  updatePassword = (user) => {
    axios.put(`/bookclub/user/updatePassword?emailAddress=${user.emailAddress}`, user)
      .then(response => {
        console.log("from function updatePassword")
        console.log(response)
        console.log(user)
        this.setState({
          user: user
        })
      })
      .catch(error => {
        this.setState({
          // errorMessage: "Oops ! something went wrong while updating profile"

        })
        console.log(" Error while updating the password ");
        console.log(error);
      })

  }

  goToBooks = () => {
    this.setState({
      redirect: './book/index'
    })
  }

  render() {
    const { isAuth } = this.state;
    console.log("Book state in App.js : " + this.state.book)
    const successMessage = this.state.successMessage ? (
      <Alert variant="success"> {this.state.successMessage}</Alert>
    ) : null
    const errorMessage = this.state.errorMessage ? (
      <Alert variant="danger">{this.state.errorMessage}</Alert>
    ) : null
    console.log(successMessage)
    return (

      <div>
        <nav>


          <Router>
            {/* {Redirect user after registeration to login page..} */}
            <div>
              <Redirect to={this.state.redirect} />

            </div>
            <div>
              <img src={pictureOne} alt="book club header" className="header-image" />
            </div>
            {(isAuth && this.state.user != null) ?
              <div className="nav-bar">
                <Link className="link" to="/">HOME</Link>{' '}
                <Link className="link" to="/book/index" onClick={this.backToBooks}>BOOKS</Link>{' '}
                <Link className="link" to="/book/add" >NEW BOOK</Link>{' '}
                <Link className="link" to="/user/profile" onClick={this.loadBook}>PROFILE</Link>{' '}
                <Link className="link" to="/user/logout" onClick={this.logout}>LOGOUT</Link>{' '}
              </div>

              :
              <div className="nav-bar">
                < Link className="link" to="/">HOME</Link>{' '}
                <Link className="link" to="/book/index" onClick={this.backToBooks}>BOOKS</Link>{' '}
                <Link className="link" to="/user/login">LOGIN</Link>{' '}
                <Link className="link" to="/user/register">REGISTER</Link>{' '}
              </div>
            }
            <div>
              {errorMessage}
              {successMessage}
              <Route exact path="/" component={() => <Home goToBooks={this.goToBooks} />} />
              <Route path="/book/index" component={() => <Index book={this.state.book} isEdit={this.state.sEdit} redirect={this.state.redirect} books={this.state.books} user={this.state.user} userToken={this.state.userToken} />} />
              <Route path="/book/add" component={() => <AddBook addBook={this.addBook} />} />
              <Route path="/user/login" component={() => <Login login={this.login} />} />
              <Route path="/user/register" component={() => <Register register={this.register} />} />
              <Route path="/user/profile" component={() => <Profile user={this.state.user} updateProfile={this.updateProfile} successMessage={this.state.successMessage} updatePassword={this.updatePassword} userToken={this.state.userToken} books={this.state.books} loadBook={this.loadBook} />} />
            </div>

          </Router>
        </nav>

      </div>
    )
  }
}