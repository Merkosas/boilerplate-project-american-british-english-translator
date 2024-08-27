const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

let regex = /(([0-9]|0[0-9]|1[0-9]|2[0-3])(:|\.)([0-5][0-9]))/g;

let transData = [
  ...Object.entries(americanOnly),
  ...Object.entries(americanToBritishSpelling)
];
let titlesData = [...Object.entries(americanToBritishTitles)];

Object.keys(britishOnly).forEach((key) => {
  transData.push([britishOnly[key], key]);
});

const highString = '<span class="highlight">';
let highLength = highString.length;

class Translator {
  compare(word, dictWord, mode) {
    if (!word || dictWord == []) return false;

    if (mode == 'american-to-british') {
      if (word.trim() == dictWord[0]) {
        return `${dictWord[1]}`;
      } else {
        if (word.length > dictWord[0].length) {
          let temp = 's';
          return dictWord[1].slice(-1) == 'y' &&
            !['a', 'e', 'i', 'o', 'u'].includes(
              dictWord[1].slice(-2, -1)
            )
            ? dictWord[1].slice(0, -1) + 'ies'
            : ['s', 'ss', 'x', 'z', 'ch', 'sh'].some((ending) =>
                dictWord[1].endsWith(ending)
              )
            ? `${dictWord[1] + 'es'}`
            : `${dictWord[1] + temp}`;
        } else return `${dictWord[1]}`;
      }
    }

    if (mode == 'british-to-american') {
      if (word.trim() == dictWord[1]) {
        return `${dictWord[0]}`;
      } else {
        if (word.length > dictWord[1].length) {
          let temp = 's';
          return dictWord[0].slice(-1) == 'y' &&
            !['a', 'e', 'i', 'o', 'u'].includes(
              dictWord[0].slice(-2, -1)
            )
            ? dictWord[0].slice(0, -1) + 'ies'
            : ['s', 'ss', 'x', 'z', 'ch', 'sh'].some((ending) =>
                dictWord[0].endsWith(ending)
              )
            ? `${dictWord[0] + 'es'}`
            : `${dictWord[0] + temp}`;
        } else return `${dictWord[0]}`;
      }
    }
  }

  convay(mode, sentence) {
    sentence = sentence;
    var toConvay = [sentence, sentence];

    let time = sentence.match(regex);
    let words = [];
    let titles = [];

    if (mode == 'american-to-british') {
      transData.forEach((word) => {
        let wordregex =
          word[0].slice(-1) == 'y' &&
          !['a', 'e', 'i', 'o', 'u'].includes(word[0].slice(-2, -1))
            ? new RegExp(`\\b${word[0].slice(0, -1)}y*(ies)*(\\b)`, 'ig')
            : new RegExp(`\\b${word[0]}(s)*(\\b)`, 'ig');

        if (sentence.match(wordregex) != null) {
          let temp = sentence.match(wordregex);

          temp.forEach((item) => {
            sentence = sentence.replace(wordregex, ' ');
            toConvay[1] = toConvay[1].replace(
              wordregex,
              `${highString}${this.compare(item, word, mode)}</span>`
            );
            toConvay[0] = toConvay[0].replace(
              wordregex,
              `${this.compare(item, word, mode)}`
            );
            words.push(this.compare(item, word, mode));
          });
        }
      });

      titlesData.forEach((title) => {
        let wordregex = new RegExp(`\\b${title[0]}`, 'gi');
        if (sentence.match(wordregex) != null) {
          let arr = sentence.match(wordregex);

          arr.forEach((item) => {
            sentence = sentence.replace(item, ' ');
            toConvay[0] = toConvay[0].replace(
              item,
              `${title[1][0].toUpperCase() + title[1].slice(1)}`
            );
            toConvay[1] = toConvay[1].replace(
              item,
              `${highString}${title[1][0].toUpperCase() + title[1].slice(1)}</span>`
            );
            titles.push(title[1][0].toUpperCase() + title[1].slice(1));
          });
        }
      });

      if (time != null) {
        time.forEach((time) => {
          toConvay[0] = toConvay[0].replace(time, `${time.replace(':', '.')}`);
          toConvay[1] = toConvay[1].replace(
            time,
            `${highString}${time.replace(':', '.')}</span>`
          );
        });
      }
    }

    if (mode == 'british-to-american') {
      transData.forEach((word) => {
        let wordregex =
          word[1].slice(-1) == 'y' &&
          !['a', 'e', 'i', 'o', 'u'].includes(word[1].slice(-2, -1))
            ? new RegExp(`\\b${word[1].slice(0, -1)}(y)*(ies)*(\\b)`, 'ig')
            : new RegExp(`\\b${word[1]}(s)*(\\b)`, 'ig');

        if (sentence.match(wordregex) != null) {
          let temp = sentence.match(wordregex);

          temp.forEach((item) => {
            sentence = sentence.replace(wordregex, ' ');
            toConvay[0] = toConvay[0].replace(
              wordregex,
              `${this.compare(item, word, mode)}`
            );
            toConvay[1] = toConvay[1].replace(
              wordregex,
              `${highString}${this.compare(item, word, mode)}</span>`
            );
            words.push(this.compare(item, word, mode));
          });
        }
      });

      titlesData.forEach((title) => {
        let wordregex = new RegExp(`\\b${title[1]}\\b`, 'gi');
        if (sentence.match(wordregex) != null) {
          let arr = sentence.match(wordregex);
          toConvay[0] = toConvay[0].replace(
            wordregex,
            `${title[0][0].toUpperCase() + title[0].slice(1)}`
          );
          toConvay[1] = toConvay[1].replace(
            wordregex,
            `${highString}${title[0][0].toUpperCase() + title[0].slice(1)}</span>`
          );
          arr.forEach((item) => {
            sentence = sentence.replace(wordregex, ' ');
            titles.push(title[0][0].toUpperCase() + title[0].slice(1));
          });
        }
      });

      if (time != null) {
        time.forEach((time) => {
          toConvay[0] = toConvay[0].replace(time, `${time.replace('.', ':')}`);
          toConvay[1] = toConvay[1].replace(
            time,
            `${highString}${time.replace('.', ':')}</span>`
          );
        });
      }
    }

    toConvay[0] =
      toConvay[0][0].toUpperCase() + toConvay[0].slice(1);
    toConvay[1] =
      toConvay[1][0] == '<'
        ? toConvay[1].slice(0, highLength) +
          toConvay[1][highLength].toUpperCase() +
          toConvay[1].slice(highLength + 1)
        : toConvay[1][0].toUpperCase() + toConvay[1].slice(1);

    return toConvay;
  }
}

module.exports = Translator;
