- 使用cat 输出文件
```shell
tar -zcvf - ./ | ssh posp@192.168.x.x "cat >/home/xx/xxx.tar.gz"
```
- 使用dd生成文件
```shell
tar -zcvf - ./ |ssh posp@192.168.x.x "dd of=/home/xx/xxx.tar.gz"
```
- 传输完直接解压
```shell
tar -zcvf - ./ |ssh posp@192.168.x.x "tar -zxvf - -C /home/xx"
```