Ext.define('ExFrm.view.demo.Demo001Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo001', 
    stores:{ 
        mainInfo:{
            type:'tree', 
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/demo/demo001_maininfo.json',
                reader:{
                    type:'json'
                }
            },
            autoLoad:false,
        },
        detailInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/demo/demo001_detailinfo.json',
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