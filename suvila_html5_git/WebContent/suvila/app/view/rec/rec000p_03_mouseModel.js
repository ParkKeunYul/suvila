Ext.define('ExFrm.view.rec.rec000p_03_mouseModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_03_mouse', 
    stores:{ 
    	ds_Jungak :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_02/jungakIndeung.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        
    }

});