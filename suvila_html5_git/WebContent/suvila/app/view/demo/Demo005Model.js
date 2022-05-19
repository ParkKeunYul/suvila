Ext.define('ExFrm.view.demo.Demo005Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo005', 
    stores:{ 
        testInfo:{
            type:'tree', 
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: './extra/json/view/demo/demo005_maininfo.json',
                reader:{
                    type:'json'
                }
            },
            autoLoad:false,
            pageSize:10
        }
    }
});