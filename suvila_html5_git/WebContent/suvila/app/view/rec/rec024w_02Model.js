Ext.define('ExFrm.view.rec.rec024w_02Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec024w_02', 
    stores:{ 
    	ds_PrayMgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC024W_02/selectPrayMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:true
        },
        ds_PrayRec :{
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