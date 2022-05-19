Ext.define('ExFrm.view.rec.rec003w_42Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec003w_42', 
    stores:{     
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
        ds_giJae :{
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
        ds_giJaeSpirit :{
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
        ds_giJaeBokwi :{
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
        ds_giJae :{
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
        ds_monk :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/monk.suvila?SearchGbn=',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_bokwigibu :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/ComCode.suvila?group_cd=BOKWIGBN',
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
        ds_lunarSolar :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=LUNAR_SOLAR',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_leapmonth :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCode.suvila?group_cd=LEAPMONTH',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
    }
});