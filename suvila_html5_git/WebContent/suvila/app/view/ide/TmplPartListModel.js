Ext.define('ExFrm.view.ide.TmplPartListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tmplpartlist',
    stores:{
        searchInfo:{
            fields:['field2'],
            config:{
                proxy:{
                    type:'ajax',
                    url:'./jsp/tmplPartFileList.jsp?path=' + lboServerPath + 
                        lboFileSeperator + "lib" + lboFileSeperator + "tmpljs" + lboFileSeperator + "part" + lboFileSeperator,
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
