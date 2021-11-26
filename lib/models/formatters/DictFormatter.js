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

var _DictHelper = _interopRequireDefault(require("../../helpers/DictHelper"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

/**
 * 数据辞典的格式化类
 * 需要通过 options.groupName 参数指定一个词典组，这个类会自动从数据辞典中获取对应的标签名
 * 还可以通过 options.ignore 配置一个数组，用于略过某些特定的数据辞典项
 */
var DictFormatter = /*#__PURE__*/function (_BaseFormatter) {
  (0, _inherits2["default"])(DictFormatter, _BaseFormatter);

  var _super = _createSuper(DictFormatter);

  function DictFormatter() {
    (0, _classCallCheck2["default"])(this, DictFormatter);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(DictFormatter, [{
    key: "getValue",
    value: function getValue() {
      return _DictHelper["default"].getName(this.options.groupName, this.value, this.options.ignore || []);
    }
  }]);
  return DictFormatter;
}(_BaseFormatter2["default"]);

exports["default"] = DictFormatter;