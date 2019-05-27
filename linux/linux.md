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

### ls
// 显示不隐藏的文件与文件夹

![image](https://upload-images.jianshu.io/upload_images/922014-d819d8fc5381cee5.png?imageMogr2/auto-orient/)

### ls -a  
// 显示当前目录下的所有文件及文件夹包括隐藏的.和..等

![image](https://upload-images.jianshu.io/upload_images/922014-efd0e1fde962092a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

### ls -l    
//显示不隐藏的文件与文件夹的详细信息

![image](https://upload-images.jianshu.io/upload_images/922014-812baa2d4cda0605.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

ls -al 
// 显示当前目录下的所有文件及文件夹包括隐藏的.和..等的详细信息

![image](https://upload-images.jianshu.io/upload_images/922014-ec87da689f171f62.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)


## less

less	向上翻页	向下翻页
一页	b (back)	空格
半页	u (undo)	d (down)
一行	y (...)	回车


块选择(Visual Block)

Vim的大部分命令都是以行为单位的，有时候想要删除、粘贴或复制特定区域，那么如何搞定一块范围呢？

一般模式下，块选择的按键意义

v

字符选择，将光标经过的字符选择

V

行选择，将光标经过的行选择

[Ctrl]+v

矩形选择，可以用矩形的方式选择数据

y

将选中地方复制起来

d