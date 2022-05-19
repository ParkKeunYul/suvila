Ext.define('ExFrm.view.rec.rec002w_13Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_13', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_13/selectGDList.suvila',
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
        ds_GDKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_13/selectGDKind.suvila',
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