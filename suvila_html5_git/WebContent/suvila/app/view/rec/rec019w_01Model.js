Ext.define('ExFrm.view.rec.rec019w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec019w_01', 
    stores:{
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
        ds_mgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC019W_01/kindInfo.suvila',
                reader:{                	                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_detail :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC019W_01/selectDetail.suvila',
                reader:{                	                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_user :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC019W_01/selectUser.suvila',
                reader:{                	                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
    }
});