Ext.define('ExFrm.view.acc.acc017w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.acc017w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC006W_01/selectACC.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        }
    }
});