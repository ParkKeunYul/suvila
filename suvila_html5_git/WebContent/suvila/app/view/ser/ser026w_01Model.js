Ext.define('ExFrm.view.ser.ser026w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.ser026w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER026W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        }
        
    }
});