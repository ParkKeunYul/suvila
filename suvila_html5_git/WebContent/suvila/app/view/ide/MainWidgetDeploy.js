Ext.define('ExFrm.view.ide.MainWidgetDeploy', {
    extend: 'Ext.panel.Panel',
    requires: [
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		'ExFrm.view.ide.WidgetDeployList',
		'ExFrm.view.ide.WidgetDeployContainerList',
		'ExFrm.view.ide.WidgetDeployGroupList',
		'ExFrm.view.ide.MainWidgetDeployController',
		'ExFrm.view.ide.TmplPartList',
		'ExFrm.view.ide.TmplMainPartList'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    {
    	region:'west',
    	/*
        region:'west',
        xtype:'widgetdeploylist',
        height:'100%',
        */
    	xtype:'tabpanel',
    	height:'100%',
        width:300,  	
    	layout:{
    		type:'vbox',
    		align:'stretch'
    	},
    	bodyStyle:'background:red',
    	collapsible:true,
    	title: getLboLangItem('위젯그룹'),
    	split:true,
	 	listeners: {
	        resize: Ext.Function.bind(function(comp, width, height,oldWidth, oldHeight, eOpts) {
	            comp.setWidth(width);
	            comp.setHeight(height);
	            //comp.doLayout();
	        }, this)
	    },
    	items:[
    	{
    		title: getLboLangItem('단일위젯'),
    		scrollable:true,
	    	xtype:'widgetdeploylist',
			flex:1,
	    	
	    },{
    		title: getLboLangItem('화면구성'),
    		scrollable:true,
	    	xtype:'widgetdeploycontainerlist',
			flex:1,
	    	
	    },{
    		title: getLboLangItem('위젯그룹'),
    		scrollable:true,
	    	xtype:'widgetdeploygrouplist',
	    	flex:1,
	    	
	    }]
    },{
        region: 'center',
        layout:{
        	type:'vbox',
        	align:'stretch'
        },
        items:[
        {
            items:[{
                xtype:'image',
				hidden:true,
                src:'',
                reference:'widgetDeployImage',
                name:'widgetDeployImage',
                height:100
            }],
			
			html:'<font color="blue">위젯을 만들어 ExGen Framework 클라우드 화면에서 사용하고 싶을 경우 위젯을 만들어 위젯 코드와 xtype이 들어간 사용예제가 들어간 설정 코드, 이미지를 메일로 보내주시면 위젯목록에 올려드립니다. 위젯코드를 view/widget에 생성하고 widgetgroup.js에 목록을 추가하면 위젯을 사용할 수 있습니다. </font><br> <br>'
        },
        {
        	xtype:'textfield',
        	fieldLabel: getLboLangItem('위젯경로'),
        	reference:'widgetDeployPath',
        	name:'widgetDeployPath',
            hidden:true,
        },
        {
        	xtype:'textfield',
        	fieldLabel: getLboLangItem('위젯파일명'),
        	reference:'widgetDeployFile',
        	name:'widgetDeployFile'
        },{
        	xtype:'textarea',
        	fieldLabel: getLboLangItem('위젯코드'),
        	flex:1,
        	reference:'widgetDeployCont',
        	name:'widgetDeployCont'
        },{
        	layout:'hbox',
        	items:[
        	{
        		xtype:'tbspacer',
        		flex:1
        	},{
        		xtype:'button',
        		text: getLboLangItem('변경'),
        		handler:'onUpdate'
        	},{
        		xtype:'tbspacer',
        		width:10
        	},{
        		xtype:'button',
        		text: getLboLangItem('신규'),
        		handler:'onAdd'
        	}]
        }]
    }]
});
