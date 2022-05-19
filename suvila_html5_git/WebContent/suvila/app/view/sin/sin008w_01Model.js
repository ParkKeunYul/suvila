Ext.define('ExFrm.view.sin.sin008w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin008w_01', 
    stores:{ 
    	ds_main :{
         	proxy:{
                 type:'ajax',
                 url:'/sin/SIN008W_01/smsAlarmSelect.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_smsDoc :{
         	proxy:{
                 type:'ajax',
                 url:'/sin/SIN008W_01/smsDocSelect.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_smsItem :{
         	proxy:{
                 type:'ajax',
                 url:'/sin/SIN008W_01/smsColSelect.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_yn:{
            fields:['field1'],
            
            data:[{
                CODE:'T', NAME:'예'
            },{
            	CODE:'F', NAME:'아니오'
            }],
            autoLoad:true
        },
        /*ds_acceptGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=REC',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },*/
    }
});