SimpleTestSuite.prototype.report = function(){

  this.log(this.tests.passed+' out of '+this.tests.failed+' tests passed');
  for (var i=0; i < this.tests.length; i++) {
    this.log((this.tests[i][0] ? 'PASS' : 'FAIL')+': '+this.tests[i][1]);
  };

};

SimpleTestSuite.prototype.log = (function() {
  return (typeof console !== "undefined" && console.log) ?
    function(){ console.log.apply(console, arguments); } : print;
})();