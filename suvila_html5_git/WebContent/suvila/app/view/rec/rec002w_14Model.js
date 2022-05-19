Ext.define('ExFrm.view.rec.rec002w_14Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_14', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_14/selectWPList.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_classMgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/sindoClassMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_chonhonKind :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC004W_02/kindInfo.suvila?V_OPTION=ALL',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_date_type:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            },{
            	CODE:'2'
               ,NAME:'입제일'
            },{
            	CODE:'3'
               ,NAME:'회향일'
            }],
            autoLoad:true
        },
        
    }
});