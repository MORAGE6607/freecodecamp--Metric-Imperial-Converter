'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.get('/api/convert', (req, res) => {
    const input = req.query.input;
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);

    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return res.send('invalid number and unit');  // <== no status 400!
    }
    if (initNum === 'invalid number') {
      return res.send('invalid number');  // <== no status 400!
    }
    if (initUnit === 'invalid unit') {
      return res.send('invalid unit');  // <== no status 400!
    }

    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    });
  });
};
