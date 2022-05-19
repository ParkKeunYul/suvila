Ext.define('ExFrm.view.ide.WidgetDeployListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetdeploylist',

    stores:{
        searchInfo:{
            fields:['field1'],

            proxy:{
                type:'ajax',
                //url:'./resources/tmpljs/widget/widgets.data',
                url:'./jsp/widgetList.jsp?path=' + lboServerPath + lboUserServerPath + 
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
