Ext.define('ExFrm.view.rec.rec002w_31',{
    extend: 'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec002w_31',
    requires:[
    	'ExFrm.view.rec.rec002w_31Controller'
       ,'ExFrm.view.rec.rec002w_31Model'       
       ,'ExFrm.view.rec.rec002w_32'
       ,'ExFrm.view.rec.rec002w_33'
       ,'ExFrm.view.rec.rec002w_34'
       ,'ExFrm.view.rec.rec002w_35'
       ,'ExFrm.view.rec.rec002w_36'
       ,'ExFrm.view.rec.rec002w_37'
    ],
    controller:'rec002w_31',
    viewModel:{
        type:'rec002w_31'
    },
    name:'rec002w_31',
    isRootView:true,
    title:'불사접수',
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
            xtype:'button',
            text:'접수',
            handler:'onShow',
            pressed: true
        },{
            xtype:'button',
            text:'조회',
            handler:'onShow',
        },{
            xtype:'button',
            text:'미수',
            handler:'onShow',
        },{
            xtype:'button',
            text:'통계',
            handler:'onShow',
        },{
            xtype:'button',
            text:'출력',
            handler:'onShow',
            
        },{
            xtype:'button',
            text:'관리',
            handler:'onShow',
            
        }]
    },{
    	height : 1,
    },{
        reference:'content',        
        flex:1,
        layout:'fit',
        items:[{
            xtype:'rec002w_32'
        }]
    }]
});
