Ext.define('ExFrm.view.asp.asp014w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp014w_01',  
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
                url:'/asp/asp014w_01/selectLOG.suvila?',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false      
        },
        ds_searchType:{
            fields:['field1'],
            
            data:[{
                value:'TEMPLE_CD'  , display:'사찰코드'
            },{
                value:'TEMPLE_NM'  , display:'사찰명'
            },{
                value:'USER_ID'    , display:'아이디'
            },{
                value:'USER_NM'    , display:'성명'
            },{
                value:'CLIENT_IP'  , display:'접속IP'
            },{
                value:'SERVER_IP'  , display:'서버IP'
                	
            }],
            autoLoad:true
        },
        ds_successYn:{
        	fields:['field1'],
        	data:[{
                value:''     , display:'전체'
            },{
                value:'Y'    , display:'성공'
            },{
                value:'N'    , display:'싶패'
            }],
        	autoLoad:true
        }
        
    }// sotres
});