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

var IntegerFormatter = /*#__PURE__*/function (_BaseFormatter) {
  (0, _inherits2["default"])(IntegerFormatter, _BaseFormatter);

  var _super = _createSuper(IntegerFormatter);

  function IntegerFormatter() {
    (0, _classCallCheck2["default"])(this, IntegerFormatter);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(IntegerFormatter, [{
    key: "getValue",
    value: function getValue() {
      var value = parseInt(this.value);

      if (isNaN(value)) {
        return null;
      }

      if (this.options.before) {
        value += this.options.before;
      }

      if (this.options.after) {
        value = value + this.options.after;
      }

      return value;
    }
  }]);
  return IntegerFormatter;
}(_BaseFormatter2["default"]);

exports["default"] = IntegerFormatter;