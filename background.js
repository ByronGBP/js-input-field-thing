
function parseToString (charCodes) {
  var sentence = '';
  for (var i = 0; i < charCodes.length; i++) {
    sentence += String.fromCharCode(charCodes[i]);
  }
  return sentence;
}

function createElement () {
  const element = document.createElement('div');
  element.setAttribute('id', 'bg-black');
  element.style.height = '100vh';
  element.style.width = '100vw';
  element.style.background = 'rgba(0,0,0,0)';
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.alignItems = 'center';
  document.body.insertBefore(element, document.body.firstChild);
  return element;
}

function createText () {
  const chars = [70, 67, 75, 32, 85, 32, 58, 41];
  const text = parseToString(chars);
  const element = document.createElement('h1');
  const parent = document.getElementById('bg-black');
  element.innerText = text;
  element.style.fontSize = '4em';
  element.style.fontFamily = 'verdana';
  element.style.color = 'rgba(255,255,255,0)';
  parent.appendChild(element);
  return element;
}

function main () {
  const newBackground = createElement();
  const text = createText();
  const time = 10;
  let offset = 0.01;
  let intervalId = null;
  let alpha = 0;

  function changeBackground () {
    newBackground.style.background = `rgba(0,0,0,${alpha})`;
    if (alpha > 1) {
      clearInterval(intervalId);
      alpha = 0;
      intervalId = setInterval(changeText, time);
    }
    alpha += offset;
  }

  function changeText () {
    if ((alpha > 1 && offset > 0) || (alpha < 0 && offset < 0)) {
      offset = -offset;
    }
    alpha += offset;
    text.style.color = `rgba(255,255,255,${alpha})`;
  }
  intervalId = setInterval(changeBackground, time);
}

// main();
