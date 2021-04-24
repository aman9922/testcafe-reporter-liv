# testcafe-reporter-liv
[![Build Status](https://travis-ci.org/aman9922/testcafe-reporter-liv.svg)](https://travis-ci.org/aman9922/testcafe-reporter-liv)

This is the **liv** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

<p align="center">
    <img src="https://raw.github.com/aman9922/testcafe-reporter-liv/master/media/preview.png" alt="preview" />
</p>

## Install

```
npm install testcafe-reporter-liv
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter liv
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('liv') // <-
    .run();
```

## Author
Aman Gupta 
