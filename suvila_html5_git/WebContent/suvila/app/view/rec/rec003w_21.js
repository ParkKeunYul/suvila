Ext.define('ExFrm.view.rec.rec003w_21',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec003w_21',
    requires:[
    	'ExFrm.view.rec.rec003w_21Controller'
       ,'ExFrm.view.rec.rec003w_21Model'    
       ,'ExFrm.view.rec.rec003w_22'
       ,'ExFrm.view.rec.rec003w_23'
       ,'ExFrm.view.rec.rec003w_24'
       ,'ExFrm.view.rec.rec003w_25'
    ],
    controller:'rec003w_21',
    viewModel:{
        type:'rec003w_21'
    },
    name:'rec003w_21',
    isRootView:true,
    title:'49재',
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
            xtype:'rec003w_22'
        }]
    }]
});
