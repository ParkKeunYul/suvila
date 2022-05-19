Ext.define('ExFrm.view.rec.rec000p_05',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.rec.rec000p_05Controller',
    	'ExFrm.view.rec.rec000p_05Model'
    ],
    controller:'rec000p_05',
    viewModel:{
        type:'rec000p_05'
    },
    isModal:true,
    name:'rec000p_05',
    title:'수납현황',
    closable:true,
    width:1100,
    height:810,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype  : 'exformmain',*/
        width  : '99.8%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	height : 35,
        	layout  : 'hbox',
	       	items   : [{
	       		width : '0.5%'
	       	},{
	       		html      : '<div style="font-weight: 700;line-height:30px;font-wegiht:700;">수납일 : </div>',
	       		width     : 55
	       	},{
	       		xtype          : 'exdatefield',
	    		labelAlign     : 'left',
                reference      : 'em_sDate',
                name           : 'V_SDATE',
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;font-wegiht:700;line-height:25px;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EDATE',                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 3
	    	},{
	    		 xtype     : 'exbutton',
	          	 reference : 'oneDayBtn',
	          	 name      : 'oneDayBtn',
	          	 text      : '1일',
	          	 handler   : 'onOneDay',
	    	},{
        		width     : 3
	    	},{
	    		 xtype     : 'exbutton',
	          	 reference : 'oneYearBtn',
	          	 name      : 'oneYearBtn',
	          	 text      : '1년',
	          	 handler   : 'onOneYear',
	       	},{
	       		 xtype        : 'excombobox',
	       		fieldLabel   : '<span style="font-wegiht:700;">항목</span>',
	           	 labelWidth   : 40,
	             valueField   : 'CODE',
	             displayField : 'NAME',
	             reference    : 'lc_rec',
	             name         : 'V_REC',                    	                    
	             width        : 190,
	             bind:{
	                 	store:'{ds_rec}'
	             }
	       	},{
	       		 xtype        : 'excombobox',
	           	 fieldLabel   : '<span style="font-wegiht:700;">수납구분</span>',
	           	 labelWidth   : 70,
	             valueField   : 'CODE',
	             displayField : 'NAME',
	             reference    : 'lc_approv',
	             name         : 'V_APPROVAL_GBN',
	             emptyText    : '전체',
	             width        : 220,
	             bind:{
	                 	store:'{ds_approv}'
	             } 
	         },{
	       		 width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 text      : '조회',
	          	 handler   : 'onSelect',
	       	 },{
	       		 width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 text      : '엑셀',
	          	 handler   : 'onExcel',
	       	 },{
	       		 width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 text      : '인쇄',
	          	 handler   : 'onPrintBase',
	       	 },{
	       		 width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 handler   : 'onClose',
	          	 text      : '닫기',
	       	 }]
        
        },{
        	height : 5
        },{
        	xtype   :'exfieldsetblockbox',
        	items   : [{
    			xtype:'exblockrow',
    			items:[{
    				xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-wegiht:700;">가족코드</div>'
    			},{
    				xtype   : 'exblockfield',
    				items   : [{
    					xtype      : 'extextfield',
                        reference  : 'txt_bud_code',
                        name       : 'V_BUD_NO',
                        exReadOnly : true
    				}]
    			},{
    				xtype   : 'exblocklabel',
                    html    : '<div style="text-align:left;padding-left:5px;font-wegiht:700;">대표신도</div>'
    			},{
    				xtype   : 'exblockfield',
    				items   : [{
    					xtype      : 'extextfield',
                        reference  : 'txt_daeju',
                        name       : 'V_DAEJU',
                        exReadOnly : true
    				}]
    			}]
    			
        	}]
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	 width : '99%',
            	 items  :[{
             		exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'rec000p_05_a',
                    height     : 635,
                    align      : 'center',                    
                    bind:{
                        store:'{ds_main}'
                    },                 
                    /*listeners:{
                    	celldblclick    : 'onCellDbClick'
                    },*/
                    plugins     : [{
                    	ptype: 'gridexporter'
                    }],
                    columns:[{                   
                    	text  :'No',
                        xtype :'rownumberer',
                        width : 60,
                        align : 'center',
                    },{
                     	xtype       : 'excolumn',
                        text        : '수납일',
                        dataIndex   : 'SUNAB_DATE',
                        exAlign     : 'left',
                        flex        : 1.6,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                     	xtype       : 'excolumn',
                        text        : '접수항목',
                        dataIndex   : 'ACCPET_NM',
                        exAlign     : 'left',
                        flex        : 1.6 
                    },{
                     	xtype       : 'excolumn',
                        text        : '접수내역',
                        dataIndex   : 'REC_DETAIL_NM',
                        exAlign     : 'left',
                        flex        : 3.6 
                    },{
                     	xtype       : 'excolumn',
                        text        : '금액',
                        dataIndex   : 'AMOUNT',
                        exAlign     : 'left',
                        flex        : 1.8,
                        exType      : 'number',
                        exAlign     : 'right',
                    },{
                     	xtype       : 'excolumn',
                        text        : '납부월',
                        dataIndex   : 'PAYMENT_YYYYMM',
                        exAlign     : 'center',
                        flex        : 1.4,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getGridDateFormat(value,' / ', 6 );
                        }
                    },{
                     	xtype       : 'excolumn',
                        text        : '수납구분',
                        dataIndex   : 'APPROVAL_NM',
                        exAlign     : 'center',
                        flex        : 1.6
                    },{
                     	xtype       : 'excolumn',
                        text        : '비고',
                        dataIndex   : 'REMARK',
                        exAlign     : 'left',
                        flex        : 3.6,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var APPROVAL_GBN = record.get("APPROVAL_GBN");
                        	if(APPROVAL_GBN == 2){
                        		return "<a href='#'>[ 카드 영수증 ]</a>";
                        	}else{
                        		return value;
                        	}
                        }
                    }]
             	}]            	 	
            },{
            	width : '0.5%'
            }]
        }]
        
    }]
})