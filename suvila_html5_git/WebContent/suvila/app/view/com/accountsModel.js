Ext.define('ExFrm.view.com.accountsModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.accounts',  
    stores:{ 
    	ds_acctGbn:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/acctGbn.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_ieGbn:{
        	fields:['field1'],
        	data:[{
        		CODE:'I', NAME:'세입'
            },{
            	CODE:'O', NAME:'세출'
            }]
            ,autoLoad:true      
        },
        ds_kwan:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/kwan.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_hang:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/hang.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_mok:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/mokName.suvila',
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