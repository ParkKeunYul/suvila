Ext.define('ExFrm.view.rec.rec000w_03Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec000w_03', 
    stores:{ 
    	ds_sindo_cms_info:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url:'/cms/CMS001W_01/selectRecSindoCMSInfo.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list',                    
                }
            },
            autoLoad:false,            
        },
        ds_smsYn:{
            fields:['field1'],
            data:[{
                 CODE:'F'
                ,NAME:'아니오'
            },{
            	 CODE:'T'
                ,NAME:'예'
            }],
            autoLoad:true
        },
        ds_mobile_telno1 :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=MOBILE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:true
        },
        
    }
});