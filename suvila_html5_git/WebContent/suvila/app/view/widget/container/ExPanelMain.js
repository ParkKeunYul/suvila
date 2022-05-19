Ext.define('ExFrm.view.widget.container.ExPanelMain', {
    extend: 'Ext.panel.Panel',
    xtype:'expanelmain',
    exInitStr:"{    \n        xtype:'expanelmain' }",
    closable: true,
    //bodyPadding:'15 20 15 20', 
    //autoScroll: true,
   
    //scrollable:true,
    cls:'expanelmain',
    isRootView:true, 
    authority:'',
    getAuthority:function(val){
		var i=authority.indexOf(val);
		if(i != -1){
			return true;
		}
		else {
			return false;
		}
    }
    
    // 크기설정
    // 1024*768
    // 1680*1050

    
})