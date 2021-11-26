"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

/**
 * 接口格式化后的数据类
 */
var ApiResponse = /*#__PURE__*/function () {
  /**
   * 成功的接口分类
   * @type {string}
   */

  /**
   * 失败时的接口分类
   * @type {string}
   */

  /**
   * 失败时的接口分类
   * @type {string}
   */

  /**
   * 通过接口规则解析的接口类型
   * 接口类型用来判断 成功、失败 的大分类
   * vf会根据不同的类型来做不同的响应
   * @type {string}
   */

  /**
   * 原始的返回报文
   * @type {object}
   */

  /**
   * 通过接口规则解析的模型列表
   * 对于列表接口，正确配置了规则后可通过该属性直接获取实例化后的模型列表
   * @type {array<AppModel>}
   */

  /**
   * 通过接口规则解析的数据列表
   * 对于列表接口，正确配置了规则后可通过该属性直接获取数据列表
   * @type {array<object>}
   */

  /**
   * 通过接口规则解析的接口返回说明信息
   * 正确配置规则后，可通过该属性直接获取接口的返回文本内容
   * @type {string}
   */

  /**
   * 通过接口规则解析的属性名
   * 正确配置规则后，可通过该属性获取当前接口针对的是那个属性
   * 比如一个 update 操作，触发了一个不能为空的错误信息，通过 message 返回用于显示的文本，通过 field 返回对应的模型属性名
   * @type {string}
   */

  /**
   * 通过接口规则解析的明细数据
   * 正确配置规则后，可通过该属性获取当前接口返回的详细信息
   * 主要是在调用详情接口使用，vf会自动将解析到的这个字段的值赋值给当前模型
   * @type {object}
   */

  /**
   * 列表元数据
   * @type {object}
   */
  function ApiResponse(type) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var response = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2["default"])(this, ApiResponse);
    (0, _defineProperty2["default"])(this, "type", void 0);
    (0, _defineProperty2["default"])(this, "response", void 0);
    (0, _defineProperty2["default"])(this, "models", []);
    (0, _defineProperty2["default"])(this, "items", []);
    (0, _defineProperty2["default"])(this, "message", void 0);
    (0, _defineProperty2["default"])(this, "field", void 0);
    (0, _defineProperty2["default"])(this, "sources", {});
    (0, _defineProperty2["default"])(this, "listMeta", {});
    this.type = type;
    this.response = response;

    for (var name in data) {
      this[name] = data[name];
    }
  }

  (0, _createClass2["default"])(ApiResponse, [{
    key: "getField",
    value: function getField() {
      return this.field;
    }
  }, {
    key: "getType",
    value: function getType() {
      return this.type;
    }
  }, {
    key: "getItems",
    value: function getItems() {
      return this.items;
    }
  }, {
    key: "getIsSuccess",
    value: function getIsSuccess() {
      return ApiResponse.SUCCESS_TYPE === this.type;
    }
  }, {
    key: "getIsFail",
    value: function getIsFail() {
      return ApiResponse.FAIL_TYPE === this.type;
    }
  }, {
    key: "getIsError",
    value: function getIsError() {
      return ApiResponse.ERROR_TYPE === this.type;
    }
  }, {
    key: "getMessage",
    value: function getMessage() {
      return this.message || this.response.errMsg;
    }
  }, {
    key: "getSources",
    value: function getSources() {
      return this.sources;
    }
  }, {
    key: "getModels",
    value: function getModels() {
      return this.models;
    }
  }, {
    key: "getListMeta",
    value: function getListMeta() {
      return this.listMeta;
    }
  }]);
  return ApiResponse;
}();

exports["default"] = ApiResponse;
(0, _defineProperty2["default"])(ApiResponse, "SUCCESS_TYPE", 'success');
(0, _defineProperty2["default"])(ApiResponse, "FAIL_TYPE", 'fail');
(0, _defineProperty2["default"])(ApiResponse, "ERROR_TYPE", 'error');