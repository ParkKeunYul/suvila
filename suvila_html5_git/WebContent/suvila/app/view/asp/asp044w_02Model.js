Ext.define('ExFrm.view.asp.asp044w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp044w_02', 
    stores:{ 
    	ds_templeCd:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/TempleSearch/TempleCode.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_IDJGKindInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC001W_03/jkindInfoId.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_IDKindInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC001W_02/kindInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
        },
        ds_YDRec:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/ASP044W_01/selectYD.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true
                }				
            }			
            ,autoLoad:false            
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
        ds_deung :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/ASP044W_01/Deung.suvila',
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
                url:'/asp/ASP044W_01/Building.suvila',
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
        ds_close:{
            fields:['field1'],
            data:[{
                 CODE:''
                ,NAME:'전체'
            },{
            	 CODE:'T'
                ,NAME:'예'
            },{
           	 	CODE:'F'
               ,NAME:'아니오'	
            }],
            autoLoad:true
        },
        ds_close_g:{
            fields:['field1'],
            data:[{
            	 CODE:'T'
                ,NAME:'예'
            },{
           	 	CODE:'F'
               ,NAME:'아니오'	
            }],
            autoLoad:true
        },
        
    }
});