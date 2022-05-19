Ext.define('ExFrm.view.rec.rec010w_01',{
    extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.rec010w_01',
    requires:[
    	'ExFrm.view.rec.rec010w_01Controller',
        'ExFrm.view.rec.rec010w_01Model'
        //'ExFrm.view.widget.MultiGrouping',
		//'ExFrm.view.widget.MultiGroupingSummary'
    ],
    controller:'rec010w_01',
    viewModel:{
        type:'rec010w_01'
    },
    name:'rec010w_01',
    title:'피봇그리드',
    closable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
        	height : 5
        },{
        	 layout:'hbox',
        	 items : [{
        		 //html :'<div style="padding-top:4px;font-weight:700;">< 일일 접수 내역 ></div>'
        		 html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">일일 접수 내역</div>',
        	 },{
        		xtype        :'excombobox',
            	labelWidth   : 70,
                fieldLabel   : '<span style="font-weight: 700;">사용자명</span>',
                width        : 250,
                valueField   : 'USER_ID',
                displayField : 'USER_NM',     
                reference    :'lc_recUser',
                emptyText    : '전체',
            	bind         : {
                	store:'{ds_recUser}'
            	}
        	 },{
        		 width : 5
        	 },{
        		 xtype          : 'exdatefield',
        		 labelWidth     :  50,
                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">날짜</span>',
                 reference      : 'em_entry_date',
                 name           : 'V_DATE',                                                   
                 format         : 'Y/m/d',
        	 },{
        		 width : 5
        	 },{
            	 xtype     : 'exbutton',
                 text      : '조회',                 
                 reference : 'selectBtn',
                 handler   : 'onSelect',
        	 },{
        		 width : 5
        	 },{
	       		 xtype:'exbutton',
	             text:'엑셀출력',
	             handler:'onExcelBreak'
	       	},{
	       		layout : 'hbox',
	       		items :[{
	       			 xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">합계</span>',
	                 reference      : 'tot_amount_break',
	                 name           : 'tot_amount_break',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">현금</span>',
	                 reference      : 'cash_amount_break',
	                 name           : 'cash_amount_break',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">무통장</span>',
	                 reference      : 'mu_amount_break',
	                 name           : 'mu_amount_break',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">카드</span>',
	                 reference      : 'card_amount_break',
	                 name           : 'card_amount_break',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		}]
        	}]
        },{
        	height:5
        },{
        	xtype      : 'exgrid',
            width      : '99.9%',
            height     : 450,
            cls        : 'rec010w_01_a',
            reference  : 'rec010w_01',
            features   : [{
            	id                 : 'group',
                ftype              : 'groupingsummary',
            //    hideGroupedHeader  : true,
	         //   enableGroupingMenu : true,
	            startCollapsed : true,
	            expandTip  : '클릭하시면 정보를 볼수 있습니다.',
	            collapseTip: '클릭하시면 정보를 감출수 있습니다.',
            },{
            	ftype              : 'summary',
            	dock               : 'bottom'  // 하단 잠금
            }],
            plugins     : [{
            	ptype:'cellediting'
            },{
            	ptype: 'gridexporter'
            }],
           exGroupFields : ['NAME'],
            bind:{
                store:'{ds_breakdown}'
            },
            columns:[{
            	text         : '종류',
            	xtype        : 'excolumn',
                dataIndex    : 'NAME',
                width        : 110,
                exAlign      : 'left',
                summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return ' 합계 ';
                },
            },{
            	text         : '구분',
            	xtype        : 'excolumn',
                dataIndex    : 'DETAIL_NAME',
                width        : 180,
                exAlign      : 'left',
                summaryType: 'count',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return '총 '+exCommon.setNumberFormat(value)+' 건';
                },
            },{
            	text         : '종류',
            	xtype        : 'excolumn',
                dataIndex    : 'ACCEPT_SEQ',
                width        : 160,
                exAlign      : 'center',
            },{
            	text         : '신청자',
            	xtype        : 'excolumn',
                dataIndex    : 'NAME_KOR',
                width        : 100,
                exAlign      : 'left',
            },{
            	text         : '신도번호',
            	xtype        : 'excolumn',
                dataIndex    : 'PROPOSAL_BUD_NO',
                width        : 130,
                exAlign      : 'center',
            },{
            	text         : '전화번호',
            	xtype        : 'excolumn',
                dataIndex    : 'TELNO',
                width        : 120,
                exAlign      : 'center',
            },{
            	text         : '수입',
            	xtype        : 'excolumn',
                dataIndex    : 'P_AMOUNT',
                width        : 100,
                exAlign   : 'right',
                exType    : 'number',
                summaryType: 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return exCommon.setNumberFormat(value);
                },
            },{
            	text           : '지출',
            	xtype          : 'excolumn',
                dataIndex      : 'M_AMOUNT',
                width        : 100,
                exAlign        : 'right',
                exType         : 'number',
                summaryType    : 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return exCommon.setNumberFormat(value);
                },
            },{
            	text           : '금액',
            	xtype          : 'excolumn',
                dataIndex      : 'AMOUNT',
                width          : 110,
                exAlign        : 'right',
                exType         : 'number',
                summaryType    : 'sum',
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	return exCommon.setNumberFormat(value);
                },
            },{
            	text         : '접수상태',
            	xtype        : 'excolumn',
                dataIndex    : 'CNT',
                width        : 100,
                exAlign      : 'center',
                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                	
                	var temp = "수납";
                	if(value == 1 || value == "1") temp = "신규";
                	
                	return temp;
                },
                summaryType  : 'sum', 
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	 return '신규 : '+exCommon.setNumberFormat(value) + "건";
                }
            },{
            	text         : '결제방법',
            	xtype        : 'excolumn',
                dataIndex    : 'APPROVAL_GBN',
                width        : 100,
                exAlign      : 'center',
                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                	
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_approvalGbn');
                	return exCommon.getComboVal(value,store, '' );
                },
                
            },{
            	text         : '비고',
            	xtype        : 'excolumn',
                dataIndex    : 'REMARK',
                width        : 250,
                exAlign      : 'left',
            /*},{
            	text         : '신규접수',
            	xtype        : 'excolumn',
                dataIndex    : 'CNT',
                flex         : 1.2,
                exAlign      : 'left',
                summaryType  : 'sum', 
                summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
                	 //return exCommon.setNumberFormat(value) + "건";
                },*/
            }]
        },{
        	height:5
        },{
             layout:'hbox',
	       	 items : [{
	       		 //html :'<div style="padding-top:4px;font-weight:700;">< 일일 접수 결산 ></div>'
	       		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">일일 접수 결산</div>',
	       	 },{
	       		 xtype          : 'exdatefield',
	       		 labelWidth     :  50,
	                fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">날짜</span>',
	                reference      : 'em_entry_date2',
	                format         : 'Y/m/d',
	       	 },{
	       		 width : 5
	       	 },{
	           	 xtype     : 'exbutton',
	             text      : '조회',                 
	             reference : 'selectBtn',
	             handler   : 'onSelectDaily',
	       	},{
	       		 width : 5
	       	},{
	       		 xtype:'exbutton',
	             text:'엑셀출력',
	             handler:'onExcel'
	       	},{
	       		layout : 'hbox',
	       		items :[{
	       			 xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">합계</span>',
	                 reference      : 'tot_amount',
	                 name           : 'tot_amount',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">현금</span>',
	                 reference      : 'cash_amount',
	                 name           : 'cash_amount',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">무통장</span>',
	                 reference      : 'mu_amount',
	                 name           : 'mu_amount',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		},{
	       			 width : 5
	       		},{
	       			xtype          : 'extextfield',
	        		 labelWidth     :  45,
	                 fieldLabel     : '<span style="font-weight: 700;display:inline-block;text-align:right;width:41px;">카드</span>',
	                 reference      : 'card_amount',
	                 name           : 'card_amount',
	                 width          : 140,
	                 exReadOnly     : true,
		             exType         : 'number',
		             exAlign        : 'right',
		             value          : 0
	       		}]
	       	}]
        },{
        	height : 5
        },{
        	xtype      : 'pivotgrid',
            width      : 300,
            height     : 360,            
            exGroupRef : true,
            cls        : 'rec010w_01_b',
            reference:'pivotGrid',
            plugins:{
                ptype:'pivotexporter'
            },
            bind:{
               store:'{ds_dailyReport}'
            },
            startColGroupsCollapsed: true,
            matrix: {
            	viewLayoutType: 'outline',
                leftAxis:[{
                    dataIndex:'NAME',
                    header:'종류'
                },{
                    dataIndex:'DETAIL_NAME',
                    header:'구분',
                    width : 150
                }],
                
                topAxis:[{
                    dataIndex:'USER_NM',
                    expanded:true,
                    expand:true                
                }],
                
                aggregate: [{                
                    dataIndex: 'CASH_CMS_AMOUNT',
                    header: '현금',
                    aggregator: 'sum',
                    width: 90,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value)) ;
                    }
                },{
                	dataIndex: 'MU_AMOUNT',
                    header: '무통장',
                    aggregator: 'sum',
                    width: 90,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    }
                },{
                	dataIndex: 'CARD_AMOUNT',
                    header: '카드',
                    aggregator: 'sum',
                    width: 90,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value) );
                    }               
                },{
                	dataIndex: 'AMOUNT_SUM',
                    header: '합계',
                    aggregator: 'sum',
                    width: 90,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                    }
                },{
                	dataIndex: 'CNT',
                    header: '신규<br/>접수',
                    aggregator: 'sum',
                    width: 50,
                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                    	return exCommon.setNumberFormat(exCommon.getRepNum(value))+"건";
                    }
                }],
                textTotalTpl:'소계 ({name})',
                textGrandTotalTpl:'총계',
             //   rowSubTotalsPosition:'top',   // top, bottom
             //   colSubTotalsPosition:'left' // left, right
            },           
            //rowSubTotalsPosition:'none'
/*
            aggregate:[{
                measure:'point',
                header:'합계',
                aggregator:'sum',
                align:'right',
                width:85,
                renderer:Ext.util.Format.numberRenderer('0,000.00')
            }]
            */
        //}
        }]
    }]
})