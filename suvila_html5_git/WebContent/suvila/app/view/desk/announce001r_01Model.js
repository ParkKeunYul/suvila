Ext.define('ExFrm.view.desk.announce001r_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.announce001r_01', 
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
				,timeout : 1000 * 60 * 2
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
        	 	,timeout : 1000 * 60 * 2 
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
        	    ,timeout : 1000 * 60 * 2
            }
            ,autoLoad:false
        },
        ds_asp_Anc:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/Announce/AnnounceSelectAnc.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }
            },
            autoLoad:false            
        },
        ds_temple_Anc:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/Announce/AnnounceSelectTempleAnc.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }
            },
            autoLoad:false            
        },
        ds_reqInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/Announce/AnnounceSelectReq.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                }
            },
            autoLoad:false            
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
        },
        ds_notice:{
        	fields:['field1'],
            data:[{
                CODE: ''
               ,NAME: '전체'
            },{
            	CODE: 'N'
               ,NAME: '공지사항'
            },{
            	CODE: 'P'
               ,NAME: '패치노트'
            }]
            ,autoLoad:true
        } 
    }
});