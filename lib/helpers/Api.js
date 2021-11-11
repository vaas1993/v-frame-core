"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ApiResponse = _interopRequireDefault(require("./ApiResponse"));

var _ObjectHelper = _interopRequireDefault(require("./ObjectHelper"));

var _VFrame = _interopRequireDefault(require("../VFrame"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * 接口调用
 */
var Api = /*#__PURE__*/function () {
  /**
   * 接口名称
   * 需要在 apiList 中配置
   * @type {string}
   */

  /**
   * 请求头信息
   * @type {object}
   */

  /**
   * POST 数据体
   * @type {object}
   */

  /**
   * 请求链接参数
   * @type {object}
   */

  /**
   * 配置信息
   * @type {{}}
   */

  /**
   * 接口过滤器配置
   * @type {object}
   */

  /**
   * 接口驱动
   * @type {object|function}
   */
  function Api() {
    (0, _classCallCheck2["default"])(this, Api);
    (0, _defineProperty2["default"])(this, "apiName", '');
    (0, _defineProperty2["default"])(this, "headers", {});
    (0, _defineProperty2["default"])(this, "postParams", {});
    (0, _defineProperty2["default"])(this, "getParams", {});
    (0, _defineProperty2["default"])(this, "apiList", {});
    (0, _defineProperty2["default"])(this, "apiFilter", {});
    (0, _defineProperty2["default"])(this, "driver", undefined);
    this.initConfigs();
  }
  /**
   * 初始化配置
   * 需要在子类中实现
   */


  (0, _createClass2["default"])(Api, [{
    key: "initConfigs",
    value: function initConfigs() {
      var vf = _VFrame["default"].getInstance();

      var mainConfig = vf.mainConfig;

      if (mainConfig.api === undefined) {
        console.error('请在配置文件中设置 api 字段');
      }

      this.apiList = mainConfig.api.list;
      this.apiFilter = mainConfig.api.filter;
      this.driver = mainConfig.api.driver;

      if (typeof mainConfig.api.defaultHeaders === 'function') {
        this.headers = Object.assign(this.headers, mainConfig.api.defaultHeaders(vf));
      }
    }
    /**
     * 实例化，替代 new Api()以实现简洁的链式写法
     * @static
     * @returns {Api}
     */

  }, {
    key: "setApiName",
    value:
    /**
     * 设置接口名称
     * 需要在 apiList 中配置
     * 支持链式写法，比如 user.login 代表登录接口
     * @param {string} apiName
     * @return {Api}
     */
    function setApiName(apiName) {
      this.apiName = apiName;
      return this;
    }
    /**
     * 设置请求头信息
     * 注意，该操作会覆盖现有的请求头
     * @param {object} headers
     * @return {Api}
     */

  }, {
    key: "setHeaders",
    value: function setHeaders(headers) {
      this.headers = headers;
      return this;
    }
    /**
     * 单独追加一个请求头
     * @param {string} name 请求头字段名
     * @param {string|number} value 请求头字段值
     * @return {Api}
     */

  }, {
    key: "setHeader",
    value: function setHeader(name, value) {
      this.headers[name] = value;
      return this;
    }
    /**
     * 设置POST请求参数
     * @param {object} postParams
     */

  }, {
    key: "setPostParams",
    value: function setPostParams(postParams) {
      this.postParams = postParams;
      return this;
    }
    /**
     * 设置GET请求参数
     * @param {object} getParams
     */

  }, {
    key: "setGetParams",
    value: function setGetParams(getParams) {
      var _this = this;

      this.getParams = {};

      _ObjectHelper["default"].forEach(getParams, function (value, key) {
        if (value !== undefined) {
          _this.getParams[key] = value;
        }
      });

      return this;
    }
    /**
     * 获取请求接口配置信息
     */

  }, {
    key: "getApiList",
    value: function getApiList() {
      if (!this.apiName) {
        var error = new Error();
        error.message = '请先调用 setApiName 方法设置接口名';
        error.name = '未设置接口名';
        throw error;
      }

      var config = _ObjectHelper["default"].getValue(this.apiList, this.apiName);

      if (!config) {
        var _error = new Error();

        _error.message = '接口名称不存在，请确认 ' + this.apiName + ' 是否在 apiList 中配置';
        _error.name = '找不到对应的接口';
        throw _error;
      }

      return config;
    }
    /**
     * 格式化返回信息
     * @param {object} config
     * @param {object} response
     */

  }, {
    key: "formatResponse",
    value: function formatResponse(config, response) {
      // 如果接口配置没有指定 filter 规则，则使用全局默认
      var filters = config.filter || this.apiFilter || {};
      var result = undefined;

      var _iterator = _createForOfIteratorHelper(filters),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var item = _step.value;

          if (item.validate(response)) {
            result = new _ApiResponse["default"](item.type, item.data(response), response);
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return result || new _ApiResponse["default"](_ApiResponse["default"].UNKNOWN, {}, response);
    }
    /**
     * 发起 get 请求
     * @returns {ApiResponse}
     */

  }, {
    key: "get",
    value: function get() {
      return this.send('GET');
    }
    /**
     * 发起 post 请求
     * @returns {ApiResponse}
     */

  }, {
    key: "post",
    value: function post() {
      this.headers = Object.assign({
        'Content-Type': 'application/x-www-form-urlencoded'
      }, this.headers);
      return this.send('POST');
    }
    /**
     * 发起带有 application/json 请求头的 post请求
     * @returns {ApiResponse}
     */

  }, {
    key: "raw",
    value: function raw() {
      this.headers = Object.assign({
        'Content-Type': 'application/json'
      }, this.headers);
      return this.send('POST');
    }
    /**
     * 获取请求头
     * @returns {Object}
     */

  }, {
    key: "getHeaders",
    value: function getHeaders() {
      return this.headers;
    }
    /**
     * 执行请求发起的操作
     * @param method
     * @returns {Promise<ApiResponse>|ApiResponse}
     */

  }, {
    key: "send",
    value: function () {
      var _send = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(method) {
        var config, response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                config = this.getApiList();
                response = {};
                _context.prev = 2;
                _context.next = 5;
                return this.driver({
                  url: config.url,
                  method: method,
                  headers: this.getHeaders(),
                  params: this.getParams,
                  data: this.postParams
                });

              case 5:
                response = _context.sent;
                _context.next = 11;
                break;

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](2);
                response = {
                  status: _context.t0.message.split('code ').pop() || 500,
                  statusText: _context.t0.name,
                  errMsg: _context.t0.message,
                  headers: _context.t0.headers || {},
                  data: {}
                };

              case 11:
                return _context.abrupt("return", this.formatResponse(config, response));

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 8]]);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new this();
    }
  }]);
  return Api;
}();

exports["default"] = Api;