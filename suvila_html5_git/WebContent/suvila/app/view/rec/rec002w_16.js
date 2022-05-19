Ext.define('ExFrm.view.rec.rec002w_16',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec002w_16',
	requires:[
		'ExFrm.view.rec.rec002w_16Controller',
        'ExFrm.view.rec.rec002w_16Model'
	],
	controller:'rec002w_16',
	viewModel:{
        type:'rec002w_16'
    },
    name:'rec002w_16',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
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
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
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
	        			width : 5
	    	    	},{
	                	xtype           : 'extextfield',
	                    reference       : 'txt_stipulation',
	                   // value           : '',
	                    enableKeyEvents : true,
	                    width           : 110 ,
	                    listeners       : {
	                 	   keyup : 'onSearchEnter'
	                    },
	                    value : '01-00002-0-01'
	    	    	},{
	        			width : 5
	        		},{
	               	 	xtype    : 'exbutton',
	                    iconCls  : 'fa fa-search',
	                    text     : '검색',
	                    handler  : 'onBudSearch',
	                    reference: 'budSearchBtn',
	    	    	},{
            			width : 5
            		},{
	        			xtype        :'excombobox',
	                    width        : 80,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',     
	                    reference    : 'cb_date',
	                    value        : 1,
	                	bind         : {
	                    	store:'{ds_date_type}'
	                	},
	                	listeners    : {
	                    	change : 'onDateField'
	                    }
            		},{
            			width : 5
	    	    	},{
	    	    		xtype          : 'exdatefield',
                        reference      : 'me_SDate',
                        format         : 'Y-m-d',
                        width          : 100
            		},{
            			html :'<div style="text-align:center;width:20px;font-weight:700;line-height:24px;">~</div>',
            			width : 20
            		},{
            			xtype          : 'exdatefield',
                        reference      : 'me_EDate',
                        format         : 'Y-m-d',
                        width          : 100
            		
	        		},{
	        			width : 5,
	        		},{
	        			xtype        :'excombobox',
	                	labelWidth   : 60,
	                    fieldLabel   : '<span style="font-weight: 700;">기도종류</span>',
	                    width        : 220,
	                    valueField   : 'PRAY_CODE',
	                    displayField : 'PRAY_NM',     
	                    reference    :'lc_aprayMgt',
	                    emptyText    : '전체',
	                	bind         : {
	                    	store:'{ds_aprayMgt}'
	                	}
	        		},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'selectBtn',
	              		name      : 'selectBtn',
	              		text      : '조회',
	              		handler   : 'onSelect',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '파일 저장 및 출력',
	              		handler   : 'onExcel',
	        		},{
	        			width : 0,
	        			heigth: 0,
	        			items : [{
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
	    	        		xtype            : 'extextfield',
	                        reference        : 'hid_bud_no',
	                        value            : '',
	                        inputType        : 'hidden',
	                        name             : 'V_BUD_NO'
	            		},{
	            			xtype            : 'extextfield',
	                        reference        : 'txt_budNo',
	    	    		}]
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec002w_16_a',
	                height     : 800,
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind       : {
	                    store:'{ds_GDRec}'
	                },
                    exGroupFields:[
                    	 'ADDR'
                    	,'ACCEPT_SEQ'
                    	,'PRAY_NM'
                    	,'START_YYYYMM'
                    ],
	                cls       : 'rec002w_16_a  none-dirty-grid',
	                columns   : [{
	                	text        : '순번',
                        xtype       : 'rownumberer',
                        width       : 70,
                        align       : 'center',
	                },{
	                	text      :'주소',
	                	xtype     :'excolumn',
	                    dataIndex :'ADDR',                    
	                    exAlign   :'left',
	                    width     : 370,
	                    sortable  : true,
	                },{
	                	text      :'관계',
	                	xtype     :'excolumn',
	                    dataIndex :'REPRESEN_REL',                    
	                    exAlign   :'center',
	                    width     :80,
	                    sortable  : true,
	                },{
	                	text      :'간지',
	                	xtype     :'excolumn',
	                    dataIndex :'GANJI',                    
	                    exAlign   :'center',
	                    width     : 80,
	                    sortable  : true,
	                },{
	                	text      :'신도명',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME_KOR',                    
	                    exAlign   :'left',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'PROPOSAL_BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 150,
	                    sortable  : true,
	                },{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                    sortable  : true,
	                },{
	                	text      :'기도명',
	                	xtype     :'excolumn',
	                    dataIndex :'PRAY_NM',                    
	                    exAlign   :'left',
	                    width     : 130,
	                    sortable  : true,
	                },{
	                	text      :'시작월',
	                	xtype     :'excolumn',
	                    dataIndex :'START_YYYYMM',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    sortable  : true,
	                }],
	                viewConfig: {
	                	getRowClass: function(record, index) {
                        	return 'recCellNotEdit';
	                    }
	                }
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546