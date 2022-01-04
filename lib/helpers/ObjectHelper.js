"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Object助手类
 */
var ObjectHelper = /*#__PURE__*/function () {
  function ObjectHelper() {
    (0, _classCallCheck2["default"])(this, ObjectHelper);
  }

  (0, _createClass2["default"])(ObjectHelper, null, [{
    key: "getValue",
    value:
    /**
     * 获取对象的属性值
     * 可使用可选链操作符替代
     * @param {object} object 待处理的对象
     * @param {string} key 键名，可通过英文句号 . 指定多级字段
     * @param {*} defaultValue 找不到值时的返回值
     * @returns {undefined}
     */
    function getValue(object, key) {
      var defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

      if ((0, _typeof2["default"])(object) !== 'object' || object === null) {
        return defaultValue;
      }

      var items = key.split('.');
      var temp = object;

      var _iterator = _createForOfIteratorHelper(items),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var name = _step.value;
          temp = temp[name];

          if ((0, _typeof2["default"])(temp) !== 'object' || temp === null) {
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return temp || defaultValue;
    }
    /**
     * 遍历
     * @param {object} object 待遍历的对象
     * @param {function} callback 回调函数，每一次遍历到一个属性，都会回调该方法，方法拥有两个参数，分别是属性的键值、属性的键名
     */

  }, {
    key: "forEach",
    value: function forEach(object, callback) {
      for (var key in object) {
        object[key] = callback(object[key], key);
      }

      return object;
    }
    /**
     * 过滤
     * @param {object} object 待过滤的对象
     * @param {function} callback 回调函数，每一次遍历到一个属性，都会回调该方法，方法拥有两个参数，分别是属性的键值、属性的键名，当方法返回 false 时将过滤该属性
     * @return {object} 返回一个过滤后的对象
     */

  }, {
    key: "filter",
    value: function filter(object, callback) {
      var keys = Object.keys(object);

      for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
        var key = _keys[_i];

        if (callback(object[key], key) === false) {
          delete object[key];
        }
      }

      return object;
    }
    /**
     * 返回指定对象的深拷贝副本
     * @param {object} object
     */

  }, {
    key: "copy",
    value: function copy(object) {
      var result;

      if ((0, _typeof2["default"])(object) === 'object') {
        if (Array.isArray(object)) {
          result = [];

          for (var i in object) {
            result.push(this.copy(object[i]));
          }
        } else if (object === null) {
          result = null;
        } else if (object.constructor === RegExp) {
          result = object;
        } else {
          result = {};

          for (var _i2 in object) {
            result[_i2] = this.copy(object[_i2]);
          }
        }
      } else {
        result = object;
      }

      return result;
    }
  }]);
  return ObjectHelper;
}();

exports["default"] = ObjectHelper;