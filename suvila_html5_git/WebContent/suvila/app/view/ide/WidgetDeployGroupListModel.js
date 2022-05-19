Ext.define('ExFrm.view.ide.WidgetDeployGroupListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetdeploygrouplist',

    stores:{
        searchInfo:{
            fields:['field1'],

            proxy:{
                type:'ajax',
                //url:'./resources/tmpljs/widget/widgets.data', 
                url:'./jsp/widgetList.jsp?path=' + lboServerPath + 
                    lboFileSeperator + 'lib' + 
                    lboFileSeperator + 'tmpljs' + 
                    lboFileSeperator + 'groupwidget' + 
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
