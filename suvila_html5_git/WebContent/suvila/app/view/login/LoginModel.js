Ext.define('ExFrm.view.login.LoginModel', 
{ 
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.login', 
    stores:{
    	adminInfo :{
           	fields:['field1'],
           	proxy:{
                   type:'ajax',
                   url:'/login/session_check.suvila',
                   reader:{
                       type:'json',
                       rootProperty:'data.list'                    
                   }
               },
               autoLoad:false
         },      
    }
});