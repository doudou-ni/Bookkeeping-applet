# Bookkeeping-applet
记账小程序  
一、	实验项目需求  
1、首页包含记账列表明细和添加记账数据；  
2、记账列表明细至少要求5条账单数据；  
3、记账列表明细需要按月份显示该月份的总支出、总收入、账单数量和该月份一天的账单数据；  
4、允许记账列表明细长按进行删除某条账单记录；  
5、添加记账数据要分为支出和收入；  
6、允许添加删除支出或者收入的分类；  
7、添加弹窗需要点击弹窗外的范围会关闭弹窗。  

二、实验报告内容


1）项目流程图：

![image](https://user-images.githubusercontent.com/103476625/174425084-1ef80e70-d172-4941-971f-f8a6d20ab69c.png)  

2）明细页面：  
 1、显示该月份的总支出，总收入，账单数量和账单列表
 
 ![image](https://user-images.githubusercontent.com/103476625/174425118-12572bc5-1928-43b8-b1d7-c6cf0339e64b.png)  

 2、选择不同的年份和月份会显示对应的账单列表
 
 ![image](https://user-images.githubusercontent.com/103476625/174425143-43eefa19-5e18-454b-b05e-c754c326ddf1.png)  

3）添加页面：  
 1、分为支出和收入两部分，可添加分类
     
 ![image](https://user-images.githubusercontent.com/103476625/174425150-1860877f-809a-44ed-8cc3-bd7c14b9029c.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425153-54917725-979b-4d04-9992-25c0504c6c9b.png)  

 2、点击添加按钮会弹出添加弹窗，输入自己想要的类别名称点击保存就会添加该类别，如果点击取消或者点击弹窗之外的范围就会关闭弹窗并且不会添加类别，输入空值会有“输入空值”的提示。
       
 ![image](https://user-images.githubusercontent.com/103476625/174425156-bd0c9425-c37a-40b1-ab17-e559d38d3e64.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425168-9cebb50d-8af2-456e-8f0b-991007ff7bed.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425167-8f439d51-fa2a-4f04-8f28-c9ae673b7cb9.png)  

 3、对某类别进行长按会有“是否要删除（该类别名称）吗”的提示，点击确定则进行删除该类别，点击取消则并不会进行任何操作，删除后的页面如下图。
    
 ![image](https://user-images.githubusercontent.com/103476625/174425340-94f43e05-476b-4841-8579-1c40a13df151.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425342-d04a15f7-e68b-4b5c-b2ac-55517808420b.png)  

 4、选择需要的类别，会出现一份表单，输入金额、更改分类、选择支付（收款）方式、选择日期、输入备注等操作，不填写金额就点击保存会有“请输入金额”的提示，如果输入的金额不符合规范会有“请输入正确的金额”的提示。 进行正确的操作之后，点击保存会转跳到明细页面并更新列表，点击取消或者点击表单之外的范围就会关闭表单并且不会转跳页面。
       
 ![image](https://user-images.githubusercontent.com/103476625/174425347-5a34a2ed-f958-4d95-902c-0843193a5cda.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425350-1d586533-54b4-4560-b6fc-20a5b528bc9b.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425355-b110fa5a-7d39-4293-92d8-451af563e8a3.png)  

 5、下面的提交表单前和提交表单后的账单列表
     
 ![image](https://user-images.githubusercontent.com/103476625/174425376-e4553ad2-da5b-48ca-9b10-407d82a57e0e.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425378-1c053e09-0f07-4cec-8a45-b4d9f4a6a065.png)  

3、对某条账单进行长按，会有“是否删除这条记录”，点击确定则对该记录进行删除，点击取消则不会进行操作。下面是对2022-05-17，购物，金额-1这一条记录进行删除，删除后的页面如下图
      
 ![image](https://user-images.githubusercontent.com/103476625/174425399-75663a68-31c8-4ee3-9917-0628dc50ce60.png)
 ![image](https://user-images.githubusercontent.com/103476625/174425404-a42a2887-1c4c-41d9-a515-b0c7b7033d23.png)  

三、核心代码：  

1.滑块页面自适应高度，避免页面头部部分会随内容往下滑动
 
![image](https://user-images.githubusercontent.com/103476625/174425415-b38ea149-5fa7-4a22-b7d3-46812450fe4d.png)  


2.利用正则表达式检测所输入的金额是否符合规范是否正确
 
![image](https://user-images.githubusercontent.com/103476625/174425424-b41dee9f-33d2-488c-aeba-108408440a0a.png)  


3.创建数据库集合，对返回的表单数据以及一些辅助数据进行添加存储

 ![image](https://user-images.githubusercontent.com/103476625/174425427-44b634d1-0849-441d-bb60-5e00ee01b03f.png)  

4.将获得的年月日进行格式化，转换成yyyy-mm-dd的格式
 
 ![image](https://user-images.githubusercontent.com/103476625/174425436-aa75178d-de60-48a1-ba0f-f2311304a754.png)  

5.对获取到数据库集合中的数据进行格式化，返回需要的格式，返回列表中同一天可以显示多条数据，排列顺序按日期降序排列，可以计算出一个月的总支出和总收入以及某天的总支出和总收入
 
![image](https://user-images.githubusercontent.com/103476625/174425444-884ec6f4-75bb-4541-8689-48feb78760a1.png)  

6.对数据库集合进行模糊搜索，将获取到的数据进行格式化数据再进行保存到setData中
 
 ![image](https://user-images.githubusercontent.com/103476625/174425448-203fc075-2875-41eb-b51f-73ddc31a291b.png)
![image](https://user-images.githubusercontent.com/103476625/174425450-5c8287f6-60e0-4511-b8f6-cd661555ca20.png)  
