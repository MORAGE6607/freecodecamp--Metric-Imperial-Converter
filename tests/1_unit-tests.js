const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  
  test('Whole number input', function() {
    assert.equal(convertHandler.getNum('5kg'), 5);
  });

  test('Decimal number input', function() {
    assert.equal(convertHandler.getNum('3.5kg'), 3.5);
  });

  test('Fractional input', function() {
    assert.equal(convertHandler.getNum('1/2kg'), 0.5);
  });

  test('Fractional input with decimal', function() {
    assert.equal(convertHandler.getNum('3.5/2kg'), 1.75);
  });

  test('Double-fraction should return error', function() {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
  });

  test('No numerical input defaults to 1', function() {
    assert.equal(convertHandler.getNum('kg'), 1);
  });

  test('Valid input unit', function() {
    assert.equal(convertHandler.getUnit('5kg'), 'kg');
  });

  test('Invalid input unit should return error', function() {
    assert.equal(convertHandler.getUnit('5g'), 'invalid unit');
  });

  test('Correct return unit for gal', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
  });

  test('Spelled-out unit for gal', function() {
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
  });

  test('Convert gal to L', function() {
    assert.equal(convertHandler.convert(1, 'gal'), 3.78541);
  });

  test('Convert L to gal', function() {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
  });

  test('Convert mi to km', function() {
    assert.equal(convertHandler.convert(1, 'mi'), 1.60934);
  });

  test('Convert km to mi', function() {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
  });

  test('Convert lbs to kg', function() {
    assert.equal(convertHandler.convert(1, 'lbs'), 0.45359);
  });

  test('Convert kg to lbs', function() {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
  });

});
