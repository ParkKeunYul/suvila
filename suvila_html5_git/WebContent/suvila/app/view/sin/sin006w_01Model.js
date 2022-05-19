Ext.define('ExFrm.view.sin.sin006w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin006w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN006W_01/selectSindoCard.suvila',
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
            ,autoLoad:true
        },
    }
});