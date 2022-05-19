Ext.define('ExFrm.view.com.group_list_mouseModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.group_list_mouse', 
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
        },
        ds_classMgt:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN010W_01/classSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },  
    }
});