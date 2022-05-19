Ext.define('ExFrm.view.asp.asp021w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.asp021w_01',
    stores:{ 
	    ds_main:{
	        fields:['field1'],
	        proxy:{
	            type:'ajax',
	             url:'/asp/asp021w_01/select.suvila',                
	            reader:{
	                type:'json',
	                rootProperty:'data.list',
	                keepRawData:true
	            }				
	        },
	        autoLoad:false,
	    },
	    ds_sub:{
	        fields:['field1'],
	        proxy:{
	            type:'ajax',
	             url:'/asp/asp021w_01/selectHis.suvila',                
	            reader:{
	                type:'json',
	                rootProperty:'data.list'
	            }				
	        },
	        autoLoad:false,
	    },
	    ds_useTF :{
        	fields:['field1'],
            
            data:[{
                value:'T', display:'예'
            },{
                value:'F', display:'아니오'
            }],
            autoLoad:true
        },
    }
});