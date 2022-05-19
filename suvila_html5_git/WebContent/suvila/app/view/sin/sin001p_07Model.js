Ext.define('ExFrm.view.sin.sin001p_07Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_07', 
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
        ds_cheanHon :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN001P_07/cheanHonSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_sex_gbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=SEXGBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
    }
});