Ext.define('ExFrm.view.ide.WidgetGroupListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.widgetgrouplist',

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
				//url:'./jsp/widgetGroupList.jsp',
				url:'./jsp/widgetList.jsp?type=groupwidget&path=' + lboServerPath + 
					lboFileSeperator + "lib" + 
					lboFileSeperator + "tmpljs" + 
					lboFileSeperator + "groupwidget" + 
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
