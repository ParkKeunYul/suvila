Ext.define('ExFrm.view.rec.rec018w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec018w_01', 
    stores:{
    	ds_year :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC015W_01/Year.suvila?V_RANK=F',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_temple_info :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC015W_01/TempleInfo.suvila?',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_total :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC015W_01/selectTOT.suvila?',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_print:{
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
        ds_print_master :{
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
        ds_print_detail :{
           	fields:['field1'],
           	proxy:{
                   type:'ajax',
                   url:'/rec/REC018W_01/Print.suvila?',
                   reader:{
                       type:'json',
                       rootProperty:'data.list'                    
                   }
        		   ,timeout : 1000 * 60 * 30
               },
               autoLoad:false
        },
        ds_param :{
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
        ds_main :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC018W_01/General.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_excel1 :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC018W_01/General_ex1.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_excel2 :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC018W_01/General_ex2.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC018W_01/Detail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
    }
});