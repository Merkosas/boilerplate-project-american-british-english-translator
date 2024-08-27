const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
let translator = new Translator();

const AMBR = 'american-to-british';
const BRAM = 'british-to-american';
const highString = '<span class="highlight">';

suite('Unit Tests', () => {

  suite('Translations to British', () => {

    test('Translate "Mangoes are my favorite fruit." to British English', (done) => {   
      let sentence = 'Mangoes are my favorite fruit.';
      assert.equal(translator.convay(AMBR, sentence)[0], 'Mangoes are my favourite fruit.');          
      done();
    });

    test('Translate "I ate yogurt for breakfast." to British English', (done) => {   
      let sentence = 'I ate yogurt for breakfast.';
      assert.equal(translator.convay(AMBR, sentence)[0], 'I ate yoghurt for brekkie.');          
      done();
    });

    test('Translate "We had a party at my friend\'s condo." to British English', (done) => {   
      let sentence = "We had a party at my friend's condo.";
      assert.equal(translator.convay(AMBR, sentence)[0], "We had a party at my friend's flat.");          
      done();
    });

    test('Translate "Can you toss this in the trashcan for me?" to British English', (done) => {   
      let sentence = "Can you toss this in the trashcan for me?";
      assert.equal(translator.convay(AMBR, sentence)[0], "Can you toss this in the bin for me?");          
      done();
    });

    test('Translate "The parking lot was full." to British English', (done) => {   
      let sentence = "The parking lot was full.";
      assert.equal(translator.convay(AMBR, sentence)[0], "The car park was full.");          
      done();
    });

    test('Translate "Like a high tech Rube Goldberg machine." to British English', (done) => {   
      let sentence = "Like a high tech Rube Goldberg machine.";
      assert.equal(translator.convay(AMBR, sentence)[0], "Like a high tech Heath Robinson device.");          
      done();
    });

    test('Translate "To play hooky means to skip class or work." to British English', (done) => {   
      let sentence = "To play hooky means to skip class or work.";
      assert.equal(translator.convay(AMBR, sentence)[0], "To bunk off means to skip class or work.");          
      done();
    });

    test('Translate "No Mr. Bond, I expect you to die." to British English', (done) => {   
      let sentence = "No Mr. Bond, I expect you to die.";
      assert.equal(translator.convay(AMBR, sentence)[0], "No Mr Bond, I expect you to die.");          
      done();
    });

    test('Translate "Dr. Grosh will see you now." to British English', (done) => {   
      let sentence = "Dr. Grosh will see you now.";
      assert.equal(translator.convay(AMBR, sentence)[0], "Dr Grosh will see you now.");          
      done();
    });

    test('Translate "Lunch is at 12:15 today." to British English', (done) => {   
      let sentence = "Lunch is at 12:15 today.";
      assert.equal(translator.convay(AMBR, sentence)[0], "Lunch is at 12.15 today.");          
      done();
    });

  });

  suite('Translations to American', () => {

    test('Translate "We watched the footie match for a while." to American English', (done) => {   
      let sentence = 'We watched the footie match for a while.';
      assert.equal(translator.convay(BRAM, sentence)[0], 'We watched the soccer match for a while.');          
      done();
    });

    test('Translate "Paracetamol takes up to an hour to work." to American English', (done) => {   
      let sentence = 'Paracetamol takes up to an hour to work.';
      assert.equal(translator.convay(BRAM, sentence)[0], 'Acetaminophen takes up to an hour to work.');          
      done();
    });

    test('Translate "First, caramelise the onions." to American English', (done) => {   
      let sentence = 'First, caramelise the onions.';
      assert.equal(translator.convay(BRAM, sentence)[0], 'First, caramelize the onions.');          
      done();
    });

    test('Translate "I spent the bank holiday at the funfair." to American English', (done) => {   
      let sentence = 'I spent the bank holiday at the funfair.';
      assert.equal(translator.convay(BRAM, sentence)[0], 'I spent the public holiday at the carnival.');          
      done();
    });

    test('Translate "I had a bicky then went to the chippy." to American English', (done) => {   
      let sentence = 'I had a bicky then went to the chippy.';
      assert.equal(translator.convay(BRAM, sentence)[0], 'I had a cookie then went to the fish-and-chip shop.');          
      done();
    });

    test('Translate "I\'ve just got bits and bobs in my bum bag." to American English', (done) => {   
      let sentence = "I've just got bits and bobs in my bum bag.";
      assert.equal(translator.convay(BRAM, sentence)[0], "I've just got odds and ends in my fanny pack.");          
      done();
    });

    test('Translate "The car boot sale at Boxted Airfield was called off." to American English', (done) => {   
      let sentence = "The car boot sale at Boxted Airfield was called off.";
      assert.equal(translator.convay(BRAM, sentence)[0], "The swap meet at Boxted Airfield was called off.");          
      done();
    });

    test('Translate "Have you met Mrs Kalyani?" to American English', (done) => {   
      let sentence = "Have you met Mrs Kalyani?";
      assert.equal(translator.convay(BRAM, sentence)[0], "Have you met Mrs. Kalyani?");          
      done();
    });

    test('Translate "Prof Joyner of King\'s College, London." to American English', (done) => {   
      let sentence = "Prof Joyner of King's College, London.";
      assert.equal(translator.convay(BRAM, sentence)[0], "Prof. Joyner of King's College, London.");          
      done();
    });

    test('Translate "Tea time is usually around 4 or 4.30." to American English', (done) => {   
      let sentence = "Tea time is usually around 4 or 4.30.";
      assert.equal(translator.convay(BRAM, sentence)[0], "Tea time is usually around 4 or 4:30.");          
      done();
    });

  });

  suite('Highlight Translations', () => {

    test('Highlight translation in "Mangoes are my favorite fruit."', (done) => {   
      let sentence = "Mangoes are my favorite fruit.";
      assert.equal(translator.convay(AMBR, sentence)[1], `Mangoes are my ${highString}favourite</span> fruit.`);          
      done();
    });

    test('Highlight translation in "I ate yogurt for breakfast."', (done) => {   
      let sentence = "I ate yogurt for breakfast.";
      assert.equal(translator.convay(AMBR, sentence)[1], `I ate ${highString}yoghurt</span> for ${highString}brekkie</span>.`);          
      done();
    });

    test('Highlight translation in "We watched the footie match for a while."', (done) => {   
      let sentence = "We watched the footie match for a while.";
      assert.equal(translator.convay(BRAM, sentence)[1], `We watched the ${highString}soccer</span> match for a while.`);          
      done();
    });

    test('Highlight translation in "Paracetamol takes up to an hour to work."', (done) => {   
      let sentence = "Paracetamol takes up to an hour to work.";
      assert.equal(translator.convay(BRAM, sentence)[1], `${highString}Acetaminophen</span> takes up to an hour to work.`);          
      done();
    });

  });

});
