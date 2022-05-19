Ext.define('ExFrm.view.rec.rec024w_07Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec024w_07', 
    stores:{ 
    	ds_main :{
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC024W_07/selectPrayMgt.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_amount_mgt :{
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC024W_07/selectPrayPriceMgt.suvila',
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