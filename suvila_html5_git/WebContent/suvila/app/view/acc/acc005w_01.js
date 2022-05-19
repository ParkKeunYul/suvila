Ext.define('ExFrm.view.acc.acc005w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc005w_01',
	requires:[
		'ExFrm.view.acc.acc005w_01Controller',
        'ExFrm.view.acc.acc005w_01Model',
        'Ext.chart.theme.Muted'
	],
	controller:'acc005w_01',
	viewModel:{
        type:'acc005w_01'
    },
    name:'acc005w_01',
    isRootView:true,
    title:'기간별결산',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                emptyText    : '전체',
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 80,
                width        : 230,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
                listeners    : {
                	change : 'onIegbnChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_iegbn',
                name         : 'V_IE_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">세입/세출</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 150,
                value        : 'I',
                bind         : {
                 	store:'{ds_iegbn}'
                },
                listeners    : {
                	change : 'onIegbnChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'KWAN',
                displayField : 'KWAN_NAME',
                reference    : 'lc_kwan',
                name         : 'V_IE_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">관</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 180,
                bind         : {
                 	store:'{ds_kwan}'
                },
                listeners    : {
                	change : 'onKwanChange'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'HANG',
                displayField : 'HANG_NAME',
                reference    : 'lc_hang',
                name         : 'V_HANG',                    
                fieldLabel   : '<span style="font-weight: 700;">항</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 180,
                bind         : {
                 	store:'{ds_hang}'
                },
	    	},{
        		width     : 5
        	},{
        		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'sel_date_gbn',
                name         : 'V_DATE_GBN',                                    
                fieldLabel   : '<span style="font-weight: 700;">년/월/일</span>',
                labelAlign   : 'right',
                labelWidth   : 60,
                width        : 130,
                value        : 8,
                bind         : {
                 	store:'{ds_ymd}'
                },
                listeners    : {
                	change : 'onDateField'
                }
	    	},{
        		width     : 5
	    	},{
                xtype          : 'exdatefield',
	    		fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 80,	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '엑셀',
	    	/*},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'downBtn',
          		name      : 'downBtn',
          		handler   : 'onDownload',
          		text      : '그래프다운로드',*/
        	}]
	      },{
	    	 height : 0,
	    	 items :[{
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
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },	            
	            items:[{
	            	height : 10
	            },{
	            	xtype: 'cartesian',
	            	reference   : 'acc005w_01_graph',
	                height : 450,
	                captions: {
	                    title: 'total',
	                    credits: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition'
	                },
	                theme: {
	                    type: 'muted'
	                },
	                bind         : {
	                 	store:'{ds_main}'
	                },
	                downloadServerUrl: '//svg.sencha.io',
	                animation: Ext.isIE8 ? false : {
	                    easing: 'backOut',
	                    duration: 500
	                },
	                axes: [{
	                    type: 'numeric3d',
	                    position: 'left',
	                    fields: 'AMOUNT',
	                   // maximum: 10000,
	                    majorTickSteps: 10,
	                    label: {
	                        textAlign: 'right'
	                    },
	                    renderer: 'onAxisLabelRender',
	                    //title: '결산서',
	                    grid: {
	                        odd: {
	                            fillStyle: 'rgba(255, 255, 255, 0.06)'
	                        },
	                        even: {
	                            fillStyle: 'rgba(0, 0, 0, 0.03)'
	                        }
	                    }
	                }, {
	                    type: 'category3d',
	                    position: 'bottom',
	                    fields: 'ACT_DATE',
	                    grid: true
	                }],
	                series: [{
	                    type: 'bar3d',
	                    xField: 'ACT_DATE',
	                    yField: 'AMOUNT',
	                    style: {
	                        minGapWidth: 20
	                    },
	                    highlightCfg: {
	                        saturationFactor: 1.5
	                    },
	                    label: {
	                        field: 'AMOUNT',
	                        display: 'insideEnd',
	                        renderer: 'onSeriesLabelRender'
	                    },
	                    tooltip: {
	                        trackMouse: true,
	                        renderer: 'onTooltipRender'
	                    }
	                }]
	            },{
	            	height : 50,
	            	html   : '<div style="width:100%;text-align:center;font-weight:700;font-size:20px;">마감일<br/><span id="ieSpan" style="display:inline-block;padding:5px 0 0 0;"></span></div>'
	            },{
	            	height : 10
	            },{
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc005w_01_a',
	                height      : 300,      
	                width       : 700,
	                plugins     : [{
	                	ptype: 'gridexporter'
	                }],
	                exGroupFields:['ACCT_NM','NAME'],
	                features: [{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  // 하단 잠금
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                cls : 'acc005w_01_a',
	                columns:[{	
	                	text      :'순번',
	                    xtype     :'rownumberer',
	                    width     : 80,
	                    align     :'center',
	                },{
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'center',
	                    width     : 140
	                },{
	                	text      :'세입/세출',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME',                    
	                    exAlign   :'center',
	                    width     : 120	
	                },{
	                	text      :'마감일자',
	                	xtype     :'excolumn',
	                    dataIndex :'ACT_DATE',                    
	                    exAlign   :'center',
	                    width     : 140,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'exspanline';
	                    	return exCommon.getGridDateFormat(value);
	                    },
	                },{
	                	text      :'금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT',                    
	                    exAlign   :'left',
	                    width     : 200 ,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'exspanline';
	                    	
	                    	return exCommon.setNumberFormat(value);
	                    },
	                    summaryType: 'sum',
	                    summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});