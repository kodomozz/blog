## npm 调试技巧

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

## 卸载 link
```
$ npm unlink my-utils
```
## 内置的几个npm 命令

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

基本命令

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