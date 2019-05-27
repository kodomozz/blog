## sudo
通常 ‘Permission denied’ 错误的时候,需要执行 sudo 命令. 该命令会提高执行权限(通常是 root). 当然 使用 sudo -u username 会指定特定用户. 
并不是所有的用户都可以执行 sudo 命令, 只有在 sudoers file 中存在的用户才能执行. 具体请看这里: sudoers file

编辑 sudoers file 时建议使用 visudo :

## sudo visudo
1
visudo 会在其他用户编辑时锁定改文件,并进行语法检查.操作是安全的. 我之前有次直接编辑 sudoers file ,就给sudo搞坏了 2333

su
su 命令
su 命令可以在一个登陆 session 下切换不同用户(通常是root).意思就是不需要退出当前用户的登录而切换到新用户.

## su username
1
username 为空默认切换到root用户. 输入要登录用户密码即可.



## su - 命令
另一种切换root用户的方法就是 su - 
- 必须作为 su 的最后一个参数. 而 -l -login 没有该限制


su 和 su -
su 和 su - 进入的目录是不一样的
su 会保持前者的用户环境, 而 su - 会新建一个目的用户的环境
su 会保持当前用户的环境, 因为在某些情况下, 使用当前用户比管理员账户能更好的解决问题. 比如重现或者debug问题时,在当前用户环境下更高效
当然 su 在很多情况下是不建议使用的, 或者说是相当危险的. 因为 root 用户要在当前用户的环境下操作, 而不是自己的环境. 因为这会给非 root 用户 更改系统文件或数据的权限
su -c
该命令可以允许添加要执行的命令

su [target-user] -c [command-to-run]
1
当前的shell会在 /etc/passwd 文件中替换 ‘target-user’ shell

## sudo 和 su
差别一
最大的不同就是所需要的密码不同: sudo 需要的是当前用户的密码,而 su 命令需要的是 管理员的密码. 
所以, sudo 命令比 su 命令更安全. su 命令需要其他用户也知道 root 密码, 而 sudo 只需要配置 sudoers file 即可, 而且可以随时删除特定用户的权限.

差别二
另一个不同就是, sudo 仅仅是提高当前执行命令的权限. 而 su 命令可以执行 root 的所有权限. 所以在一定意义上讲, su 命令还是很危险的. 比如 rm -rf 2333

## sudo su 命令
由于执行 su 命令存在风险,所以 Linux 一些系统,比如Ubuntu,默认禁掉了 root 用户. 然而使用 sudo su 命令仍然可以获取root.

P.S. 如果想开启root用户的话(当然不建议), 可以执行以下命令: 
“` 
sudo passwd root

建议
由于 su 命令风险比较大,建议将系统的 su 更换成 su -l

alias su="su -l"
--------------------- 
作者：大大大大大桃子 
来源：CSDN 
原文：https://blog.csdn.net/soindy/article/details/73832025 
版权声明：本文为博主原创文章，转载请附上博文链接！