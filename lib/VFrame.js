"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof3 = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _main = _interopRequireDefault(require("./configs/main"));

var _params = _interopRequireDefault(require("./configs/params"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var VFrame = /*#__PURE__*/function () {
  /**
   * ?????????
   * @type {{name, api: {defaultHeaders, list, filter, driver}}}
   */
  function VFrame() {
    (0, _classCallCheck2["default"])(this, VFrame);
    (0, _defineProperty2["default"])(this, "mainConfig", {});
    (0, _defineProperty2["default"])(this, "params", {});
    (0, _defineProperty2["default"])(this, "dictList", {});
    (0, _defineProperty2["default"])(this, "permissionList", []);
    (0, _defineProperty2["default"])(this, "user", undefined);
    (0, _defineProperty2["default"])(this, "toast", {
      id: undefined,
      message: '',
      type: 'info',
      duration: 3000,
      showClose: true
    });
    (0, _defineProperty2["default"])(this, "dialog", {
      id: undefined,
      title: undefined,
      message: undefined,
      type: 'info',
      showClose: true,
      showCancel: true,
      showConfirm: true,
      cancelText: '??????',
      confirmText: '??????',
      callback: undefined
    });
    (0, _defineProperty2["default"])(this, "notify", {
      id: undefined,
      title: undefined,
      message: undefined,
      type: 'info',
      duration: 5000,
      showClose: true,
      callback: undefined
    });
    (0, _defineProperty2["default"])(this, "modal", {
      id: undefined,
      callback: undefined,
      showClose: true,
      title: undefined,
      content: undefined
    });
    (0, _defineProperty2["default"])(this, "globalData", {});
    (0, _defineProperty2["default"])(this, "loading", 0);

    // ??????
    if ((0, _typeof2["default"])(VFrame._instance) === 'object') {
      return VFrame._instance;
    }

    return this;
  }
  /**
   * ??????????????????
   * @param {string} path ??????????????????????????????????????????.??????
   * @param {any} value ???????????????????????????????????????
   */


  (0, _createClass2["default"])(VFrame, [{
    key: "setGlobalData",
    value: function setGlobalData(path, value) {
      path = path.split('.');

      if (path.length) {
        var item = this.globalData;
        var lastKey = path.pop();

        var _iterator = _createForOfIteratorHelper(path),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var key = _step.value;

            if ((0, _typeof2["default"])(item[key]) !== 'object') {
              item[key] = {};
            }

            item = item[key];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        item[lastKey] = value;
      }
    }
    /**
     * ??????loading??????
     */

  }, {
    key: "showLoading",
    value: function showLoading() {
      this.loading++;
    }
    /**
     * ??????loading??????
     */

  }, {
    key: "hideLoading",
    value: function hideLoading() {
      this.loading -= 1;
      this.loading = this.loading < 0 ? 0 : this.loading;
    }
    /**
     * ???????????????
     * @param {object<title, component, showClose, callback>} options
     */

  }, {
    key: "showModal",
    value: function showModal(options) {
      this.modal = Object.assign({
        callback: undefined,
        showClose: true,
        title: undefined,
        content: undefined
      }, options, {
        id: Math.random()
      });
    }
    /**
     * ???????????????
     * @param {boolean} runCallback ???????????????callback?????????????????????
     */

  }, {
    key: "hideModal",
    value: function hideModal() {
      var _this = this;

      var runCallback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (runCallback && typeof this.modal.callback === 'function') {
        return this.modal.callback(function () {
          _this.hideModal(false);
        });
      }

      this.modal = Object.assign({}, this.modal, {
        id: undefined,
        callback: undefined,
        showClose: true,
        title: undefined,
        component: undefined
      });
    }
    /**
     * ???????????????
     * @param {object<title, message, type, duration, showClose, callback>} options
     */

  }, {
    key: "showNotify",
    value: function showNotify(options) {
      this.notify = Object.assign({
        id: Math.random(),
        title: undefined,
        message: undefined,
        type: 'info',
        duration: 5000,
        showClose: true,
        callback: undefined
      }, options);
    }
    /**
     * ??????????????????
     * @param {object<message, type, duration, showClose>} options
     */

  }, {
    key: "showToast",
    value: function showToast(options) {
      this.toast = Object.assign({
        id: Math.random(),
        message: '',
        type: 'info',
        duration: 3000,
        showClose: true
      }, options);
    }
    /**
     * ???????????????
     * @param {object<title, message, type, showClose, showCancel, showConfirm, cancelText, confirmText, callback>} options
     */

  }, {
    key: "showDialog",
    value: function showDialog(options) {
      this.dialog = Object.assign({
        id: Math.random(),
        title: undefined,
        message: undefined,
        type: 'info',
        showClose: true,
        showCancel: true,
        showConfirm: true,
        cancelText: '??????',
        confirmText: '??????',
        callback: undefined
      }, options);
    }
    /**
     * ????????????????????????
     * @param {string} name
     * @param {string} message
     * @returns {Error}
     */

  }, {
    key: "getError",
    value: function getError(name, message) {
      var error = new Error();
      error.name = name;
      error.message = message;
      return error;
    }
    /**
     * ???????????????
     * @param {object} mainConfig
     * @return {VFrame}
     */

  }, {
    key: "setMainConfig",
    value: function setMainConfig(mainConfig) {
      this.mainConfig = Object.assign(_main["default"], mainConfig);
      return this;
    }
    /**
     * ??????????????????
     * @param {object} params
     * @return {VFrame}
     */

  }, {
    key: "setParams",
    value: function setParams(params) {
      this.params = Object.assign(_params["default"], params);
      return this;
    }
    /**
     * ??? params ?????????????????????
     * @param {string} name
     * @param {object|array} data
     */

  }, {
    key: "setParam",
    value: function setParam(name, data) {
      this.params[name] = data;
    }
    /**
     * ?????????????????????
     * @param {string} name ?????????
     * @returns {boolean}
     */

  }, {
    key: "getHasPermission",
    value: function getHasPermission(name) {
      return name === undefined || this.permissionList.indexOf(name) !== -1;
    }
    /**
     * ??????????????????
     * @param {AuthUser} user
     */

  }, {
    key: "setUser",
    value: function setUser(user) {
      if (user) {
        this.user = user;
      } else {
        throw this.getError("????????????????????????", "???????????????AuthUser???????????????");
      }
    }
    /**
     * ??????????????????
     * ???????????????????????????????????????
     * @param {array<string>} list
     */

  }, {
    key: "setPermissionList",
    value: function setPermissionList(list) {
      this.permissionList = list;
    }
    /**
     * ????????????????????????
     * ?????????????????????????????????????????????
     * @param {object<array<object<name, value>>>} list
     */

  }, {
    key: "setDictList",
    value: function setDictList(list) {
      this.dictList = list;
    }
    /**
     * ????????????
     * @returns {VFrame}
     */

  }, {
    key: "install",
    value:
    /**
     * ???????????????????????????VFrame?????????????????????????????????????????????????????????
     * @returns {Promise<VFrame>}
     */
    function () {
      var _install = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var config, params, user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.constructor._instance = this;
                config = {};
                params = {};
                _context.next = 5;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require('@/configs/main'));
                });

              case 5:
                config = _context.sent["default"];
                _context.next = 8;
                return Promise.resolve().then(function () {
                  return _interopRequireWildcard(require('@/configs/params'));
                });

              case 8:
                params = _context.sent["default"];
                user = new config.user["class"]();
                user.setSources(config.user.params || {});
                this.setUser(user);
                this.setParams(params);
                this.setMainConfig(config);
                return _context.abrupt("return", this);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function install() {
        return _install.apply(this, arguments);
      }

      return install;
    }()
    /**
     * ??????VUE?????????????????????????????????????????????????????? $vf ???VUE????????????
     * @param {object} app VUE????????????
     * @param {function} reactive VUE?????????????????????????????????????????????
     * @returns {Promise<VFrame>}
     */

  }, {
    key: "vue",
    value: function () {
      var _vue = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(app, reactive) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.install();

              case 2:
                app.config.globalProperties.$vf = typeof reactive === 'function' ? reactive(this) : this;
                this.constructor._instance = app.config.globalProperties.$vf;
                return _context2.abrupt("return", this);

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function vue(_x, _x2) {
        return _vue.apply(this, arguments);
      }

      return vue;
    }()
    /**
     * ???????????????????????????????????????class
     * ???????????????Api????????????????????????Api???????????? VFrame.getInstance().get('api') ??????
     * ??????????????????????????????????????? Api ???
     * @param {string} name
     * @returns {string|*}
     */

  }, {
    key: "get",
    value: function get(name) {
      return this.mainConfig[name]["class"];
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      this._instance = this._instance || new this();
      return this._instance;
    }
  }]);
  return VFrame;
}();

exports["default"] = VFrame;
(0, _defineProperty2["default"])(VFrame, "_instance", void 0);