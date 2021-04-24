const axios = require('axios');

const url = 'http://localhost:5000/posts/add';

module.exports = function () {
    try {
        axios.post(url, { 'project': 'aman', 'build': 3, 'environment': 'alpha', 'tags': ['regression'], 'fixture': 'reporter', 'test': 'hello', 'message': 'hello message', 'duration': '1' })
            .catch(err => console.log('Not able to post test through api', err));
    }
    catch (error) {
        console.log(error.message);
    }

    
};

