Ext.define('ExFrm.view.sin.sin002w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin002w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN002W_01/scholarshipFundHisSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
        },
        ds_janghak_gubunAll:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=JANGHAK',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_janghak_gubun:{
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