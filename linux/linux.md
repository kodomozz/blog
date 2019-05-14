### 创建文件的软链接
`cp -s 源文件 目标文件`

### 创建文件的硬链接
`cp -l 源文件 目标文件 `

### 只有源文件较目标文件新时复制。

`cp -u 源文件 目标文件`

### 复制源文件夹到目标文件夹下。

`cp -r 源文件夹 目标文件夹`

### 同时复制多个文件到目标文件（夹）下。

```cp 源文件1 源文件2 目标文件夹 或 cp 文件* 目标文件夹```

### 复制一个源文件到目标文件（夹）。

`cp 源文件 目标文件（夹)`

### 白名单
`vi /etc/sysconfig/iptables`

`/etc/init.d/iptables restart`

### nginx 启动
`/etc/init.d/nginx restart`

###  外网ip
`curl ifconfig.me`