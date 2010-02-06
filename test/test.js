if (typeof load !== "undefined"){
  load('../src/inspect.js');
  load('../lib/simple_test.js');
  load('../lib/simple_test.simple_reporter.js');
}

new SimpleTestSuite(function(test){

  var DOM_PRESENT = !(typeof document === "undefined");

  function emptyFunction(){}

  var SELF_REFERENCING_OBJECT = {};
  SELF_REFERENCING_OBJECT.self = SELF_REFERENCING_OBJECT;

  var SELF_REFERENCING_ARRAY = [];
  SELF_REFERENCING_ARRAY.push(SELF_REFERENCING_ARRAY);

  var ARGUMENTS_OBJECT; (function() { ARGUMENTS_OBJECT = arguments; })();

  var ARRAY_LIKE_OBJECT = {length:0};

  test('Object.inspect should not cause a recursion error', function(){
    try{
      Object.inspect(SELF_REFERENCING_OBJECT);
    }catch(e){
      return !(e.message === 'Maximum call stack size exceeded' || e.message === 'too much recursion');
    }
    return true;
  });

  var OBJECTS = [
    'undefined',               'undefined',
    'null',                    'null',
    'true',                    'true',
    'false',                   'false',
    'Number',                  'Number',
    'Array',                   'Array',
    'Object',                  'Object',
    'emptyFunction',           /^\n?function emptyFunction\(\)\s?\{[\s\n]*\}\n*/,
    '""',                      '""',
    '0',                       '0',
    '[]',                      '[]',
    '{}',                      '{}',
    '/./',                     '/./',
    'ARGUMENTS_OBJECT',        '[]',
    'ARRAY_LIKE_OBJECT',       '[]',

    '"hello"',                 '"hello"',
    '5',                       '5',
    '12.66',                   '12.66',
    '[1,2,3]',                 '[1, 2, 3]',
    '{one: 1}',                '{one:1}',
    'new String',              '""',

    '{a: "more", complex:42}', '{a:"more", complex:42}',
    'SELF_REFERENCING_OBJECT', '{self:{...}}',
    'SELF_REFERENCING_ARRAY',  '[[...]]'
  ];

  // browser specific tests
  if (DOM_PRESENT) OBJECTS.push(
    'document',                       '[object HTMLDocument]',
    'document.createElement("div")',  '[object HTMLDivElement]',
    'document.createElement("span")', '[object HTMLSpanElement]'
  );

  for (var i=0; i < OBJECTS.length; i += 2) {
    var evalable = OBJECTS[i], expected = OBJECTS[i + 1];

    test('Object.inspect('+evalable+') === "'+expected+'"', function(){
      Object.inspect.objects = [];

      var object = eval('('+evalable+')'), inspect_string = Object.inspect(object);

      var matched = (
        (expected instanceof RegExp) ? inspect_string.match(expected) : inspect_string === expected
      );

      if (!matched)
        console.log('EXPECTED '+inspect_string+' === '+expected);

      cleanedup = Object.inspect.objects.length === 0;
      if (!cleanedup) console.log('('+evalable+') leaked '+Object.inspect.objects.length+' objects');

      return matched && cleanedup;
    });
  };


  var HUGE_OBJECT = {
    array: ['a',2],
    object: {hello:'there'}
  };
  HUGE_OBJECT.array_with_self = [HUGE_OBJECT];

  if (DOM_PRESENT) HUGE_OBJECT.elements = [
    document.createElement("div"),
    document.createElement("span")
  ];

  test('Object.inspect should work on this huge object', function(){
    var inspect_string = Object.inspect(HUGE_OBJECT);

    return DOM_PRESENT ?
      inspect_string === '{array:["a", 2], object:{hello:"there"}, array_with_self:[{...}], elements:[[object HTMLDivElement], [object HTMLSpanElement]]}' :
      inspect_string === '{array:["a", 2], object:{hello:"there"}, array_with_self:[{...}]}';
  });

});
