"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var CookieHelper = /*#__PURE__*/function () {
  function CookieHelper() {
    (0, _classCallCheck2["default"])(this, CookieHelper);
  }

  (0, _createClass2["default"])(CookieHelper, null, [{
    key: "set",
    value:
    /**
     * ??????????????????
     * @param {string} name ??????
     * @param {string|object} value ??????????????????
     * @param {int} expires ????????????????????????????????????0??????????????????
     */
    function set(name, value) {
      var expires = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      this.remove(name);
      var date = new Date();
      date.setTime(date.getTime() + expires * 1000);
      document.cookie = name + '=' + value + ';' + date.toUTCString();
    }
    /**
     * ?????????????????????????????????????????? null
     * @param {string} name ??????
     * @returns {string|object|null}
     */

  }, {
    key: "get",
    value: function get(name) {
      var values = document.cookie.split(';');

      var _iterator = _createForOfIteratorHelper(values),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var str = _step.value;
          str = str.split('=');

          if (str[0] === name) {
            return str[1];
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
    /**
     * ?????????????????????????????????
     * ??????????????????????????????null??????????????? false
     * @param {string} name ??????
     * @returns {boolean}
     */

  }, {
    key: "has",
    value: function has(name) {
      return this.get(name) !== null;
    }
    /**
     * ?????????????????????
     * @param {string} name ??????
     */

  }, {
    key: "remove",
    value: function remove(name) {
      this.set(name, '');
    }
    /**
     * ????????????Cookie
     */

  }, {
    key: "clear",
    value: function clear() {
      var values = document.cookie.split(';');

      var _iterator2 = _createForOfIteratorHelper(values),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var str = _step2.value;
          str = str.split('=');
          this.set(str[0], '');
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);
  return CookieHelper;
}();

exports["default"] = CookieHelper;