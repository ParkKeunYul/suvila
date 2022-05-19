Ext.define('ExFrm.view.ide.TmplMakeStep2', {
    extend: 'Ext.form.Panel',
    alias:'widget.tmplmakestep2',
    requires:[
    	'ExFrm.view.ide.TmplMakeStep2Controller',
    	'ExFrm.view.ide.TmplMakeGrid',
    	'ExFrm.view.ide.TmplMakeStep2Grid',
    	'ExFrm.view.ide.TmplMakeStep2ModelGrid'],
    controller:'tmplmakestep2',
    closable: true,
    title: getLboLangItem('템플릿 관리자'),
    autoScroll: true,
    items: [{
        xtype:'fieldset',
        title: getLboLangItem('입력하세요'),  
        reference:'fieldsetreg',
        padding:'10 10 10 10',
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
				//readOnly:true,
				width:300,
				labelAlign:'right'
			},{
				xtype:'tbspacer',
				flex:1
			},{
				hidden:true,
				reference:'linkContent',
				xtype:'textareafield',
				width:'100%',
				height:100
			}]
		}]
    },{
    	title: getLboLangItem('메인화면') + ' - 왼쪽 템플릿을 끌어다 놓습니다.',
		xtype:'tmplmakegrid',
		kind:'main',
		flex:1,	
		reference:'tmplMakeMainGrid',
		height:150
	},{
		layout:'hbox',
		items:[{
			xtype:'tbspacer',
			flex:1
		},{
			xtype:'button',
			text: getLboLangItem('템플릿 갱신'),
			handler:'onSearch'
		}]
	},{
		title: getLboLangItem('뷰모델'),
		xtype:'tmplmakestep2modelgrid',
		reference:'tmplMakeStep2ModelGrid',
		height:200
	},{
    	xtype:'panel',
    	//scrollable:true,
    	bodyStyle:'background-color:green',
    	name:'panelMake',
    	reference:'panelMake',
    	items:[] 	
	}],
	buttons:[{
		text: getLboLangItem('저장'),
		handler:'onCreateFiles'
	}]
});