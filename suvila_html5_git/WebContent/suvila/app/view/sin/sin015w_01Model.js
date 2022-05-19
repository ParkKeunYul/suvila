Ext.define('ExFrm.view.sin.sin015w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin015w_01', 
    stores:{ 
    	 ds_kibu :{
          	proxy:{
                  type:'ajax',
                  url:'/asp/CodeSearch/ComCode.suvila?group_cd=BOKWIGBN&type=ADD',
                  reader:{
                      type:'json',
                      rootProperty:'data.list'                    
                  }
              },
              autoLoad:false
         },
         ds_sindo :{
          	proxy:{
                  type:'ajax',
                  url:'/sin/SIN014W_01/select.suvila',
                  reader:{
                      type:'json',
                      rootProperty:'data.list'                    
                  }
              },
              autoLoad:false
         },
         ds_death :{
            	proxy:{
                    type:'ajax',
                    url:'/sin/SIN001P_07/selectcheanHonGbn.suvila',
                    reader:{
                        type:'json',
                        rootProperty:'data.list'                    
                    }
                },
                autoLoad:false
           },
         ds_bokwi :{
           	proxy:{
                   type:'ajax',
                   url:'/sin/SIN001P_07/selectBokwija.suvila',
                   reader:{
                       type:'json',
                       rootProperty:'data.list'                    
                   }
               },
               autoLoad:false
          },
          ds_sexgbn :{
            	proxy:{
                    type:'ajax',
                    url:'/asp/CodeSearch/ComCode.suvila?group_cd=DEATH_SEXGBN',
                    reader:{
                        type:'json',
                        rootProperty:'data.list'                    
                    }
                },
                autoLoad:false
         },
         ds_equal_gbn :{
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/ComCode.suvila?group_cd=DEATH_EQUAL',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
         },
         ds_spiritual_gbn :{
          	proxy:{
                  type:'ajax',
                  url:'/asp/CodeSearch/ComCode.suvila?group_cd=SPIRITUAL_GBN',
                  reader:{
                      type:'json',
                      rootProperty:'data.list'                    
                  }
              },
              autoLoad:false
         },      
    	/*ds_sindo :{
         	proxy:{
                 type:'ajax',
                 url:'/sin/SIN014W_01/select.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_death :{
         	proxy:{
                 type:'ajax',
                 url:'/sin/SIN001P_07/selectcheanHonGbn.suvila',
                 //ds_death.DataID = "/asp/sin/SIN001P_07.bf?action=selectcheanHonGbn&bokwi=" + lc_bokwi.BindColVal + "&death_gbn=" + lc_bokwi.ValueOfIndex("DEATH_YN",lc_bokwi.Index);
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
       
        ds_yn:{
            fields:['field1'],
            
            data:[{
                CODE:'T', NAME:'예'
            },{
            	CODE:'F', NAME:'아니오'
            }],
            autoLoad:true
        },*/
        /*ds_acceptGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=REC',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },*/
    }
});