Ext.define('ExFrm.view.sin.sin004w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin004w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN004W_01/selectBuddhismInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
        },
        ds_buddhismAll:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER023W_01/getconfCodeAll.suvila?V_FIND_CONFNAME=',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_buddhismSelect:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER023W_01/getconfCodeSelect.suvila?V_FIND_CONFNAME=',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
    }
});