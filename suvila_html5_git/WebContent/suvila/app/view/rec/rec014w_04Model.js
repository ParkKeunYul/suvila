Ext.define('ExFrm.view.rec.rec014w_04Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec014w_04', 
    stores:{ 
    	ds_detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC014W_00/selectYoungTopDetail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_MisuAmt :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC004W_04/selectMisu.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_jungak :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC014W_00/selectJungak.suvila?V_JUNGAK_ALL_YN=Y&V_ACCEPT_GBN=14',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
    	ds_payState :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=PAYSTATE',
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
        ds_classMgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/sindoClassMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_death_gender :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=DEATH_SEXGBN',
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
            	 CODE:'1'
                ,NAME:'?????????'
            },{
            	 CODE:'2'
                ,NAME:'?????????'
            },{
           	 	CODE:'3'
               ,NAME:'?????????'
            },{
           	 	CODE:'4'
               ,NAME:'????????????'
            }],
            autoLoad:true
        },
        ds_yn:{
            fields:['field1'],
            
            data:[{
                CODE:'T', NAME:'???'
            },{
            	CODE:'F', NAME:'?????????'
            }],
            autoLoad:true
        },
        ds_closeYn:{
            fields:['field1'],
            
            data:[{
            	CODE:'', NAME:'??????'            
            },{
            	CODE:'F', NAME:'?????????'
            },{
                CODE:'T', NAME:'??????'
            }],
            autoLoad:true
        },
        ds_submit:{
            fields:['field1'],
            
            data:[{
            	CODE:'', NAME:'??????'            
            },{
            	CODE:'F', NAME:'?????????'
            },{
                CODE:'T', NAME:'??????'
            }],
            autoLoad:true
        }
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