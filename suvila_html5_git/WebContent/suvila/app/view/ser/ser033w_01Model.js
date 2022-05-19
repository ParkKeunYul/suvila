Ext.define('ExFrm.view.ser.ser033w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.ser033w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER033W_01/selectDonationPrint.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        } 
    }
});