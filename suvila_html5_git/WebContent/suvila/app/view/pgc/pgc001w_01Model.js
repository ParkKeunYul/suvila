Ext.define('ExFrm.view.pgc.pgc001w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.pgc001w_01',  
    stores:{     	
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/pgc/PGC001W_01/select.suvila',
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