Ext.define('ExFrm.view.ser.ser020w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.ser020w_01', 
    stores:{ 
    	ds_Main:{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/ser/SER020W_01/announceSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_search:{
            fields:['field1'],
            data:[{
                CODE:'TITLE', NAME:'제목'
            },{
            	CODE:'CRT_USER', NAME:'등록자'
            },{
            	CODE:'CONTENTS', NAME:'내용'
            }],
            autoLoad:true
        },
        ds_type : {
        	fields:['field1'],
            data:[{
                CODE:'N', NAME:'공지사항'
            },{
            	CODE:'P', NAME:'패치노트'
            }],
            autoLoad:true
        },
        ds_useYn : {
        	fields:['field1'],
            data:[{
                CODE:'T', NAME:'예'
            },{
            	CODE:'F', NAME:'아니오'
            }],
            autoLoad:true
        }
    }
});