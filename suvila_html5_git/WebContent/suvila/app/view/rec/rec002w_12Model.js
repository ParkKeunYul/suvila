Ext.define('ExFrm.view.rec.rec002w_12Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_12', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_12/selectBulsaList.suvila',
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
        ds_BSKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_12/selectBulsaKind.suvila',
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
               ,NAME:'불사일'
            }],
            autoLoad:true
        },
        
    }
});