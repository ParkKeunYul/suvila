Ext.define('ExFrm.view.com.memoModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.memo', 
    stores:{ 
    	ds_search:{
            fields:['field1'],
            data:[{
                CODE:'1', NAME:'제목'
            },{
            	CODE:'2', NAME:'내용'
            },{
            	CODE:'3', NAME:'제목+내용'
            }],
            autoLoad:true
        },
        ds_memoHis:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/MemoHis/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }				
            }			
            ,autoLoad:false      
        },
    }
});