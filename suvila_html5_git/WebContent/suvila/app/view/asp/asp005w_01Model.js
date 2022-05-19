Ext.define('ExFrm.view.asp.asp005w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp005w_01', 
    stores:{ 
    	ds_level:{
            fields:['field1'],
            
            data:[{
                value:1, display:'1'
            },{
                value:2, display:'2'
            },{
                value:3, display:'3'
            },{
                value:4, display:'4'
            },{
                value:5, display:'5'
            }],
            autoLoad:true
        },
        ds_gbn :{
        	fields:['field1'],
            
            data:[{
                value:'M', display:'메뉴'
            },{
                value:'P', display:'프로그램'
            }],
            autoLoad:true
        },
        ds_useYn :{
        	fields:['field1'],
            
            data:[{
                value:'Y', display:'사용'
            },{
                value:'N', display:'미사용'
            }],
            autoLoad:true
        },
        ds_serviceGbn_l:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=SYS',
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
                url:'/asp/asp005w_01/menuSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true            
        },
        ds_templeMenu:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp005w_01/templeMenuSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true            
        },
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
        }
    }
});