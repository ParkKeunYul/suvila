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
        },
        ds_CalenderYear:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/asp/Announce/AnnounceCalenderYYYY.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        ds_info:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',                
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }				
            }
            ,autoLoad:false
        },
        ds_CalenderMonth:{
        	fields:['field1'],
            data:[{
                CODE: '01'
               ,NAME: '01'
            },{
            	CODE: '02'
               ,NAME: '02'
            },{
            	CODE: '03'
               ,NAME: '03'
            },{
            	CODE: '04'
               ,NAME: '04'
            },{
            	CODE: '05'
               ,NAME: '05'
            },{
            	CODE: '06'
               ,NAME: '06'
            },{
            	CODE: '07'
               ,NAME: '07'
            },{
            	CODE: '08'
               ,NAME: '08'
            },{
            	CODE: '09'
               ,NAME: '09'
            },{
            	CODE: '10'
               ,NAME: '10'
            },{
            	CODE: '11'
               ,NAME: '11'
            },{
            	CODE: '12'
               ,NAME: '12'
            }]
            ,autoLoad:true
        } 
    }
});