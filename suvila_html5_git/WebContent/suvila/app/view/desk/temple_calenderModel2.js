Ext.define('ExFrm.view.desk.temple_calenderModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.temple_calender', 
    stores:{ 
    	ds_calender:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/asp/Announce/AnnounceCalender.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
				,timeout : 1000 * 60 * 30
            }
            ,autoLoad:false
        }        
    }
});