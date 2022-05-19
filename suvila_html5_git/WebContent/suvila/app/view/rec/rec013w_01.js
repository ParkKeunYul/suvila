Ext.define('ExFrm.view.rec.rec013w_01',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec013w_01',
    requires:[
    	'ExFrm.view.rec.rec013w_01Controller'
       ,'ExFrm.view.rec.rec013w_01Model'
       ,'ExFrm.view.rec.rec013w_02'
       ,'ExFrm.view.rec.rec013w_03'
       ,'ExFrm.view.rec.rec013w_04'
       ,'ExFrm.view.rec.rec013w_05'
       ,'ExFrm.view.rec.rec013w_06'
    ],
    controller:'rec013w_01',
    viewModel:{
        type:'rec013w_01'
    },
    name:'rec014w_01',
    isRootView:true,
    title:'관리비',
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
        },{
            xtype   :'button',
            text    :'관리',
            handler :'onShow',            
        }]
    },{
    	height : 1,
    },{
        reference:'content',        
        flex:1,
        layout:'fit',
        items:[{
            xtype:'rec013w_02'
        }]
    }]
});
