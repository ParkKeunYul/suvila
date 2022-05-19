Ext.define('ExFrm.view.asp.asp012w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp012w_01',  
    stores:{ 
    	ds_templeCd:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/TempleSearch/TempleCode.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true      
        },
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp012w_01/select.suvila',
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