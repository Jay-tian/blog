# blog
## 安装
```
npm run dev
``` 

## nginx 配置
```
server {
    server_name www.koa-easy.com;

    location ~ ^/dist/* {
        if (!-f /var/www/blog/dev.lock){
          proxy_pass http://127.0.0.1:3000;
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

