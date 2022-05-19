Ext.define('ExFrm.view.sin.sin010w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin010w_01', 
    stores:{ 
    	ds_sindo:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/sin/SIN010W_01/sindoSelect.suvila',
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
                url:'/sin/SIN010W_01/classSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_com_classMgt:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/sindoClassMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }
            }
            ,autoLoad:false
        },
        ds_CopyClassSindo:{
        	fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cad/CAD002W_01/selectInfo.suvila?V_CLASS_CD=9999999',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }
            }
            ,autoLoad:false
        },
    }
});