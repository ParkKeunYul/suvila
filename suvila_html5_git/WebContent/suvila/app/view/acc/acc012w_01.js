
Ext.define('ExFrm.view.acc.acc012w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc012w_01',
	requires:[
		'ExFrm.view.acc.acc012w_01Controller',
        'ExFrm.view.acc.acc012w_01Model'
	],
	controller:'acc012w_01',
	viewModel:{
        type:'acc012w_01'
    },
    name:'acc012w_01',
    isRootView:true,
    title:'기간별결산',
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
        		width : '0.5%'
        	},{
        		html : '<div style="text-align:center;font-weight: 700;line-height:24px;padding-right:5px;">마감일자 : </div>'
        	},{
	    		xtype          : 'exdatefield',
	    		/*fieldLabel     : '<span style="font-weight: 700;">마감일자</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 80,*/	    		            	
                reference      : 'em_sDate',
                name           : 'V_SACT_DATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
        	},{
	    		width : 20,
	    		html : '<div style="text-align:center;font-weight: 700;line-hegiht:24px;">~</div>' 
	    	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_eDate',
                name           : 'V_EACT_DATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width     : 5
	    	},{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                emptyText    : '전체',
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
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
	    		width     : 20
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
          		handler   : 'onExcel',
          		text      : '출력 및 파일저장',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'printBtn',
          		name      : 'printBtn',
          		handler   : 'onPrint',
          		text      : '출력',
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
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'acc012w_01_a',
	                height      : 820,              
	                plugins     : [{
	                	ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter'
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                listeners      : {
	                	 /*containermouseover: {
	                         fn: function (view) {
	                             view.up('gridpanel').getEl().applyStyles('border: solid 1px red');
	                         }
	                     },
	                     containermouseout: {
	                         fn: function (view) {
	                             view.up('gridpanel').getEl().applyStyles('border: solid 1px #99bce8');
	                         }
	                     }*/
                    },
                    /*viewConfig: {
                        getRowClass: function(record, rowIndex, rowParams, store) {
                            console.log('record.dirty = ', record);
                        }
                    },*/
	                cls : 'acc012w_01_a',
	                exGroupFields:['ACCT_NM','IE_GBN_NM', 'KWAN_NAME', 'HANG_NAME', 'MOK_NAME'],
	                columns:[{	
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'center',
	                    width     : 180,
	                    
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN_NM',                    
	                    exAlign   :'center',
	                    width     : 120,
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    width     : 220,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    width     : 220,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    width     : 220,
	                },{
	                	text      :'결산금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_SUM',                    
	                    exAlign   :'left',
	                    width     : 220,
	                    exAlign   : 'right',
	                    exType    : 'number',
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'exspanline';
	                    	
	                    	return exCommon.setNumberFormat(value);
	                    }
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});