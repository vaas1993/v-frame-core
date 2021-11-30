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

var VFrame = /*#__PURE__*/function () {
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
      cancelText: '取消',
      confirmText: '确定',
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
    (0, _defineProperty2["default"])(this, "loading", 0);

    // 单例
    if ((0, _typeof2["default"])(VFrame._instance) === 'object') {
      return VFrame._instance;
    }

    return this;
  }
  /**
   * 添加loading状态
   */


  (0, _createClass2["default"])(VFrame, [{
    key: "showLoading",
    value: function showLoading() {
      this.loading++;
    }
    /**
     * 移除loading状态
     */

  }, {
    key: "hideLoading",
    value: function hideLoading() {
      this.loading -= 1;
      this.loading = this.loading < 0 ? 0 : this.loading;
    }
    /**
     * 展示模态框
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
     * 关闭模态框
     * @param {boolean} runCallback 是否要执行callback函数（如果有）
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
     * 展示通知框
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
     * 展示轻提示框
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
     * 展示对话框
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
        cancelText: '取消',
        confirmText: '确定',
        callback: undefined
      }, options);
    }
    /**
     * 获取一个错误实例
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
     * 设置主配置
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
     * 设置全局变量
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
     * 在 params 中增加一个数据
     * @param {string} name
     * @param {object|array} data
     */

  }, {
    key: "setParam",
    value: function setParam(name, data) {
      this.params[name] = data;
    }
    /**
     * 获取是否有权限
     * @param {string} name 权限名
     * @returns {boolean}
     */

  }, {
    key: "getHasPermission",
    value: function getHasPermission(name) {
      return name === undefined || this.permissionList.indexOf(name) !== -1;
    }
    /**
     * 设置用户实例
     * @param {AuthUser} user
     */

  }, {
    key: "setUser",
    value: function setUser(user) {
      if (user) {
        this.user = user;
      } else {
        throw this.getError("设置用户实例错误", "请设置一个AuthUser的子类实例");
      }
    }
    /**
     * 设置权限列表
     * 该方法会覆盖现有的所有权限
     * @param {array<string>} list
     */

  }, {
    key: "setPermissionList",
    value: function setPermissionList(list) {
      this.permissionList = list;
    }
    /**
     * 设置数据词典列表
     * 该方法会覆盖现有所有的词典列表
     * @param {object<array<object<name, value>>>} list
     */

  }, {
    key: "setDictList",
    value: function setDictList(list) {
      this.dictList = list;
    }
    /**
     * 获取实例
     * @returns {VFrame}
     */

  }, {
    key: "install",
    value:
    /**
     * 安装初始化，在使用VFrame之前需要先调用这个方法进行必要的初始化
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
     * 针对VUE进行封装的初始化方法，暴露有个全局的 $vf 当VUE上下文中
     * @param {object} app VUE应用实例
     * @param {function} reactive VUE用于将普通变量转为可监听的变量
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