Ext.define('ExFrm.view.rec.rec000p_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_03', 
    stores:{ 
    	ds_crossLight :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_02/jungakIndeung.suvila',
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
                url:'/rec/REC000P_03/Deung.suvila',
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
                url:'/rec/REC001W_10/SindoInfo.suvila',
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
        ds_jungakGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=LIGHTGBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_jungakKind :{
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
        ds_reservation :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_03/ds_reservation.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_type:{
            fields:['field1'],
            data:[{
                 CODE:'2'
                ,NAME:'인등'
            },{
            	 CODE:'4'
                ,NAME:'연등'
            },{
            	 CODE:'12'
                ,NAME:'원불'
            },{
           	 	CODE:'14'
               ,NAME:'영탑'
            }],
            autoLoad:true
        },
        
    }

});