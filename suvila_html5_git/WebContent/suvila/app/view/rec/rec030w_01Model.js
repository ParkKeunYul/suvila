Ext.define('ExFrm.view.rec.rec030w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec030w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN006W_01/selectSindoCardNew.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_yn_issue:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=ISSUE_STATE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
    }
});