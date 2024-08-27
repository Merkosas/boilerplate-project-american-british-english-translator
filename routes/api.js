'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;

      if (!locale || text === undefined) {
        return res.json({ error: 'Required field(s) missing' });
      }

      if (text === "") {
        return res.json({ error: 'No text to translate' });
      }

      if (locale === 'american-to-british' || locale === 'british-to-american') {
        const newText = translator.convay(locale, text)[0];
        const newTextHighlight = translator.convay(locale, text)[1];

        if (text.toLowerCase().trim() === newText.toLowerCase().trim()) {
          return res.json({ text: text, translation: "Everything looks good to me!" });
        }

        return res.json({ text: text, translation: newTextHighlight });
      } else {
        return res.json({ error: 'Invalid value for locale field' });
      }
    });
};
