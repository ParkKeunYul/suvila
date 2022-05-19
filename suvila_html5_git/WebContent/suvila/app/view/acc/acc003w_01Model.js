Ext.define('ExFrm.view.acc.acc003w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.acc003w_01', 
    stores:{ 
    	ds_in:{
    		fields: ['NAME', 'AMOUNT' ],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC003W_01/selectIn.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_out:{
        	fields: ['NAME', 'AMOUNT' ],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC003W_01/selectOut.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_change:{
    		fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC020W_01/select_tot.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_acctGbn:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/acctGbn.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_ymd:{
            fields:['field1'],
            
            data:[{
                CODE:'8', NAME:'일'
            },{
            	CODE:'6', NAME:'월'
            },{
            	CODE:'4', NAME:'년'
            }],
            autoLoad:true
        },
    }
});