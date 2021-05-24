学习Node开发服务器  Mysql开发数据库
# 动态接口 moment
### 修改动态
1.用户授权验证  登录了才能修改
2.权限验证      只能修改自己的动态
3.修改sql

### 删除动态
同上

# 评论接口 comment
### 发表评论
1.用户授权验证
2.sql注入

# 上传头像接口 
建表 avatar 
id 

# 保存图片到本地  /upload/avatar

# 添加动态图片
接口  /upload/picture?momentId=1   body = {file,file}

保存图片  upload/moment

添加保存图片的表 file  外键momentId  userId

保存到文件表中

# 获取动态图片接口 /moment/igms/momentId