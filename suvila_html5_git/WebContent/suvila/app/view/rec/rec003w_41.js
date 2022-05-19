Ext.define('ExFrm.view.rec.rec003w_41',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec003w_41',
    requires:[
    	'ExFrm.view.rec.rec003w_41Controller'
       ,'ExFrm.view.rec.rec003w_41Model'           
       ,'ExFrm.view.rec.rec003w_42'
       ,'ExFrm.view.rec.rec003w_43'
       ,'ExFrm.view.rec.rec003w_44'
       ,'ExFrm.view.rec.rec003w_45'
    ],
    controller:'rec003w_41',
    viewModel:{
        type:'rec003w_41'
    },
    name:'rec003w_41',
    isRootView:true,
    title:'천도제',
    closable:true,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
    	height : 1,
    },{
        xtype: 'segmentedbutton',
        items:[{
            xtype   :'button',
            text    :'접수',
            handler :'onShow',
            pressed : true
        },{
            xtype   :'button',
            text    :'조회',
            handler :'onShow',
        },{
            xtype   :'button',
            text    :'미수',
            handler :'onShow',            
        },{
            xtype   :'button',
            text    :'통계',
            handler :'onShow',                                
        }]
    },{
    	height : 1,
    },{
        reference:'content',        
        flex:1,
        layout:'fit',
        items:[{
            xtype:'rec003w_42'
        }]
    }]
});
