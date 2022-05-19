Ext.define('ExFrm.view.ser.ser032w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.ser032w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER032W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        } 
    }
});