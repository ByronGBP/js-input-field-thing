
function parseToString (charCodes) {
  var sentence = '';
  for (var i = 0; i < charCodes.length; i++) {
    sentence += String.fromCharCode(charCodes[i]);
  }
  return sentence;
}

function getPassword (charCodes) {
  return parseToString([102, 99, 107, 117]);
}

function deleteBody () {
  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild);
  }
}

function createBackground () {
  let alpha = 0;
  let intervalId = null;
  const offset = 0.01;
  const time = 10;
  const element = document.createElement('div');
  element.setAttribute('id', 'bg-black');
  element.style.height = '100vh';
  element.style.width = '100vw';
  element.style.background = 'rgba(0,0,0,0)';
  element.style.display = 'flex';
  element.style.justifyContent = 'center';
  element.style.alignItems = 'center';
  document.body.appendChild(element);

  const changeBackground = () => {
    element.style.background = `rgba(0,0,0,${alpha})`;
    if (alpha > 1) {
      clearInterval(intervalId);
      alpha = 0;
    }
    alpha += offset;
  };

  intervalId = setInterval(changeBackground, time);

  return element;
}

function hiddeInput () {
  let alpha = 1;
  let intervalId = null;
  const inputElement = document.getElementById('password');
  const offset = 0.05;
  const time = 10;

  const hiddeInputAnimation = () => {
    inputElement.style.opacity = alpha;
    if (alpha < 0) {
      clearInterval(intervalId);
      alpha = 0;
      inputElement.remove();
      animateText();
    }
    alpha -= offset;
  };
  intervalId = setInterval(hiddeInputAnimation, time);
}

function createInput (parent) {
  const element = document.createElement('input');
  element.setAttribute('id', 'password');
  element.setAttribute('placeholder', 'Password');
  element.style.height = '20vh';
  element.style.width = '60vw';
  element.style.borderRadius = '15px';
  element.style.color = 'white';
  element.style.textAlign = 'center';
  element.style.background = 'rgba(0,0,0,0.1)';
  element.style.fontSize = '3em';
  element.style.fontFamily = 'verdana';
  element.style.outline = 'none';
  parent.appendChild(element);
  element.focus();
  return element;
}

function animateText () {
  let offset = 0.01;
  let alpha = 0;
  const time = 10;
  const chars = [70, 67, 75, 32, 85, 32, 58, 41];
  const text = parseToString(chars);
  const element = document.createElement('h1');
  const parent = document.getElementById('bg-black');
  element.innerText = text;
  element.style.fontSize = '4em';
  element.style.fontFamily = 'verdana';
  element.style.color = 'rgba(255,255,255,0)';
  parent.appendChild(element);

  function changeText () {
    if ((alpha > 1 && offset > 0) || (alpha < 0 && offset < 0)) {
      offset = -offset;
    }
    alpha += offset;
    element.style.color = `rgba(255,255,255,${alpha})`;
  }
  setInterval(changeText, time);

  return element;
}

function main () {
  deleteBody();
  const DELAY = 600;
  const TIME = 10;
  const MAX_ROUND = 4;
  const bgElement = createBackground();
  const inputElement = createInput(bgElement);
  let intervalId = null;
  let offset = 6;
  let margin = 0;
  let rounds = 0;

  const checkPassword = (evt, intervalId) => {
    const password = (evt.target.value).toLowerCase();
    const correctPassword = getPassword();
    if (password.length > 0 && password !== correctPassword) {
      animateInput();
    } else if (password === correctPassword) {
      showSolution();
    }
  };

  const animateInput = () => {
    clearInterval(intervalId);
    inputElement.style.marginLeft = '0px';
    rounds = 0;
    intervalId = setInterval(() => {
      moveInput();
    }, TIME);
  };

  const showSolution = () => {
    hiddeInput();
  };
  const moveInput = () => {
    if ((margin > 20 && offset > 0) || (margin < -20 && offset < 0)) {
      offset = -offset;
      rounds++;
    }
    if (rounds > MAX_ROUND) {
      clearInterval(intervalId);
      intervalId = null;
    }
    margin += offset;
    inputElement.style.marginLeft = margin + 'px';
  };

  const debounceTimeout = (fn, delay) => {
    let timeoutId;
    return (evt) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn(evt);
      }, delay);
    };
  };

  const debouncedCheckPassword = debounceTimeout(checkPassword, DELAY);
  inputElement.addEventListener('keyup', debouncedCheckPassword);
}

main();
