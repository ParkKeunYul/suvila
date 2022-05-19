Ext.define('ExFrm.view.cms.cms001w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cms001w_01',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS001W_01/selectSindoCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                  //  totalProperty:'data.listTotalSize',
                   // totalProperty:'data.totalCount',
                    keepRawData:true
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
           // ,pageSize:100
        },
        ds_SubInfo:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS001W_01/selectSindoCmsRecInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_reg_gbn:{
        	fields:['CODE'],fields:['NAME'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=REG_GBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_mobile_telno1:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=MOBILE',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:false
                }				
            }			
            ,autoLoad:false      
        },
        ds_if_payment_bank_cd:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=BANK',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_cms_payment_day:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=TRAN_WISH_DATE',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_cms_account_status:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=CMS_ACC_STAT',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_cms_account_status2:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=CMS_ACC_STAT&txtType=all',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_temple_CMS_info:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS001W_01/selectTempleCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_pageSize:{
        	fields:['field1'],
        	data:[{
        		value:'10'    , display:'10개'
        	/*},{
                value:'25'    , display:'25개'*/
        	},{
                value:'50'    , display:'50개'
            },{
                value:'100'    , display:'100개'            
            },{
                value:'9999999'    , display:'전체'
            }],
        	autoLoad:true
        },
        ds_use_yn:{
        	fields:['field1'],
            
            data:[{
                value:'F', display:'아니오'
            },{
                value:'T', display:'예'
            }],
            autoLoad:true    
        },
    }// sotres
});