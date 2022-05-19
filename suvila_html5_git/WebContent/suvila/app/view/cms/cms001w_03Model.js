Ext.define('ExFrm.view.cms.cms001w_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cms001w_03',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/cms001W_03/cmsAccUptHisTemple.suvila',
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