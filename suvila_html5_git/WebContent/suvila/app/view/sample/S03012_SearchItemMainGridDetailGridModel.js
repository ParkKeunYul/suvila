Ext.define('ExFrm.view.sample.S03012_SearchItemMainGridDetailGridModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s03012_searchitemmaingriddetailgrid', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s03012_searchitemmaingriddetailgrid_maininfo.json',
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
                url:lboUserJsonPath + '/view/sample/s03012_searchitemmaingriddetailgrid_detailinfo.json',
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