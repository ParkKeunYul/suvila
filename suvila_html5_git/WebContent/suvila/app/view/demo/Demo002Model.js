Ext.define('ExFrm.view.demo.Demo002Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.demo002', 
    stores:{ 
        mainInfo:{
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
        detailInfo:{
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
            pageSize:100
        },
        comboInfo:{
            fields:['field1'],
            
            data:[{
                value:'001', display:'공공일'
            },{
                value:'002', display:'공공이'
            },{
                value:'003', display:'공공삼'
            }],
            autoLoad:true
        }
    }
});