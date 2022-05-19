Ext.define('ExFrm.view.sin.sin011w_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin011w_03', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN011W_03/selectResult.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_main_grid:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN011W_03/selectResult.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_main_temp:{
        	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_classMgt:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/sindoClassMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_org_NmAll:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC017W_01/groupmgtSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_card_detail:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/PgCard/selectCardDetail.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },       
        ds_date:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'발송일'
            },{
            	 CODE:'2'
                ,NAME:'결제일'
            }],
            autoLoad:true
        },
        ds_paystate:{
            fields:['field1'],
            data:[{
            	CODE:''
               ,NAME:'전체'
            },{
            	 CODE:'결제완료'
                ,NAME:'결제완료'
            },{
            	 CODE:'미완료'
                ,NAME:'미완료'
            }],
            autoLoad:true
        },
    }
});