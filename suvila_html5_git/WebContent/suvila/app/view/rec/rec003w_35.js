Ext.define('ExFrm.view.rec.rec003w_35',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec003w_35',
    requires:[
    	'ExFrm.view.rec.rec003w_35Controller',
        'ExFrm.view.rec.rec003w_35Model',
        'Ext.chart.theme.Muted'
    ],
    controller:'rec003w_35',
    viewModel:{
        type:'rec003w_35'
    },
    name:'rec003w_35',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
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
        		height : 10
        	},{
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
                   // value           : '',
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
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'SEQ',
    	       	 		name      : 'SEQ',
    	       	 		width     : 0
    	        	},{
    	       	 		xtype     : 'extextfield',
    	       	 		inputType : 'hidden',
    	       	 		reference : 'ACCEPT_SEQ',
    	       	 		name      : 'ACCEPT_SEQ',
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
        			width : 10
        		},{
        			xtype        :'excombobox',
                	labelWidth   : 60,
                    fieldLabel   : '<span style="font-weight: 700;">담당스님</span>',
                    width        : 300,
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',     
                    reference    : 'lc_damdangMonkNameSagu',
                    emptyText    : '전체',
                	bind         : {
                    	store:'{ds_monk}'
                	}
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
        			width : 5,
        		},{
        			xtype     : 'exbutton',
              		reference : 'selectBtn',
              		name      : 'selectBtn',
              		text      : '조회',
              		handler   : 'onSelect',
        		}]
        	},{
        		height : 5
        	},{
        		layout : 'hbox',
        		items  : [{
        	
        		},{
        			xtype           : 'extextfield',
        			fieldLabel      : '<span style="font-weight: 700;">합계</span>',
        			labelWidth      : 65,
                    reference       : 'em_sum',
                    width           : 185 ,
                    exReadOnly      : true,
		            exType          : 'number',
		            exAlign         : 'right'
        		}]
        	},{        		
        		height : 10,
        	},{
        		xtype        :'cartesian',
           	    reference    :'rec003w_05_a',
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
                    title        : ['기제'],
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
