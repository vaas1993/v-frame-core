"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _AppModel2 = _interopRequireDefault(require("../models/AppModel"));

var _VFrame = _interopRequireDefault(require("../VFrame"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var DictHelper = /*#__PURE__*/function (_AppModel) {
  (0, _inherits2["default"])(DictHelper, _AppModel);

  var _super = _createSuper(DictHelper);

  function DictHelper() {
    (0, _classCallCheck2["default"])(this, DictHelper);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DictHelper, null, [{
    key: "getGroup",
    value:
    /**
     * 获取一组数据词典
     * @param {string} groupName 组名
     * @param {array} ignoreList 需要忽略的组成员值列表，默认不忽略任何值
     * @returns {array<object<name, value>>}
     */
    function getGroup(groupName) {
      var ignoreList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return (_VFrame["default"].getInstance().dictList[groupName] || []).filter(function (dict) {
        return ignoreList.indexOf(dict.value) === -1;
      });
    }
    /**
     * 获取词典值
     * @param {string} groupName 组名
     * @param {string} name 词典名
     * @returns {string}
     */

  }, {
    key: "getValue",
    value: function getValue(groupName, name) {
      name = [null, undefined].indexOf(name) === -1 ? name : '';
      var group = this.getGroup(groupName);

      var _iterator = _createForOfIteratorHelper(group),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var dict = _step.value;

          if (dict.name === name) {
            return dict.value;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * 获取词典名
     * @param {string} groupName 组名
     * @param {string} value 词典值
     * @returns {string}
     */

  }, {
    key: "getName",
    value: function getName(groupName, value) {
      value = [null, undefined].indexOf(value) === -1 ? value : '';
      var group = this.getGroup(groupName);

      var _iterator2 = _createForOfIteratorHelper(group),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var dict = _step2.value;

          if (dict.value.toString() === value.toString()) {
            return dict.name;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);
  return DictHelper;
}(_AppModel2["default"]);

exports["default"] = DictHelper;