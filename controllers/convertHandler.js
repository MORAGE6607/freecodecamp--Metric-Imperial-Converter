function ConvertHandler() {
 
  this.getNum = function(input) {
    const result = input.match(/[\d.\/]+/g);
    if (!result) return 1; // Default to 1 if no number is found
    if (result.length > 1) return 'invalid number';
    
    const fraction = result[0].split('/');
    if (fraction.length > 2) return 'invalid number';
    
    if (fraction.length === 2) {
      if (fraction[1] === '0') return 'invalid number'; // Avoid division by zero
      return parseFloat(fraction[0]) / parseFloat(fraction[1]);
    }
    
    const number = parseFloat(fraction[0]);
    if (isNaN(number)) return 'invalid number'; // Check if it's a valid number
    return number;
  };
  
  this.getUnit = function(input) {
    const result = input.match(/[a-zA-Z]+/g);
    if (!result) return 'invalid unit';
    
    const unit = result[0].toLowerCase();
    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unit)) return 'invalid unit';
    
    return unit === 'l' ? 'L' : unit; // Return 'L' for liters
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'L',
      'l': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    if (!initUnit) return 'invalid unit';
    return units[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function(unit) {
    if (!unit) return 'invalid unit';
    const unitNames = {
      'gal': 'gallons',
      'l': 'liters',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return unitNames[unit.toLowerCase()] || 'invalid unit';
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    let result;
    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'l':
        result = initNum / galToL;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      default:
        return 'invalid unit'; // Handle invalid unit safely
    }
    // Round to 5 decimal places for consistency with tests
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    return `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
  };
}

module.exports = ConvertHandler;
