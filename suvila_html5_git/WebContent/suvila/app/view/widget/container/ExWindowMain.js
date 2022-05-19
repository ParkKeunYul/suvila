Ext.define('ExFrm.view.widget.container.ExWindowMain', {
    extend: 'Ext.window.Window',
    xtype:'exwindowmain',
    exInitStr:"{    \n        xtype:'exwindowmain',\n    }",
    constrainHeader: true,
    closable: true,
    cls:'windowmain',
    padding:'1 1 1 1', 
    autoScroll: true,
    width:1080,
    height:800,
	top:0,
	left:0,
    isRootView:true, 
    authority:'',
	//minimizable: true,
	animTarget:true,
	animShow : function(){
        this.el.fadeIn({
            duration: 1,
            //callback: this.afterShow.createDelegate(this, [true], false),
            scope: this
        });
    },	
	orgState:0,
	orgTop:0,
	orgLeft:0,
	orgWidth:0,
	orgHeight:0,
	tools: [{
		type: 'minimize',
		name:'btnMinimized',
		hidden:false,

		handler: function (evt, toolEl, owner, tool) {

			
			var window = owner.up('window');
			/*
			if(window.orgState == 0){
				window.orgWidth = window.getWidth();
				window.orgHeight = window.getHeight();
				window.orgTop = window.getY();
				window.orgLeft = window.getX();
			}
			*/
			//window.orgState = 1;
			/*
			this.setHidden(true);
			window.down('[name=btnRestore]').setHidden(false);
			window.collapse();
			window.setWidth(150);
			//window.expand('', false);
			window.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'bl-bl');
			*/
			/*
			Ext.create('Ext.fx.Anim', {
				target: window,
				duration: 1000,
				from: {
					opacity: 1,       // Transparent
				},
				to: {
					opacity:0
				}
			});
			*/
			//setTimeout(function(){
			window.hide();
			//},1000);
			/*
			//debugger;
			window.setWidth(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getWidth());
			window.setHeight(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getHeight()-27);
			window.expand('', false);
			window.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'tl-tl');
			*/
			//window.expand('', false);
			//window.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'tl-tl');
			//window.center();
		}
	},{
		type: 'restore',
		name:'btnRestore',
		hidden:true,
		handler: function (evt, toolEl, owner, tool) {
			var window = owner.up('window');

			window.setWidth(window.orgWidth);
			window.setHeight(window.orgHeight);
			window.setY(window.orgTop);
			window.setX(window.orgLeft);
			window.orgState = 0;
			window.expand('', true);
			this.setHidden(true);
			window.down('[name=btnMaximize]').setHidden(false);
			window.down('[name=btnMinimized]').setHidden(false);
			//window.expand('', false);
			//window.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'tl-tl');
			//window.center();
		}
	},{
		type: 'maximize',
		name:'btnMaximize',
		handler: function (evt, toolEl, owner, tool) {
			var window = owner.up('window');
			if(window.orgState == 0){
				console.log("window.orgState ");
				
				window.orgWidth = window.getWidth()*(2/3);
				window.orgHeight = window.getHeight()/2;
				window.orgTop = window.getY();
				window.orgLeft = window.getX();
			}
			window.orgState=2;
			this.setHidden(true);
			window.expand('', true);
			window.down('[name=btnRestore]').setHidden(false);
			//debugger;
			window.setWidth(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getWidth());
			window.setHeight(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getHeight()-37);
			//window.expand('', false);
			window.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'tl-tl');
			//window.center();
		}
	}],
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
			//console.log('view afterrender');
			try{
				me.getController().afRender(content);		
			}catch(e){}	
		});
		/*
		me.addListener('resize', function(content){
			console.log('window resize');
			content.updateLayout();
		});
		*/
	},
	listeners:{
		beforedestroy:function( obj, eOpts ){
			try{
			//	console.log('id', this.id);
				ExFrm.app.getController('AppController').setMainBarDestroy(this.id);  
			}catch(e){
				console.log('e',e);
			}
		}
	}        
})