Ext.define('ExFrm.view.rec.rec020w_01',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec020w_01',
    requires:[
    	'ExFrm.view.rec.rec020w_01Controller'
       ,'ExFrm.view.rec.rec020w_01Model'       
       ,'ExFrm.view.rec.rec020w_02'
       ,'ExFrm.view.rec.rec020w_03'
       ,'ExFrm.view.rec.rec020w_04'
       ,'ExFrm.view.rec.rec020w_05'
    ],
    controller:'rec020w_01',
    viewModel:{
        type:'rec020w_01'
    },
    name:'rec020w_01',
    isRootView:true,
    title:'신청접수',
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
            text    :'관리',
            handler :'onShow',                                
        }]
    },{
        reference:'content',        
        flex:1,
        layout:'fit',
        items:[{
            xtype:'rec020w_02'
        }]
    }]
});
