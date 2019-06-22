### 浏览器中未处理的Promise错误
一些浏览器(例如Chrome)能够捕获未处理的Promise错误。

监听**unhandledrejection**事件，即可捕获到未处理的Promise错误：

```
window.addEventListener('unhandledrejection', event => ···)
```

promise: reject 的Promise这个事件是**PromiseRejectionEvent**实例，它有2个最重要的属性：

- reason: Promise的reject值
- promise: reject的Promise
  
```
window.addEventListener('unhandledrejection', event => {
    console.log(event.reason); // 打印"Hello, Fundebug!"
});
 
function foo() {
    Promise.reject('Hello, Fundebug!');
}
 
foo();
```


当一个Promise错误最初未被处理，但是稍后又得到了处理，则会触发`rejectionhandled`事件：

```
window.addEventListener('rejectionhandled', event => ···);
```

这个事件是**PromiseRejectionEvent**实例。

```
  window.addEventListener('unhandledrejection', event => {
      console.log(event.reason); // 打印"Hello, Fundebug!"
  });
  
  window.addEventListener('rejectionhandled', event => {
      console.log('rejection handled'); // 1秒后打印"rejection handled"
  });
  
  
  function foo() {
      return Promise.reject('Hello, Fundebug!');
  }
  
  var r = foo();
  
  setTimeout(() => {
      r.catch(e =>{});
  }, 1000);
``` 

**unhandledrejection** 和 **rejectionhandled** 都是 **PromiseRejectionEvent** 的实例

### Node.js中未处理的Promise错误

监听**unhandledRejection**事件，即可捕获到未处理的Promise错误：

process.on('unhandledRejection', (reason, promise) => ···);
```
  process.on('unhandledRejection', reason => {
      console.log(reason); // 打印"Hello, Fundebug!"
  });
  
  function foo() {
      Promise.reject('Hello, Fundebug!');
  }
 
foo();
```
注: Node.js v6.6.0+ 默认会报告未处理的Promise错误，因此不去监听unhandledrejection事件也没问题。

Fundebug的Node.js错误监控插件监听了unhandledRejection事件，因此可以自动捕获未处理Promise错误。
