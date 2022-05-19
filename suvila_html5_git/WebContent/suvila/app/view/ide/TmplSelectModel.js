Ext.define('ExFrm.view.ide.TmplSelectModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tmplselect',
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
                    url:'./jsp/tmplLinkList.jsp?path=' + lboServerPath + 
                        lboFileSeperator + "lib" + lboFileSeperator + "tmpljs" +lboFileSeperator+"link" + lboFileSeperator,
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
