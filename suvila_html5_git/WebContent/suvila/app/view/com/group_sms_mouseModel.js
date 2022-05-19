Ext.define('ExFrm.view.com.group_sms_mouseModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.group_sms_mouse', 
    stores:{
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',  
                url:'/sin/SIN011W_01/selectBudNo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                
                }
            },
            autoLoad:false            
        },
        ds_main_temp:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                
                }
            },
            autoLoad:false            
        },
        ds_sms_doc:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN011W_01/selectSmsDoc.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_smsItem:{
            fields:['field1'],
            data:[{
            	CODE:'', VALUE:'선택'
            },{
            	CODE:'TEMPLE_NM', VALUE:"[사찰명]"
            },{
            	CODE:'NAME_KOR', VALUE:"[이름]"
            }],
            autoLoad:true
        },
        ds_sms:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
    }
});