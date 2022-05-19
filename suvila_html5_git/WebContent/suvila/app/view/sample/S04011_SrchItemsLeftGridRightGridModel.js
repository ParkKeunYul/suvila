Ext.define('ExFrm.view.sample.S04011_SrchItemsLeftGridRightGridModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s04011_srchitemsleftgridrightgrid', 
    stores:{ 
        leftInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s04011_srchitemsleftgridrightgrid_leftinfo.json',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    totalProperty:'listTotalSize',
                    keepRawData:true
                }
            },
            autoLoad:false
        },
        rightInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s04011_srchitemsleftgridrightgrid_rightinfo.json',
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