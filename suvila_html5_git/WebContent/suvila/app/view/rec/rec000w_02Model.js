Ext.define('ExFrm.view.rec.rec000w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000w_02', 
    stores:{ 
    	ds_daejuInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC000W_02/selectDaeju.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
            },
            autoLoad:false,            
        },
        ds_familyInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC000W_02/selectFamily.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
            },
            autoLoad:false,            
        },
        ds_spiritInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC000W_02/selectSpirit.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
            },
            autoLoad:false,            
        },
        ds_recHisInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC000W_02/selectRecHis.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
        		,timeout : 1000 * 60 * 30
            },
            autoLoad:false,            
        },
        ds_recHisInfo14:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/rec/REC000W_02/selectRecHis.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
            },
            autoLoad:false,
        },
        ds_acceptGbn :{
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
        },
        
    }
});