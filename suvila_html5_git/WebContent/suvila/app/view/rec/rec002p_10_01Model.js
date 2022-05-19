Ext.define('ExFrm.view.rec.rec002p_10_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002p_10_01', 
    stores:{ 
    	ds_main :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_10/selectPeriodInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        
    }

});