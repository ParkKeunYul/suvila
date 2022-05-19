Ext.define('ExFrm.view.rec.rec002w_33Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_33', 
    stores:{ 
    	ds_detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC024W_03/selectDetail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_BSKindInfo :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_03/kindInfoBS.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_BSRec :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_03/selectBS.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_GDRec :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_03/selectGD.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
    	ds_payState :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeSelect.suvila?group_cd=PAYSTATE',
                reader:{
                    type:'json',
                    rootProperty:'data.list'                    
                }
            },
            autoLoad:false
        },
        ds_approv :{
        	fields:['field1'],
        	proxy:{
                type:'ajax',
                url:'/asp/CodeSearch/ComCodeAll.suvila?group_cd=APPROV',
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
        ds_dateBS:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            },{
            	 CODE:'2'
                ,NAME:'불사일'
            },{
            	CODE:'3'
               ,NAME:'수납일'
            }],
            autoLoad:true
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