Ext.define('ExFrm.view.rec.rec002w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_02', 
    stores:{
    	 body_FamilyInfo :{
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
         ds_familySelInfo :{
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
          ds_spiritSelInfo :{
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
    	 ds_GDKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC002W_02/kindInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_GDRec :{
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
        ds_acceptRecAmt :{
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
        ds_pgCardInfo :{
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
        ds_sms :{
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
        ds_pgCardUseYn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/pgc/PGC001W_01/UsePgCard.suvila?PGCODE=01',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
    }
});