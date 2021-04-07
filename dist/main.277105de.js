// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"X3qf":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var selector = function selector(selectors) {
  return document.querySelector(selectors);
};

var _default = selector;
exports.default = _default;
},{}],"Tsb7":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function on(eventType, element, obj, fn) {
  if (!(element instanceof Element)) {
    element = document.querySelector(element);
  }

  element.addEventListener('click', function (e) {
    for (var key in obj) {
      var t = e.target;

      if (obj.hasOwnProperty(key)) {
        while (!t.matches(key)) {
          if (t === element) {
            t = null;
            break;
          }

          t = t.parentNode;
        }

        fn(t, key);
      }
    }
  });
}

var _default = on;
exports.default = _default;
},{}],"l7Kt":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var colors = {
  '#black': 'black',
  '#yellow': 'yellow',
  '#red': 'red',
  '#orange': 'orange',
  '#green': 'green',
  '#blue': 'blue',
  '#indigo': 'indigo',
  '#violet': 'violet'
};
var _default = colors;
exports.default = _default;
},{}],"xM1L":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var heights = {
  '#small': 2,
  '#normal': 4,
  '#large': 6,
  '#xLarge': 8
};
var _default = heights;
exports.default = _default;
},{}],"epB2":[function(require,module,exports) {
"use strict";

var _selector = _interopRequireDefault(require("./lib/selector"));

var _on = _interopRequireDefault(require("./lib/on"));

var _colors = _interopRequireDefault(require("./lib/colors"));

var _heights = _interopRequireDefault(require("./lib/heights"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var drawing = (0, _selector.default)('#drawing');
var brush = (0, _selector.default)('#brush');
var eraser = (0, _selector.default)('#eraser');
var clear = (0, _selector.default)('#clear');
var save = (0, _selector.default)('#save');
var color = (0, _selector.default)('#color');
var lines = (0, _selector.default)('#lines');
var thick = (0, _selector.default)('#thick');
var startPoint;
var EraserOn = false;
var painting = false;
drawing.width = document.documentElement.clientWidth;
drawing.height = document.documentElement.clientHeight;

var removeClass = function removeClass(string) {
  return string.classList.remove('active');
};

var addClass = function addClass(string) {
  return string.classList.add('active');
};

var openBrush = function openBrush() {
  EraserOn = false;
  addClass(brush);
  removeClass(eraser);
};

var closeBrush = function closeBrush() {
  EraserOn = true;
  addClass(eraser);
  removeClass(brush);
};

if (drawing.getContext) {
  var ctx = drawing.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'black';

  var lineNext = function lineNext(xStart, yStart, xEnd, yEnd) {
    ctx.beginPath();
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.stroke();
  };

  var drawingMove = function drawingMove(x, y) {
    if (painting === true) {
      if (EraserOn === true) {
        ctx.clearRect(x - 20, y - 20, 40, 40);
      } else {
        addClass(brush);
        lineNext(startPoint[0], startPoint[1], x, y);
        startPoint = [x, y];
      }
    }
  };

  if ('ontouchstart' in document.documentElement) {
    drawing.ontouchstart = function (e) {
      removeClass(lines);
      startPoint = [e.touches[0].clientX, e.touches[0].clientY];
      painting = true;
    };

    drawing.ontouchmove = function (e) {
      var _ref = [e.touches[0].clientX, e.touches[0].clientY],
          x = _ref[0],
          y = _ref[1];
      drawingMove(x, y);
    };

    drawing.ontouchend = function () {
      painting = false;
    };
  } else {
    drawing.onmousedown = function (e) {
      removeClass(lines);
      startPoint = [e.offsetX, e.offsetY];
      painting = true;
    };

    drawing.onmousemove = function (e) {
      var _ref2 = [e.offsetX, e.offsetY],
          x = _ref2[0],
          y = _ref2[1];
      drawingMove(x, y);
    };

    drawing.onmouseup = function () {
      painting = false;
    };
  }

  thick.onclick = function () {
    if (lines.classList.length === 0) {
      addClass(lines);
    } else {
      removeClass(lines);
    }
  };

  brush.onclick = function () {
    openBrush();
  };

  eraser.onclick = function () {
    closeBrush();
  };

  clear.onclick = function () {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, drawing.width, drawing.height);
  };

  (0, _on.default)('click', color, _colors.default, function (t, key) {
    var n = document.getElementById(_colors.default[key]);

    if (t && t.matches(key)) {
      ctx.strokeStyle = _colors.default[key];
      addClass(n);
      openBrush();
    } else {
      removeClass(n);
    }
  });
  (0, _on.default)('click', lines, _heights.default, function (t, key) {
    if (t && t.matches(key)) {
      ctx.lineWidth = _heights.default[key];
    }
  });

  save.onclick = function () {
    var imgURI = drawing.toDataURL('image/jpg');
    var img = document.createElement('a');
    document.body.appendChild(img);
    img.href = imgURI;
    img.download = '草稿纸';
    img.target = '_blank';
    img.click();
  };
}
},{"./lib/selector":"X3qf","./lib/on":"Tsb7","./lib/colors":"l7Kt","./lib/heights":"xM1L"}]},{},["epB2"], null)
//# sourceMappingURL=main.277105de.js.map