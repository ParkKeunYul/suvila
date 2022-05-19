Ext.define('ExFrm.view.rec.rec000p_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_02', 
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
        ds_misuRecBase :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/select.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
            ,groupField: 'YEAR'
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
        ds_sindo_cms_info :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/cms/CMS001W_01/selectRecSindoCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
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
        ds_cmsinfo :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/saveCmsInfo.suvila',
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