Ext.define('ExFrm.view.widget.container.ExPanelBlockBox', {
    extend: 'Ext.panel.Panel',
    xtype:'expanelblockbox',
    exInitStr:"{    \n        xtype:'expanelblockbox'\n    }",
    cls:'expanelblockbox',
    exGroupRef:true,
    //bodyStyle:'background-color:black',
    //style:'background-color:black',
    style:'background-color:lightblue;border-left-color:black;border-left-width:1px;border-left-style:solid;border-top-color:black;border-top-width:1px;border-top-style:solid;',	    
    bodyPadding:'0 0 0 0',
    bodyPadding:'0 0 0 0',
    //margin:'1 0 0 1',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    /*
    defaults:{
        bodyPadding:'0 0 0 0',
        margin:'1 0 0 1',
        height:30,
        layout:{
            type:'hbox',
            align:'center',                    
        }                
    },
    */    
})