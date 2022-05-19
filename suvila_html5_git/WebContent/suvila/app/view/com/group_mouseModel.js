Ext.define('ExFrm.view.com.group_mouseModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.group_mouse', 
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