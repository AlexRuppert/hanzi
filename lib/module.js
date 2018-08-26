var hanzi = require('./hanzidecomposer.js');
var dict = require('./dictionary.js');

function start(scripttype, loadFrequency, withComponent = true) {
  hanzi.start(withComponent);
  dict.start(scripttype, loadFrequency);
}

exports.start = start;
exports.decompose = hanzi.decompose;
exports.decomposeMany = hanzi.decomposeMany;
exports.ifComponentExists = hanzi.ifComponentExists;
exports.definitionLookup = dict.definitionLookup;
exports.dictionarySearch = dict.dictionarySearch;
exports.getExamples = dict.getExamples;
exports.getPinyin = dict.getPinyin;
exports.segment = dict.segment;
exports.getCharacterFrequency = dict.getCharacterFrequency;
exports.determinePhoneticRegularity = dict.determinePhoneticRegularity;
exports.getRadicalMeaning = hanzi.getRadicalMeaning;
exports.getCharactersWithComponent = hanzi.getCharactersWithComponent;
exports.getPhoneticSet = dict.getPhoneticSet;
exports.getCharacterInFrequencyListByPosition =
  dict.getCharacterInFrequencyListByPosition;
