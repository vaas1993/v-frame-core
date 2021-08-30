# Cookie助手类
VF提供一个Cookie助手类来简化操作Cookie的编码，和 本地存储助手类 提供了完全一致的方法名，方便开发者自由切换。

## 保存一个值
```javascript
/**
 * @param {string} name 键名
 * @param {string|object} value 需要保存的值
 */
CookieHelper.set(name, value)
```

## 获取一个值
```javascript
/**
 * @param {string} name 键名
 * @returns {string|object|undefined}
 */
CookieHelper.get(name) // 不存在时返回 undefined
```

## 判断是否有值
```javascript
/**
 * @param {string} name 键名
 * @returns {boolean}
 */
CookieHelper.has(name) // 如果保存的值是null，也会返回 false
```

## 删除一个值
```javascript
/**
 * @param {string} name 键名
 */
CookieHelper.remove(name)
```

## 清空所有cookie
```javascript
CookieHelper.clear()
```
