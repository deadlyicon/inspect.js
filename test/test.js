if (typeof load !== "undefined"){
  load('../src/pretty_printer.js');
  load('../lib/simple_test.js');
  load('../lib/simple_test.simple_reporter.js');
}

new SimpleTestSuite(function(test){

  test('Object.toPrettyString should not cause a recursion error', function(){
    var a = {is_a:true}; a.a = [a];

    try{
      Object.toPrettyString(a);
    }catch(e){
      return !(e.message === 'Maximum call stack size exceeded' || e.message === 'too much recursion');
    }
    return true;
  });


  function emptyFunction(){}

  var COMPLEX_OBJECT = {
    constructor: function constructor(){ return this; },
  }
  COMPLEX_OBJECT.self = COMPLEX_OBJECT;

  var OBJECTS = [
    'undefined',               'undefined',
    'null',                    'null',
    'true',                    'true',
    'false',                   'false',
    'Number',                  'Number',
    'Array',                   'Array',
    'Object',                  'Object',
    '""',                      '""',
    '"hello"',                 '"hello"',
    '5',                       '5',
    '12.66',                   '12.66',
    '[1,2,3]',                 '[1, 2, 3]',
    '{}',                      '{}',
    '{one: 1}',                '{one:1}',
    'new String',              '""',
    '{a: "more", complex:42}', '{a:"more", complex:42}',
    'emptyFunction',           'function emptyFunction(){}',
    'COMPLEX_OBJECT',          '{constructor:function constructor(){ return this; }, self:{...}}',
    '{a:emptyFunction, b:emptyFunction}', '{a:function emptyFunction(){}, b:function emptyFunction(){}}'
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

});
