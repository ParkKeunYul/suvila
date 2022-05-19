Ext.define('ExFrm.view.demo.Demo007Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo007', 
    stores:{ 
        pivotInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: './json/demo007.json',
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