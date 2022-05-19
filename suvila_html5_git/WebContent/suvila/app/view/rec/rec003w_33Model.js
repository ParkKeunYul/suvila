Ext.define('ExFrm.view.rec.rec003w_33Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec003w_33', 
    stores:{ 
    	ds_giJae :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC003W_33/selectGi.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },      
        ds_giJaeSpirit :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC003W_33/giJaeSB.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_giJaeBokwi :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC003W_33/giJaeSBBok.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_bokwigibu :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/ComCode.suvila?group_cd=BOKWIGBN',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_monk :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/monk.suvila?SearchGbn=all',
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
        ds_date:{
            fields:['field1'],
            data:[{
            	 CODE:'1'
                ,NAME:'접수일'
            },{
            	 CODE:'2'
                ,NAME:'제사일'            
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