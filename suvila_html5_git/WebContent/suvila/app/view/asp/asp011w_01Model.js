Ext.define('ExFrm.view.asp.asp011w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp011w_01',  
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
                url:'/asp/asp011w_01/selectDate.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        use_yn:{
            fields:['field1'],
            
            data:[{
                value:'N', display:'휴일'
            },{
                value:'Y', display:'영업일'
            }],
            autoLoad:true
        }
        
    }// sotres
});