Ext.define('ExFrm.view.sample.S02011_SrchItemMainGridDetailblockItemModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s02011_srchitemmaingriddetailblockitem', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s02011_srchitemmaingriddetailblockitem_maininfo.json',
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