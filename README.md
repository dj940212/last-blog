# Last Blog

> 一个仿GitHub风格的个人博客,可在线编辑,支持Markdown语法

### [点此预览](http://blog.dingjian.name)

## 启动项目

``` js
# clone
git clone git@github.com:dj940212/vue-blog.git

# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## 添加配置文件

> 在`~/server/config`下创建一个`index.js`文件,用于存放密码账号等敏感数据

```
export default {
	db: 'mongodb://username:password@ip:port/database',
	user: {
        username: 'username',
        password: 'password'
    }
}
```

## 功能预览

![](https://user-gold-cdn.xitu.io/2017/11/4/746fc718ffa7894c4aed7d7036f4109c)
![](https://user-gold-cdn.xitu.io/2017/11/4/ba43484c281eb20b82c1d92f302fb78c)

## 预计实现功能

- [x] 在线Markdown编辑器

- [x] Markdown工具条

- [x] 在线新增,修改,删除文章

- [x] 活跃度表格

- [x] 导入本地markdown文件

- [x] 代码高亮

- [x] 标签系统

- [ ] 个人信息面板

- [ ] 文章浏览量

- [ ] 操作日志列表

- [ ] 文章搜索

- [ ] 评论

- [ ] 消息管理
