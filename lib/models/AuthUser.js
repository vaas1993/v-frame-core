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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _AppModel2 = _interopRequireDefault(require("./AppModel"));

var _StorageHelper = _interopRequireDefault(require("../helpers/StorageHelper"));

var _ObjectHelper = _interopRequireDefault(require("../helpers/ObjectHelper"));

var _VFrame = _interopRequireDefault(require("../VFrame"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var AuthUser = /*#__PURE__*/function (_AppModel) {
  (0, _inherits2["default"])(AuthUser, _AppModel);

  var _super = _createSuper(AuthUser);

  function AuthUser() {
    var _this;

    (0, _classCallCheck2["default"])(this, AuthUser);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "accessToken", void 0);
    return _this;
  }

  (0, _createClass2["default"])(AuthUser, [{
    key: "getIsField",
    value:
    /**
     * 获取某个变量是不是属姓
     * @param field
     * @returns {boolean}
     */
    function getIsField(field) {
      return (0, _get2["default"])((0, _getPrototypeOf2["default"])(AuthUser.prototype), "getIsField", this).call(this, field) && field !== 'accessToken';
    }
    /**
     * 设置授权令牌
     * 当设置为undefined时会清空Token
     * @param {string|undefined} token
     */

  }, {
    key: "setAccessToken",
    value: function setAccessToken(token) {
      this.accessToken = token;

      if (token === undefined) {
        _StorageHelper["default"].remove(AuthUser.ACCESS_TOKEN_NAME);
      } else {
        _StorageHelper["default"].set(AuthUser.ACCESS_TOKEN_NAME, token);
      }
    }
    /**
     * 获取登录授权令牌
     * @returns {*}
     */

  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.accessToken;
    }
    /**
     * 获取当前账号是否登录
     * @returns {boolean}
     */

  }, {
    key: "getIsLogin",
    value: function getIsLogin() {
      return this.accessToken !== undefined;
    }
    /**
     * 登录成功后的回调
     * @returns {Promise<boolean>}
     */

  }, {
    key: "afterLogin",
    value: function afterLogin() {
      return new Promise(function (next) {
        next(true);
      });
    }
    /**
     * 登录
     * @returns {Promise<boolean>}
     */

  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var user;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.action();

              case 2:
                if (!_context.sent) {
                  _context.next = 9;
                  break;
                }

                user = _VFrame["default"].getInstance().user;
                user.setSources(this.response.sources);
                user.setAccessToken(this.response.accessToken);
                _context.next = 8;
                return this.afterLogin();

              case 8:
                return _context.abrupt("return", true);

              case 9:
                return _context.abrupt("return", false);

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }()
    /**
     * 退出登录
     * @returns {Promise<boolean>}
     */

  }, {
    key: "logout",
    value: function () {
      var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.setAccessToken(undefined);
                this.setSources(_ObjectHelper["default"].forEach(this.getSources(), function () {
                  return undefined;
                }));
                return _context2.abrupt("return", true);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logout() {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }]);
  return AuthUser;
}(_AppModel2["default"]);

exports["default"] = AuthUser;
(0, _defineProperty2["default"])(AuthUser, "ACCESS_TOKEN_NAME", 'ACCESS_TOKEN_NAME');