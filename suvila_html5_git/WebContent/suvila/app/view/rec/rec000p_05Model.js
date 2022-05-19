Ext.define('ExFrm.view.rec.rec000p_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_05', 
    stores:{ 
    	ds_main :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_05/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_rec :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=REC',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_approv :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=APPROV',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:true
        },
        
    }

});