var assert = require("assert");
var hanzi = require("../index.js");
hanzi.start();

describe('hanzidecomposer', function(){
	it('checks if component exists', function() {
		assert(hanzi.ifComponentExists('爱'));
	});
	it("checks if component don't exist", function() {
		assert(!hanzi.ifComponentExists('$'));
	});

	it('detects invalid input', function() {
		assert.deepEqual(hanzi.decompose('a'), {"character":"a","components1":["a"],"components2":["a"],"components3":["a"]});
	});

	it("gets a character's pinyin", function() {
		assert.deepEqual(hanzi.getPinyin('的'), ['de5', 'di2', 'di4']);
	});

	it("gets a radical's meaning", function() {
		assert(hanzi.getRadicalMeaning('氵'), "water");
	});

	it("gets character frequency data", function() {
		assert.deepEqual(hanzi.getCharacterFrequency('热'), { number: '606',
		  character: '热',
		  count: '67051',
		  percentage: '79.8453694124',
		  pinyin: 're4',
		  meaning: 'heat/to heat up/fervent/hot (of weather)/warm up' });
	});

	it("gets all characters with a given component", function(){
		assert.deepEqual(hanzi.getCharactersWithComponent('囗'), [ '国','因','西','回','口','四','团','图','围','困','恩','固','烟','园','窗','圆','惯','圈','贯','衰','菌','傻','姻','咽','嗯','囚','捆','茵','粤','瑙','圃','囱','涸','媲','锢','胭','泗','蓑','囤','囿','泅','摁','囡','帼','氤','蝈','邋','蓖','崮','囫','囟','掼','圜','囵','驷','阃','鬣','囹','痼','圄','卣','掴','腦','榱','篦','硇','涠','洇','總','鱲','囝','貔','圉','溷','缞','鲴','悃','铟','腘','骢','躐','謴','璁','蒽','骃','鯝','镴','硱','鬛','逌','睏','秵','絪','駰','麕','螕','裀','稛','縕','糰','箇','膕','綑','臘','箘','聰','蔥','驄','薀','祻','繌','圊','罆','謥','貫','鏆','銦','蒕','簑','碅','薗','釦','稇','蜠','蠟','醞' ])
	});

	it("determines phonetic regularity", function(){
		var expected = {
			di1: {
				character: '低',
				component: [ '亻', '氐', '氐', '亻', '氏', '氏', '丶', '丶' ],
				phoneticpinyin: [ 'ren2', 'di1', 'di3', 'ren2', 'shi4', 'zhi1', 'dian3', 'zhu3' ],
				regularity: [ 0, 1, 2, 0, 4, 4, 3, 0 ]
			}
		};
		assert.deepEqual(hanzi.determinePhoneticRegularity('低'), expected);
	});
	
	it('should once decompose simplified character', function(){
		assert.deepEqual(hanzi.decompose('爱').components1, ['No glyph available', '友']);
	});
	it('should radical decompose simplified character', function(){
		assert.deepEqual(hanzi.decompose('爱').components2, ['爫', '冖', '𠂇', '又']);
	});
	it('should graphical decompose simplified character', function(){
		assert.deepEqual(hanzi.decompose('爱').components3, ['爫', '冖', '𠂇', '㇇', '㇏']);
	});

	it('should once decompose traditional character', function(){
		assert.deepEqual(hanzi.decompose('愛').components1, ['No glyph available','夂']);
	});
	it('should radical decompose traditional character', function(){
		assert.deepEqual(hanzi.decompose('愛').components2, ['爫','冖','心','夂']);
	});
	it('should graphical decompose traditional character', function(){
		assert.deepEqual(hanzi.decompose('愛').components3, ['爫','冖','𠁼','㇃','㇇','㇏','㇒']);
	});
});

describe('hanzidictionary', function(){
	it('should look up a definition', function(){
		var expected = [ { traditional: '愛',
			simplified: '爱',
			pinyin: 'ai4',
			definition: 'to love/affection/to be fond of/to like' 
		}];
		assert.deepEqual(hanzi.definitionLookup('爱'), expected);
	});
	it('should look up a simplified definition with simplified character', function(){
		var expected = [ { traditional: '愛',
			simplified: '爱',
			pinyin: 'ai4',
			definition: 'to love/affection/to be fond of/to like' 
		}];
		assert.deepEqual(hanzi.definitionLookup('爱', 's'), expected);
	});
	it('should look up a traditional definition with traditional character', function(){
		var expected = [ { traditional: '愛',
			simplified: '爱',
			pinyin: 'ai4',
			definition: 'to love/affection/to be fond of/to like' 
		}];
		assert.deepEqual(hanzi.definitionLookup('愛', 't'), expected);
	});
	it('should fail looking up a simplified definition with a traditional character', function(){
		assert.deepEqual(hanzi.definitionLookup('愛', 's'), undefined);
	});
	it('should fail looking up a traditional definition with a simplified character', function(){
		assert.deepEqual(hanzi.definitionLookup('爱', 't'), undefined);
	});
	it('should look up a definition with multiple characters', function(){
		var expected = [ { traditional: '最後',
		    simplified: '最后',
		    pinyin: 'zui4 hou4',
		    definition: 'final/last/finally/ultimate' 
		}];
		assert.deepEqual(hanzi.definitionLookup('最后'), expected);
	});

	it('should look up a definition with multiple meanings with a common character', function(){
		var expected = [ { traditional: '和',
		    simplified: '和',
		    pinyin: 'He2',
		    definition: 'surname He/Japanese (food, clothes etc)' },
		  { traditional: '和',
		    simplified: '和',
		    pinyin: 'he2',
		    definition: 'and/together with/with/sum/union/peace/harmony/Taiwan pr. [han4] when it means "and"' },
		  { traditional: '和',
		    simplified: '和',
		    pinyin: 'he4',
		    definition: 'cap (a poem)/to respond in singing' },
		  { traditional: '和',
		    simplified: '和',
		    pinyin: 'hu2',
		    definition: 'to complete a set in mahjong or playing cards' },
		  { traditional: '和',
		    simplified: '和',
		    pinyin: 'huo2',
		    definition: 'soft/warm' },
		  { traditional: '和',
		    simplified: '和',
		    pinyin: 'huo4',
		    definition: 'to mix together/to blend' 
		}];
		assert.deepEqual(hanzi.definitionLookup('和'), expected);
	});

	it('should look up a definition with multiple meanings with a more obscure character', function(){
		var expected = [ { traditional: '糺',
		    simplified: '糺',
		    pinyin: 'jiu1',
		    definition: 'archaic variant of 糾|纠[jiu1]' },
		  { traditional: '糺',
		    simplified: '糺',
		    pinyin: 'jiu3',
		    definition: 'army (used during the Liao, Jin and Yuan dynasties)' 
		}];
		assert.deepEqual(hanzi.definitionLookup('糺'), expected);
	});

	it('should fail looking up a definition with dirty input', function(){
		assert.deepEqual(hanzi.definitionLookup('%'), undefined);
	});
});