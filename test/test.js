if (typeof load !== "undefined"){
  load('../src/pretty_printer.js');
  load('../lib/simple_test.js');
  load('../lib/simple_test.simple_reporter.js');
}

new SimpleTestSuite(function(test){

  var OBJECTS = [
    ["hello", '"hello"'],
    [null,    'null'   ],
    [true,    'true'   ],
    [false,   'false'  ],
    [5,       '5'      ],
    [12.66,   '12.66'  ],
    [[1,2,3], '[1, 2, 3]'],
    [{}, '{}'],
    [{one:1}, '{one: 1}'],
    // [document.body, '[object HTMLBodyElement]']
  ];
  
  if (typeof document !== "undefined"){
    // browser specific tests here
  }
  
  for (var i=0; i < OBJECTS.length; i++) {
    var object = OBJECTS[i][0], value = OBJECTS[i][1];
    test('Object.toPrettyString('+value+') === "'+value+'"', function(){
      // print(Object.toPrettyString(object));
      return Object.toPrettyString(object) === value;
    });
  };

});
