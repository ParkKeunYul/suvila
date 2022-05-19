Ext.define('ExFrm.view.com.sindoModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sindo', 
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
    }
});