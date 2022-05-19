Ext.define('ExFrm.view.asp.asp022w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp022w_01',  
    stores:{ 
    	ds_templeCd:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/TempleSearch/TempleCode.suvila?V_CARD_TYPE=Y',
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
                url:'/asp/asp022w_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_sub:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp022w_01/selectHis.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_useYn:{
            fields:['field1'],
            
            data:[{
                value:'F', display:'아니오'
            },{
                value:'T', display:'예'
            }],
            autoLoad:true
        }
        
    }// sotres
});