Ext.define('ExFrm.view.sin.sin001p_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_02', 
    stores:{ 
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/sin/SIN001P_02/selectBranchFam.suvila',
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