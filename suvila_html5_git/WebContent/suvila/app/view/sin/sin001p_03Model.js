Ext.define('ExFrm.view.sin.sin001p_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_03', 
    stores:{ 
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/sin/SIN001P_03/selectSindoDeath.suvila',
                //timeout : 1000*60*60,
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_bokwi:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/sin/SIN001P_03/selectBokwi.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        
        ds_sex_gbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=DEATH_SEXGBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_lunar_solar :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=LUNAR_SOLAR',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_kibu :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=BOKWIGBN',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_bon_master :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=BON',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false  
        },
        ds_bon:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/CodeSearchBonSelect.suvila?group_cd=BON',
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
    }
});