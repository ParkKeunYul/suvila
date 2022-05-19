Ext.define('ExFrm.view.sin.sin001p_09Model', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.sin001p_09', 
    stores:{ 
    	ds_main:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/sin/SIN001P_01/selectGanji.suvila',
                //timeout : 1000*60*60,
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        ds_gbn:{
            fields:['field1'],
            data:[{
            	CODE:'AGE', NAME:'나이'
            },{
            	CODE:'NAME', NAME:'간지명'
            },{
            	CODE:'YEAR', NAME:'출생년년도'
            }],
            autoLoad:true
        },
    }
});