Ext.define('ExFrm.view.pgc.pgc002w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.pgc002w_01',  
    stores:{     	
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/pgc/PGC002W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_detail:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/pgc/PGC002W_01/selectDetail.suvila',
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