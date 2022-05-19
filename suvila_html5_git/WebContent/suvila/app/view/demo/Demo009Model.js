Ext.define('ExFrm.view.demo.Demo009Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo009', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:'./json/demo009.json',
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