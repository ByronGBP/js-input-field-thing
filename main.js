
function drawCharCodes (charCodes) {
  var sentence = '';
  for (var i = 0; i < charCodes.length; i++) {
    sentence += String.fromCharCode(charCodes[i]);
  }
  console.log(sentence);
}

function getCodeFromString (str) {
  let codes = [];
  for (var i = 0; i < str.length; i++) {
    codes.push(str[i].charCodeAt());
  }
  return codes;
}

function getNextRow (arr) {
  var find = false;
  const newRow = arr.map((elem, idx) => {
    if (!find && elem) {
      find = true;
      return false;
    }
    if (find && !arr[idx + 1]) {
      return false;
    }
    return elem;
  });
  return newRow;
}

function getFirstRow (length) {
  var centinella = false;
  var row = [];
  for (var i = 0; i < length; i++) {
    if (i === 2 || i === length - 2) {
      centinella = !centinella;
    }
    if (centinella) {
      row.push(true);
    } else {
      row.push(false);
    }
  }
  return row;
}

function getInitialRow (length) {
  var centinella = true;
  var row = [];
  for (var i = 0; i < length; i++) {
    if (i % 3 === 0) {
      centinella = !centinella;
    }
    if (centinella) {
      row.push(true);
    } else {
      row.push(false);
    }
  }
  return row;
}

function getShapeCode () {
  var first = true;
  var length = 15;
  var row = getInitialRow(length);
  var shape = [];
  for (var i = 0; i < length / 2; i++) {
    shape.push(10);
    for (var j = 0; j < length; j++) {
      if (row[j]) {
        shape.push(46);
      } else {
        shape.push(32);
      }
    }
    if (first) {
      first = false;
      row = getFirstRow(length);
    } else {
      row = getNextRow(row);
    }
  }
  return shape;
}

function getTextCode () {
  return [10, 32, 32, 32, 70, 85, 67, 75, 32, 85, 32, 58, 41, 32, 32, 32];
}

function main () {
  var shapeCodes = getShapeCode();
  var textCodes = getTextCode();
  var charCodes = shapeCodes.concat(textCodes);
  drawCharCodes(charCodes);
}

// main();
