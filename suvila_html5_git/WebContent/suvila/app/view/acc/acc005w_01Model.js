Ext.define('ExFrm.view.acc.acc005w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.acc005w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/acc/ACC005W_01/selectACC.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        economy :{
        	fields: ['country', 'agr', 'ind', 'ser']
        	,data: [
                { ACT_DATE: 'USA',      ind: 2995787, ser: 12500746},
                { ACT_DATE: 'China',    ind: 3611671, ser: 3792665},
                { ACT_DATE: 'Japan',    ind: 1640091, ser: 4258274},
                { ACT_DATE: 'UK',       ind: 512506,  ser: 1910915},
                { ACT_DATE: 'Russia',   ind: 727906,  ser: 1215198}
            ]
        	,autoLoad:true
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
            ,autoLoad:true
        },
        ds_iegbn:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila',
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
                url:'/asp/CodeSearch/kwan.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_hang:{
        	fields:['CODE'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/hang.suvila',
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