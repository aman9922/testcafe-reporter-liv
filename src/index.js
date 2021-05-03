const Report = require('./report');
const api = require('./api.js');

module.exports = function () {
    const report = new Report();

    return {
        noColors: true,

        reportTaskStart (startTime, userAgents, testCount) {
            this.startTime = startTime;
            this.testCount = testCount;
            this.userAgents = userAgents;
            report.startLaunch();
            // this.write(`Running tests in: ${userAgents}`)
            //     .newline();
        },

        reportFixtureStart (name) {
            this.newline()
                .setIndent(0)
                .write(`[${this.chalk.blue(name)}]`)
                .newline();
            report.captureFixtureItem(name);
        },

        reportTestStart (/* name, testMeta */) {
            // NOTE: This method is optional.
        },

        async reportTestDone (name, testRunInfo) {
            const self = this;
            const hasErr = !!testRunInfo.errs.length;//
            //const result = testRunInfo.skipped ? 'skipped' : hasErr ? 'failed' : 'passed';
            var result = '';

            if (testRunInfo.skipped) 
                result = 'skipped'; 
            else if (hasErr) 
                result = 'failed'; 
            else 
                result = 'passed'; 

            //const title = `[ ${result === 'passed' ? this.chalk.green.bold('✓') : result === 'skipped' ? this.chalk.blue.bold('-') : this.chalk.red.bold('✖')} ] ${name}`;
            var title = '';

            if (result === 'passed') 
                title = `[${this.chalk.green.bold('✓')}] ${name}`;
            
            else if (result === 'skipped') 
                title = `[${this.chalk.blue.bold('-')}] ${name}`;
            
            else 
                title = `[${this.chalk.red.bold('✖')}] ${name}`;
            
            //report.captureTestItem( name, result, testRunInfo, self);
            await api(name, result, testRunInfo, self);

            this.setIndent(2)
                .write(`${title}`)
                .newline();

            if (hasErr) {
                testRunInfo.errs.forEach((err, idx) => {
                    this.newline()
                        .write(this.formatError(err, `${idx + 1}) `))
                        .newline();
                });
            }
        },

        reportTaskDone (endTime, passed) {
            const durationMs = endTime - this.startTime;
            const durationStr = this.moment
                .duration(durationMs)
                .format('h[h] mm[m] ss[s]');

            let footer = passed === this.testCount ?
                `${this.testCount} passed` :
                `${this.testCount - passed}/${this.testCount} failed`;

            footer += ` (Duration: ${durationStr})`;

            this.newline()
                .setIndent(0)
                .write(footer)
                .newline();
        }
    };
};
