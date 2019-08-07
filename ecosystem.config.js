module.exports = {
  apps : [{
    name: 'BLOG',
    script: 'app.js',
    instances : 'max',
    exec_mode : 'cluster',
    autorestart: true,
    instances: 'max',
    output: './log/out.log',      //指定日志标准输出文件及位置
    error: './log/error.log',     //错误输出日志文件及位置，pm2 install pm2-logrotate进行日志文件拆分
    merge_logs: true,         //集群情况下，可以合并日志
    log_type:"json",          //日志类型
    log_date_format: "DD-MM-YYYY",  //日志日期记录格式
    max_memory_restart: '1G',
    watch: true,
    ignore_watch : ['.git', '.svn', 'node_modules/**/node_modules'],
    env: {
      NODE_ENV: 'production'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
};
