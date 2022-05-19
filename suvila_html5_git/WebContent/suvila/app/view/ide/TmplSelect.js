Ext.define('ExFrm.view.ide.TmplSelect', {
    extend: 'Ext.panel.Panel',
    alias:'widget.tmplselect',
    requires:['ExFrm.view.ide.TmplSelectController',
    		  'ExFrm.view.ide.TmplSelectModel'
    ], 
    controller:'tmplselect',
    viewModel:{
    	type:'tmplselect'
    }, 
    name:'TmplSelect',
    title: getLboLangItem('템플릿선택(화면유형 선택)'),
	filePath:'ide',
	menuUrl:'ExFrm.view.ide.TmplSelect',
	layout:{
		type:'vbox',
		align:'stretch'
	},
    items: [
    {
    	flex:1,
		layout:{
			type:'vbox',
			align:'stretch'
		},    	
        xtype:'form',
        reference:'regform',	    	
        items:[
        {
	    	xtype:'grid',
	    	scrollable:true,
	    	flex:1,
	    	reference:'mainGrid',
			trailingBufferZone:500,
	    	bind:{
	    		store:'{searchInfo}'
	    	},       	
	    	columns:[
	    	{
	    		//hidden:true,
                text: getLboLangItem('이미지'),
                dataIndex:'name',
               	width:110,
				cellpadding:'0 0 0 0',
               	renderer:function(val){
               		return '<img width=90 src="./lib/tmpljs/link/img/' + val + '.png">';
               	}
	    	},
	        {
                text: getLboLangItem('템플릿명'),
                dataIndex:'name',
                width:300,
                flex:1
            }],
			listeners:{
				itemdblclick:'onDblClickMain'
			}	        
	    },
		{
			xtype:'panel',
			items:[
			{
				layout:'vbox',
				
				items:[
				{
					reference:'prjPath',
					xtype:'textfield',
					fieldLabel: getLboLangItem('프로젝트 경로'),
					labelAlign:'right',
					readOnly:true,
					width:'100%'
				},
				{
					reference:'tmplName',
					xtype:'textfield',
					fieldLabel: getLboLangItem('템플릿명'),
					labelAlign:'right',
					width:'100%'
				},{
					reference:'appName',
					xtype:'textfield',
					fieldLabel: getLboLangItem('애플리케이션명'),
					labelAlign:'right',
					value:lboApplicationName,
					width:'100%'
				},{
					reference:'folderName',
					xtype:'textfield',
					fieldLabel: getLboLangItem('폴더명'),
					labelAlign:'right',
					width:'100%'
				},{
					reference:'viewName',
					xtype:'textfield',
					fieldLabel: getLboLangItem('파일명'),
					labelAlign:'right',
					width:'100%',
					listeners:{
						blur:function(){
							if(this.nextSibling('textfield[name=xtypeName]').getValue() == ''){
								this.nextSibling('textfield[name=xtypeName]').setValue(this.getValue().toLowerCase());
							}
						}
					}
				},{
					reference:'xtypeName',
					name:'xtypeName',
					xtype:'textfield',
					fieldLabel:'xtype',
					labelAlign:'right',
					width:'100%'
				},{
					reference:'panelType',
					labelAlign:'right',
					fieldLabel: getLboLangItem('화면 종류'),
					width:'100%',
					xtype:'combobox',
					displayField:'name',
                    editable:false,
					valueField:'value',
					store:{
						fields:['name','value'],
						data:[
							{name:'Main Panel', value:'ExPanelMain'},
							{name:'Main Window', value:'ExWindowMain'},
							{name:'Sub Panel', value:'ExPanelSub'},						
						]
					}
				},{
					xtype:'checkbox',
					fieldLabel: getLboLangItem('뷰컨트롤러 포함'),
					reference:'chkViewController',
					checked:true
				},{
					xtype:'checkbox',
					fieldLabel: getLboLangItem('뷰모델 포함'),
					reference:'chkViewModel',
					checked:true
				}]
			}]
	    }],
	    buttons: [
	    {
	        text:  getLboLangItem('선택'),
	        //formBind: true,
	        //disabled: true,
	        handler: 'onSelectTemplate'
	    }]	    
    }]
});
