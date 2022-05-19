Ext.define('ExFrm.view.menu.LeftMenu', {
    extend: 'Ext.tree.Panel',
    xtype:'leftmenu',
    cls:'leftmenu',
    requires:['ExFrm.view.menu.LeftMenuController'],
    controller:'leftmenu',    
	header:false,
	border:1,
    rootVisible:false,
    displayField:'name',
    exFieldData:['name', 'code'],
    
	store:{
		type:'tree',
		fields:['name','code'],
		reader:{
			type:'json',
			root:{
				expanded:true
			}
		}
	},
    listeners:{
    	itemclick:'onMenuClick'
    },   
	regData:function(record){
        
		var me = this;
      
        var node = me.getRootNode();
      
        while (node.hasChildNodes()) {
            var childNode = node.childNodes[0];
            while(childNode.hasChildNodes()){
                childNode.removeChild(childNode.childNodes[0]);
            }
            node.removeChild(childNode);
        }
        var temp = Ext.encode(record.children);
        var tempObj = Ext.decode(temp);
        node.appendChild(tempObj);
        node.expand();  

        me.expandAll();	
        
	}
})