Ext.define('ExFrm.view.cms.cms001w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cms001w_02',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/cms001W_02/selectSindoDelCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }
            }
            ,autoLoad:false
            ,pageSize:100
        }
    }// sotres
});