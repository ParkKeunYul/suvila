Ext.define('ExFrm.view.asp.asp001w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp001w_01', 
    stores:{ 
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp001w_01/Select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_approval:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/asp001w_01/Approvalselect.suvila',
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
                value:'F', display:'아니오'
            },{
                value:'T', display:'예'
            }],
            autoLoad:true
        },
        use_yn2:{
            fields:['field1'],
            
            data:[{
                value:'N', display:'아니오'
            },{
                value:'Y', display:'예'
            }],
            autoLoad:true
        },
        ds_search_gbn:{
            fields:['field1'],
            
            data:[{
                value:'NAME_KOR', display:'신도명'
            },{
                value:'BUD_NO', display:'신도번호'
            },{
                value:'SACRED_KOR', display:'법명'
            },{
                value:'MOBILE_TELNO', display:'휴대전화'
            },{
                value:'TELNO', display:'전화번호'
            }],
            autoLoad:true
        },
        ds_sect :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=JONGDAN',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            },
            autoLoad:false  
        },
        ds_mobile_telno :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=MOBILE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            },
            autoLoad:false  
        },
        ds_telno :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=TELNUMBER',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_death_type:{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=DEATH_TYPE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
        	autoLoad:false  
        }
    }
});