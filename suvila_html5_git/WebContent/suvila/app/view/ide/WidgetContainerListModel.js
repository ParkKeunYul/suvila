Ext.define('ExFrm.view.ide.WidgetContainerListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetcontainerlist',

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
				url:'./jsp/widgetList.jsp?type=containerwidget&path=' + lboServerPath + lboUserServerPath + 
                    lboFileSeperator + 'app' + 
                    lboFileSeperator + 'view' + 
                    lboFileSeperator + 'widget' + 
                    lboFileSeperator + 'container' + 
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
