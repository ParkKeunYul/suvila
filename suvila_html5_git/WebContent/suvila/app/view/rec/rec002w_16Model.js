Ext.define('ExFrm.view.rec.rec002w_16Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_16', 
    stores:{ 
    	ds_GDRec:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC024W_06/selectGD.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
        },
        
        ds_aprayMgt :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC024W_03/selectPrayMgt.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_date_type:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            },{
            	CODE:'3'
               ,NAME:'시작월'
            }],
            autoLoad:true
        },
        
    }
});