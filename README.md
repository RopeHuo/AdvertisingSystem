



##
```
*1. 找到/node_modules/sockjs-client/dist/sockjs.js *
*2.找到代码的 1605行  *
 try {
  //  self.xhr.send(payload); 把这里注掉
  } catch (e) {
    self.emit('finish', 0, '');
    self._cleanup(false);
  }
3.刷新，搞定。
```


```nginx
server {
    listen       80;
    server_name  app.jisale.com;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
       proxy_pass http://127.0.0.1:8010;
    }

   location /api {
       ##rewrite ^.+api/?(.*)$ /$1 break;
       proxy_pass   http://api2.jisale.com/api;
   }

   location /user {
       ## rewrite ^.+user/?(.*)$ /$1 break;
       proxy_pass   http://api2.jisale.com/user;
   } 
}
```
