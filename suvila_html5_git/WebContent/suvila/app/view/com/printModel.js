Ext.define('ExFrm.view.com.printModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.print', 
    stores:{
    	ds_temp:{
            fields:['field1'],
            proxy:{
                type:'ajax',                           
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                
                }
            },
            autoLoad:false            
        }   
    }
});