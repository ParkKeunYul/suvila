Ext.define('ExFrm.view.com.moyeonmunModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.moyeonmun', 
    stores:{ 
    	ds_search:{
            fields:['field1'],
            data:[{
                CODE:'BUD_NO', NAME:'신도번호'
            },{
            	CODE:'NAME_KOR', NAME:'신도명'
            },{
            	CODE:'YYYY', NAME:'년도'
            }],
            autoLoad:true
        },
        ds_main:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/MoyeonmunSearch/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }				
            }			
            ,autoLoad:false      
        },
        ds_Moyeon:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC009W_01/Moyeonmun.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }				
            }			
            ,autoLoad:false      
        },
        
        
    }
});