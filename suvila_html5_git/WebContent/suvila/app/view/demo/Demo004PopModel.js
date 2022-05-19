Ext.define('ExFrm.view.demo.Demo004PopModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo004pop', 
    stores:{ 
        popInfo:{
            type:'tree', 
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: './extra/json/view/demo/demo002_maininfo.json',
                reader:{
                    type:'json'
                }
            },
            autoLoad:false,
            pageSize:10
        }
    }
});