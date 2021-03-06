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
     * ???????????????????????????????????????
     * ??????????????????????????????????????????????????????
     * @return {object}
     */
    function getFormConfig() {
      return {};
    }
    /**
     * ???????????????????????????????????????????????????
     * ???????????????????????? type ?????????????????????????????????????????????????????????????????? onForm + Type ?????????????????? onFormCancel() ????????? type = cancel
     * @returns {array<object<name,type,submit,options>>}
     */

  }, {
    key: "getFormActionList",
    value: function getFormActionList() {
      return [{
        name: '??????',
        type: 'cancel',
        submit: false,
        options: {
          "class": 'float-left',
          type: 'info',
          plain: ''
        }
      }, {
        name: '??????',
        type: 'submit',
        submit: true,
        options: {
          "class": 'float-right',
          type: 'primary'
        }
      }];
    }
    /**
     * ??????????????????????????????
     * ????????????????????????????????????????????????????????????????????????????????????
     * @param {function} submitHandle ???????????????????????????????????????????????????????????????????????????????????????????????? submit: true ??????????????????????????????
     */

  }, {
    key: "onFormCancel",
    value: function onFormCancel(submitHandle) {
      _VFrame["default"].getInstance().hideModal();
    }
    /**
     * ??????????????????????????????
     * @param {function} submitHandle ???????????????????????????????????????????????????????????????????????????????????????????????? submit: true ??????????????????????????????
     * @returns {boolean}
     */

  }, {
    key: "onFormSubmit",
    value: function onFormSubmit(submitHandle) {
      return this.action();
    }
    /**
     * ????????????????????????????????????
     * @returns {array<string>}
     */

  }, {
    key: "getFormFields",
    value: function getFormFields() {
      return Object.keys(this.getFormConfig());
    }
    /**
     * ??????????????????????????????
     * ????????????????????????????????????????????????null???undefined????????????
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
     * ?????????????????????????????????
     * ???????????????????????????????????????????????????
     * ???????????????????????????????????????????????????
     * ????????????????????????null
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