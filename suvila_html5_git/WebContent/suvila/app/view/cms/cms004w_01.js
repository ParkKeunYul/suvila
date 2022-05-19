Ext.define('ExFrm.view.cms.cms004w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cms004w_01',
	requires:[
		'ExFrm.view.cms.cms004w_01Controller',
        'ExFrm.view.cms.cms004w_01Model',
        'Ext.chart.theme.Muted'
	],
	controller:'cms004w_01',
	viewModel:{
        type:'cms004w_01'
    },
    name:'cms004w_01',
    isRootView:true,
    title:'CMS출금통계',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	layout:'hbox',
            	items:[{
            		xtype:'excombobox',
                	fieldLabel:'사찰계좌정보',
                	fieldStyle: 'text-align: right;',
                	labelWidth:90,
                    valueField:'CMS_TRADE_CD',
                    displayField:'CMS_CUSTOMER_COMMENT',
                    reference:'lc_cms_trade_cd',
                    emptyText : '전체[]',
                    value : '',
                    width : 250,
                    bind:{
                     	store:'{ds_temple_CMS_info}'
                    },
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{CMS_TRADE_CD}: {description}"><span >{CMS_CUSTOMER_COMMENT}</span>[{CMS_TRADE_CD}]</div>'
                        ]
                    },
            	},{
            		width : 5
            	},{
            		xtype:'excombobox',
                	fieldLabel:'년/월/일',
                	fieldStyle: 'text-align: right;',
                	labelWidth:90,
                    valueField:'value',
                    displayField:'display',
                    reference:'sel_date_gbn',
                    emptyText : '년',
                    value : '8',
                    width : 150,
                    bind:{
                     	store:'{ds_dateType}'
                    },
                    
            	},{
    	    		xtype:'exdatefield',
    	    		fieldLabel:'출금일',
    	    		labelWidth:60,	    		            	
                    reference:'em_sDate',
                    name:'em_sDate',                                                   
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
    	    	},{
    	    		width : 20,
    	    		html : '<div style="text-align:center;">~</div>'
    	    	},{
    	    		xtype:'exdatefield',
                    reference:'em_eDate',
                    name:'em_eDate',                                   
                    width : 170,
                    exFormat : 'Y/m/d',
                    exSubmitFormat : 'Ymd',
            	}]
            },{
            	width : 5
            },{
            	xtype     : 'exbutton',
          		reference : 'selectCmsBtn',
          		name      : 'selectCmsBtn',
          		handler   : 'onSelect',
          		text      : '조회',
            },{
            	width : 20
            },{
                xtype: 'segmentedbutton',
                flex : 1,
                items: [{
                    text: '계단',
                    pressed: true
                }, {
                    text: '그룹'
                }],
                listeners: {
                    toggle: 'onStackedToggle'
                }
        	},{
        		width : '0.5%'
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	 layout:'vbox',
	        	 width:'99%',
	             items:[{
	            	height : 20, 
	             },{
	            	 layout :'hbox',
	            	 width  :'100%',
	            	 hegiht : 100,
            		 items:[{
            			 xtype:'extextfield',
                         reference:'em_SAave',
                         fieldLabel:'성공금액평균 :',
                         filedStyle : 'text-align:left;background:#d0e4f3',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_SAave',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_SAsum',
                         fieldLabel:'성공금액합계 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_SAsum',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_SCave',
                         fieldLabel:'성공건수평균 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_SAsum',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_SCsum',
                         fieldLabel:'성공건수합계 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_SCave',
                         exNumberComma : true,
                         value : 0
            		 }]
	             },{
	            	 layout :'hbox',
	            	 width  :'100%',
	            	 items:[{
            			 xtype:'extextfield',
                         reference:'em_FAave',
                         fieldLabel:'실패금액평균 :',
                         filedStyle : 'text-align:left;background:#d0e4f3',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_FAave',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_FAsum',
                         fieldLabel:'실패금액합계 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_FAsum',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_FCave',
                         fieldLabel:'실패건수평균 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_FCave',
                         exNumberComma : true,
                         value : 0
            		 },{
            			 xtype:'extextfield',
                         reference:'em_FCsum',
                         fieldLabel:'실패건수합계 :',
                         filedStyle : 'text-align:left;',
                         exReadOnly:true,
                         exAlign:'right',
                         name:'em_FCsum',
                         exNumberComma : true,
                         value : 0
            		 }]
	             },{
	            	 xtype: 'cartesian',
	            	 reference:'cms004w_01_a',
	                 width: '100%',
	                 height: 700,
	                 theme: 'Muted',
	                 insetPadding: '70 40 0 40',
	                 interactions: ['itemhighlight'],
	                 animation: {
	                     duration: 200
	                 },
	                 /*store: {
	                     type: 'twoYearSales'
	                 },*/
	                 bind:{
	                    //	store:'{twoYearSales}'
	                	 store:'{ds_main}'
	                 },
	                 legend: {
	                     docked: 'bottom'
	                 },
	                 sprites: [{
	                     type: 'text',
	                  //   text: 'Sales in Last Two Years',
	                     textAlign: 'center',
	                     fontSize: 18,
	                     fontWeight: 'bold',
	                     width: 100,
	                     height: 30,
	                     x: 325, // the sprite x position
	                     y: 30  // the sprite y position
	                 }, {
	                     type: 'text',
	                 //    text: 'Quarter-wise comparison',
	                     textAlign: 'center',
	                     fontSize: 16,
	                     x: 325,
	                     y: 50
	                 }, {
	                     type: 'text',
	                   //  text: 'Source: http://www.w3schools.com/',
	                     fontSize: 10,
	                     x: 12,
	                     y: 495
	                 }],
	                 axes: [{
	                     type: 'numeric3d',
	                     position: 'left',
	                     fields: ['AMOUNT1', 'AMOUNT2'],
	                     grid: true,
	                     title: '금액 합계(단위 : 천원)',
	                     renderer: 'onAxisLabelRender'
	                 }, {
	                     type: 'category3d',
	                     position: 'bottom',
	                     fields: 'SUB_DATE',
	                     title: {
	                         text: '접수일',
	                         translationX: -30
	                     },
	                     grid: true
	                 }],
	                 series: {
	                     type: 'bar3d',
	                     stacked: true,
	                     showInLegend : true,
	                     title: ['성공금액', '실패금액'],
	                     xField: 'SUB_DATE',
	                     yField: ['AMOUNT1', 'AMOUNT2'],
	                     label: {
	                         field: ['AMOUNT1', 'AMOUNT2'],
	                         display: 'insideEnd',
	                         renderer: 'onSeriesLabelRender'
	                     },
	                     highlight: true,
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
	    }]/*container*/
    }]/*exformmain*/ 
});