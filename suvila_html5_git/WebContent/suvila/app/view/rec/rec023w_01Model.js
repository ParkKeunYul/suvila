Ext.define('ExFrm.view.rec.rec023w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec023w_01', 
    stores:{ 
    	ds_main:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC023W_01/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_rec:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=REC',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_approv:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=APPROV',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        
    }
});