## Rxjs 单播与多播

rxjs的Subject具有**多播**的特性。如何理解**单播**和**多播**呢？

首先要了解一个概念**冷流**和**热流**。所谓**冷流**是指数据的变化是固定死的，举个例子：

```
let observable = Rx.Observable.create(function subscribe(obsever) {
  observer.next(1)
  observer.next(2)
})
observable.subscribe(v => console.log(v))
```

上面这段代码，subscribe的输出结果是可预知的，一定是先输出1，然后输出2.

什么是**热流**呢？就是它的数据变化是不可知的，随机的，随意的。例如通过fromEvent产生的observable。



**单播**是说，一个observable只能被一个观察者消费。

```
let observable = Rx.Observable.create(function subscribe(obsever) {
  observer.next(1)
  observer.next(2)
})
observable.subscribe(v => console.log(v))
observable.subscribe(v => console.log(v))
```

上面这段代码会输出两次1,2。简单的说，当调用observable.subscribe时，create的传入参数function subscribe会被调用一次。也就是说，一个subscribe只能被一个observer消费。这就是单播。这些observer之间相互不影响（不要有全局变量），它们虽然订阅同一个obserable，但是，它们仅仅是利用了observable的处理数据的能力，至于数据源、处理结果，都是独立的。

那什么是多播呢？就是一个有一个东西，可以被多个观察者同时订阅。这个时候要引进rxjs里面的Subject，它所创造的实例，能被多个观察者消费。代码说话：

```
let observable = Rx.Observable.create(function subscribe(obsever) {
  observer.next(1)
  observer.next(2)
})
let subject = new Rx.Subject()
subject.subscribe(v => console.log(v))
subject.subscribe(v => console.log(v))
observable.subscribe(subject)
```

这个代码和前面不一样的地方在于，observable被subject订阅，当subject被两个不同的observer订阅时，subject执行一次function subscribe，但是同时通知这两个observer。所以，当你得到的结果是：1,1;2,2时，应该一点都不觉得奇怪。在第一次执行next(1)的时候，两个observer同时被执行。