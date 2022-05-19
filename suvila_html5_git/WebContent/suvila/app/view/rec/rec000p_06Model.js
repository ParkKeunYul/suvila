Ext.define('ExFrm.view.rec.rec000p_06Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000p_06', 
    stores:{ 
    	ds_main :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_06/selectIndeung.suvila',
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
        ds_lightOut :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectLightOut.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            }
            ,autoLoad:false
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
            autoLoad:false
        },
        ds_all_rec_base_amount :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC000P_02/selectAllRecAmount.suvila',
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
    }

});