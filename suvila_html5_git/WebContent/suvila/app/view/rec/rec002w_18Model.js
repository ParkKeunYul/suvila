Ext.define('ExFrm.view.rec.rec002w_18Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_18', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_18/selectID.suvila',
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
        ds_IDKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_03/kindInfoId.suvila?V_ACCEPT_GBN=2',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_IDJGKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/jkindInfoId.suvila?V_ACCEPT_GBN=2',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_year :{
         	fields:['field1'],
         	data :[{}],
            autoLoad:true
        },
        ds_deung_type:{
            fields:['field1'],
            data:[{
            	 CODE:''
                ,NAME:'전체'
            },{
            	CODE:'F'
               ,NAME:'사용중'
            },{
            	CODE:'T'
               ,NAME:'마감'
            }],
            autoLoad:true
        },
    }
});