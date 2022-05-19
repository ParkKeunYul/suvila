Ext.define('ExFrm.view.rec.rec004w_06Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec004w_06', 
    stores:{ 
    	ds_main :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_06/selectDetail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_print_org :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_06/selectDetail1.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        }, 
        ds_pray :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_06/selectDetail2.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        }, 
        ds_sub :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_06/selectSpirit.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },       
        ds_chonhonKind :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_02/kindInfo.suvila?V_OPTION=ALL',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_approv :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=APPROV',
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
        ds_date:{
            fields:['field1'],
            data:[{
            	 CODE:'accept'
                ,NAME:'접수일'
            },{
            	 CODE:'event'
                ,NAME:'입제일'            
            }],
            autoLoad:true
        },
        ds_closeYn:{
            fields:['field1'],
            
            data:[{
            	CODE:'', NAME:'전체'            
            },{
            	CODE:'F', NAME:'사용중'
            },{
                CODE:'T', NAME:'마감'
            }],
            autoLoad:true
        },
        ds_chonhon :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
    }
});