import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Dropdown, Input, TextArea, FormBtn } from "../../components/Form";
import { withUser } from '../../services/withUser';
import EventModal from './EventModal';
import Modal from 'react-modal';

class Profile extends Component {
    state = {
        locTitle: '',
        locAddress: '',
        locZipcode: '',
        locCategory: '',
        status: null,
        modalIsOpen: false
    };

    constructor() {
        super();
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    };

    openModal() {
        this.setState({modalIsOpen: true});
    };
     
    closeModal() {
        this.setState({modalIsOpen: false});
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleDropdownChange = (event) => {
        this.setState({locCategory: event.target.value});
    };
    
    handleCreateLocation = event => {
        event.preventDefault();
        this.setState({
            locTitle: '',
            locAddress: '',
            locZipcode: '',
            locCategory: '',
            modalIsOpen: false
        });
        API.createLocation({
            title: this.state.locTitle,
            address: this.state.locAddress,
            zipcode: this.state.locZipcode,
            category: this.state.locCategory,
            createdBy: this.props.user.username
        })
        .then(res => {
            this.setState({
                status: 'Thank you for adding to your community! Your location has been saved.'
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
            <Container>
                <Row>
                {user &&
                    <h1>Let's save Mother Earth together, {user.username}!</h1>
                }
                </Row>
                <Row>
                    <Col size="md-3">
                        <button type="button" className="btn btn-primary" onClick={this.openModal}>
                            Create Location
                        </button>
                        {status && 
                            <div className="card">
                                <div className="card-body">
                                    {status}
                                </div>
                            </div>
                        }
                    </Col>
                    <Col size="md-3">
                        <EventModal />
                    </Col>
                </Row>
                {/* Location Modal */}
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="Event Modal"
                    ariaHideApp={false}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Grow Your Community<br/>Add a Location</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.closeModal}>
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form>
                            <label htmlFor="locTitle">Location</label>
                            <Input
                                value={this.state.locTitle}
                                onChange={this.handleInputChange}
                                name="locTitle"
                                placeholder="Office of Sustainability"
                            />
                            <label htmlFor="locAddress">Address</label>
                            <Input
                                value={this.state.locAddress}
                                onChange={this.handleInputChange}
                                name="locAddress"
                                placeholder="230 West Huron Road"
                            />
                            <label htmlFor="locZipcode">Zipcode</label>
                            <Input
                                value={this.state.locZipcode}
                                onChange={this.handleInputChange}
                                name="locZipcode"
                                placeholder="44113"
                            />
                            <div className="form-group">
                                <label>Category</label>
                                <select className="form-control" value={this.state.locCategory} onChange={this.handleDropdownChange}>
                                    <option disabled />
                                    <option value="Community">Green Community</option>
                                    <option value="Shop">Shop Green</option>
                                    <option value="Travel">Travel Green</option>
                                    <option value="Volunteer">Volunteer</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </form>
                        </div>
                        <div className="modal-footer">
                            <FormBtn
                                disabled={!(this.state.locTitle && this.state.locAddress && this.state.locZipcode && this.state.locCategory)}
                                onClick={this.handleCreateLocation}
                            >
                                Submit Location
                            </FormBtn>
                        </div>
                    </div>
                </Modal>          
            </Container>
        );
    }
}

export default withUser(Profile);
