Ext.define('ExFrm.view.rec.rec013w_06Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec013w_06', 
    stores:{ 
    	ds_manageMgt :{
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC013W_06/selectMgt.suvila',
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