Ext.define('ExFrm.view.ide.TmplMake', {
    extend: 'Ext.form.Panel',
    alias:'widget.tmplmake',
    requires:[
    	'ExFrm.view.ide.TmplMakeController',
    	'ExFrm.view.ide.TmplMakeGrid'],
    controller:'tmplmake',
    closable: true,
    title: getLboLangItem('템플릿 생성'),
    autoScroll: true,
    //url: './jsp/screenMake.jsp',
    items: [{
        xtype:'fieldset',
        title: getLboLangItem('입력하세요'),  
        reference:'fieldsetreg',
    	layout:{
    		type:'vbox',
    		align:'stretch'
    	},
        items: [
        {
        	layout:'hbox',
    		items:[
			{
				reference:'tmplName',
				xtype:'textfield',
				fieldLabel: getLboLangItem('템플릿명'),
				labelAlign:'right'
			},{
				xtype:'tbspacer',
				flex:1
			}]
		},{
			layout:'hbox',
			items:[
			{
				hidden:true,
				reference:'linkContent',
				xtype:'textareafield',
				width:'100%',
				height:100
			},{
	        	xtype:'tbspacer',
	        	flex:1
	        }]
	    },{
	    	layout:'hbox',
	    	items:[
	    	{
	    		xtype:'tbspacer',
	    		flex:1
	    	}]
        }]
    },{
    	xtype:'panel',
    	scrollable:true,
    	bodyStyle:'background-color:green',
    	name:'panelMake',
    	reference:'panelMake',
    	items:[
		{
    		xtype:'tmplmakegrid',
    		width:'100%',	
    		reference:'tmplMakeMainGrid',
    		height:150
    	},{
        	xtype:'button',
        	text: getLboLangItem('조회'),
        	handler:'onSearchScreen'
        }/*,{
    		xtype:'tmplmakegrid',
    		width:'100%',	
    		reference:'tmplMakeGrid0'
    	}*/],
    	buttons:[{
    		text: getLboLangItem('생성'),
    		handler:'onCreateFiles'
    	},{
    		text: getLboLangItem('미리보기'),
    		handler:'onPreview'
    	}]
    }]
});