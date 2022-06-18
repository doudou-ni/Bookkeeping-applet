# Bookkeeping-applet
记账小程序
三、	实验项目需求
1、首页包含记账列表明细和添加记账数据；
2、记账列表明细至少要求5条账单数据；
3、记账列表明细需要按月份显示该月份的总支出、总收入、账单数量和该月份一天的账单数据；
4、允许记账列表明细长按进行删除某条账单记录；
5、添加记账数据要分为支出和收入；
6、允许添加删除支出或者收入的分类；
7、添加弹窗需要点击弹窗外的范围会关闭弹窗。

四、实验报告内容


项目流程图： 



 








明细页面：
显示该月份的总支出，总收入，账单数量和账单列表
 

选择不同的年份和月份会显示对应的账单列表
 


添加页面：
分为支出和收入两部分，可添加分类
     


点击添加按钮会弹出添加弹窗，输入自己想要的类别名称点击保存就会添加该类别，如果点击取消或者点击弹窗之外的范围就会关闭弹窗并且不会添加类别，输入空值会有“输入空值”的提示。
       



对某类别进行长按会有“是否要删除（该类别名称）吗”的提示，点击确定则进行删除该类别，点击取消则并不会进行任何操作，删除后的页面如下图。
    

选择需要的类别，会出现一份表单，输入金额、更改分类、选择支付（收款）方式、选择日期、输入备注等操作，不填写金额就点击保存会有“请输入金额”的提示，如果输入的金额不符合规范会有“请输入正确的金额”的提示。
进行正确的操作之后，点击保存会转跳到明细页面并更新列表，点击取消或者点击表单之外的范围就会关闭表单并且不会转跳页面。
       


下面的提交表单前和提交表单后的账单列表
     




对某条账单进行长按，会有“是否删除这条记录”，点击确定则对该记录进行删除，点击取消则不会进行操作。下面是对2022-05-17，购物，金额-1这一条记录进行删除，删除后的页面如下图
      



核心代码：

滑块页面自适应高度，避免页面头部部分会随内容往下滑动
 


利用正则表达式检测所输入的金额是否符合规范是否正确
 


创建数据库集合，对返回的表单数据以及一些辅助数据进行添加存储

 










将获得的年月日进行格式化，转换成yyyy-mm-dd的格式
 

对获取到数据库集合中的数据进行格式化，返回需要的格式，返回列表中同一天可以显示多条数据，排列顺序按日期降序排列，可以计算出一个月的总支出和总收入以及某天的总支出和总收入
 


对数据库集合进行模糊搜索，将获取到的数据进行格式化数据再进行保存到setData中
 
 