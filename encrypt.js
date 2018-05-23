// --- Note for developers ---
// Use the cleverTalk for encrypt and decrypt 👍

function cleverTalk (input) {
  let output = 'wtf are you trying?!';
  if (typeof input === 'string') {
    output = encryptMessage(input);
  }
  if (typeof input === 'object' && input.length > 0) {
    output = decryptMessage(input);
  }

  function encryptMessage (msg) {
    const regExp = getRegExpForEmoji();
    let newCode = [];
    for (let i = 0; i < msg.length; i++) {
      var emoji = msg[i] + msg[i + 1];
      if (regExp.test(emoji)) {
        newCode.push(emoji.codePointAt(0));
        i++;
      } else {
        newCode.push(msg[i].codePointAt(0));
      }
    }
    return newCode;
  }

  function decryptMessage (arr) {
    return arr.reduce((acc, elem) => {
      return (acc += String.fromCodePoint(elem));
    }, '');
  }

  function getRegExpForEmoji () {
    const rsDingbat = '[\\u2700-\\u27bf]';
    const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}';
    const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]';

    const keycap = '[\\u0023-\\u0039]\\ufe0f?\\u20e3';
    const miscSymbols = '[\\u2600-\\u26FF]';
    const cjkLettersAndMonths = [
      '\\u3299',
      '\\u3297'
    ];
    const cjkSymbolsAndPunctuation = [
      '\\u303d',
      '\\u3030'
    ];
    const enclosedAlphanumerics = [
      '\\u24c2'
    ];
    const enclosedAlphanumericSupplement = [
      '\\ud83c[\\udd70-\\udd71]',
      '\\ud83c[\\udd7e-\\udd7f]',
      '\\ud83c\\udd8e',

      '\\ud83c[\\udd91-\\udd9a]',

      '\\ud83c[\\udde6-\\uddff]'
    ];
    const enclosedIdeographicSupplement = [
      '[\\ud83c[\\ude01-\\ude02]',
      '\\ud83c\\ude1a',
      '\\ud83c\\ude2f',
      '[\\ud83c[\\ude32-\\ude3a]',
      '[\\ud83c[\\ude50-\\ude51]'
    ];
    const generalPunctuation = [
      '\\u203c',
      '\\u2049'
    ];
    const geometricShapes = [
      '[\\u25aa-\\u25ab]',
      '\\u25b6',
      '\\u25c0',
      '[\\u25fb-\\u25fe]'
    ];
    const latin1Supplement = [
      '\\u00a9',
      '\\u00ae'
    ];
    const letterLikeSymbols = [
      '\\u2122',
      '\\u2139'
    ];
    const mahjongTiles = [
      '\\ud83c\\udc04'
    ];
    const miscSymbolsAndArrows = [
      '\\u2b05',
      '\\u2b06',
      '\\u2b07',
      '\\u2b1b',
      '\\u2b1c',
      '\\u2b50',
      '\\u2b55'
    ];
    const miscTechnical = [
      '\\u231a',
      '\\u231b',
      '\\u2328',
      '\\u23cf',
      '[\\u23e9-\\u23f3]',
      '[\\u23f8-\\u23fa]'
    ];
    const playingCards = [
      '\\ud83c\\udccf'
    ];
    const supplementalArrows = [
      '\\u2934',
      '\\u2935'
    ];
    const arrows = [
      '[\\u2190-\\u21ff]'
    ];
    const supplemental = [].concat(
      rsDingbat,
      rsRegional,
      rsSurrPair,

      keycap,
      cjkLettersAndMonths,
      cjkSymbolsAndPunctuation,
      enclosedAlphanumerics,
      enclosedAlphanumericSupplement,
      enclosedIdeographicSupplement,
      generalPunctuation,
      geometricShapes,
      latin1Supplement,
      letterLikeSymbols,
      mahjongTiles,
      miscSymbols,
      miscSymbolsAndArrows,
      miscTechnical,

      playingCards,
      supplementalArrows,
      arrows
    ).join('|');

    const rsEmoji = '(?:' + supplemental + ')';

    return new RegExp(rsEmoji);
  }
  return output;
}
