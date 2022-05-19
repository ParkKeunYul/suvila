Ext.define('ExFrm.view.cms.cms004w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cms004w_01',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS004W_01//select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }
                ,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
        },       
    	ds_temple_CMS_info:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS002W_01/selectAllTempleCMSInfoList.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true      
        },
        ds_dateType:{
            fields:['field1'],
            data:[{
                value:'8', display:'일'
            },{
                value:'6', display:'월'
            },{
                value:'4', display:'년'
            }],
            autoLoad:true
        },
        twoYearSales:{
            fields:['field1'],
            data: [
                { SUB_DATE: '20170807', AMOUNT1: 42000, AMOUNT2: 68000},
                { SUB_DATE: '20170810', AMOUNT1: 50000, AMOUNT2: 85000},
                { SUB_DATE: '20170816', AMOUNT1: 53000, AMOUNT2: 72000},
                { SUB_DATE: '20170821', AMOUNT1: 1163000, AMOUNT2: 89000}
            ],
            autoLoad:true
        }
       
    }// sotres
});