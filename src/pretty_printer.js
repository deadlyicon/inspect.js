// Pretty Printer
(function() {

  function skipIfAlreadyTraversed(nested, object, replacement, block){
    if (!nested) Object.toPrettyString.objects = [];
    if (Object.toPrettyString.objects.indexOf(object) > -1) return replacement;
    Object.toPrettyString.objects.push(object);
    var return_value = block.call(object, object);
    if (!nested) Object.toPrettyString.objects = [];
    return return_value;
  }

  Object.toPrettyStringAsObject = function(object, nested){
    return skipIfAlreadyTraversed(nested, object, '{...}', function(){
      var pairs = [];
      for (var p in object) pairs.push(p+':'+Object.toPrettyString(object[p], true));
      return '{' + pairs.join(', ') + '}';
    });
  };

  Array.prototype.toPrettyString = function(nested){
    return skipIfAlreadyTraversed(nested, this, '[...]', function(){
      var values = [];
      for (var i=0; i < this.length; i++) values.push(Object.toPrettyString(this[i], true));
      return '[' + values.join(', ') + ']';
    });
  };

  function toString(){
    return this.toString();
  }

  Number.prototype.toPrettyString = toString
  RegExp.prototype.toPrettyString = toString

  String.prototype.toPrettyString = function(){
    return '"'+this.toString()+'"';
  };

  Function.prototype.toPrettyString = function(){
    var as_string = Function.prototype.toString.call(this).replace(/^\n|\n$/, '');
    return as_string.match(/\[native code/) ? this.name : as_string;
  };

  Object.toPrettyString = function(object, nested){
    // a special case
    if (object === Object)     return 'Object';

    // primatives
    if (object === undefined)  return 'undefined';
    if (object === null)       return 'null';
    if (object === true)       return 'true';
    if (object === false)      return 'false';
    if (object.toPrettyString) return object.toPrettyString(nested);

    // Not Plain Objects
    var type = Object.prototype.toString.call(object);
    if (type === "[object Arguments]") return Array.prototype.toPrettyString.apply(object);
    if (type !== "[object Object]") return type;

    // Looks like array
    if (typeof object.length === "number")
      return Array.prototype.toPrettyString.call(object, nested);

    // Plain Objects
    return Object.toPrettyStringAsObject(object, nested);
  };
  Object.toPrettyString.objects = [];

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.toPrettyString(object));
  };

})();

