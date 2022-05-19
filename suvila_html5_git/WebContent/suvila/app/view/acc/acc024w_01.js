Ext.define('ExFrm.view.acc.acc024w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc024w_01',
	requires:[
		'ExFrm.view.acc.acc024w_01Controller',
        'ExFrm.view.acc.acc024w_01Model'
	],
	controller:'acc024w_01',
	viewModel:{
        type:'acc024w_01'
    },
    name:'acc024w_01',
    isRootView:true,
    title:'기간별결산(보고)',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
	    		xtype          : 'exdatefield',
	    		fieldLabel     : '<span style="font-weight: 700;">년도</span>',
	    		labelAlign     : 'right',
	    		labelWidth     : 45,	    		            	
                reference      : 'em_yyyy',
                name           : 'V_SACT_DATE',                                                   
                format         : 'Y',
                submitFormat   : 'Y',
                width          : 50,
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
                width        : 200,
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
                name         : 'V_KWAN',                    
                fieldLabel   : '<span style="font-weight: 700;">관</span>',
                labelAlign   : 'right',
                labelWidth   : 30,
                width        : 150,
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
                width        : 150,
                bind         : {
                 	store:'{ds_hang}'
                },
                listeners    : {
                	change : 'onHangChange'
                }	    	
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
	                reference    : 'acc024w_01_a',
	                height       : 820,
	                plugins      :[{
	                    ptype:'cellediting'
	                },{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_main}'
	                },
	                viewConfig    : {
	                    enableTextSelection: true
	                },
	                exGroupFields : ['YEAR','ACCT_NM',  'IE_GBN_NM' ,'KWAN_NAME' , 'HANG_NAME'],
	                cls : 'grid-group acc024w_01_a',
	                listeners      : {
	                	edit         : 'onEdit'
                    },
	                columns:[{		                
	                	text      :'회계구분',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCT_NM',                    
	                    exAlign   :'center',
	                    flex      : 3,
	                },{
	                	text      :'구분',
	                	xtype     :'excolumn',
	                    dataIndex :'IE_GBN_NM',                    
	                    exAlign   :'center',
	                    flex      : 1.8,
	                },{
	                	text      :'관',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    flex      : 3.6,
	                },{
	                	text      :'항',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    flex      : 3.6,
	                },{
	                	text      :'목',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    flex      : 3.6,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	meta.tdCls = 'exspanline';
                        	return value;
	                    }
	                },{
	                	text      :'결산금액',
	                	xtype     :'excolumn',
	                    dataIndex :'AMOUNT_SUM',                    	                    
	                    flex      : 3.6 ,
	                    exAlign   : 'right',
	                    exType    : 'number',
                        renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'exspanline';
                        	
                        	if(value == undefined || value == ""  || value == null){
                        		return 0;
                        	}
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