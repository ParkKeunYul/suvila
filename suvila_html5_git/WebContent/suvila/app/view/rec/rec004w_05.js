Ext.define('ExFrm.view.rec.rec004w_05',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec004w_05',
    requires:[
    	'ExFrm.view.rec.rec004w_05Controller',
        'ExFrm.view.rec.rec004w_05Model',
        'Ext.chart.theme.Muted'
    ],
    controller :'rec004w_05',
    viewModel:{
        type   :'rec004w_05'
    },
    name       : 'rec004w_05',
    isRootView : true,
    title      :'위패접수 통계',
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
                    width           : 130 ,
                    listeners       : {
                 	   keyup : 'onSearchEnter'
                    },
                    value : '01-00001-0-01'
        		},{
        			width : 5
        		},{
               	 	xtype    : 'exbutton',
                    iconCls  : 'fa fa-search',
                    text     : '검색',
                    handler  : 'onBudSearch',
                    reference: 'budSearchBtn',
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
        		},{
        			xtype        :'excombobox',
                    width        : 80,
                    valueField   : 'CODE',
                    displayField : 'NAME',     
                    reference    : 'cb_date',
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
        			width : 10,
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 50,
                    fieldLabel   : '<span style="font-weight: 700;">접수자</span>',
                    width        : 250,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    :'lc_templeUser',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_templeUser}'
                	}
        		},{
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">행사명</span>',
                    width        : 300,
                    valueField   : 'EVENT_CD',
                    displayField : 'EVENT_NAME',     
                    reference    : 'lc_KindInfo',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_chonhonKind}'
                	}
        		},{
        			width : 10,
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		}]
        	},{
        		height : 10
        	},{
        		layout : 'hbox',
        		items  : [{
        			xtype           : 'extextfield',
        			fieldLabel      : '<span style="font-weight: 700;">평균</span>',
        			labelWidth      : 35,
                    reference       : 'em_ave',
                    width           : 185 ,
                    exReadOnly      : true,
		            exType          : 'number',
		            exAlign         : 'right'
        		},{
        			width : 10
        		},{
        			xtype           : 'extextfield',
        			fieldLabel      : '<span style="font-weight: 700;">합계</span>',
        			labelWidth      : 35,
                    reference       : 'em_sum',
                    width           : 185 ,
                    exReadOnly      : true,
		            exType          : 'number',
		            exAlign         : 'right'
        		}]
        	
        	},{
        		height : 10,
        	},{
        		width : '100%',
        	    height: 730,
        	    items:{
	    	        xtype: 'cartesian',
	    	        reference: 'chart',
	    	        height: 730,
	    	        captions: {
	    	            title: 'Industry size in major economies (2011)',
	    	            credits: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition'
	    	        },
	    	        theme: {
	    	            type: 'muted'
	    	        },
	    	        bind:{
	                	 store:'{ds_main}'
	                 },        	     
	    	        animation: Ext.isIE8 ? false : {
	    	            easing: 'backOut',
	    	            duration: 1000
	    	        },
	    	        axes: [{
	    	            type     : 'numeric3d',
	    	            position : 'left',
	    	            fields   : 'AMOUNT1',
	    	            majorTickSteps: 10,
	    	            label: {
	    	                textAlign: 'right'
	    	            },
	    	            renderer: 'onAxisLabelRender',
	    	            title: '위패 접수 수납금액',
	    	            grid: {
	    	                odd: {
	    	                    fillStyle: 'rgba(255, 255, 255, 0.06)'
	    	                },
	    	                even: {
	    	                    fillStyle: 'rgba(0, 0, 0, 0.03)'
	    	                }
	    	            }
	    	        }, {
	    	            type     : 'category3d',
	    	            position : 'bottom',
	    	            fields   : 'SUB_DATE',
	    	            grid     : true
	    	        }],
	    	        series: [{
	    	            type   : 'bar3d',
	    	            xField : 'SUB_DATE',
	    	            yField : 'AMOUNT1',
	    	            style  : {
	    	                minGapWidth: 20
	    	            },
	    	            highlightCfg: {
	    	                saturationFactor: 1.5
	    	            },
	    	            label: {
	    	                field    : 'AMOUNT1',
	    	                display  : 'insideEnd',
	    	                renderer : 'onSeriesLabelRender'
	    	            },
	    	            tooltip: {
	    	                trackMouse: true,
	    	                renderer: 'onTooltipRender'
	    	            }
	    	        }]
        	    }
        	},{
        		width : '100%',
        		html  : '<div style="width:100%;font-weight:700;text-align:center;font-size:15px;">접수일</div>'
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
