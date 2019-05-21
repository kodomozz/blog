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
