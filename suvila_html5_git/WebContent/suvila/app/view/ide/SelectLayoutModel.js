Ext.define('ExFrm.view.ide.SelectLayoutModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.selectlayout',
    stores:{
        searchInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'./lib/tmpljs/widget/widgets.data',
                reader:{
                    type:'json',
                    rootProperty:'info',
                  	keepRawData:true
                }
            },
            autoLoad:true            

        }               
    }    
});
