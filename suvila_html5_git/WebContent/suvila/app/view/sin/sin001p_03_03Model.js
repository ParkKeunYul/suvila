Ext.define('ExFrm.view.sin.sin001p_03_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_03_03', 
    stores:{ 
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/sin/SIN001P_01/selectGanji.suvila',
                //timeout : 1000*60*60,
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        }      
    }
});