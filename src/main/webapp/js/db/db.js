

var USER_NAME = null;



$(document).ready(function() {
	initDatabase();
	
//	dropTable("Document");
	
	USER_UUID = localStorage.getItem("USER_UUID");
	USER_NAME = localStorage.getItem("USER_NAME");
	
	console.log("get USER_NAME:"+USER_NAME);
	
	if(USER_NAME == null){
		
	}
	
});






 function getCurrentDb() {
	            //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
	            //如果数据库不存在那么创建之
	         var dataBase = openDatabase("ifreeshare", "1.0", "文档库", 1024 * 1024);
	            return dataBase;
	            
 }

 
 function dropTable(tablename) {
	 var db = getCurrentDb();//初始化数据库
     if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
	 db.transaction(
		    	function (trans) {//启动一个事务，并设置回调函数
		         //执行创建表的Sql脚本
		         trans.executeSql("drop table if  exists "+tablename,
		         		 [], function (trans, result) {
		        	 console.log("drop table if  exists "+ tablename+result);
		         }, 
		       	function (trans, message) {//消息的回调函数
		        	 alert(message);
		     }, function (trans, result) {
		    	 alert(result);
		     }, function (trans, message) {
		    	 alert(message);
		     });
		         
		    	 });
}
 
 
function initDatabase() {
	 var db = getCurrentDb();//初始化数据库
     if(!db) {alert("您的浏览器不支持HTML5本地数据库");return;}
     db.transaction(
    	function (trans) {//启动一个事务，并设置回调函数
         //执行创建表的Sql脚本
         trans.executeSql("create table if not exists Document(" +
         		"uuid text null," +
         		"name text null," +
         		"type text null," +
         		"thumb text null," +
         		"desc text null)", [], function (trans, result) {
        	 console.log("create table if not exists Document "+result);
         }, 
       	function (trans, message) {//消息的回调函数
        	 console.log(message);
     }, function (trans, result) {
    	 console.log(result);
     }, function (trans, message) {
    	 console.log(message);
     });
 });
     
}
     
     
     function addDocument(params) {
    	 var db = getCurrentDb();
         //执行sql脚本，插入数据
         db.transaction(function (trans) {
             trans.executeSql("insert into Document(uuid,name,type,thumb,desc) values(?,?,?,?,?) ", params, function (ts, data) {
            	 console.log("insert into Document data "+data);
             }, function (ts, message) {
            	 console.log("insert into Document data "+message);
             });
         });
	}
     
     
     function deleteDocument(uuid) {
    	 var db = getCurrentDb();
    	 var params = new Array();
    	 param[0] = uuid;
         //执行sql脚本，插入数据
         db.transaction(function (trans) {
             trans.executeSql("delete from Document where uuid = ?", params, function (ts, data) {
            	 console.log("delete from Document where uuid = " + uuid+data);
             }, function (ts, message) {
            	 console.log("delete from Document where uuid = " +uuid+message);
             });
         });
	}
     
     
     //显示所有数据库中的数据到页面上去
     function getDocuments(dataControll) {
         var db = getCurrentDb();
         db.transaction(function (trans) {
             trans.executeSql("select * from Document", [], function dataCon(ts, data) {
                 if (data) {
                     for (var i = 0; i < data.rows.length; i++) {
                    	 dataControll(data.rows.item(i));
                     }
                 }
             }, function (ts, message) {
            	 alert(message);
            	 var tst = message;
             });
         });
     }
	
