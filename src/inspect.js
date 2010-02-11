/** inspect.js
 * http://github.com/deadlyicon/inspect.js
 *
 * By Jared Grippe <jared@jaredgrippe.com>
 *
 * Copyright (c) 2009 Jared Grippe
 * Licensed under the MIT license.
 *
 */
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
      for (var p in object){
        try{
          pairs.push(p+':'+Object.inspect(object[p], true));
        }catch(e){
          pairs.push(p+': <INSPECTION ERROR: '+e.message+'>');
        }
      }
      return '{' + pairs.join(', ') + '}';
    });
  };

  Array.prototype.inspect = function(nested){
    return skipIfAlreadyTraversed(nested, this, '[...]', function(){
      var values = [];
      for (var i=0; i < this.length; i++){
        try{
          values.push(Object.inspect(this[i], true));
        }catch(e){
          values.push('<INSPECTION ERROR: '+e.message+'>');
        }
      }
      return '[' + values.join(', ') + ']';
    });
  };

  function toString(){
    return this.toString();
  }

  Number.prototype.inspect = toString;
  RegExp.prototype.inspect = toString;
  Boolean.prototype.inspect = toString;

  String.prototype.inspect = function(){
    return '"'+this.toString().replace(/\\/g, '\\\\').replace(/\n/g, '\\n')+'"';
  };

  var NATIVE_CONSTRUCTORS = [Object, Array, String, Number, RegExp];
  Function.prototype.inspect = function(){
    if (NATIVE_CONSTRUCTORS.indexOf(this) === -1) return Function.prototype.toString.call(this);
    return this.name;
    // var as_string = Function.prototype.toString.call(this).replace(/^\n|\n$/, '');
    // return as_string.match(/\[native code/) ? this.name : as_string;
  };

  Object.inspect = function(object, nested){
    try{

      // primatives
      if (object === undefined)  return 'undefined';
      if (object === null)       return 'null';

      // a special case
      if (object === Object)     return 'Object';

      // most objects
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
    }catch(e){
      return '<INSPECTION ERROR: '+e.message+'>';
    }
  };
  Object.inspect.objects = [];

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.inspect(object));
  };

})();

