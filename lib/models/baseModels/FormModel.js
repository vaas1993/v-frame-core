"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _ApiModel2 = _interopRequireDefault(require("./ApiModel"));

var _VFrame = _interopRequireDefault(require("../../VFrame"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FormModel = /*#__PURE__*/function (_ApiModel) {
  (0, _inherits2["default"])(FormModel, _ApiModel);

  var _super = _createSuper(FormModel);

  function FormModel() {
    (0, _classCallCheck2["default"])(this, FormModel);
    return _super.apply(this, arguments);
  }

  (0, _createClass2["default"])(FormModel, [{
    key: "getFormConfig",
    value:
    /**
     * 获取一个用于渲染表单的配置
     * 对于不同的页面实现，可以有不同的格式
     * @return {object}
     */
    function getFormConfig() {
      return {};
    }
    /**
     * 获取一个用于渲染表单操作按钮的配置
     * 按钮可以配置一个 type 字段，最终点击这个按钮的时候会自动调用模型的 onForm + Type 的方法，比如 onFormCancel() 代表了 type = cancel
     * @returns {array<object<name,type,submit,options>>}
     */

  }, {
    key: "getFormActionList",
    value: function getFormActionList() {
      return [{
        name: '取消',
        type: 'cancel',
        submit: false,
        options: {
          "class": 'float-left',
          type: 'info',
          plain: ''
        }
      }, {
        name: '确认',
        type: 'submit',
        submit: true,
        options: {
          "class": 'float-right',
          type: 'primary'
        }
      }];
    }
    /**
     * 表单取消按钮点击事件
     * 默认处理的是关闭模态框逻辑，有其他逻辑可在子类重写该方法
     * @param {function} submitHandle 该方法用于将表单组件的数据同步到当前实例中，若在按钮中已经配置了 submit: true 则将自动完成这个步骤
     */

  }, {
    key: "onFormCancel",
    value: function onFormCancel(submitHandle) {
      _VFrame["default"].getInstance().hideModal();
    }
    /**
     * 表单提交按钮点击事件
     * @param {function} submitHandle 该方法用于将表单组件的数据同步到当前实例中，若在按钮中已经配置了 submit: true 则将自动完成这个步骤
     * @returns {boolean}
     */

  }, {
    key: "onFormSubmit",
    value: function onFormSubmit(submitHandle) {
      return this.action();
    }
    /**
     * 获取表单配置中的字段列表
     * @returns {array<string>}
     */

  }, {
    key: "getFormFields",
    value: function getFormFields() {
      return Object.keys(this.getFormConfig());
    }
    /**
     * 判断属性的值是否为空
     * 空数组、无状态空对象、空字符串、null和undefined都视为空
     * @param {string} field
     * @returns {boolean}
     */

  }, {
    key: "getIsEmpty",
    value: function getIsEmpty(field) {
      var value = this.getSource(field);

      if (Array.isArray(value)) {
        return value.length === 0;
      }

      if ((0, _typeof2["default"])(value) === 'object' && value) {
        return Object.keys(value).length === 0;
      }

      return ['', null, undefined].indexOf(value) !== -1;
    }
    /**
     * 将指定属性的值设置为空
     * 当属性的值为数组时，会设置为空数组
     * 当属性的值为对象时，会设置为空对象
     * 其它情况下设置为null
     * @param {string} field
     */

  }, {
    key: "setEmpty",
    value: function setEmpty(field) {
      var value = this[field];

      if (Array.isArray(value)) {
        this[field] = [];
      }

      if ((0, _typeof2["default"])(value) === 'object') {
        this[field] = {};
      }

      this[field] = null;

      if (this.fieldSuffix && this.getIsField(field + this.fieldSuffix)) {
        this[field + this.fieldSuffix] = this[field];
      }
    }
  }]);
  return FormModel;
}(_ApiModel2["default"]);

exports["default"] = FormModel;