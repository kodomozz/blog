![npm](../assets/npm.jpeg)

### NPM
NPM（node package manager),通常称为node包管理器，主要功能就是管理node包，包括：安装、卸载、更新、查看、搜索、发布等。NPM是基于couchdb一个数据库，详细记录了每个包的信息（作者、版本、依赖、授权信息等）。本文主要对npm的特殊用法和npm包结构做一些介绍

### npm 结构

npm 2 在安装依赖包时，采用简单的递归安装方法。执行 **npm install** 后，npm 2 依次递归安装 webpack 和 nconf 两个包到 node_modules 中。执行完毕后，我们会看到 ./node_modules 这层目录只含有这两个子目录。
进入更深一层 nconf 或 webpack 目录，将看到这两个包各自的 node_modules 中，已经由 npm 递归地安装好自身的依赖包。包括 ./node_modules/webpack/node_modules/webpack-core , ./node_modules/conf/node_modules/async 等等。而每一个包都有自己的依赖包，每个包自己的依赖都安装在了自己的 node_modules 中。依赖关系层层递进，构成了一整个依赖树，这个依赖树与文件系统中的文件结构树刚好层层对应。
最方便的查看依赖树的方式是直接在 app 目录下执行 **npm ls** 命令。

```
app@0.1.0
├─┬ nconf@0.8.5
│ ├── async@1.5.2
│ ├── ini@1.3.5
│ ├── secure-keys@1.0.0
│ └── yargs@3.32.0
└─┬ webpack@1.15.0
  ├── acorn@3.3.0
  ├── async@1.5.2
  ├── clone@1.0.3
  ├── ...
  ├── optimist@0.6.1
  ├── supports-color@3.2.3
  ├── tapable@0.1.10
  ├── uglify-js@2.7.5
  ├── watchpack@0.2.9
  └─┬ webpack-core@0.6.9
    ├── source-list-map@0.1.8
    └── source-map@0.4.4

```
**优点**

这样的目录结构优点在于层级结构明显，便于进行傻瓜式的管理。例如新装一个依赖包，可以立即在第一层 node_modules 中看到子目录。在已知所需包名和版本号时，甚至可以从别的文件夹手动拷贝需要的包到 node_modules 文件夹中，再手动修改 package.json 中的依赖配置。要删除这个包，也可以简单地手动删除这个包的子目录，并删除 package.json 文件中相应的一行即可

**缺点**

对复杂的工程, node_modules 内目录结构可能会太深，导致深层的文件路径过长而触发 windows 文件系统中，文件路径不能超过 260 个字符长的错误。部分被多个包所依赖的包，很可能在应用 node_modules 目录中的很多地方被重复安装。随着工程规模越来越大，依赖树越来越复杂，这样的包情况会越来越多，造成大量的冗余。
在我们的示例中就有这个问题，webpack 和 nconf 都依赖 async 这个包，所以在文件系统中，webpack 和 nconf 的 node_modules 子目录中都安装了相同的 async 包，并且是相同的版本。

```
+-------------------------------------------+
|                   app/                    |
+----------+------------------------+-------+
           |                        |
           |                        |
+----------v------+       +---------v-------+
|                 |       |                 |
|  webpack@1.15.0 |       |  nconf@0.8.5    |
|                 |       |                 |
+--------+--------+       +--------+--------+
         |                         |
   +-----v-----+             +-----v-----+
   |async@1.5.2|             |async@1.5.2|
   +-----------+             +-----------+

```

**npm@3 中采用扁平结构**
主要为了解决以上问题，npm 3 的 node_modules 目录改成了更加扁平状的层级结构。文件系统中 webpack, nconf, async 的层级关系变成了平级关系，处于同一级目录中。

```
         +-------------------------------------------+
         |                   app/                    |
         +-+---------------------------------------+-+
           |                                       |
           |                                       |
+----------v------+    +-------------+   +---------v-------+
|                 |    |             |   |                 |
|  webpack@1.15.0 |    | async@1.5.2 |   |  nconf@0.8.5    |
|                 |    |             |   |                 |
+-----------------+    +-------------+   +-----------------+

```

