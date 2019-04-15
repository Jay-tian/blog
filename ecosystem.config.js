module.exports = {
  apps : [{
    script: 'app.js',
    instances : 'max',
    exec_mode : 'cluster',
    autorestart: true,
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
