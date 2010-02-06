(function() {

  function skipIfAlreadyTraversed(nested, object, replacement, block){
    if (!nested) Object.inspect.objects = [];
    if (Object.inspect.objects.indexOf(object) > -1) return replacement;
    Object.inspect.objects.push(object);
    var return_value = block.call(object, object);
    if (!nested) Object.inspect.objects = [];
    return return_value;
  }

  Object.inspectAsObject = function(object, nested){
    return skipIfAlreadyTraversed(nested, object, '{...}', function(){
      var pairs = [];
      for (var p in object) pairs.push(p+':'+Object.inspect(object[p], true));
      return '{' + pairs.join(', ') + '}';
    });
  };

  Array.prototype.inspect = function(nested){
    return skipIfAlreadyTraversed(nested, this, '[...]', function(){
      var values = [];
      for (var i=0; i < this.length; i++) values.push(Object.inspect(this[i], true));
      return '[' + values.join(', ') + ']';
    });
  };

  function toString(){
    return this.toString();
  }

  Number.prototype.inspect = toString;
  RegExp.prototype.inspect = toString;

  String.prototype.inspect = function(){
    return '"'+this.toString().replace(/\\/g, '\\\\').replace(/\n/g, '\\n')+'"';
  };

  Function.prototype.inspect = function(){
    var as_string = Function.prototype.toString.call(this).replace(/^\n|\n$/, '');
    return as_string.match(/\[native code/) ? this.name : as_string;
  };

  Object.inspect = function(object, nested){
    // a special case
    if (object === Object)     return 'Object';

    // primatives
    if (object === undefined)  return 'undefined';
    if (object === null)       return 'null';
    if (object === true)       return 'true';
    if (object === false)      return 'false';
    if (object.inspect) return object.inspect(nested);

    // Not Plain Objects
    var type = Object.prototype.toString.call(object);
    if (type === "[object Arguments]") return Array.prototype.inspect.apply(object);
    if (type === "[object NodeList]")  return Array.prototype.inspect.apply(object);
    if (type === "[object Text]")      return String.prototype.inspect.apply(object.nodeValue);
    if (type !== "[object Object]")    return type;

    // Looks like array
    if (typeof object.length === "number")
      return Array.prototype.inspect.call(object, nested);

    // Plain Objects
    return Object.inspectAsObject(object, nested);
  };
  Object.inspect.objects = [];

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.inspect(object));
  };

})();

