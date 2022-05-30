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

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _BaseModel2 = _interopRequireDefault(require("./BaseModel"));

var _ObjectHelper = _interopRequireDefault(require("../../helpers/ObjectHelper"));

var _asyncValidator = _interopRequireDefault(require("async-validator"));

var _VFrame = _interopRequireDefault(require("../../VFrame"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ApiModel = /*#__PURE__*/function (_BaseModel) {
  (0, _inherits2["default"])(ApiModel, _BaseModel);

  var _super = _createSuper(ApiModel);

  function ApiModel() {
    var _this;

    (0, _classCallCheck2["default"])(this, ApiModel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "response", void 0);
    return _this;
  }

  (0, _createClass2["default"])(ApiModel, [{
    key: "detail",
    value:
    /**
     * 获取明细信息操作
     * 当获取成功时，将使用接口数据为当前实例对应属性赋值
     * @param {object} params 请求参数
     * @returns {boolean}
     */
    function () {
      var _detail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var params,
            _args = arguments;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};

                if (this.getPrimary()) {
                  params[this.primaryKey] = this.getPrimary();
                }

                _context.next = 4;
                return _VFrame["default"].getInstance().get('api').getInstance().setApiName(this.constructor.DetailApi).setGetParams(params).get();

              case 4:
                this.response = _context.sent;

                if (this.response.getIsSuccess()) {
                  this.setSources(this.response.getSources());
                }

                return _context.abrupt("return", this.response.getIsSuccess());

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function detail() {
        return _detail.apply(this, arguments);
      }

      return detail;
    }()
    /**
     * 列表信息对应的接口名
     * 需要在 /config/apiConfigs 中配置
     * @static
     * @type {string}
     */

  }, {
    key: "getListQueryParams",
    value:
    /**
     * 获取list接口需要用的URL参数
     * @returns {object}
     */
    function getListQueryParams() {
      return this.getSources();
    }
    /**
     * 传入参数，根据参数获取列表信息
     * 当获取成功时，将使用接口数据实例化一个模型列表，可使用 response.getModels() 获取
     * @static
     * @returns {Promise<boolean>}
     */

  }, {
    key: "list",
    value: function () {
      var _list = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var params,
            model,
            _args2 = arguments;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                model = _args2.length > 1 ? _args2[1] : undefined;
                params = Object.assign(params, this.getListQueryParams());
                _context2.next = 5;
                return _VFrame["default"].getInstance().get('api').getInstance().setGetParams(params).setApiName(this.constructor.ListApi).get();

              case 5:
                this.response = _context2.sent;

                if (this.response.getIsSuccess()) {
                  this.response.queryParams = params;
                  this.response.models = (model || this.constructor).instanceList(this.response.getItems() || []);
                }

                return _context2.abrupt("return", this.response.getIsSuccess());

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function list() {
        return _list.apply(this, arguments);
      }

      return list;
    }()
    /**
     * 根据一个数据列表，实例化一个模型列表
     * @param {array<object>} list
     * @returns {array}
     */

  }, {
    key: "getActionRequestParams",
    value:
    /**
     * 获取action接口需要使用的参数
     * @returns {object}
     */
    function getActionRequestParams() {
      var _this2 = this;

      var formConfig = this.getFormConfig();
      var result = {};

      _ObjectHelper["default"].forEach(formConfig, function (value, key) {
        result[key] = _this2[key] || null;
      });

      return result;
    }
    /**
     * 获取action接口需要使用的URL参数
     * @returns {object}
     */

  }, {
    key: "getActionQueryParams",
    value: function getActionQueryParams() {
      var params = {};
      params[this.primaryKey] = this.getPrimary();
      return params;
    }
    /**
     * 校验属性
     * 根据需要配置好的 rules，该方法将根据 rules 的返回值进行校验
     * 校验通过时返回 true，不通过时返回 false，并通过 this.errors 暴露错误信息
     * @param {boolean} isClearErrors 执行校验前是否清空错误信息
     * @param {array} fields 指定需要校验的属性，不指定时将校验所有属性
     * @returns {boolean}
     */

  }, {
    key: "validate",
    value: function () {
      var _validate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var _this3 = this;

        var fields,
            isClearErrors,
            rules,
            field,
            validator,
            messages,
            errors,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                fields = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : [];
                isClearErrors = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : true;
                isClearErrors ? this.clearErrors() : '';

                _asyncValidator["default"].warning = function () {};

                rules = this.rules; // 根据fields，过滤掉不需要校验的字段

                if (fields.length !== 0) {
                  for (field in rules) {
                    if (fields.indexOf(field) === -1) {
                      delete rules[field];
                    }
                  }
                }

                validator = new _asyncValidator["default"](rules);
                messages = {
                  "default": '验证错误 %s',
                  required: '%s 不能为空',
                  "enum": '%s 取值范围必须是 %s',
                  whitespace: '%s 不能为空或空格',
                  date: {
                    format: '%s 格式是错误的',
                    parse: '%s 格式是错误的',
                    invalid: '%s 格式是错误的'
                  },
                  types: {
                    string: '%s 必须是文本格式',
                    method: '%s 必须是函数格式',
                    array: '%s 必须是数组',
                    object: '%s 必须是对象',
                    number: '%s 必须是数字',
                    date: '%s 必须是日期',
                    "boolean": '%s 必须是逻辑值',
                    integer: '%s 必须是整数',
                    "float": '%s 必须是浮点数',
                    regexp: '%s 必须是正确的正则表达式',
                    email: '%s 必须是正确的邮箱格式',
                    url: '%s 必须是正确的链接',
                    hex: '%s 必须是正确的哈希'
                  },
                  string: {
                    len: '%s 长度必须是 %s',
                    min: '%s 长度不可小于 %s',
                    max: '%s 长度不可大于 %s',
                    range: '%s 长度必须在 %s 和 %s 之间'
                  },
                  number: {
                    len: '%s 必须等于 %s',
                    min: '%s 不可小于 %s',
                    max: '%s 不可大于 %s',
                    range: '%s 必须在 %s 和 %s之间'
                  },
                  array: {
                    len: '%s 长度必须是 %s',
                    min: '%s 长度不可小于 %s',
                    max: '%s 长度不可大于 %s',
                    range: '%s 长度必须在 %s 和 %s之间'
                  },
                  pattern: {
                    mismatch: '%s 格式是错误的'
                  },
                  clone: function clone() {
                    var cloned = JSON.parse(JSON.stringify(this));
                    cloned.clone = this.clone;
                    return cloned;
                  }
                };
                validator.messages(messages);
                _context3.prev = 9;
                _context3.next = 12;
                return validator.validate(this.getSources(fields));

              case 12:
                return _context3.abrupt("return", true);

              case 15:
                _context3.prev = 15;
                _context3.t0 = _context3["catch"](9);
                errors = _context3.t0.errors;
                (errors || []).map(function (_ref2) {
                  var message = _ref2.message,
                      field = _ref2.field;

                  _this3.addError(field, message.replace(field, _this3.getLabel(field)));
                });
                return _context3.abrupt("return", false);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[9, 15]]);
      }));

      function validate() {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
    /**
     * 执行自定义远程操作的方法
     * 模型只封装了 删除、详情 和 列表 三个远程操作，这肯定是不够的
     * 现在可以通过创建一个特定的处理类，并继承对应的模型类，然后通过配置这个值就可以用来执行各种自定义的操作了
     * 通过重写 getActionRequest 方法来返回执行该操作需要的 post 数据
     * 使用方法和 删除、详情 和 列表 接口的方式相同
     * 当调用不成功并且ApiResponse可以解析出 field 时，会自动将错误信息通过 addError 写入当前模型
     * @param {boolean} runValidator 调用接口前是否先调用数据校验，当校验不通过时该方法将返回 null
     * @param {boolean} isClearErrors 是否需要在调用数据校验前，清空错误信息
     * @returns {boolean}
     */

  }, {
    key: "action",
    value: function () {
      var _action = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var runValidator,
            isClearErrors,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                runValidator = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : true;
                isClearErrors = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : true;

                if (isClearErrors) {
                  this.clearErrors();
                }

                _context4.t0 = runValidator;

                if (!_context4.t0) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 7;
                return this.validate([], false);

              case 7:
                _context4.t0 = !_context4.sent;

              case 8:
                if (!_context4.t0) {
                  _context4.next = 10;
                  break;
                }

                return _context4.abrupt("return", false);

              case 10:
                if (this.beforeAction()) {
                  _context4.next = 12;
                  break;
                }

                return _context4.abrupt("return", false);

              case 12:
                _context4.next = 14;
                return _VFrame["default"].getInstance().get('api').getInstance().setGetParams(this.getActionQueryParams()).setPostParams(this.getActionRequestParams()).setApiName(this.constructor.ActionApi).raw();

              case 14:
                this.response = _context4.sent;

                if (this.response.getIsSuccess()) {
                  this.setSources(this.response.getSources());
                } else {
                  if (this.response.getField()) {
                    this.addError(this.response.getField(), this.response.getMessage());
                  }
                }

                this.afterAction(this.response.getIsSuccess());
                return _context4.abrupt("return", this.response.getIsSuccess());

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function action() {
        return _action.apply(this, arguments);
      }

      return action;
    }()
    /**
     * 执行 action 之前的钩子
     * 返回 false 时将不执行 action 的逻辑
     * @returns {boolean}
     */

  }, {
    key: "beforeAction",
    value: function beforeAction() {
      return true;
    }
    /**
     * 执行 action 之后的钩子
     * @param {boolean} isSuccess 操作是否成功
     */

  }, {
    key: "afterAction",
    value: function afterAction(isSuccess) {}
  }], [{
    key: "instanceList",
    value: function instanceList(list) {
      var _this4 = this;

      return list.map(function (data) {
        var model = new _this4();
        model.setSources(data);
        return model;
      });
    }
    /**
     * 指定操作对应的接口名
     * 需要在 /configs/apiConfigs 中配置
     * @type {string}
     */

  }]);
  return ApiModel;
}(_BaseModel2["default"]);

exports["default"] = ApiModel;
(0, _defineProperty2["default"])(ApiModel, "DetailApi", undefined);
(0, _defineProperty2["default"])(ApiModel, "ListApi", undefined);
(0, _defineProperty2["default"])(ApiModel, "ActionApi", undefined);