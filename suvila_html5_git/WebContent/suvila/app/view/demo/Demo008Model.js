Ext.define('ExFrm.view.demo.Demo008Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo008', 
    stores:{ 
        testInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: './json/demo008.json',
                reader:{
                    type:'json'
                }
            },
            autoLoad:false,
            pageSize:10
        }
    }
});