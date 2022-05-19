Ext.define('ExFrm.view.cad.cad004w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.cad004w_01',  
    stores:{     	
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cad/CAD004W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }
            }
            ,autoLoad:false
        }        
    }// sotres
});