Ext.define('ExFrm.view.acc.acc016w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.acc016w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC006W_01/selectACC.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_kwan:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/kwan.suvila?V_ACCT_GBN=5&V_IE_GBN=I&V_HANG=0&V_MOK=0',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_approval:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC001W_01/approval.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        } 
        
    }
});