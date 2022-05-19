Ext.define('ExFrm.view.asp.asp013w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp013w_01', 
    stores:{ 
    	smsType:{
            fields:['field1'],
            
            data:[{
            	value:'', display:'전체'
            },{
                value:'SMS', display:'SMS'
            },{
                value:'LMS', display:'LMS'
            }],
            autoLoad:true
        },
        ds_SMS:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                 url:'/asp/asp013w_01/selectSMS.suvila',                
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }				
            },
            autoLoad:false,
            sorters: {property: 'due', direction: 'ASC'},
            groupField: 'TEMPLE_CD'
        },
        ds_CMS:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp013w_01/selectCMS.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_SMS_summary :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/asp013w_01/selectSMSsummary.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }				
            }			
            ,autoLoad:false  
        }
    }
});