Ext.define('ExFrm.view.rec.rec022w_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec022w_03', 
    stores:{ 
    	ds_detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC022W_03/selectWonbulRec.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_DongChamJa :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/selectDC.suvila',
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
        ds_yn_gbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=YN',
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
                ,NAME:'접수일'
            },{
            	 CODE:'2'
                ,NAME:'납부월'            
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