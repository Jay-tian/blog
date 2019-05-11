# blog
## 安装
```
yarn
yarn global add pm2
npm run dev
``` 

## 执行数据库脚本
```
yarn global add sequelize
sequelize   db:migrate
```

## nginx 配置
```
server {
    server_name www.blog-dev.com;

    location ~ ^/dist/* {
        if (-f /var/www/blog/dev.lock){
          proxy_pass http://127.0.0.1:8020;
        }
     }

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }
}
```

## 安装 ImageMagick
```
    安装说明： http://www.imagemagick.org/script/install-source.php
    wget -c https://imagemagick.org/download/ImageMagick.tar.gz
    tar xvzf ImageMagick.tar.gz
    cd 解压目录
    ./configure
    make
    sudo make install
    sudo ldconfig /usr/local/lib
    /usr/local/bin/convert logo: logo.gif
```

1. 个人主页
3. redis
5. 估点扑克
6. 二维码生成
7. 校验码
8. websocket
10. 文件处理能力，压缩，解压
11. csrf token
12. 数据库读写分离，分库分表
13. 页面作者模块
14. 标签模块
15. 回到顶部
17. 天气预报
18. app正则表达式
20. cluster (集群)
21. 主从备份
22. 压力测试
23. lodash
24. 定时任务
25. 音频播放：防止下载，ui