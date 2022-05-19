Ext.define('ExFrm.view.asp.asp015w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp015w_01',  
    stores:{ 
    	ds_temple:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/TempleSearch/TempleCodeAll.suvila?TEMPLE_ALL=Y',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:true      
        },
        ds_smsrec:{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=SMSREC',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            },	
        	autoLoad:true
        },
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp015w_01/selectScLog.suvila?',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                },
                timeout : 1000 * 60 * 30
            }			
            ,autoLoad:false      
        },
        ds_compGb:{
            fields:['field1'],
            
            data:[{
                value:'KT'  , display:'KT'
            }],
            autoLoad:true
        },
        ds_sendYn:{
        	fields:['field1'],
        	data:[{
                value:'1'    , display:'처리'
            },{
                value:'2'    , display:'대기'
            }],
        	autoLoad:true
        },
        ds_msgGb:{
        	fields:['field1'],
        	data:[{
        		 value:''     , display:'전체'
        	},{
                value:'SMS'    , display:'단문'
            },{
                value:'LMS'    , display:'장문'
            }],
        	autoLoad:true
        },
        ds_successYn:{
        	fields:['field1'],
        	data:[{
                value:''     , display:'전체'
            },{
                value:'1'    , display:'성공'
            },{
                value:'0'    , display:'실패'
            }],
        	autoLoad:true
        }
        
    }// sotres
});