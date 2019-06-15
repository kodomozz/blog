### NPM shrinkwrap
npm shrinkwrap 是 npm 包管理器的一项功能。可以按照当前项目 node_modules 目录内的安装包情况生成稳定的版本号描述。shrinkwrap 文件的结构类似以下这种形式：
```
{
  "name": "A",
  "version": "1.1.0",
  "dependencies": {
    "B": {
      "version": "1.0.1",
      "from": "B@^1.0.0",
      "resolved": "https://registry.npmjs.org/B/-/B-1.0.1.tgz",
      "dependencies": {
        "C": {
          "version": "1.0.1",
          "from": "org/C#v1.0.1",
          "resolved": "git://github.com/org/C.git#v1.0.1"
        }
      }
    }
  }
}
```

重要的字段一个是 version（模块的版本），以及 resolved（模块的安装路径）。在工程中有 shrinkwrap 描述文件的情况下会遵循该 version 和 resolved 信息去安装。

### 为什么需要它
在没有 shrinkwrap 的项目中，任意一个依赖包都可能在开发者不知情的情况下发生改动，进而引发线上故障。

在一个 JavaScript 项目中，每次执行 npm install，最后生成的结果可能是不一样的。 譬如说现在某个项目依赖了模块 A, 虽然我们可以为它指定一个固定的版本号，然而 A 所依赖的其它模块版本使用的是 npm semver( 语义化版本 ) 规则（semantic version，npm 模块依赖默认遵循的规则）。它并不严格规定版本，而是选择符合当前 semver 规则的最新版本进行安装。

一个简单的例子：假如模块 A 中依赖了 B，并且在 A 的 package.json 中指定 B 的 semver 为 ~1.2.3，那么所有形式为 1.2.x 的版本都是符合规则的。当模块 B 更新了一个 1.2.x 的小版本后，项目在下次构建中就会获取到它。

semver 这样设计的初衷是使模块的开发者可以将 bugfix 等微小的改动能更便捷地到达使用方。但它的负面影响却是使每次 npm install 构建过程之间，项目内的模块内容随时可能发生改变。我们没法确定在每个模块内部，每一次小版本更新时究竟是加入了 bugfix，还是改变了 API，亦或是注入了恶意代码。

为了保证线上构建的稳定性，我们决定强制在每个 JavaScript 项目中添加 shrinkwrap。

### NPM 5 和 yarn的区别
npm5 本身有一个锁定版本号的文件 package-lock.json，但是目前发布平台还不支持。如果项目中有 npm-shrinkwrap.json，npm5 只会更新它，而不会生成 package-lock.json，所以不用担心。

yarn 的锁定版本文件叫 yarn.lock，目前发布平台是支持的，不过最好保证项目中只有一个版本锁定文件，npm-shrinkwrap.json 或者 yarn.lock 二选一，防止出现安装结果和预想不一致的情况。