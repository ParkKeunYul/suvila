Ext.define('ExFrm.view.rec.rec002w_09Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_09', 
    stores:{
    	ds_Ing :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_09/Ing.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'
                 }
             },
             autoLoad:false
        },
        ds_General :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_09/General.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'
                 }
             },
             autoLoad:false
        },
        ds_Detail :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_09/Detail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'
                 }
             },
             autoLoad:false
        },
        ds_pray_gbn_up :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/asp/CodeSearch/ComCode.suvila?group_cd=PRAYGBN',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'
                 }
             },
             autoLoad:false
        },
        
    }
});