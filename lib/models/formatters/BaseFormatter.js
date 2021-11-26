"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

/**
 * 数据格式化基类
 * 可以在模型中 formatConfig 中使用
 */
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter(value, model, options, field) {
    (0, _classCallCheck2["default"])(this, BaseFormatter);
    this.value = value;
    this.options = options;
    this.model = model;
    this.field = field;
  }

  (0, _createClass2["default"])(BaseFormatter, [{
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }]);
  return BaseFormatter;
}();

exports["default"] = BaseFormatter;