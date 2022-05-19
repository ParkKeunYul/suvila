Ext.define('ExFrm.view.ide.ColumnProp', {
    extend: 'Ext.window.Window',
    alias:'widget.columnprop',
    requires:['ExFrm.view.ide.ColumnPropController',
    		  'ExFrm.view.ide.ColumnPropModel'
    ], 
    controller:'columnprop',
    viewModel:{
    	type:'columnprop'
    }, 
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    modal:true,
    title:getLboLangItem('컬럼설정'),
    width:1000,
    height:600,
    tools:[{
        type:'plus',
        handler:'onAddRow'
    },{
        type:'minus',
        handler:'onRemoveRow'
    }],    
    items:[ 
    {
    	flex:1,
    	xtype:'tabpanel',
    	layout:'fit',
	    items: [	    
	    {
	    	
	    	title:getLboLangItem('코드'),
	    	layout:{
	    		type:'vbox',
	    		align:'stretch'
	    	},
	    	items:[{
		    	xtype:'textarea',
		    	reference:'propValue',
		    	flex:1
		    },{
				xtype:'tbspacer',
				height:10
			},{
				layout:'hbox',
				items:[{
					xtype:'tbspacer',
					flex:1
				},{
					xtype:'button',
					text:getLboLangItem('저장'),
					handler:'onSaveProp'
				}]
			}]
	    },
	    {
	    	layout:{
	    		type:'vbox',
	    		align:'stretch'
	    	},
	    	title:getLboLangItem('컬럼그리드'), 
	    	items:[
	    	{
		    	reference:'mainGrid',
		    	xtype:'grid',
		    	flex:1,
		    	height:'100%',
		    	//queryMode:'local',
		    	store:{
		    		fields:[
                    'dataIndex', 
                    //'type',
                    'width',
                    'xtype',
                    'exType',
                    'exSummaryType',
                    //'exFormat',
                    'exUserString',
                    'exUserRecords',
                    'exGroupField',
                    'exAlign',
                    'exColor',
                    'exFontColor',
                    'exHidden',
                    'renderer',
                    'summaryRenderer',
                    'widget',
                    'onWidgetAttach',
                    'editor',
                    'widgetHelp',
                    //'grouping',
                    'locked',
                    'sortable',
                    'resizable',
                    'columnWidth',
                    'emptyCellText',
                    'etc'
		    		],
		    		data:[]
		    	},
		    	viewConfig:{
		    	},
		    	selModel:'cellmodel',
		    	plugins:{
		    		ptype:'cellediting',
		    		clickToEdit:2
		    	},
		    	listeners:{
		    		cellclick:'onCellClickMain',
		    		edit:'onEdit'
		    	},
		    	columns:[
		    	{
		    		xtype:'rownumberer',
		    	},{
		    		text:'text',
		    		dataIndex:'text',
		    		editor:'textfield',
		    		width:150,
                    locked:true
		    	},{
		    		text:'dataIndex',
		    		dataIndex:'dataIndex',
		    		editor:'textfield',
		    		width:150
		    	}/*,{
                    hidden:true,
		    		text:'type',
		    		dataIndex:'type',
		    		editor:'textfield',
		    		width:100
		    	}*/,{
		    		text:'width',
		    		dataIndex:'width',
		    		editor:'textfield',
		    		width:80
		    	},{
		    		text:'flex',
		    		dataIndex:'flex',
		    		editor:'textfield',
		    		width:80
		    	}
                // 추가==================
                ,{
                    text:'xtype',
                    dataIndex:'xtype',
                    editor:{
                        xtype:'combo',
                        store:['', '\'excolumn\'',  '\'excolumngroup\'', '\'excolumnwidgetcombo\'' , '\'excolumngroupwidgetcombo\'' ,'\'excolumnwidgetcheckboxgroup\'' , '\'excolumngroupwidgetcheckboxgroup\'' , '\'actioncolumn\'', '\'booleancolumn\'',  '\'checkcolumn\'', '\'column\'', '\'datecolumn\'','\'numbercolumn\'','\'rownumberer\'', '\'templatecolumn\'', '\'widgetcolumn\'', '\'exwidgetcolumn\'', '\'exwidgetcolumngroup\'', '\'treecolumn\''],
                    },
                    width:150
                },{
                    text:'exType',
                    dataIndex:'exType',
                    editor:{
                        xtype:'combo',
                        store:['', '\'number\'', '\'date\'', '\'array\'', '\'user\'']
                    },
                    width:60                    
                },{
                    text:'exSummaryType',
                    dataIndex:'exSummaryType',
                    editor:{
                        xtype:'combo',
                        store:['', '\'sum\'', '\'max\'', '\'min\'', '\'avg\'', '\'count\'', '\'groupsum\'', '\'groupmin\'', '\'groupmax\'', '\'groupavg\'', '\'groupcount\'']
                    },
                    width:80                    
                }/*,{
                    hidden:true,
                    text:'exFormat',
                    dataIndex:'exFormat',
                    editor:'combo',
                    width:200                    
                }*/,{
                    text:'exUserString',
                    dataIndex:'exUserString',
                    editor:'textareafield',
                    width:150                    
                },{
                    text:'exUserRecords',
                    dataIndex:'exUserRecords',
                    editor:'textareafield',
                    width:100                    
                },{
                    text:'exGroupField',
                    dataIndex:'exGroupField',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exAlign',
                    dataIndex:'exAlign',
                    editor:{
                        xtype:'combo',
                        store:['', '\'left\'', '\'right\'', '\'center\'']
                    },
                    width:80                    
                },{
                    text:'exColor',
                    dataIndex:'exColor',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exFontColor',
                    dataIndex:'exFontColor',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exHidden',
                    dataIndex:'exHidden',
                    editor:{
                        xtype:'combo',
                        store:['', 'true', 'false']
                    },
                    width:60                    
                },{
                    text:'exDisplayField',
                    dataIndex:'exDisplayField',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exValueField',
                    dataIndex:'exValueField',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exBindStore',
                    dataIndex:'exBindStore',
                    editor:'textfield',
                    width:100                    
                },{
                    text:'exDataColumn',
                    dataIndex:'exDataColumn',
                    editor:'textfield',
                    width:100    
                }
                // 추가부분======================
                ,{
		    		text:'renderer',
		    		dataIndex:'renderer',
		    		editor:'textareafield',
		    		width:100
		    	},{
		    		text:'summaryRenderer',
		    		dataIndex:'summaryRenderer',
		    		editor:'textareafield',
		    		width:100
		    	},{
		    		text:'widget',
		    		dataIndex:'widget',
		    		editor:{
                        xtype:'textarea'
                    },
		    		width:100
		    	},{
                    xtype:'widgetcolumn',
		    		text:getLboLangItem('위젯선택'),
		    		widget:{
                        xtype:'combo',
                        record:{},
                        displayField:'display',
                        valueField:'value',
                        queryMode:'local',
                        store:{
                            data:[
                                {display:'textfield', value:'{xtype:\'textfield\'}'},
                                {display:'textareafield', value:'{xtype:\'textareafield\'}'}, 
                                {display:'combo', value:'{xtype:\'combo\',    store:[\'data1\', \'data2\'] }'},
                                {display:'combo(display,value)', value:'{xtype:\'combo\',\n    displayField:\'display\',\n    valueField:\'value\'\n    store:{\n    data:[{display:\'코드1\', value:\'값1\'},{display:\'코드2\', value:\'값2\'}]}\n    }\n    }\n }'},
                                {display:'combo(공통코드)', value:'{xtype:\'combo\',\n    displayField:\'display\',\n    valueField:\'value\'\n    bind:{store:\'{commonInfo}\'} }'},
                                {display:'combo(공통코드연동)', value:'{xtype:\'combo\',\n    displayField:\'display\',\n    valueField:\'value\'\n    bind:{store:\'{commonInfo}\'} }'},
                                {display:'progressbarwidget', value:'{xtype:\'progressbarwidget\'}'},
                                {display:'sparklineline', value:'{xtype:\'sparklineline\',  tipTpl:\'Value:{y:0}\'}'},
                                {display:'sparklinebar', value:'{xtype:\'sparklinebar\'}'},
                                {display:'sparklinediscrete', value:'{xtype:\'sparklinediscrete\'}'},
                                {display:'sparklinebullet', value:'{xtype:\'sparklinebullet\'}'},
                                {display:'sparklinepie', value:'{xtype:\'sparklinepie\'}'},
                                {display:'sparklinebox', value:'{xtype:\'sparklinebox\'}'},
                                {display:'sparklinetristate', value:'{xtype:\'sparklinetristate\'}'}
                            ]
                        },
                        listeners:{
                            select:function(record){
                                console.log('...', this.getValue())
                                this.record.set('widget', this.getValue());   
                            }
                        },
                     
                    },
                    onWidgetAttach:function(col, widget,rec){
                        console.log('renderer', arguments);
                        widget.record = rec;
                        //widget.setValue(rec.get('field2'));
                    },                       
		    		width:200
		    	},{
		    		text:'onWidgetAttach',
		    		dataIndex:'onWidgetAttach',
		    		editor:{
                        xtype:'textarea'
                    },
		    		width:200
		    	},{
		    		text:'editor',
		    		dataIndex:'editor',
		    		editor:{
                        xtype:'textarea'
                    },
		    		width:200
		    	},{
                    xtype:'widgetcolumn',
		    		text:getLboLangItem('에디터선택'),
		    		widget:{
                        xtype:'combo',
                        record:{},
                        displayField:'display',
                        valueField:'value',
                        queryMode:'local',
                        store:{
                            data:[
                                {display:'textfield', value:'{\n    xtype:\'textfield\'\n}'},
                                {display:'textareafield', value:'{\n    xtype:\'textareafield\'\n}'},                                
                                {display:'combo', value:'{\n    xtype:\'combo\',\n    store:[\'data1\', \'data2\']\n}'},
                                {display:'combo(display,value)', value:'{\n    xtype:\'combo\',\n    displayField:\'display\',\n    valueField:\'value\',\n    store:{\n        data:[\n        {display:\'코드1\', value:\'값1\'},\n        {display:\'코드2\', value:\'값2\'}\n        ]\n    }\n    }\n    }\n }'},
                                {display:'combo(공통코드)', value:'{\n    xtype:\'combo\',\n    displayField:\'display\',\n    valueField:\'value\'\n    bind:{\n        store:\'{commonInfo}\'}\n    }'}
                            ]
                        },
                        listeners:{
                            select:function(record){
                                console.log('...', this.getValue())
                                this.record.set('editor', this.getValue());   
                            }
                        },
                     
                    },
                    onWidgetAttach:function(col, widget,rec){
                        console.log('renderer', arguments);
                        widget.record = rec;
                        //widget.setValue(rec.get('field2'));
                    },                       
		    		width:200
		    	}/*,{
                    hidden:true,
		    		text:'grouping',
		    		dataIndex:'grouping',
		    		editor:'textareafield',
		    		width:100
		    	}*/
                
                ,{
		    		text:'locked',
		    		dataIndex:'locked',
		    		editor:'textfield',
		    		width:80
		    	},{
		    		text:'sortable',
		    		dataIndex:'sortable',
		    		editor:'textareafield',
		    		width:80
		    	},{
		    		text:'resizable',
		    		dataIndex:'resizable',
		    		editor:'textareafield',
		    		width:80
		    	},{
		    		text:'columnWidth',
		    		dataIndex:'columnWidth',
		    		editor:'textareafield',
		    		width:80
		    	},{
		    		text:'emptyCellText',
		    		dataIndex:'emptyCellText',
		    		editor:'textareafield',
		    		width:100
		    	}
                ,{
                    text: getLboLangItem('기타속성'),
                    dataIndex:'etc',
                    editor:'textareafield',
                    width:200
                }]
			},{
				xtype:'tbspacer',
				height:10
			},{
				layout:'hbox',
				items:[{
					xtype:'tbspacer',
					flex:1
				},{
					xtype:'button',
					text: getLboLangItem('변환'),
					handler:'onSaveColumn'
				}]
			}]	    	    	
	    }]
	},{
    	xtype:'hidden',
    	reference:'propName',
    	value:'columns'
    },{
    	xtype:'tbspacer',
    	height:10,
    },{
    	layout:'hbox',
    	items:[
    	{
    		xtype:'tbspacer',
    		flex:1
    	},{
    		xtype:'button',
    		text:getLboLangItem('속성반영'),
    		handler:'onReturnProperty'
    	}]
    }]
});