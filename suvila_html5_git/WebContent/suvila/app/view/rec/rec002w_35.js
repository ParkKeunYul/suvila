Ext.define('ExFrm.view.rec.rec002w_35',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_35',
    requires:[
    	'ExFrm.view.rec.rec002w_35Controller',
        'ExFrm.view.rec.rec002w_35Model',
        'Ext.chart.theme.Muted'
    ],
    controller :'rec002w_35',
    viewModel:{
        type   :'rec002w_35'
    },
    name       : 'rec002w_35',
    isRootView : true,
    title      :'기도접수 통계',
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
        			hidden       : true,
        			xtype        : 'radiogroup',
        			reference    : 'rdo_ApprovalGbn_r02_35',
        			name         : 'rdo_ApprovalGbn_r02_35',
        			width        : 210,
            		items     :[{
        				boxLabel   : '불사', 
                    	inputValue : 3,    
                    	width      : 60,
                    	reference  : 'rdo_ApprovalGbn3',
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
    				reference    : 'lc_BsKindInfo',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">불사명</span>',
                    value        : 0,
                    width        : 220,
                    valueField   : 'BULSA_CD',
                    displayField : 'BULSA_NM',     
                 //  emptyText    : '불사전체',
                	bind         : {
                    	store:'{ds_BSKindInfo}'
                	}
        		},{
        			width : 5,
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
        			width : 5
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
        			xtype           : 'extextfield',
        			fieldLabel      : '<span style="font-weight: 700;">불사합계</span>',
        			labelWidth      : 65,
                    reference       : 'em_sum_bs',
                    width           : 185 ,
                    exReadOnly      : true,
		            exType          : 'number',
		            exAlign         : 'right'
        		}]
        	},{
        		height : 1
        	},{
        		xtype        :'cartesian',
           	    reference    :'rec002w_35_a',
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
                    fields   : [ 'AMOUNT2'],
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
                    title        : [ '불사접수'],
                    yField       : [ 'AMOUNT2'],
                    label        : {
                        field      : ['AMOUNT2'],
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
