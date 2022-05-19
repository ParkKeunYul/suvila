Ext.define('ExFrm.view.demo.Demo003Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo003', 
    stores:{ 
        sourceInfo:{
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
        },
        targetInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                //url:'./extra/json/view/demo/demo002_detailinfo.json',
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
        cellSelectInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:'./extra/json/view/demo/demo002_detailinfo.json',
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