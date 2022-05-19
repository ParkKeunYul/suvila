Ext.define('ExFrm.view.sample.S04021_SrchItemLeftTreeRightGridModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s04021_srchitemlefttreerightgrid', 
    stores:{ 
        leftInfo:{
            type:'tree', 
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s04021_srchitemlefttreerightgrid_leftinfo.json',
                reader:{
                    type:'json'
                }
            },
            autoLoad:false,
        },
        rightInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s04021_srchitemlefttreerightgrid_rightinfo.json',
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