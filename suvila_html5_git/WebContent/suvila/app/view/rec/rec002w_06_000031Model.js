Ext.define('ExFrm.view.rec.rec002w_06_000031Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_06_000031', 
    stores:{ 
    	ds_GDRec :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_06/selectGD.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_GDRec_sel :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_06/selectGD_sel.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_GDRec_sel :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_06/selectGD_sel.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_GDKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_03/kindInfoGD.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_templeUser :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/templeuser.suvila',
                reader:{
                	
                	
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },       
        ds_dateGD:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            },{
            	 CODE:'2'
                ,NAME:'입제일'
            },{
            	CODE:'3'
               ,NAME:'회향일'
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