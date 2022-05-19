Ext.define('ExFrm.view.sin.sin017w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin017w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN006W_01/selectSindoCardInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
        },
        ds_sub:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN017W_01/selectFamily.suvila',
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
        ds_yn_issue:{
        	fields:['CODE'],
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
        ds_issue_type:{
            fields:['field1'],
            
            data:[{
                value:'', display:'전체'
            },{
                value:'1', display:'발급신청'
            },{
                value:'2', display:'발급완료'
            },{
                value:'3', display:'발급보류'
            },{
                value:'4', display:'분실'
            }],
            autoLoad:true
        },
        ds_date_type:{
            fields:['field1'],
            
            data:[{
                value:'1', display:'신청일'
            },{
                value:'2', display:'정산일'
            },{
                value:'3', display:'발급일'
            },{
                value:'4', display:'배송일'
            },{
                value:'5', display:'접수일'
            }],
            autoLoad:true
        },
    }
});