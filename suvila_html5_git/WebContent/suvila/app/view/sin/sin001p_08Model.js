Ext.define('ExFrm.view.sin.sin001p_08Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_08', 
    stores:{ 
    	ds_pray_temp:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_main :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN001P_08/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        }
    }
});