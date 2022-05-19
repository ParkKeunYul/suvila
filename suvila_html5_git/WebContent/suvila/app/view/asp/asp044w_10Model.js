Ext.define('ExFrm.view.asp.asp044w_10Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp044w_10', 
    stores:{ 
        ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/ASP044W_10/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
    }
});