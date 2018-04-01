import axios from 'axios';

export default {
    // Create new user
    createUser: function(userData) {
        return axios.post('/api/users', userData)
    },

    // User authentication
    userLogin: function(loginData) {
        return axios.post('/api/auth', loginData)
    },

    // Create new location
    createLocation: function(locData) {
        return axios.post('/api/locations', locData)
    },

    // Create new event
    createEvent: function(eventData) {
        return axios.post('/api/events', eventData)
    }
}
