
### 功能说明
./gulpAll.js通过requireDir输出task文件夹中的所有gulp任务

包含一些常用的工作:
* 静态服务器,并监听文件变化
* 转化合并seajs文件
* 转化react
* 提取jpg文件


### 文件说明
    task.out.list    | 各个子task             
    task.project     | 项目层级的task         
    temp             | 测试目录               
    temp.seajs       | 测试目录seajs          
    gulp-showdown.js | showmarkdown gulp 插件 
    gulpout.js       | 总输出                 


### 使用说明
```
npm link
gulpout -m server
```