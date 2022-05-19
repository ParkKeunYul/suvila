Ext.define('ExFrm.view.ide.NewFile', {
    extend: 'Ext.window.Window',
    alias:'widget.newfile',
    requires:[
    	'ExFrm.view.ide.NewFileController',
    	'ExFrm.view.ide.NewFileModel'
    ], 
    controller:'newfile',
        viewModel:{
    	type:'newfile'
    }, 
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('새로운 뷰 만들기'),
    width:800,
    height:650,
    isModel:true,
    items:[
    {
    	xtype:'grid',
    	height:400,
    	reference:'mainGrid',
    	bind:{
    		store:'{mainPartInfo}'
    	},    
    	viewConfig:{
	        plugins: {
	            ddGroup: 'dragtmplmake',
	            ptype: 'gridviewdragdrop',
	            enableDrop: true,
	        },
	        copy:true
	    },   	
    	columns:[
    	{
    		width:110,
    		text: getLboLangItem('이미지'),
    		dataIndex:'name',
    		renderer:function(val){
    			return '<img width=100 src=./resources/tmpljs/main/img/' + val + '.png>';
    		}
    	},{
            text: getLboLangItem('템플릿명'),
            dataIndex:'name',
            flex:1
        }],
		listeners:{
			itemdblclick:'onDblClickMain'
		},
    },{
		xtype:'tbspacer',
		height:10
	},{
		xtype:'textfield',
		reference:'panelLayout',
		fieldLabel: getLboLangItem('유형')
	},{
		xtype:'textfield',
		reference:'path',
		fieldLabel: getLboLangItem('경로')
	},{
		xtype:'textfield',
		reference:'folderName',
		fieldLabel: getLboLangItem('폴더명')
	},{
		xtype:'textfield',
		reference:'fileName',
		fieldLabel: getLboLangItem('파일명(뷰)')
	},{
		xtype:'combobox',
		reference:'panelType',
		fieldLabel:getLboLangItem('화면 형태'),
		displayField:'name',
		valueField:'panelType',
		queryMode:'local',
		store:{
			fields:['panelType','name'],
			data:[
				{panelType:'ExPanelMain', name:'Main Panel'},
				{panelType:'ExWindowMain', name:'Main Window'},
				{panelType:'ExPanelSub', name:'Sub Panel'}		
			]
		}
	},{
		name:'helper',
		html:'Create ViewController, ViewModel'
	},{
		xtype:'checkbox',
		fieldLabel:getLboLangItem('뷰만 생성'),
		reference:'chkViewOnly',
		listeners:{
			change:function(obj, val){
				console.log('arguments', arguments);
				if(val == true){
					Ext.ComponentQuery.query('[name=helper]')[0].setHtml('Not Create ViewController, ViewModel');
				}
				else {
					Ext.ComponentQuery.query('[name=helper]')[0].setHtml('Create ViewController, ViewModel');
				}
			}
		}
	}],
	buttons:[
	{
		xtype:'button',
		text:getLboLangItem('파일 생성'),
		handler:'onCreateFile'
	},{
		xtype:'tbspacer',
		width:10
	},{
		xtype:'button',
		text:getLboLangItem('취소'),
		handler:'onCancel'
	}]	
});
