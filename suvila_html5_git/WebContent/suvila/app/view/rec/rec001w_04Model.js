Ext.define('ExFrm.view.rec.rec001w_04Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec001w_04', 
    stores:{ 
    	ds_detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC024W_03/selectDetail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },            
        ds_IDKindInfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC001W_03/kindInfoId.suvila?V_ACCEPT_GBN=2',
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
        ds_IDRec :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC001W_03/selectID.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
    	ds_payState :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=PAYSTATE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_approv :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=APPROV',
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
        ds_classMgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/sindoClassMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_rec_base_amount :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectRecAmount.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_dateGD:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            /*},{
            	 CODE:'2'
                ,NAME:'입제일'
            },{
            	CODE:'3'
               ,NAME:'회향일'*/
            }],
            autoLoad:true
        },
        ds_dateBS:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            /*},{
            	 CODE:'2'
                ,NAME:'불사일'
            },{
            	CODE:'3'
               ,NAME:'수납일'*/
            }],
            autoLoad:true
        },
        ds_yn:{
            fields:['field1'],
            
            data:[{
                CODE:'T', NAME:'예'
            },{
            	CODE:'F', NAME:'아니오'
            }],
            autoLoad:true
        },
        ds_IDCloseYn:{
            fields:['field1'],
            
            data:[{
            	CODE:'', NAME:'전체'
            },{
                CODE:'F', NAME:'사용중'
            },{
            	CODE:'T', NAME:'마감'
            }],
            autoLoad:true
        },        
        ds_payMonth :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectMonthLimit.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_payMonthBase :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectMonth.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_misuRec :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectLimit.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            }
            ,autoLoad:false
        },
        ds_misuRecYD :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectLimit.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            }
            ,autoLoad:false
        },
        ds_approvalGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=APPROV',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:true
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
    }
});