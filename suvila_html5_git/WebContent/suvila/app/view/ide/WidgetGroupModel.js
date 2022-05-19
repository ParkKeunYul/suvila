Ext.define('ExFrm.view.ide.WidgetListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetlist',

    stores:{
        searchInfo:{
            fields:['field1'],

            proxy:{
                type:'ajax',
                /*
                url:'./resources/tmpljs/widget/widgets.data',
                reader:{
                    type:'json',
                    rootProperty:'info',
                  	keepRawData:true
                }*/
				url:'./jsp/widgetList.jsp',
                reader:{
                    type:'json',
                    rootProperty:'data.list1',
                  	keepRawData:true
                }                
            },
            autoLoad:true            

        }               
    }    
});