虽然这样一来 webpack/node_modules 和 nconf/node_modules 中都不再有 async 文件夹，但得益于 node 的模块加载机制，他们都可以在上一级 node_modules 目录中找到 async 库。所以 webpack 和 nconf 的库代码中 require('async') 语句的执行都不会有任何问题。
这只是最简单的例子，实际的工程项目中，依赖树不可避免地会有很多层级，很多依赖包，其中会有很多同名但版本不同的包存在于不同的依赖层级，对这些复杂的情况, npm 3 都会在安装时遍历整个依赖树，计算出最合理的文件夹安装方式，使得所有被重复依赖的包都可以去重安装。
npm 文档提供了更直观的例子解释这种情况：


```
// 假如 package{dep} 写法代表包和包的依赖，那么 A{B,C}, B{C}, C{D} 的依赖结构在安装之后的 node_modules 是这样的结构：
A
+-- B
+-- C
+-- D

```

### npm link
```
$ # 先去到模块目录，把它 link 到全局
$ cd path/to/my-utils
$ npm link
$
$ # 再去项目目录通过包名来 link
$ cd path/to/my-project
$ npm link my-utils
```

该指令还可以用来调试 node cli 模块，譬如需要本地调试我们的 egg-init，可以这样：
```
$ cd path/to/egg-init
$ npm link
$ # 此时全局的 egg-init 指令就已经指向你的本地开发目录了
$ egg-init # 即可
```
这里之所以 D 也安装到了与 B C 同一级目录，是因为 npm 会默认会在无冲突的前提下，尽可能将包安装到较高的层级。

```
// 如果是 A{B,C}, B{C,D@1}, C{D@2} 的依赖关系，得到的安装后结构是：
A
+-- B
+-- C
   `-- D@2
+-- D@1
// PS: 与本地依赖包不同，如果我们通过 npm install --global 全局安装包到全局目录时，得到的目录依然是“传统的”目录结构。而如果使用 npm 3 想要得到“传统”形式的本地 node_modules 目录，使用 npm install --global-style 命令即可。
```
这里是因为，对于 npm 来说同名但不同版本的包是两个独立的包，而同层不能有两个同名子目录，所以其中的 D@2 放到了 C 的子目录而另一个 D@1 被放到了再上一层目录。
很明显在 npm 3 之后 npm 的依赖树结构不再与文件夹层级一一对应了。想要查看 app 的直接依赖项，要通过 npm ls 命令指定 --depth 参数来查看：

```
npm ls --depth 1
```

### 卸载 link
```
$ npm unlink my-utils
```
### 内置的几个npm 命令

- start: 执行 npm start
- test: 执行 npm test
- stop: 执行 npm stop
- restart: 执行 npm restart。npm restart是一个复合命令，实际上会依次执行三个脚本命令：stop、restart、start。
- prerestart>prestop>stop>poststop>restart>prestart>start>poststart>postrestart

### pre 和 post hooks
双重的pre和post无效，比如prepretest和postposttest是无效的。

```
{
    "scripts":{
        'prexxx':,
        'xxx':,
        'postxxx':,
    }
}
```
执行npm run xxx后，默认执行顺序：npm run prexxx > npm run xxx > npm run postxxx
一些内置的命令如：start ,执行npm start，会默认执行： npm run prestart > npm run start > npm run poststart。

```
{
    "scripts":{
        "build:dev":"xxxx",//npm run build:dev
        "build:prod":"xxx"//npm run build:prod
    }
}
```

### 基本命令

`npm config list/ls` 显示配置信息
`npm config list/ls -l` 更详细
`npm -h` 显示帮助信息，建议多查看
`npm -l display full usage info` ; `-l is --long`
`npm <cmd> -h` 显示某个命令的帮助信息
`npm help npm`
`npm help <term>`

`npm config set prefix path` 修改npm全局安装目录
`npm config set cache path` 修改npm cache目录
把新的npm路径修改到系统环境变量中，才可生效
`npm config set registry='https://registry.npm.taobao.org/'` 设置npm资源镜像，加快下载安装速度，还有其他镜像

`npm ls` 显示工程目录下本地安装的包，`--depth=0`,显示初级依赖层次
`npm -g ls` 显示全局安装的包
`npm i/install --save xxx` 安装包信息将加入到dependencies（生产阶段的依赖）
`npm i/install --save-dev xxx` 安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它
`npm i --save-exact xxx` 精确安装包版本，package.json里的依赖包的value是具体的版本号，前边没有符号
`npm root` 查看包的安装路径,及node_modules的路径
`npm view modulename` 查看模块的package.json信息
`npm view moudleName dependencies` 查看包的依赖关系
`npm view moduleName repository.url` 查看包的源文件地址
`npm view moduleName engines` 查看包所依赖的node版本
`npm outdated` 检测显示过时的包
`npm update` 更新包
`npm uninstall` 卸载包
`npm init` 在项目中引导创建一个package.json文件

### npx
npx是npm的一个伴生命令，在npm5.2以上已经内置，可以直接使用，其它版本需要安装使用。

npx的主要功能是让我们可以在命令行管理操作npm依赖。

npx的执行顺序机制是首先会自动检查当前项目中的可执行依赖文件（即./node_modules/.bin下面的可用依赖），如果不存在就会去环境变量path中寻找，如果还没有就会自动安装，其安装的依赖位于node安装目录中的node_cache/_npx之中，所以安装的依赖只是临时的。

**用途**

1. 可以在命令行中直接执行项目中安装的依赖
比如要在命令行中使用webpack `npm install webpack -s-d`

```
第一种：根据路径来执行webpack的脚本：
./node_modules/.bin/webpack

