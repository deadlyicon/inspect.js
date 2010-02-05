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


  Object.toPrettyString = function(object){
    // primatives
    if (object === null)  return 'null';
    if (object === true)  return 'true';
    if (object === false) return 'false';
    if (object.toPrettyString) return object.toPrettyString();
    // var type = typeof(object);
    // if (type === "string") return '"'+object+'"';
    // if (type === "number") return ''+object;


    // if (type === "object"){
    //   var type = Object.prototype.toString.call(object);
    //   return type;
    //   // if (type = '[object Array]') return object
    //   // if (type = '"[object HTMLBodyElement]"') return
    // }

    var pairs = [];

    for (var p in object)
      pairs.push(p+': '+Object.toPrettyString(object[p]));

    return '{' + pairs.join(', ') + '}';


    return 'unknown';
  }

  var print = (typeof console !== "undefined" && typeof console.log === "function") ? console.log : this.print || function(){};

  this.pp = function(object){
    print(Object.toPrettyString(object));
  };

})();

