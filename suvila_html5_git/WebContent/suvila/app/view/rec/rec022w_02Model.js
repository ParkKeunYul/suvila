Ext.define('ExFrm.view.rec.rec022w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec022w_02', 
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
         ds_limit_yn :{
           	fields:['field1'],
           	proxy:{
                   type:'ajax',
                   url:'/asp/CodeSearch/ComCode.suvila?group_cd=YN',
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
        ds_WBKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_02/kindInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_deungID :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_02/lightSelect.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_WBRec :{
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
        ds_FamilyTemp :{
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
        ds_recKindTemp :{
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
        dsRecTemp :{
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