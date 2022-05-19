Ext.define('ExFrm.view.rec.rec002w_10Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.rec002w_10', 
    stores:{
    	ds_Ing :{
         	fields:['field1'],
         	proxy:{
                 type:'ajax',
                 url:'/rec/REC002W_11/Ing.suvila',
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
                 url:'/rec/REC002W_11/General.suvila',
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
                 url:'/rec/REC002W_11/Detail.suvila',
                 reader:{
                     type:'json',
                     rootProperty:'data.list'
                 }
             },
             autoLoad:false
        },
    }
});