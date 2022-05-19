Ext.define('ExFrm.view.ide.RegEvent', {
    extend: 'Ext.window.Window',
    alias:'widget.regevent',
    requires:[
    	'ExFrm.view.ide.RegEventController'
    ], 
    controller:'regevent',
    layout:{
    	type:'vbox',
    	align:'stretch'
    },
    title: getLboLangItem('이벤트 등록'),
    width:800,
    height:700,
    padding:'10 10 10 10',
	scrollable:true,
    isModal:true,
    modal:true,
    defaults:{
    	labelWidth:200,
    	labelAlign:'right'
    },
    items: [
    {
    	xtype:'combobox',
    	reference:'eventKind',
    	fieldLabel: getLboLangItem('이벤트 목록'),
    	queryMode:'local',
    	displayField:'code',
    	valueField:'value',
    	store:{
	    	fields:['code','value'],
	    	data:[
	    	/*
	    		{code:'click', value:'function(button,e)', help:'button:This button., e:The click event.'},
	    		{code:'focus', value:'function(comp, e, eOpts)', help:'comp:this, e:The focus event. eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'blur', value:'function(comp, e, eOpts)', help:'comp:this, e:The blur event. eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'afterrender', value:'function(comp, eOpts)', help:'comp:this, eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'beforedestroy', value:'function(comp, eOpts)', help:'comp:this, eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'disable', value:'function(comp, eOpts)', help:'comp:this, eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'enable', value:'function(comp, eOpts)', help:'comp:this, eOpts:The options object passed to Ext.util.Observable.addListener.'},
	    		{code:'handler', value:'function(button,e)', help:'button:This button., e:The click event.'}
	    	*/
	    	]
    	}
    },{
    	xtype:'combobox',
    	reference:'eventElKind',
    	fieldLabel: getLboLangItem('엘리먼트 이벤트 목록'),
    	queryMode:'local',
    	displayField:'code',
    	valueField:'value',
    	store:{
	    	fields:['code','value'],
	    	data:[
				{code:'el.abort', value:'function( e, t, eOpts )' },
				{code:'el.blur', value:'function( e, t, eOpts )' },
				{code:'el.change', value:'function( e, t, eOpts )' },
				{code:'el.click', value:'function( e, t, eOpts )' },
				{code:'el.contextmenu', value:'function( e, t, eOpts )' },
				{code:'el.dblclick', value:'function( e, t, eOpts )' },
				{code:'el.doubletap', value:'function( event, node, options, eOpts )' },
				{code:'el.error', value:'function( e, t, eOpts )' },
				{code:'el.focus', value:'function( e, t, eOpts )' },
				{code:'el.focusmove', value:'function( e, t, eOpts )' },
				{code:'el.keydown', value:'function( e, t, eOpts )' },
				{code:'el.keypress', value:'function( e, t, eOpts )' },
				{code:'el.keyup', value:'function( e, t, eOpts )' },
				{code:'el.load', value:'function( e, t, eOpts )' },
				{code:'el.longpress', value:'function( event, node, options, eOpts )' },
				{code:'el.mousedown', value:'function( e, t, eOpts )' },
				{code:'el.mouseenter', value:'function( e, t, eOpts )' },
				{code:'el.mouseleave', value:'function( e, t, eOpts )' },
				{code:'el.mousemove', value:'function( e, t, eOpts )' },
				{code:'el.mouseout', value:'function( e, t, eOpts )' },
				{code:'el.mouseover', value:'function( e, t, eOpts )' },
				{code:'el.mouseup', value:'function( e, t, eOpts )' },
				{code:'el.painted', value:'function( comp, eOpts )' },
				{code:'el.pinch', value:'function( event, node, options, eOpts )' },
				{code:'el.pinchend', value:'function( event, node, options, eOpts )' },
				{code:'el.pinchstart', value:'function( event, node, options, eOpts )' },
				{code:'el.reset', value:'function( e, t, eOpts )' },
				{code:'el.resize', value:'function( comp, eOpts )' },
				{code:'el.rotate', value:'function( event, node, options, eOpts )' },
				{code:'el.rotateend', value:'function( event, node, options, eOpts )' },
				{code:'el.rotatestart', value:'function( event, node, options, eOpts )' },
				{code:'el.scroll', value:'function( e, t, eOpts )' },
				{code:'el.select', value:'function( e, t, eOpts )' },
				{code:'el.singletap', value:'function( event, node, options, eOpts )' },
				{code:'el.submit', value:'function( e, t, eOpts )' },
				{code:'el.swipe', value:'function( event, node, options, eOpts )' },
				{code:'el.taphold', value:'function( event, node, options, eOpts )' },
				{code:'el.unload', value:'function( e, t, eOpts )' },
				{code:'el.DOMActivate', value:'function( e, t, eOpts )' },
				{code:'el.DOMAttrModified', value:'function( e, t, eOpts )' },
				{code:'el.DOMCharacterDataModified', value:'function( e, t, eOpts )' },
				{code:'el.DOMFocusIn', value:'function( e, t, eOpts )' },
				{code:'el.DOMFocusOut', value:'function( e, t, eOpts )' },
				{code:'el.DOMNodeInserted', value:'function( e, t, eOpts )' },
				{code:'el.DOMNodeInsertedIntoDocument', value:'function( e, t, eOpts )' },
				{code:'el.DOMNodeRemoved', value:'function( e, t, eOpts )' },
				{code:'el.DOMNodeRemovedFromDocument', value:'function( e, t, eOpts )' },
				{code:'el.DOMSubtreeModified', value:'function( e, t, eOpts )' }
	    	]
    	}
    },{
		xtype:'hidden',
		reference:'kind',
		value:0
	},{
		xtype:'textfield',
		reference:'eventFuncName',
		fieldLabel: getLboLangItem('이벤트명')
	},{
		xtype:'checkbox',
		reference:'chkControllerExclude',
		fieldLabel: getLboLangItem('컨트롤러 코드생성 생략')	
	},{
		xtype:'tbspacer',
		height:20
	},{
		xtype:'fieldset',
		title: getLboLangItem('부가코드'),
		padding:'10 10 10 10',
		margin:'5 5 5 5',
		items:[
		{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'storeLoadingCls',
				fieldLabel: getLboLangItem('스토어호출')
			},{
                xtype:'tbspacer'
            },{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'storeLoadingStoreList',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
		    	labelWidth:200,
		    	labelAlign:'right'
		    },
			items:[
			{
				xtype:'checkbox',
				reference:'ajaxCallCls',
				fieldLabel:'Ajax'
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'formSubmitCls',
				fieldLabel: getLboLangItem('폼서밋')
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },
			items:[
			{
				xtype:'checkbox',
				reference:'ajaxGridCallCls',
				fieldLabel: getLboLangItem('Ajax (from 그리드)')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'ajaxGridCallFrom',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'gridToStoreCls',
				fieldLabel: getLboLangItem('스토어호출 (from 그리드)')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'gridToStoreFromGrid',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'gridToStoreToStore',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'gridAllCls',
				fieldLabel: getLboLangItem('그리드엔코딩')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'gridAllRef',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		}]
	},,{
		xtype:'fieldset',
		title: getLboLangItem('부가코드(그룹)'),
		padding:'10 10 10 10',
		margin:'5 5 5 5',
		items:[
		{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'areaMappingCls',
				fieldLabel: getLboLangItem('그리드 -> 그룹')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'fromArea',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'toArea',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'areaToStoreCls',
				fieldLabel: getLboLangItem('그룹 -> 스토어')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'areaToStoreFromArea',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'areaToStoreToStore',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },
			items:[
			{
				xtype:'checkbox',
				reference:'gridToAjaxCls',
				fieldLabel: getLboLangItem('그리드 -> Ajax -> 그룹')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'From',
				reference:'gridToAjaxFromGrid',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'gridToAjaxToArea',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'itemAjaxItemCls',
				fieldLabel: getLboLangItem('그룹 -> Ajax -> 그룹')
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'itemAjaxItemFromRef',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			},{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'itemAjaxItemToRef',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		},{
			layout:'hbox',
			bodyStyle:'background-color:transparent',
		    defaults:{
                width:240,
		    	labelWidth:200,
		    	labelAlign:'right'
		    },		
			items:[
			{
				xtype:'checkbox',
				reference:'ajaxToItemCls',
				fieldLabel: getLboLangItem('Ajax -> 그룹')
			},{
                xtype:'tbspacer'
            },{
				xtype:'combobox',
				labelWidth:100,
				fieldLabel:'To',
				reference:'ajaxToItemRef',
	            displayField: 'name',
	            valueField: 'value',
	            queryMode:'local',
	            value:'',
	            store:{
	                fields:['name','value'],
	                data:[
	                ]
	            }			
			}]	
		}]
	},{
		xtype:'tbspacer',
		height:20
	},{
    	layout:'hbox',
    	bodyStyle:'background-color:transparent',
    	items:[
    	{
    		xtype:'tbspacer',
    		flex:1
    	},{
	    	xtype:'button',
	    	text: getLboLangItem('등록'),
	    	handler:'onRegEventCheck',//'onRegEvent'
		},{
			xtype:'tbspacer',
			width:10
		},{
			xtype:'button',
			text: getLboLangItem('취소'),
			handler:'onCancel'
		},{
    		xtype:'tbspacer',
    		flex:1
		}]
	}]
});