第二种：使用 npm-run-script 的方式，在package.json的script字段里面执行操作：
首先在script字段定义命令
"script": {"webpack": "webpack"}
然后在命令行执行 npm run webpack
```
而使用npx就方便多了，可以直接这样:
```
npx webpack
```
2. 可以一次性安装临时使用某个依赖
比如我们只是想要一次性使用babel-cli来编译代码，并不想要在项目中安装它
```
    npx babel-cli test.js --presets=es2015,stage2
```

### npm 配置

npm cli 提供了 npm config 命令进行 npm 相关配置，通过 npm config ls -l 可查看 npm 的所有配置，包括默认配置。npm 文档页为每个配置项提供了详细的说明 https://docs.npmjs.com/misc/config .
修改配置的命令为 `npm config set <key> <value>`, 我们使用相关的常见重要配置:

- proxy, https-proxy: 指定 npm 使用的代理
- registry 指定 npm 下载安装包时的源，默认为 https://registry.npmjs.org/ 可以指定为私有 Registry 源
- package-lock 指定是否默认生成 package-lock 文件，建议保持默认 true
- save true/false 指定是否在 npm install 后保存包为 dependencies, npm 5 起默认为 true

删除指定的配置项命令为 `npm config delete <key>`

#### npmrc

除了使用 CLI 的 npm config 命令显示更改 npm 配置，还可以通过 npmrc 文件直接修改配置。
这样的 npmrc 文件优先级**由高到低**包括：

工程内配置文件: /path/to/my/project/.npmrc
用户级配置文件: ~/.npmrc
全局配置文件: $PREFIX/etc/npmrc (即npm config get globalconfig 输出的路径)
npm内置配置文件: /path/to/npm/npmrc

通过这个机制，我们可以方便地在工程跟目录创建一个 .npmrc 文件来共享需要在团队间共享的 npm 运行相关配置。比如如果我们在公司内网环境下需通过代理才可访问 registry.npmjs.org 源，或需访问内网的 registry, 就可以在工作项目下新增 .npmrc 文件并提交代码库。

```
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```

复制代码因为项目级 .npmrc 文件的作用域只在本项目下，所以在非本目录下，这些配置并不生效。对于使用笔记本工作的开发者，可以很好地隔离公司的工作项目、在家学习研究项目两种不同的环境。
将这个功能与 ~/.npm-init.js 配置相结合，可以将特定配置的 .npmrc 跟 .gitignore, README 之类文件一起做到 npm init 脚手架中，进一步减少手动配置。