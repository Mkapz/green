import React, {Component, Fragment} from 'react';
import { Row, Col } from 'reactstrap';
import { withUser } from '../../services/withUser';
import API from '../../utils/API';
import EventModal from './EventModal';
import { List, ListItem, ListBtn } from "../List";
import { CardText, CardTitle } from 'reactstrap';
import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share';
import "./Events.css";

class EventList extends Component {
    state = {
        events: null
    };

    loadEvents() {
        const promise = this.props.myEvents ? API.getMyEvents(this.props.user.username) : API.getAllEvents();
        promise
        .then(res => this.setState({ events: res.data }))
        .catch(err => console.log(err));
    }

    componentDidMount() {
        this.loadEvents();
    }

    deleteEvent = (id) => {
        API.deleteEvent(id)
        .then(res => this.loadEvents())
        .catch(err => console.log(err));
    }

    handleRSVP = (id) => {
        API.updateAttendees({
            attendees: this.props.user.username,
            _id: id
        })
        API.updateRSVP({
            user: this.props.user.username,
            eventId: id
        })
        .then(res => this.loadEvents())
        .catch(err => console.log(err))
    }

    renderEvents() {
        const { username } = this.props.user;
        return (
            this.state.events.map(event => {
                const Owner = event.createdBy === username;
                return (
                    <ListItem key={event._id}>
                        <CardTitle className="profileTitle">{event.title}</CardTitle>
                        <Row>
                            <Col sm="8">
                                <CardText>When: {event.date} at {event.time}<br />Where: {event.location}<br />{!Owner && event.description && <span>Description: {event.description}<br /></span>}RSVPs: {event.attendees.length}</CardText>
                            </Col>
                            <Col sm="4">
                                {Owner && <EventModal event={event} />}
                                {Owner && <ListBtn onClick={() => this.deleteEvent(event._id)}>Delete</ListBtn>}
                                {!Owner && <ListBtn onClick={()=> this.handleRSVP(event._id)}>RSVP</ListBtn>}
                            </Col>
                        </Row>
                        <Row>
                            <FacebookShareButton url="https://github.com" quote={"Check out this event I found on GreenWave.com --- " + event.title + " on " + event.date + " at " + event.location + ". Together we can change the world!"} hashtag="#GreenCityBlueLake">
                                <i className="fab fa-facebook-square shareIcon" />
                            </FacebookShareButton>
                            <TwitterShareButton url="https://github.com" title={"Check out this event I found on GreenWave.com --- " + event.title + " on " + event.date + " at " + event.location + ". Together we can change the world!"} >
                                <i className="fab fa-twitter-square shareIcon" />
                            </TwitterShareButton>
                            <EmailShareButton url="https://github.com" subject={"Join me at " + event.title} body={"Hi there! Check out this event I found on GreenWave.com\n\n" + event.title + " on " + event.date + " at " + event.location + ".\n\n" + event.description + "\n\nHope you can make it! #GreenCityBlueLake" }>
                                <i className="fas fa-envelope-square shareIcon" />
                            </EmailShareButton>
                        </Row>
                    </ListItem>
                )
            })
        );
    }

    render() {
        const { myEvents } = this.props;
        const { events } = this.state;
        return (
            <Fragment>
                { myEvents && <h1>Manage My Events</h1>}
                {events && events.length ? (
                    <List>
                        {this.renderEvents()}
                    </List>
                ) 
                : (
                    <h5 className="noResults">Add an event by clicking the <strong>Create Event</strong> button above.</h5>
                )}
            
            </Fragment>
        );
    }
}

export default withUser(EventList);