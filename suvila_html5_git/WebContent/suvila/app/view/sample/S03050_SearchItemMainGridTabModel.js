Ext.define('ExFrm.view.sample.S03050_SearchItemMainGridTabModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s03050_searchitemmaingridtab', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s03050_searchitemmaingridtab_maininfo.json',
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