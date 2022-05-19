Ext.define('ExFrm.view.asp.asp010w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp010w_01',  
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
            ,autoLoad:true      
        },
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp010w_01/selectCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_payDay:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp010w_01/selectPaymentDay.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_payment_day_gbn :{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=CMS_PAYMENT_DAY_GBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false
        },
        ds_misu_method:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=CMS_MISU_METHOD',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true      
        },
        
        use_yn:{
            fields:['field1'],
            
            data:[{
                value:'F', display:'아니오'
            },{
                value:'T', display:'예'
            }],
            autoLoad:true
        }
    }// sotres
});