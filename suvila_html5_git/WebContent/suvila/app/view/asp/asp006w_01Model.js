Ext.define('ExFrm.view.asp.asp006w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp006w_01',  
    stores:{ 
        ds_gbn :{
            data:[{
                value:'M', display:'메뉴'
            },{
                value:'P', display:'프로그램'
            }],
            autoLoad:true
        },
        ds_alarmItem:{
        	fields:['CODE'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=SMSREC',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_table:{        	
        	fields:['CODE'],
            proxy:{
                type:'ajax',
                url:'/asp/asp006w_01/selectTable.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_alarmItemMgt:{
        	 proxy:{
        		 type:'ajax',
                 url:'/asp/asp006w_01/selectItem.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list',
                     keepRawData:true
                 }	
        	 }
        	,autoLoad:false
        },
        ds_column:{
	       	 proxy:{
	       		 type:'ajax',
	                url:'/asp/asp006w_01/selectColumn.suvila',
	                reader:{
	                    type:'json',
	                    rootProperty:'data.list',
	                    keepRawData:true
	                }	
	       	 }
	        ,autoLoad:false
       }
        
        
    }// sotres
});