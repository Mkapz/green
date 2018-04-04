import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
// import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import { withUser } from '../../services/withUser';
import { EventList } from '../../components/Events';

class Events extends Component {
  // Setting our component's initial state
  state = {
    events: [],
    time: "",
    date: "",
    location: "",
    description: "",
    status: null,
    title: ""
  };

  // When the component mounts, load all books and save them to this.state.books
//   componentDidMount() {
//     this.loadEvents();
//   }

  // Loads all Events  and sets them to this.state.Events
//   loadEvents = () => {
//     API.getEvents()
//       .then(res =>
//         this.setState({ events: res.data, title: "", author: "", synopsis: "" })
//       )
//       .catch(err => console.log(err));
//   };

  // Deletes a book from the database with a given id, then reloads books from the db
//   deleteEvent = id => {
//     API.deleteEvent(id)
//       .then(res => this.loadEvents())
//       .catch(err => console.log(err));
//   };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    this.setState({
      events: [],
      time: "",
      date: "",
      location: "",
      description: "",
      title: ""
    })
    API.createEvent({
      title: this.state.title,
      time: this.state.time,
      date: this.state.date,
      location: this.state.location,
      description: this.state.description,
      createdBy: this.props.user.username
    })
    .then(res => {
      this.setState({
          status: 'Thank you for adding to your community! Your event has been saved.'
      });  
    })
    .catch(err => {
        this.setState({
          status: err.message
        })
    });
  };

  render() {
    const { user } = this.props;
    const { status } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <Jumbotron> */}
              <h1>What green event do you want to enter?</h1>
            {/* </Jumbotron> */}
            {status && 
              <div className="card">
                  <div className="card-body">
                      {status}
                  </div>
              </div>
            }
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.date}
                onChange={this.handleInputChange}
                name="date"
                placeholder="Date (required)"
                type="date"
                id="date"
              />
              <Input
                value={this.state.time}
                onChange={this.handleInputChange}
                name="time"
                placeholder="Time (required)"
                type="time"
                id="time"
              />
                <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"
              />
              <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="Description (Optional)"
              />
              <FormBtn
                disabled={!(this.state.time && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Submit Event
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <EventList />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withUser(Events);
