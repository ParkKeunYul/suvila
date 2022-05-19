Ext.define('ExFrm.view.sin.sin011w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin011w_02', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN011W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
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
        ds_sms:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
    }
});