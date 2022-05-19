Ext.define('ExFrm.view.rec.rec003w_31',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec003w_31',
    requires:[
    	'ExFrm.view.rec.rec003w_31Controller'
       ,'ExFrm.view.rec.rec003w_31Model'    
       ,'ExFrm.view.rec.rec003w_32'
       ,'ExFrm.view.rec.rec003w_33'
       ,'ExFrm.view.rec.rec003w_34'
       ,'ExFrm.view.rec.rec003w_35'
    ],
    controller:'rec003w_31',
    viewModel:{
        type:'rec003w_31'
    },
    name:'rec003w_31',
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
            xtype:'rec003w_32'
        }]
    }]
});
