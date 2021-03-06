Ext.define('ExFrm.view.asp.asp044w_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp044w_05', 
    stores:{ 
    	ds_templeCd:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/TempleSearch/TempleCode.suvila',
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
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=CMS_ACC_STAT',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
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
        ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/ASP044W_05/selectCmsInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_rec:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/ASP044W_03/selectRec.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        
        ds_search:{
            fields:['field1'],
            data:[{
            	 CODE:'bud_no'
                ,NAME:'????????????'
            },{
           	 	CODE:'name_kor'
               ,NAME:'?????????'	
            }],
            autoLoad:true
        },
        ds_del:{
            fields:['field1'],
            data:[{
            	 CODE:''
                ,NAME:'??????'
            },{
           	 	CODE:'T'
               ,NAME:'???'
            },{
           	 	CODE:'F'
               ,NAME:'?????????'	
            }],
            autoLoad:true
        },
        ds_del2:{
            fields:['field1'],
            data:[{
           	 	CODE:'T'
               ,NAME:'???'
            },{
           	 	CODE:'F'
               ,NAME:'?????????'	
            }],
            autoLoad:true
        },
        
    }
});