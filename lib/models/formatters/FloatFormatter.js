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

var _BaseFormatter2 = _interopRequireDefault(require("./BaseFormatter"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * 浮点型处理类
 * 这个类会自动将传入的数据格式化成浮点型，当转为浮点型后值为 NaN 时，返回 null
 * 通过 options.toFixed 指定需要保留的小数位，指定后仍然返回浮点型
 * 通过 options.before 指定一个字符串前缀
 * 通过 options.after 指定一个字符串后缀
 */
var FloatFormatter = /*#__PURE__*/function (_BaseFormatter) {
  (0, _inherits2["default"])(FloatFormatter, _BaseFormatter);

  var _super = _createSuper(FloatFormatter);

  function FloatFormatter() {
    (0, _classCallCheck2["default"])(this, FloatFormatter);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FloatFormatter, [{
    key: "getValue",
    value: function getValue() {
      var value = parseFloat(this.value);

      if (isNaN(value)) {
        return null;
      }

      if (typeof this.options.toFixed === 'number') {
        value = parseFloat(value.toFixed(this.options.toFixed));
      }

      if (this.options.after) {
        value = value.toString() + this.options.after;
      }

      if (this.options.before) {
        value = this.options.before + value.toString();
      }

      return value;
    }
  }]);
  return FloatFormatter;
}(_BaseFormatter2["default"]);

exports["default"] = FloatFormatter;