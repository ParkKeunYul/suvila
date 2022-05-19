Ext.define('ExFrm.view.demo.Demo006Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo006', 
    stores:{ 
        menuAdmInfo:{

            fields:['field1'],

            proxy:{
                type:'ajax',
                url: './extra/json/view/demo/demo006_menuadminfo.json',
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