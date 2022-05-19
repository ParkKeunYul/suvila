Ext.define('ExFrm.view.sample.SampleTest1Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sampletest1', 
    stores:{ 
        mainInfo:{
            fields:['field1'],
            
            proxy:{
                type:'ajax',
                url:lboUserJsonPath + '/view/sample/sampletest1_maininfo.json',
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