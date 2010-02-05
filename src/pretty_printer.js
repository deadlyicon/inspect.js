// Pretty Printer
(function() {

  Array.prototype.toPrettyString = function(){
    var values_as_pretty_string = [];

    for (var i=0; i < this.length; i++)
      values_as_pretty_string.push(Object.toPrettyString(this[i]));

    return '[' + values_as_pretty_string.join(', ') + ']';
  }

  String.prototype.toPrettyString = function(){
    return '"'+this.toString()+'"';
  };
  Number.prototype.toPrettyString = Number.prototype.toString;
  Function.prototype.toPrettyString = function(){
    var as_string = Function.prototype.toString.call(this);
    return as_string.match(/\[native code\]/) ? this.name : as_string;
  };

  Object.toPrettyString = function(object){
    // a special case
    if (object === Object)     return 'Object';

    // primatives
    if (object === undefined)  return 'undefined';
    if (object === null)       return 'null';
    if (object === true)       return 'true';
    if (object === false)      return 'false';
    if (object.toPrettyString) return object.toPrettyString();

    // Not Plain Objects
    var type = Object.prototype.toString.call(object);
    if (type !== "[object Object]") return type;

    // Plain Objects
    var pairs = [];
    for (var p in object) pairs.push(p+':'+Object.toPrettyString(object[p]));
    return '{' + pairs.join(', ') + '}';
  }

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.toPrettyString(object));
  };

})();

