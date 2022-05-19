Ext.define('ExFrm.view.sin.sin009w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin009w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN009W_01/selectScLog.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }			
            }
            ,autoLoad:false
        },
        ds_smsrec:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=SMSREC',
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