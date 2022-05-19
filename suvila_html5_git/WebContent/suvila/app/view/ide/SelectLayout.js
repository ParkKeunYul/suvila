Ext.define('ExFrm.view.ide.SelectLayout', {
    extend: 'Ext.window.Window',
    alias:'widget.newfile',
    requires:['ExFrm.view.ide.SelectLayoutController'
    ], 
    controller:'selectlayout',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title:'레이아웃 선택',
    width:800,
    height:600,
    items:[
    {
    	flex:1,
    	xtype:'tabpanel',
    	items:[
    	{
	    	title:'가로형(HBox)',
	    	layout:{
	    		type:'vbox',
	    		align:'stretch'
	    	},
	    	items:[
	    	{
		    	layout:'hbox',
		    	items:[
		    	{
		    		xtype:'image',
		    		src:'./resources/tmpljs/layout/img/hbox_01.png'
		    	},{
		    		html:'가로형 (기본적인 가로형태)'
		    	}],
		    	listeners:{
		    		el:{
		    			click:function(){
		    				Ext.ComponentQuery.query('textfield[reference=type]')[0].setValue('hbox');
		    			}
		    		}
		    	}
		    },{
		    	layout:'vbox',
		    	items:[
		    	{
		    		xtype:'image',
		    		src:'./resources/tmpljs/newfile/img/window.png'
		    	},{
		    		html:'window'
		    	}],
	 			listeners:{
		    		el:{
		    			click:function(){
		    				Ext.ComponentQuery.query('textfield[reference=type]')[0].setValue('window');
		    			}
		    		}
		    	}
		   	   
		    },{
		    	layout:'vbox',
		    	items:[
		    	{
		    		xtype:'image',
		    		src:'./resources/tmpljs/newfile/img/container.png'
		    	},{
		    		html:'container'
		    	}],
				listeners:{
		    		el:{
		    			click:function(){
		    				Ext.ComponentQuery.query('textfield[reference=type]')[0].setValue('container');
		    			}
		    		}
		    	}	    	
		    }]	    
		}]
	},{
		xtype:'tbspacer',
		height:10
	},{
		xtype:'textfield',
		reference:'type',
		fieldLabel:'타입'
	},{
		xtype:'textfield',
		reference:'pack',
		fieldLabel:'팩'
	},{
		xtype:'textfield',
		reference:'align',
		fieldLabel:'정렬'
	},{
		html:'레이아웃을 변경합니다.'
	},{
		layout:'hbox',
		items:[{
			xtype:'tbspacer',
			flex:1
		},{
			xtype:'button',
			text:'레이아웃 변경',
			handler:'onChangeLayout'
		},{
			xtype:'tbspacer',
			width:10
		},{
			xtype:'button',
			text:'취소',
			handler:'onCancel'
		}]
	},{
		xtype:'textfield',
		reference:'propName',
		fieldLabel:'이름'
	},{
		xtype:'textfield',
		reference:'propValue',
		fieldLabel:'값'
	}]
});