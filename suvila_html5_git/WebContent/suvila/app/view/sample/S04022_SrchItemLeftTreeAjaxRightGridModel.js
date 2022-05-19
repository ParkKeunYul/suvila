Ext.define('ExFrm.view.sample.S04022_SrchItemLeftTreeAjaxRightGridModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.s04022_srchitemlefttreeajaxrightgrid', 
    stores:{ 
        leftInfo:{
            type:'tree', 
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/s04022_srchitemlefttreeajaxrightgrid_leftinfo.json',
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
                url:lboUserJsonPath + '/view/sample/s04022_srchitemlefttreeajaxrightgrid_rightinfo.json',
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