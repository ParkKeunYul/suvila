Ext.define('ExFrm.view.rec.rec001w_16Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec001w_16', 
    stores:{ 
        ds_GDRec_sel :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectGD_sel.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_ID_CHRec_sel :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectID_CH2_After.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_YDRec_grd :{ //ds_YDRec 
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectYD.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_YDRec_CH :{ //ds_YDRec 
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectYD.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_YDRec_sel :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectYD_After.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
        		,timeout : 1000 * 60 * 30
             },
             autoLoad:false
        },
        ds_YDRec_sel_CH :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectYD_After_CH.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
        		,timeout : 1000 * 60 * 30
             },
             autoLoad:false
        },
        ds_IDJGKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/jkindInfoId.suvila?V_ACCEPT_GBN=2',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_YDJGKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/jkindInfoId.suvila?V_ACCEPT_GBN=4',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_YDKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/kindInfoId.suvila?V_ACCEPT_GBN=4',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_templeUser :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/templeuser.suvila',
                reader:{
                	
                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_IDCloseYn:{
            fields:['field1'],
            data:[{
            	 CODE:''
                ,NAME:'??????'
            },{
            	 CODE:'F'
                ,NAME:'?????????'
            },{
            	CODE:'T'
               ,NAME:'??????'
            }],
            autoLoad:true
        },
        ds_YDCloseYn:{
            fields:['field1'],
            data:[{
            	 CODE:''
                ,NAME:'??????'
            },{
            	 CODE:'F'
                ,NAME:'?????????'
            },{
            	CODE:'T'
               ,NAME:'??????'
            }],
            autoLoad:true
        },
        ds_PrintSort:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'????????????'
            },{
            	CODE:'2'
               ,NAME:'???????????????'
            }],
            autoLoad:true
        },
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
        ds_YDRec_sel_new :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_06/selectYD_After_new.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
        		,timeout : 1000 * 60 * 30
             },
             autoLoad:false
        },
    }
});