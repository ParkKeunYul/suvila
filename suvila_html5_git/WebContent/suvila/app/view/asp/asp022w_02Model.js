Ext.define('ExFrm.view.asp.asp022w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp022w_02',  
    stores:{     	
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp022w_02/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        }
    }// sotres
});