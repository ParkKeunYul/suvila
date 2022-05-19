Ext.define('ExFrm.view.rec.rec022w_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec022w_05', 
    stores:{ 
    	ds_main :{
    		fields: ['SUB_DATE', 'AMOUNT1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC022W_05/select.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },        
        ds_templeUser :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/templeuser.suvila',
                reader:{
                	
                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_JGKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/jkindInfoId.suvila?V_ACCEPT_GBN=12',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_KindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/kindInfoId.suvila?V_ACCEPT_GBN=12',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_date:{
            fields:['field1'],
            data:[{
            	 CODE:'8'
                ,NAME:'일'
            },{
            	 CODE:'6'
                ,NAME:'월'
            },{
            	CODE:'4'
               ,NAME:'년'
            }],
            autoLoad:true
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