Ext.define('ExFrm.view.ide.NewFileModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.newfile',
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

        },
        mainPartInfo:{
            fields:['field2'],
            config:{
                proxy:{
                    type:'ajax',
                    url:'./jsp/tmplMainPartFileList.jsp?path=' + lboServerPath +
                        lboFileSeperator + "lib" + lboFileSeperator + "tmpljs" + lboFileSeperator + "main" + lboFileSeperator,
                    reader:{
                        type:'json',
                        rootProperty:'data.list1',
                      	keepRawData:true
                    }
                },
                autoLoad:false,
                pageSize:10             
            }
        }                 
    }    
});
