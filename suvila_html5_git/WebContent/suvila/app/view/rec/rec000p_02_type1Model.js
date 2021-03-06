Ext.define('ExFrm.view.rec.rec000p_02_type1Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_02_type1', 
    stores:{ 
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
        ds_lightOut :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectLightOut.suvila',
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
        ds_jesaday :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectJesaInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_dongChamJa :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC004W_03/selectSpirit.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_pray_orgin :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectPrayOrginate.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_smsGide:{
            fields:['field1'],
            data:[{
                CODE:'0'
               ,NAME:'선택'
            },{
            	CODE:'1'
               ,NAME:'접수문자'
            },{
            	CODE:'2'
               ,NAME:'미납문자'
            },{
            	CODE:'3'
               ,NAME:'위패번호문자'            
            }],
            autoLoad:true
        },
        ds_smsYn:{
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
        ds_recAmt :{
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
        ds_sinCell :{
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
        ds_recCancel :{
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
        ds_temp :{
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