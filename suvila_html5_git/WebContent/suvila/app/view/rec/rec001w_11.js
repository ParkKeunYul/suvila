Ext.define('ExFrm.view.rec.rec001w_11',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec001w_11',
    requires:[
    	'ExFrm.view.rec.rec001w_11Controller'
       ,'ExFrm.view.rec.rec001w_11Model'                           
       ,'ExFrm.view.rec.rec001w_12'
       ,'ExFrm.view.rec.rec001w_16'
       ,'ExFrm.view.rec.rec001w_16_000031'
       /*
       ,'ExFrm.view.rec.rec001w_13'
       ,'ExFrm.view.rec.rec001w_14'
       ,'ExFrm.view.rec.rec001w_15'
       ,'ExFrm.view.rec.rec001w_16'
       ,'ExFrm.view.rec.rec001w_17'
       */
    ],
    controller:'rec001w_11',
    viewModel:{
        type:'rec001w_11'
    },
    name:'rec001w_01',
    isRootView:true,
    title:'연등접수',
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
            text    :'출력',
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
            //xtype:'rec001w_16_000031'
        	xtype:'rec001w_12'
        }]
    }]
});
