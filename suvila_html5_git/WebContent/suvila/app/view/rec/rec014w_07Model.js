Ext.define('ExFrm.view.rec.rec014w_07Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec014w_07', 
    stores:{
    	ds_jungak :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_10/Jungak.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_grade :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_10/Grade.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_code :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_10/getCd.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_sindoInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_07/SindoInfo.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_sindoInfoMouse :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_10/SindoInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_building :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_10/Building.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_deung :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_07/Deung.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_crossLight :{
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