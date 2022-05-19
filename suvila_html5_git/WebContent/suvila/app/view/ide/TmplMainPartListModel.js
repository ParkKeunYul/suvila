Ext.define('ExFrm.view.ide.TmplMainPartListModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tmplmainpartlist',
    data:{
        srchkrnNm:'',
        srchvaltPrc:'',
        mainfield2:''
    },
    stores:{
        searchInfo:{
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
