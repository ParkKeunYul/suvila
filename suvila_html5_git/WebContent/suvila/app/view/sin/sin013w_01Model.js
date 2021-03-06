Ext.define('ExFrm.view.sin.sin013w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin013w_01', 
    stores:{ 
    	ds_main:{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN013W_01/select.suvila',
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
    }
});