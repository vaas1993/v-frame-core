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
 * ????????????
 */
var Api = /*#__PURE__*/function () {
  /**
   * ????????????
   * ????????? apiList ?????????
   * @type {string}
   */

  /**
   * ???????????????
   * @type {object}
   */

  /**
   * POST ?????????
   * @type {object}
   */

  /**
   * ??????????????????
   * @type {object}
   */

  /**
   * ????????????
   * @type {object}
   */

  /**
   * ?????????????????????
   * @type {object}
   */

  /**
   * ????????????
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
   * ???????????????
   */


  (0, _createClass2["default"])(Api, [{
    key: "initConfigs",
    value: function initConfigs() {
      var vf = _VFrame["default"].getInstance();

      var mainConfig = vf.mainConfig;

      if (mainConfig.api === undefined) {
        console.error('??????????????????????????? api ??????');
        return;
      }

      var apiConfig = mainConfig.api;
      this.apiList = apiConfig.list;
      this.apiFilter = apiConfig.filter;
      this.driver = apiConfig.driver;

      if (typeof apiConfig.defaultHeaders === 'function') {
        this.headers = Object.assign(this.headers, apiConfig.defaultHeaders(vf));
      }
    }
    /**
     * ?????????????????? new Api()??????????????????????????????
     * @static
     * @returns {Api}
     */

  }, {
    key: "setApiName",
    value:
    /**
     * ??????????????????
     * ????????? apiList ?????????
     * ??????????????????????????? user.login ??????????????????
     * @param {string} apiName
     * @return {Api}
     */
    function setApiName(apiName) {
      this.apiName = apiName;
      return this;
    }
    /**
     * ?????????????????????
     * ?????????????????????????????????????????????
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
     * ???????????????????????????
     * @param {string} name ??????????????????
     * @param {string|number} value ??????????????????
     * @return {Api}
     */

  }, {
    key: "setHeader",
    value: function setHeader(name, value) {
      this.headers[name] = value;
      return this;
    }
    /**
     * ??????POST????????????
     * @param {object} postParams
     */

  }, {
    key: "setPostParams",
    value: function setPostParams(postParams) {
      this.postParams = postParams;
      return this;
    }
    /**
     * ??????GET????????????
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
     * ??????????????????????????????
     * @returns {object}
     */

  }, {
    key: "getApiList",
    value: function getApiList() {
      if (!this.apiName) {
        var error = new Error();
        error.message = '???????????? setApiName ?????????????????????';
        error.name = '??????????????????';
        throw error;
      }

      var config = _ObjectHelper["default"].getValue(this.apiList, this.apiName);

      if (!config) {
        var _error = new Error();

        _error.message = '????????????????????????????????? ' + this.apiName + ' ????????? apiList ?????????';
        _error.name = '????????????????????????';
        throw _error;
      }

      return config;
    }
    /**
     * ?????????????????????
     * @param {object} config
     * @param {object} response
     */

  }, {
    key: "formatResponse",
    value: function formatResponse(config, response) {
      // ?????????????????????????????? filter ??????????????????????????????
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
     * ?????? get ??????
     * @returns {ApiResponse}
     */

  }, {
    key: "get",
    value: function get() {
      return this.send('GET');
    }
    /**
     * ?????? post ??????
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
     * ???????????? application/json ???????????? post??????
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
     * ???????????????
     * @returns {Object}
     */

  }, {
    key: "getHeaders",
    value: function getHeaders() {
      return this.headers;
    }
    /**
     * ???????????????????????????
     * @param {string} method ?????????
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
                this.onBeforeSend({
                  getParams: this.getParams,
                  postParams: this.postParams,
                  headers: this.getHeaders()
                });
                _context.next = 6;
                return this.driver({
                  url: config.url,
                  method: method,
                  headers: this.getHeaders(),
                  params: this.getParams,
                  data: this.postParams
                });

              case 6:
                response = _context.sent;
                _context.next = 12;
                break;

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](2);
                response = {
                  status: _context.t0.message.split('code ').pop() || 500,
                  statusText: _context.t0.name,
                  errMsg: _context.t0.message,
                  headers: _context.t0.headers || {},
                  data: {}
                };

              case 12:
                response = this.formatResponse(config, response);
                this.onAfterSend(response);
                return _context.abrupt("return", response);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 9]]);
      }));

      function send(_x) {
        return _send.apply(this, arguments);
      }

      return send;
    }()
  }, {
    key: "onBeforeSend",
    value: function onBeforeSend(request) {
      var apiConfig = _VFrame["default"].getInstance().mainConfig.api;

      if (typeof apiConfig.onBeforeSend === 'function') {
        apiConfig.onBeforeSend(this, request);
      }
    }
  }, {
    key: "onAfterSend",
    value: function onAfterSend(response) {
      var apiConfig = _VFrame["default"].getInstance().mainConfig.api;

      if (typeof apiConfig.onAfterSend === 'function') {
        apiConfig.onAfterSend(this, response);
      }
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      return new this();
    }
  }]);
  return Api;
}();

exports["default"] = Api;