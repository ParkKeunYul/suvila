Ext.define('ExFrm.view.widget.container.ExWindow', {
    extend: 'Ext.window.Window',
    xtype:'exwindow',
    constrain: true,
    closable: true,
    cls:'exwindow',
    exInitStr:"{    \n        xtype:'exwindow',\n    }",
    padding:'10 10 10 10', 
    autoScroll: true,
    width:700,
    height:500,
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
    },
	initComponent:function(){
		var me = this;
		me.callParent(arguments);
		me.addListener('afterrender', function(content){
		//	console.log('view afterrender');
			try{
				me.getController().afRender(content);		
			}catch(e){}	
		});
		me.addListener('resize', function(content){
			//console.log('window resize');
			content.updateLayout();
		});
	},
	listeners:{
		beforedestroy:function( obj, eOpts ){
			try{
		//		console.log('id', this.id);
				ExFrm.app.getController('AppController').setMainBarDestroy(this.id);  
			}catch(e){
				console.log('e',e);
			}
		}
	}       
})