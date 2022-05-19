Ext.define('ExFrm.view.rec.rec021w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec021w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC021W_01/select_acc.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_iegbn:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                //url:'/asp/CodeSearch/ComCode.suvila?group_cd=IEGBN',
                url:'/asp/CodeSearch/ComCode.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_templeUser:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/templeuser.suvila?SearchGbn=sel&use_yn=T',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_payType:{
        	fields:['CODE'],
        	data:[{
        		CODE:'1', NAME:'현금'
            },{
            	CODE:'4', NAME:'무통장'
            },{
            	CODE:'2', NAME:'카드'
            }]
            ,autoLoad:true
        },
    }
});