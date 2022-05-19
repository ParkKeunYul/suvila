Ext.define('ExFrm.view.sin.sin010p_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin010p_01',  
    stores:{     	
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/asp/BudSearch/sindo.suvila',
                timeout : 1000*60*60,
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        }  
        
    }// sotres
});