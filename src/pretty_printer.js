// Pretty Printer
(function() {

  function plainObjectToPrettyString(reset){
    if (Object.toPrettyString.objects.indexOf(this) > -1) return '{...}';
    Object.toPrettyString.objects.push(this);

    var pairs = [];
    for (var p in this) pairs.push(p+':'+Object.toPrettyString(this[p], true));
    return '{' + pairs.join(', ') + '}';
  }

  Array.prototype.toPrettyString = function(reset){
    if (Object.toPrettyString.objects.indexOf(this) > -1) return '[...]';
    Object.toPrettyString.objects.push(this);

    var values = [];
    for (var i=0; i < this.length; i++) values.push(Object.toPrettyString(this[i], reset));
    return '[' + values.join(', ') + ']';
  };

  String.prototype.toPrettyString = function(){
    return '"'+this.toString()+'"';
  };

  Number.prototype.toPrettyString = function(){
    return this.toString();
  };

  Function.prototype.toPrettyString = function(){
    var as_string = Function.prototype.toString.call(this).replace(/^\n|\n$/, '');
    return as_string.match(/\[native code/) ? this.name : as_string;
  };

  Object.toPrettyString = function(object, reset){
    if (!reset) Object.toPrettyString.objects = [];

    // a special case
    if (object === Object)     return 'Object';

    // primatives
    if (object === undefined)  return 'undefined';
    if (object === null)       return 'null';
    if (object === true)       return 'true';
    if (object === false)      return 'false';
    if (object.toPrettyString) return object.toPrettyString(true);

    // Not Plain Objects
    var type = Object.prototype.toString.call(object);
    if (type === "[object Arguments]") return Array.prototype.toPrettyString.apply(object);
    if (type !== "[object Object]") return type;

    // Looks like array
    if (typeof object.length === "number")
      return Array.prototype.toPrettyString.apply(object);

    // Plain Objects
    return plainObjectToPrettyString.call(object, true);
  };
  Object.toPrettyString.objects = [];

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.toPrettyString(object));
  };

})();

