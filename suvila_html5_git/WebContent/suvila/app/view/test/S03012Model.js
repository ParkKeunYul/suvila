Ext.define('ExFrm.view.test.S03012Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s03012', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/test/s03012_maininfo.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            autoLoad:false,
            pageSize:10
        },
        detailInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/test/s03012_detailinfo.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            autoLoad:false,
            pageSize:10
        }
    }
});