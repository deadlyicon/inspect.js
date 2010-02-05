if (typeof load !== "undefined"){
  load('../src/pretty_printer.js');
  load('../lib/simple_test.js');
  load('../lib/simple_test.simple_reporter.js');
}

new SimpleTestSuite(function(test){

  var RECURSIVE_REFERENCE_EXAMPLE = {};
  RECURSIVE_REFERENCE_EXAMPLE.resursed = RECURSIVE_REFERENCE_EXAMPLE;

  function emptyFunction(){}

  var OBJECTS = [
    'undefined',              'undefined',
    'null',                   'null',
    'true',                   'true',
    'false',                  'false',
    'Number',                 'Number',
    'Array',                  'Array',
    'Object',                 'Object',
    '""',                     '""',
    '"hello"',                '"hello"',
    '5',                      '5',
    '12.66',                  '12.66',
    '[1,2,3]',                '[1, 2, 3]',
    '{}',                     '{}',
    '{one: 1}',                '{one:1}',
    'new String',               '""',
    '{a: "more", complex:42}', '{a:"more", complex:42}',
    'emptyFunction',          'function emptyFunction(){}'

    // 'RECURSIVE_REFERENCE_EXAMPLE', '{resursed:{...}}'
  ];

  // browser specific tests
  if (typeof document !== "undefined") OBJECTS.push(
    'document',                      '[object HTMLDocument]',
    'document.createElement("div")', '[object HTMLDivElement]'
  );

  for (var i=0; i < OBJECTS.length; i += 2) {
    var evalable = OBJECTS[i], value = OBJECTS[i + 1];
    test('Object.toPrettyString('+evalable+') === "'+value+'"', function(){
      var object = eval('('+evalable+')');
      console.log(evalable, '===', Object.toPrettyString(object));
      return Object.toPrettyString(object) === value;
    });
  };

  console.log('\n');

});
