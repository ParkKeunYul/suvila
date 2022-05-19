Ext.define('ExFrm.view.acc.acc020w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc020w_01',
	requires:[
		'ExFrm.view.acc.acc020w_01Controller',
        'ExFrm.view.acc.acc020w_01Model'
	],
	controller:'acc020w_01',
	viewModel:{
        type:'acc020w_01'
    },
    name:'acc020w_01',
    isRootView:true,
    title:'계정별원장',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 15,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
        		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'sel_date_gbn',
                name         : 'sel_date_gbn',                                    
                fieldLabel   : '<span style="font-weight: 700;">일/월</span>',
                labelAlign   : 'right',
                labelWidth   : 50,
                width        : 110,
                value        : 8,
                bind         : {
                 	store:'{ds_ymd}'
                },
                listeners    : {
                	change : 'onDateField'
                }
        	},{
        		html : '<div style="text-align:center;font-weight: 700;line-height:24px;padding:0 5px;">기간 :</div>'
        	},{
	    		xtype          : 'exdatefield',
	    		/*
	    		fieldLabel     : '<span style="font-weight: 700;">기간</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 40,
	    		*/
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                format         : 'Y-m-d',
        	},{
        		width     : 5
	    	},{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 200,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
	    	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onSelect',
          		text      : '조회',	    	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onExcel',
          		text      : '파일 저장 및 출력',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		handler   : 'onPrint',
          		text      : '인쇄',
	    	},{
	    		width : 0,
	    		height: 0,
	    		items : [{
	    			xtype            : 'extextfield',
                    reference        : 'SEARCH_DATE',
                    inputType        : 'hidden',
	    		}]
        	}]
	    },{
	    	 height : 30,
	    	 layout : 'hbox',
	    	 items :[{
	    		 xtype          : 'extextfield',
	 	    	 fieldLabel     : '<span style="font-weight: 700;">이전 누적금액</span>',
	 	    	 labelAlign     : 'right',
	 	    	 labelWidth     : 100,	    		            	
	             reference      : 'me_pAmount',
	             name           : 'me_pAmount',
	             exReadOnly     : true,
	             exType         : 'number',
	             exAlign        : 'right'
	    	 },{
	    		 xtype          : 'extextfield',
	 	    	 fieldLabel     : '<span style="font-weight: 700;">수입</span>',
	 	    	 labelAlign     : 'right',
	 	    	 labelWidth     : 50,	    		            	
	             reference      : 'me_iAmount',
	             name           : 'me_iAmount',
	             exReadOnly     : true,
	             exType         : 'number',
	             exAlign        : 'right'
	    	 },{
	    		 xtype          : 'extextfield',
	 	    	 fieldLabel     : '<span style="font-weight: 700;">지출</span>',
	 	    	 labelAlign     : 'right',
	 	    	 labelWidth     : 50,	    		            	
	             reference      : 'me_oAmount',
	             name           : 'me_oAmount',
	             exReadOnly     : true,
	             exType         : 'number',
	             exAlign        : 'right'
	    	 },{
	    		 xtype          : 'extextfield',
	 	    	 fieldLabel     : '<span style="font-weight: 700;">누적금액</span>',
	 	    	 labelAlign     : 'right',
	 	    	 labelWidth     : 80,	    		            	
	             reference      : 'me_tAmount',
	             name           : 'me_tAmount',
	             exReadOnly     : true,
	             exType         : 'number',
	             exAlign        : 'right'
	    	 },{
	    		 width : '0.5%'
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
	         },{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_total',       	 		
       	 		width     : 0,
       	 		value     : 0
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
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'acc020w_01_a',
	                height       : 770,
	                plugins      :[{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_main}'
	                },
	                viewConfig    : {
	                    enableTextSelection: true
	                },
	                features: [{
	                	id                 : 'group',
	                    ftype              : 'groupingsummary',
	                    hideGroupedHeader  : true,
	                    enableGroupingMenu : false,
	                    groupHeaderTpl     : '작성월 : {name} ',
	                },{
	                	ftype              : 'summary',
	                	dock               : 'bottom'  // 하단 잠금
	                }],
	                exGroupFields : ['ACCT_NM', 'IE_GBN' , 'KWAN_NAME', 'HANG_NAME'],
	                cls : 'grid-group acc020w_01_a',
	                columns:[{		                
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'left',
	                    width     : 140,
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN',                    
	                    exAlign   :'center',
	                    width     : 80,
	                    /*renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_iegbn');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }*/
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    width     : 150,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 170,
	                    summaryType: 'count',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return "총 계"
                        }
	                },{
	                	text      :'수입',
	                	xtype     :'excolumn',
	                    dataIndex :'I_AMOUNT',                    	                    
	                    width     : 150,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
	                },{
	                	text      :'지출',
	                	xtype     :'excolumn',
	                    dataIndex :'O_AMOUNT',                    	                    
	                    width     : 150,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    summaryType: 'sum',
                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                        	return exCommon.setNumberFormat(value)+' 원';
                        },
                        /*exportStyle:[{
                        	format : 'Number'
                        }]*/
	                },{
	                	text      :'영수인',
	                	xtype     :'excolumn',
	                    dataIndex :'USER_NM',                    	                    
	                    width     : 130,
	                    exAlign   : 'left'
	                },{
	                	text      :'적요',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',
	                    exAlign   : 'left',
	                    width     : 210,
	                }]
	            }]// 가운데	     
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});