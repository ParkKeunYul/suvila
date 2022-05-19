Ext.define('ExFrm.view.widget.container.ExPanelBox', {
    extend: 'Ext.panel.Panel',
    xtype:'expanelbox',
    exInitStr:"{    \n        xtype:'expanelbox'\n    }",
    cls:'expanelbox',
    exGroupRef:true,
    //width:'100%',
    border:1,
    bodyPadding:'2 2 2 2',
    layout:{
        type:'vbox',
        align:'stretch'
    }
})