Ext.define('ExFrm.view.sample.S02011_SearchItemMainGridModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s02011_searchitemmaingrid', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s02011_searchitemmaingrid_maininfo.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            autoLoad:false
        }
    }
});