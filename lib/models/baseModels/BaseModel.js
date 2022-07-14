"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _ObjectHelper = _interopRequireDefault(require("../../helpers/ObjectHelper"));

var _EventHandler2 = _interopRequireDefault(require("../../helpers/EventHandler"));

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var BaseModel = /*#__PURE__*/function (_EventHandler) {
  (0, _inherits2["default"])(BaseModel, _EventHandler);

  var _super = _createSuper(BaseModel);

  /**
   * 模型实例的唯一ID
   * 注意，每一次实例化都会生成一次唯一值，每次都是不同的值，尽管是同一组数据重复实例化也会得到两个不同的唯一ID
   * @type {string}
   */

  /**
   * 校验规则配置
   * @type {object}
   */

  /**
   * 错误信息
   * @type {array<object<field, message>>}
   */

  /**
   * 主键属性
   * @type {string}
   */

  /**
   * 属性格式化配置
   * @type {object<{value: function|object, formatter: function, formatterOptions: object}>}
   */

  /**
   * 属性映射的标签名
   * @type {object}
   */

  /**
   * 后缀属性指定的后缀名
   * 在 getValue 中，获取一个属性的展示值时，如果没有其它配置，会自动获取 属性名 + 后缀 组成的新属性的值
   * @type {string}
   */
  function BaseModel() {
    var _this;

    var sources = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2["default"])(this, BaseModel);
    _this = _super.call(this);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "$unique", undefined);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rules", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "errors", []);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "primaryKey", 'id');
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "formatConfig", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldLabels", {});
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "fieldSuffix", '_view');
    _this.$unique = ((1 + Math.random()) * 0x1000000 | 0).toString(16);

    if ((0, _typeof2["default"])(sources) === 'object') {
      _this.setSources(sources);
    }

    return _this;
  }
  /**
   * 获取主键属性的值
   * @returns {string}
   */


  (0, _createClass2["default"])(BaseModel, [{
    key: "getPrimary",
    value: function getPrimary() {
      return this[this.primaryKey];
    }
    /**
     * 设置主键属性的值
     * @param {string} value
     */

  }, {
    key: "setPrimary",
    value: function setPrimary(value) {
      this[this.primaryKey] = value;
    }
    /**
     * 获取指定属性是否必填
     * 需要在 rules 中配置属性必填
     * @param {string} field
     * @returns {boolean}
     */

  }, {
    key: "getIsRequired",
    value: function getIsRequired(field) {
      var _iterator = _createForOfIteratorHelper(this.rules[field] || []),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var rule = _step.value;

          if (rule.required === true) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
    /**
     * 获取当前实例是否存在错误信息
     * @returns {boolean}
     */

  }, {
    key: "getHasErrors",
    value: function getHasErrors() {
      return this.errors.length !== 0;
    }
    /**
     * 清空当前实例的错误信息
     */

  }, {
    key: "clearErrors",
    value: function clearErrors() {
      this.errors = [];
    }
    /**
     * 为指定属性添加一个错误信息
     * @param {string} field
     * @param {string} message
     */

  }, {
    key: "addError",
    value: function addError(field, message) {
      this.errors.push({
        field: field,
        message: message
      });
    }
    /**
     * 批量添加错误信息
     * @param {array<{field: string, message: string}>} errors
     */

  }, {
    key: "addErrors",
    value: function addErrors(errors) {
      var _iterator2 = _createForOfIteratorHelper(errors),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var item = _step2.value;
          this.addError(item.field, item.message);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    /**
     * 获取第一条错误信息
     * @param {string} field
     * @returns {null|string}
     */

  }, {
    key: "shiftErrorMessage",
    value: function shiftErrorMessage() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;

      var _iterator3 = _createForOfIteratorHelper(this.errors),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var error = _step3.value;

          if (field === undefined || error.field === field) {
            return error.message;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      return null;
    }
    /**
     * shiftErrorMessage的别名
     * @param {string} field
     * @returns {string|null}
     */

  }, {
    key: "getOneErrorMessage",
    value: function getOneErrorMessage() {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
      return this.shiftErrorMessage(field);
    }
    /**
     * 传入一个属性名，以一个数组的形式返回其所有的错误信息
     * @param {string} field
     * @returns {array<string>}
     */

  }, {
    key: "getErrors",
    value: function getErrors(field) {
      return this.errors.map(function (error) {
        return error.field === field ? error.message : null;
      }).filter(function (v) {
        return !!v;
      });
    }
    /**
     * 获取指定属性的标签
     * 需要在 fieldLabels 配置，否则返回属性名本身
     * @param {string} field
     * @returns {string}
     */

  }, {
    key: "getLabel",
    value: function getLabel(field) {
      if (this.fieldLabels[field]) {
        return this.fieldLabels[field];
      }

      return field.split('_').filter(function (v) {
        return !!v;
      }).map(function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
      }).join(' ');
    }
    /**
     * 获取指定属性的展示值
     * 该方法支持将原始值格式化成展示值，这些格式化的机制包括：
     * 1. 如果formatConfig 配置了 formatter，则实例化配置好的格式化处理类，并返回处理类格式化后的值
     * 2. formatConfig 配置了 value 为一个 object 的键值对，该函数会将原始作为键，并返回对应的值作为展示值，如果找不到则则返回原始的值
     * 3. formatConfig 配置了 value 为一个 function，该函数会自动调用该函数，并将返回值作为展示值
     * 4. 如果同一个模型实例，存在一个 字段名 等于 当前获取的字段名 + this.fieldSuffix 组成的字段，则返回该后缀字段的值作为展示值
     * 以上几个机制同时存在时只会触发一个，它们的优先级为： formatter > value.function = value.object > 后缀字段
     * @param {string} field 属性名
     * @param {*} source 指定一个特定的值进行格式化，该值指定后，返回的展示值会使用这个值作为原始值进行处理，但不会修改实例对应属性的值
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue(field) {
      var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
      var format = this.formatConfig[field] || {};
      source = source === undefined ? this[field] : source; // 助手翻译

      if (format.formatter) {
        var formatter = new format.formatter["class"](source, this, format.formatter.options || {}, field);
        return formatter.getValue();
      } // 字典翻译


      if ((0, _typeof2["default"])(format.value) === 'object') {
        return format.value[source] || source;
      } // 函数翻译


      if (typeof format.value === 'function') {
        return format.value({
          model: this,
          field: field,
          source: source
        });
      } // 后缀翻译


      if (this[field + this.fieldSuffix]) {
        return this[field + this.fieldSuffix];
      } // 如果以上机制都没有匹配到，则直接返回原始值


      return source;
    }
    /**
     * 传入一个字符串，返回该字符串是不是当前实例的属性名
     * 判断逻辑：
     * 1. 不是模型自带的属性，比如 primaryKey，errors 这些
     * 2. 当前实例存在该属性 或 在 formatConfig 中配置了该属性 或 在 fieldLabels 中配置了该属性
     * @param {string} field
     * @returns {boolean}
     */

  }, {
    key: "getIsField",
    value: function getIsField(field) {
      return ['primaryKey', 'fieldSuffix', 'errors', 'formatConfig', 'rules', 'fieldLabels', 'response', '$unique', '$events'].indexOf(field) === -1 && (Object.prototype.hasOwnProperty.call(this, field) || this.formatConfig[field] || this.fieldLabels[field]) && (field.indexOf(this.fieldSuffix) === -1 || this.getIsField(field.replace(this.fieldSuffix, '')));
    }
    /**
     * 返回当前实例所有的属性名列表
     * @returns {array<string>}
     */

  }, {
    key: "getFields",
    value: function getFields() {
      var result = [];

      for (var _i = 0, _Object$keys = Object.keys(this); _i < _Object$keys.length; _i++) {
        var field = _Object$keys[_i];

        if (this.getIsField(field)) {
          result.push(field);
        }
      }

      return result;
    }
    /**
     * 传入一个属性名列表，返回属性对应的展示值
     * 不传属性名列表时，将返回所有属性对应的展示值
     * 使用该方法时注意与 getSources 方法的区别
     * @param {array<string>} fields
     * @returns {object}
     */

  }, {
    key: "getValues",
    value: function getValues() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var values = {};
      fields = fields.length ? fields : this.getFields();

      var _iterator4 = _createForOfIteratorHelper(fields),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var field = _step4.value;

          if (this.getIsField(field)) {
            values[field] = this.getValue(field);
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return values;
    }
    /**
     * 获取模型的属性值
     * @param {string} field 对于属性是一个对象的，支持使用 . 号分隔符进行多级获取
     * @returns {*}
     */

  }, {
    key: "getSource",
    value: function getSource(field) {
      return _ObjectHelper["default"].getValue(this, field);
    }
    /**
     * 传入一个属性名列表，返回属性对应的原始值
     * 不传属性名列表时，将返回所有属性对应的原始值
     * 使用该方法时注意与 getValues 方法的区别
     * @param {array<string>} fields
     * @returns {object}
     */

  }, {
    key: "getSources",
    value: function getSources() {
      var fields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var values = {};
      fields = fields.length ? fields : this.getFields();

      var _iterator5 = _createForOfIteratorHelper(fields),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var field = _step5.value;

          if (this.getIsField(field)) {
            values[field] = this.getSource(field);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return values;
    }
    /**
     * 批量设置属性对应的原始值
     * @param {object} sources
     */

  }, {
    key: "setSources",
    value: function setSources(sources) {
      for (var field in sources) {
        this.setSource(field, sources[field]);
      }
    }
    /**
     * 设置属性对应的原始值
     * @param {string} field
     * @param {*} value
     */

  }, {
    key: "setSource",
    value: function setSource(field, value) {
      this[field] = value;
    }
    /**
     * 传入用于构建多个模型实例的属性列表，返回当前模型实例列表
     * @static
     * @param {array<object>} list
     * @returns {*}
     */

  }, {
    key: "getInstanceTo",
    value:
    /**
     * 传入一个类，将当前实例的数据通过 setSources 转移到另一个类实例中
     * @param {function} ModelClass
     * @returns {BaseModel}
     */
    function getInstanceTo(ModelClass) {
      var model = new ModelClass();
      model.setSources(_ObjectHelper["default"].copy(this.getSources()));
      return model;
    }
  }], [{
    key: "instanceList",
    value: function instanceList(list) {
      var _this2 = this;

      return list.map(function (data) {
        var model = new _this2();
        model.setSources(data);
        return model;
      });
    }
  }]);
  return BaseModel;
}(_EventHandler2["default"]);

exports["default"] = BaseModel;