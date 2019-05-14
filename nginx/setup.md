## Nginx

### 命令
- Iptables -L 查看
- iptables -F 关闭

- getenforce 查看是否是开启的
- setenforce 0 关闭

- yum 安装生成的都是rpm包
- rpm -ql ginx

- etc 核心配置

- /etc/nginx/nginx.conf 主要配置
- /etc/nginx/conf.d/default.conf 没有变更的条件下会读取，默认
- systemctl restart nginx.service 关闭服务重启
- systemctl reload nginx.service  不关闭服务
```
模块位置

/usr/lib64/nginx/modules
/etc/nginx/modules 

Nginx 启动服务的管理终端命令

/usr/sbin/nginx
/usr/sbin/nginx-debug

Nginx 缓存目录

/var/cache/nginx

日志的目录

/var/log/nginx 

Nginx -V 版本 可以查看启动的模块

访问目录

—http-log-path=/var/log/nginx/access.log

```
默认访问
 / usr / share / nginx / html
 里面有404 500 等错误页面
### 详细配置

- Pid 记录nginx 启动进程时的pid 存放的目录
- pid /run/nginx.pid;
- worker_connections  每个进程允许最大连接数
- use 工作进程数

### http
 request 
 请求行、请求头部、请求数据
 response
 状态行、消息报头、响应正文

 curl 相当于浏览器的url
 curl -V 可以看到详细的信息
 curl http://www.baidu.com


1.service命令
service命令其实是去/etc/init.d目录下，去执行相关程序 
```
# service命令启动redis脚本
service redis start
# 直接启动redis脚本
/etc/init.d/redis start
# 开机自启动
update-rc.d redis defaults
```
### systemctl命令
systemd是Linux系统最新的初始化系统(init),作用是提高系统的启动速度，尽可能启动较少的进程，尽可能更多进程并发启动。
systemd对应的进程管理命令是systemctl
systemctl命令兼容了service
即systemctl也会去/etc/init.d目录下，查看，执行相关程序
```
systemctl redis start
systemctl redis stop
# 开机自启动
systemctl enable redis
```

相关命令
```
nginx -s reload  ：修改配置后重新加载生效
nginx -s reopen  ：重新打开日志文件
nginx -t -c /path/to/nginx.conf 测试nginx配置文件是否正确

关闭nginx：
nginx -s stop  :快速停止nginx
         quit  ：完整有序的停止nginx

其他的停止nginx 方式：

ps -ef | grep nginx

kill -QUIT 主进程号     ：从容停止Nginx
kill -TERM 主进程号     ：快速停止Nginx
pkill -9 nginx          ：强制停止Nginx


启动nginx:
nginx -c /path/to/nginx.conf

平滑重启nginx：
kill -HUP 主进程号
```

nginx 模块
- 官方模块
- 第三方模块
> --with 就是nginx中的模块

--with-http_random_index_module   目录中选择一个随机主页
```
syntax: random_index on | off;
Default: random_index off;
Context: location
```

--with-http_sub_module
http内容替换
```
Systax: sub_filter string replacement
Default: --
Context: http, server, location
```

nginx 的请求限制

链接频率限制 - limit_conn_module
请求频率限制 - limit_req_module

链接限制
```
Syntax: limit_conn_zone key zone=name:size;
Default: --
Context: http

Syntax: limit_conn zone number
Default: --
Context: http, server, location
```

请求限制

```
Syntax: limit_req_zone key zone=name:size rate=rate;
Default: --
Context: http

Syntax: limit_req_zone=name [burst=number] [nodelay];
Default: --
Context: http, server, location
```
$binary_remote_addr 存储空间小相比于 $remote_addr

> ab 压力测试工具 


访问限制

http_access_module

```
Syntax: allow address | CIDR | unix | all
Default: --
Context: http, server, location, limit_except

Syntax: deny address | CIDR | unix: | all;
Default: --
Context: http, server, location, limit_except
```

静态资源服务器
```
Syntax: sendfile on| off;
Default: sendfile off;
Context: http, server, location, if in location
```

```
Syntax: tcp_nopush on| off;
Default: tcp_nopush off;
Context: http, server, location, location
```
作用： sendfile 开启的情况下， 提高网络包的传输效率

```
Syntax: gzip on| off;
Default: gzip off;
Context: http, server, location, if in location
```
作用： 传输压缩

扩展模块
http_gzip_static_module 预读gzip功能 （有zip会优先加载zip）