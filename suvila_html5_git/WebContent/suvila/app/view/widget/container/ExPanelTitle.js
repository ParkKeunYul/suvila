Ext.define('ExFrm.view.widget.container.ExPanelTitle', {
    extend: 'Ext.panel.Panel',
    xtype:'expaneltitle',
    layout:'hbox',
    width:'100%',
    exTitle:'타이틀',
    exInitStr:"{    \n        xtype:'expaneltitle',\n        exTitle:'타이틀'\n    }",
    items:[
    {
    	exName:'title',
    	cls:'viewtitle',
    	html:'<h3>타이틀</h3>'
    }],
    setTitle:function(title){
    	this.exTitle = title;
    	this.down('[exName=title]').setHtml('<h3>' + this.exTitle + '</h3>');
    },
    initComponent:function(){
    	this.callParent(arguments);
    	try{
    		this.down('[exName=title]').setHtml('<h3>' + this.exTitle + '</h3>');
    	}catch(e){
    		console.log(e);
    	}
    }
})