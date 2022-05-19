Ext.define('ExFrm.view.asp.asp003w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp003w_01', 
    stores:{ 
    	ds_searchType:{
            fields:['field1'],
            
            data:[{
                value:'GROUP_CD', display:'그룹코드'
            },{
                value:'NAME', display:'그룹명'
            }],
            autoLoad:true
        },
        ds_group:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp003w_01/GroupSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_code:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp003w_01/CodeSelect.suvila',
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
                value:'N', display:'아니오'
            },{
                value:'Y', display:'예'
            }],
            autoLoad:true
        },
    }
});