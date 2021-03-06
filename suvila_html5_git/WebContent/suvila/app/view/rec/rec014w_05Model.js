Ext.define('ExFrm.view.rec.rec014w_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec014w_05', 
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
        ds_youngtop_youngga :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC014W_00/selectYoungTopYounggaSpir.suvila',
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
        ds_death_equal :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=DEATH_EQUAL',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_death_spiritual :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=SPIRITUAL_GBN',
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
        ds_hyo_bon :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/CodeSearchBonSelect.suvila?group_cd=BON',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
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
        },
        ds_hyo_rel:{
            fields:['field1'],
            
            data:[{
            	CODE:'', NAME:'??????'
            },{
                CODE:'?????????', NAME:'?????????'
            },{
            	CODE:'?????????', NAME:'?????????'
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