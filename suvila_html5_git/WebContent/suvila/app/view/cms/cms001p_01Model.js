Ext.define('ExFrm.view.cms.cms001p_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cms001p_01',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS001P_01/cmsAccUptHis.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }
            }
        }        
        
    }// sotres
});