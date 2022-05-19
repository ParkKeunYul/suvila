Ext.define('ExFrm.view.rec.rec020w_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec020w_05', 
    stores:{ 
    	ds_General :{
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC020W_05/General.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_Detail :{
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC020W_05/Detail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_yn:{
            fields:['field1'],
            
            data:[{
                CODE:'T', NAME:'예'
            },{
            	CODE:'F', NAME:'아니오'
            }],
            autoLoad:true
        },
        /*ds_acceptGbn :{
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
        },*/
    }
});