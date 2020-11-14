配置centos7
```bash
docker pull centos:7
docker run -itd --name pvpgn centos:7 /bin/bash
docker exec -it pvpgn /bin/bash
```
安装cmake
- 准备环境
```bash
yum -y install gcc gcc-c++ openssl openssl-devel tar
```
- 获取源码，并解压
```bash
wget https://github.com/Kitware/CMake/releases/download/v3.17.0/cmake-3.17.0.tar.gz
tar -zxf cmake-3.17.0.tar.gz
cd cmake-3.17.0
```
- 编译安装
```bash
./bootstrap --prefix=/usr --datadir=share/cmake --docdir=doc/cmake && make
sudo make install
cmake --version
```

开始安装pvpgn  
```bash
sudo yum -y install epel-release centos-release-scl
# 可以在本地先克隆好项目，就不需要再安装git了
sudo yum -y install git zlib-devel cmake3 devtoolset-9-gcc*
git clone https://github.com/pvpgn/pvpgn-server.git
cd pvpgn-server
CC=/opt/rh/devtoolset-9/root/usr/bin/gcc CXX=/opt/rh/devtoolset-9/root/usr/bin/g++ cmake -G "Unix Makefiles" -H./ -B./build
cd build && make
```