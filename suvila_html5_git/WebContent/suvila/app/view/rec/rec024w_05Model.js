Ext.define('ExFrm.view.rec.rec024w_05Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec024w_05', 
    stores:{ 
    	ds_main :{
    		fields: ['SUB_DATE', 'AMOUNT1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC024W_05/select.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'                    
                 }
             },
             autoLoad:false
        },
        ds_test:{
        	fields: ['country', 'agr', 'ind', 'ser'],
            data: [
                { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
                { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
                { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
                { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
                { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
            ],
            autoLoad:true
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
        ds_date:{
            fields:['field1'],
            data:[{
            	 CODE:'8'
                ,NAME:'일'
            },{
            	 CODE:'6'
                ,NAME:'월'
            },{
            	CODE:'4'
               ,NAME:'년'
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