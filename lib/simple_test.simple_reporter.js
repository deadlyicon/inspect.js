SimpleTestSuite.prototype.report = function(){

  if (typeof print === "undefined"){
    var print = (typeof console !== "undefined" && console.log) ? console.log : function(){ document.write.apply(document, arguments); };
  }

  print(this.tests.passed+' out of '+this.tests.failed+' tests passed');
  for (var i=0; i < this.tests.length; i++) {
    print((this.tests[i][0] ? 'PASS' : 'FAIL')+': '+this.tests[i][1]);
  };

};