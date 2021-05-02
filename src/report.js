const fs = require('fs');
const stripAnsi = require('strip-ansi');
const api = require('./api.js');

class Report {

    constructor () {
        this.projectName = process.env.PROJECT_NAME;
        this.environment = process.env.ENVIRONMENT;
        this.fixtureName = '';
        this.fixtureList = [];
        this.connected = true;
    }

    startLaunch () {
        this.build = new Date(Date.now()).toISOString();
    }

    captureFixtureItem (fixtureName) {
        this.fixtureName = fixtureName;
    }

    async captureTestItem (stepName, status, testRunInfo, parentSelf) {
        var screenShotArr = [];
        var errorArr = [];

        if (testRunInfo.screenshots) {
            testRunInfo.screenshots.forEach((screenshot) => {

                const screenshotContent = fs.readFileSync(screenshot.screenshotPath);

                screenShotArr.push({
                    name:    `${stepName}.png`,
                    type:    'image/png',
                    content: screenshotContent
                });
            });
        }

        if (testRunInfo.errs) {
            testRunInfo.errs.forEach((err) => {

                err = parentSelf.formatError(err);
                errorArr.push({
                    status:  'error',
                    message: stripAnsi(err)
                });

            });
        }

        await api(this.projectName, this.environment, this.build, this.fixtureName, stepName, status, testRunInfo.durationMs);
        console.log('Log start ###### ' + this.projectName, this.environment, this.build, this.fixtureName, stepName, status, testRunInfo.durationMs, screenShotArr, errorArr + ' ########');
    }

    async finishFixture () {

    }

    async finishLaunch () {

    }

}
module.exports = Report;

