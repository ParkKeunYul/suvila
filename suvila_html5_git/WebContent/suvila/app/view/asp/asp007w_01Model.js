Ext.define('ExFrm.view.asp.asp007w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp007w_01',  
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
            ,autoLoad:false            
        },
        ds_templeUser:{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/asp007w_01/selectUser.suvila',
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