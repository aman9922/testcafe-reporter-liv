const axios = require('axios');

//const url = 'http://localhost:5000/posts/add';
const url = process.env.DASHBOARD_URL + '/add';

module.exports = function (projectName, environment, build, fixtureName, stepName, status, durationMs, screenShotArr, errorArr, tags) {
    try {
        axios.post(url, { 'projectName': projectName, 'environment': environment, 'build': build, 'fixtureName': fixtureName, 'stepName': stepName, 'status': status, 'durationMs': durationMs, 'screenShotArr': screenShotArr, 'errorArr': errorArr, 'tags': tags })
            .catch(err => console.log('Not able to post test through api', err));
    }
    catch (error) {
        console.log(error.message);
    }


};

