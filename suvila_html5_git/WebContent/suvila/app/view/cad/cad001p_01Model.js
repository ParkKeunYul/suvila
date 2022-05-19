Ext.define('ExFrm.view.cad.cad001p_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cad001p_01',  
    stores:{     	
    	ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cad/CAD001P_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }
            }
            ,autoLoad:false
        },
        
    }// sotres
});