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
				//url:'./jsp/widgetList.jsp',
				url:'./jsp/widgetList.jsp?type=widget&path=' + lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'app' + 
                    lboFileSeperator + 'view' + 
                    lboFileSeperator + 'widget' + 
                    lboFileSeperator,
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
