Ext.define('ExFrm.view.rec.rec025w_01Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec025w_01', 
    stores:{ 
    	ds_detail:{
        	fields:['REMARK'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC025W_01/selectRec.suvila',
                reader:{
                    type:'json',
                    rootProperty:'data.list'
                }
            }
            ,autoLoad:false
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
        ds_acceptGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=REC',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_subacceptGbn :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/rec/REC025W_01/selectDetailRec.suvila',
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
            	 CODE:''
                ,NAME:'전체'
            },{
            	 CODE:'1'
                ,NAME:'접수일자'
            },{
            	CODE:'2'
               ,NAME:'수납일자'
            }],
            autoLoad:true
        },
        
    }
});