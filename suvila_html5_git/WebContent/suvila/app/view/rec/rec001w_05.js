Ext.define('ExFrm.view.rec.rec001w_05',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec001w_05',
    requires:[
    	'ExFrm.view.rec.rec001w_05Controller',
        'ExFrm.view.rec.rec001w_05Model',
        'Ext.chart.theme.Muted'
    ],
    controller :'rec001w_05',
    viewModel:{
        type   :'rec001w_05'
    },
    name       : 'rec001w_05',
    isRootView : true,
    title      :'인/연등 접수 통계',
    header     : false,
    closable   : false,
    scrollable : true,
    layout     : {
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'hbox',
            align:'stretch'
        },
        items :[{
        	width : '0.5%'
        },{
        	width  : '99%',
        	layout : 'vbox',
        	items  : [{
        		
        		layout : 'hbox',
        		items  :[{
        			html : '<span style="font-weight: 700;line-height:25px;">접수구분 : </span>'
        		},{
        			xtype        : 'radiogroup',
        			reference    : 'rdo_ApprovalGbn',
        			name         : 'rdo_ApprovalGbn',
        			width        : 210,
        			hidden       : true,
        			listeners    : {
        				change : 'onDeungChange'
        			},
            		items     :[{
        				boxLabel   : '인등', 
                    	inputValue : 2,    
                    	width      : 60,
                    	reference  : 'rdo_ApprovalGbn2',
                    	checked    : true
        			}]
        		},{
        			xtype       : 'excheckbox',
                	reference   : 'cb_setBudNo',
                	listeners   : {
                		change : 'setBudNo'
                    }
        		},{
        			width : 5
        		},{
        			xtype           : 'excombobox',                		
            		labelAlign      : 'left',
                    reference       : 'cb_Stipulation',
                    displayField    : 'name',
                    valueField      : 'code',
                    exCommonDmnCode : '001',    
                    width           : 100,
                    store           : {},
                    listeners       : {
                    	change:'onSearchTypeChange'
                    }
        		},{
        			width : 10
        		},{
        			xtype           : 'extextfield',
                    reference       : 'txt_stipulation',
                    enableKeyEvents : true,
                    width           : 180 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter',
                 	   blur  : 'onSearchBlur'
                    },
                    value : '01-00001-0-01'
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    text     : '신도검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
        		},{
        			width : 10,
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '통계조회',
              		handler   : 'onSelect',
        		},{
                	width            : 0,
            		height           : 0,
            		items            :[{
            			xtype            : 'extextfield',
                        reference        : 'hid_bud_no',
                        value            : '',
                        inputType        : 'hidden',
                        name             : 'V_BUD_NO'
            		},{
            			xtype            : 'extextfield',
                        reference        : 'txt_budNo',
            		},{
            			xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'newData',
    	       	 		name      : 'newData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'uptData',
    	       	 		name      : 'uptData',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'delData',
    	       	 		name      : 'delData',
    	       	 		width     : 0
            		}]
        		},{
        			width : 10
        		}]
        	},{
        		height : 5,
        	},{
        		layout : 'hbox',
        		items  :[{
        			xtype        :'excombobox',
                    width        : 125,
                    fieldLabel   : '<span style="font-weight: 700;">년/월/일</span>',
                    labelStyle   : 'width:65px;text-align:left;',
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'sel_date_gbn',
                    value        : 8,
                	bind         : {
                    	store:'{ds_date}'
                	},
                	listeners    : {
                    	change : 'onDateField'
                    }
        		},{
        			width : 10
        		},{
        			html  : '<div style="line-height:25px;font-weight: 700;">입금일</div>'
        		},{
        			width : 10
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptSDate',
                    name           : 'ACCEPT_S_DATE', 
                    format         : 'Y-m-d',
        		},{
        			html :'<div style="text-align:center;width:20px;">~</div>',
        			width : 20
        		},{
        			xtype          : 'exdatefield',
                    reference      : 'me_AcceptEDate',
                    name           : 'ACCEPT_E_DATE',                                                   
                    format         : 'Y-m-d',
        		},{
        			width : 5
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 200,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}        		
        		
        		},{
        			reference :'tab_kindD',
        			layout : 'hbox',
        			hidden : true,
        			items  : [{
        				xtype        :'excombobox',
                    	labelWidth   : 50,
                        fieldLabel   : '<span style="font-weight: 700;">전각</span>',
                        width        : 220,
                        valueField   : 'JUNGAK_CD',
                        displayField : 'JUNGAK_NM',     
                        reference    : 'lc_DJungakInfo',
                        value        : 0,
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_JGKindInfo}'
                    	}
        			},{
            			width : 5
        			},{
            			xtype        :'excombobox',
                    	labelWidth   : 30,
                        fieldLabel   : '<span style="font-weight: 700;">등</span>',
                        width        : 200,
                        valueField   : 'LIGHT_CODE',
                        displayField : 'LIGHT_NM',     
                        reference    : 'lc_DKindInfo',
                        value        : 0,
                        emptyText    : '전체',
                    	bind         : {
                        	store:'{ds_DKindInfo}'
                    	}	
        			}]
        		}]
        	},{
        		height : 5
        	},{
        		layout : 'hbox',
        		items  : [{
        			xtype           : 'extextfield',
        			fieldLabel      : '<span style="font-weight: 700;">인등합계</span>',
        			labelWidth      : 65,
                    reference       : 'em_sum_id',
                    width           : 185 ,
                    exReadOnly      : true,
		            exType          : 'number',
		            exAlign         : 'right'
        		}]
        	},{
        		xtype        :'cartesian',
           	    reference    :'rec001w_05_a',
                width        :'100%',
                height       : 700,
                theme        : 'Muted',
                insetPadding : '70 40 0 40',
                interactions: ['itemhighlight'],
                animation: {
                    duration: 200
                },
                bind:{
               	 	store:'{ds_main}'
                },
                legend: {
                    docked: 'bottom'
                },
                sprites: [{
                    type       : 'text',
                    textAlign  : 'center',
                    fontSize   : 18,
                    fontWeight : 'bold',
                    width      : 100,
                    height     : 30,
                    x          : 325,
                    y          : 30  
                }, {
                    type      : 'text',
                    textAlign : 'center',
                    fontSize  : 16,
                    x         : 325,
                    y         : 50
                }, {
                    type     : 'text',
                    fontSize : 10,
                    x        : 12,
                    y        : 495
                }],
                axes: [{
                    type     : 'numeric3d',
                    position : 'left',
                    fields   : ['AMOUNT1', 'AMOUNT2'],
                    grid     : true,
                    title    : '금액 합계(단위 :원)',
                    renderer : 'onAxisLabelRender'
                }, {
                    type     : 'category3d',
                    position : 'bottom',
                    fields   : 'SUB_DATE',
                    grid     : true,
                    title    : {
                        text: '접수일',
                        translationX: -30
                    },
                    
                }],
                series: {
                    type         : 'bar3d',
                    stacked      : false,// false 그룹 , true 계단
                    showInLegend : true,
                    highlight    : true,
                    xField       : 'SUB_DATE',
                    title        : ['인등접수'],
                    yField       : ['AMOUNT1'],
                    label        : {
                        field      : ['AMOUNT1'],
                        display    : 'insideEnd',
                        renderer   : 'onSeriesLabelRender'
                    },
                    style: {
                        inGroupGapWidth: -7
                    },
                    tooltip :{
                   	 	trackMouse: true,
                        renderer: 'onTooltipRender'
                    }
                }
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
