Ext.define('ExFrm.view.rec.rec000p_02_14Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_02_14', 
    stores:{ 
    	ds_youngtop_detail:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC014W_00/selectYoungTopDetail.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_report_master:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_temp:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_youngtop_chuk_print :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC014W_00/selectYoungTopFamilyInfo.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_youngtop_chon_print :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC014W_00/selectYoungTopPrint.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_youngtop_chon_print_temp :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_youngtop_print :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        
    }
});