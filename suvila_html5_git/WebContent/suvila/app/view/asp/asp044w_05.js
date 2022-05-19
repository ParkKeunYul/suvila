Ext.define('ExFrm.view.asp.asp044w_05',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_05',
	requires:[
		'ExFrm.view.asp.asp044w_05Controller',
        'ExFrm.view.asp.asp044w_05Model'
	],
	controller:'asp044w_05',
	viewModel:{
        type:'asp044w_05'
    },
    name:'asp044w_05',
    isRootView:true,
    title:'인등 소등관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width  : '99%',
	        	layout : 'hbox',
	        	items  : [{
	        		width : 310,
	        		layout : 'vbox',
	        		items  : [{
	        			height : 5
	        		},{
	        			html    : '<span style="font-weight:700;line-height:30px;">사찰정보</span>',
	        			height : 30
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_05_a',
	                    cls           : 'none-dirty-grid asp044w_05_a',
	                    height        : 800,
	                    width         : '100%',
	                    bind          : {
	                        store:'{ds_templeCd}'
	                    },
	                    listeners      : {
	                    	selectionchange : 'onSelectionTemple'
	                    },
	                    columns:[{
	                    	text        : '사찰코드',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_CD',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                        sortable    : true,
	                    },{
	                    	text        : '사찰명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_NM',                    
	                        exAlign     : 'left',
	                        width       : 200,
	                        sortable    : true,
	                    }]
	        		}]
	        	},{
	        		width : 5
	        	},{
	        		layout : 'vbox',
	        		flex   : 1,
	        		items  : [{
	        			height : 5
	        		},{
	        			layout : 'hbox',
	        			items  : [{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'search_type',
		                    width        : 100,
		                    value        : 'bud_no',
		                    bind:{
		                     	store:'{ds_search}'
		                    },
		                    /*
		                    listeners   : {
                                change : 'onAcceptChange',
                            },
                            */
		        		},{
		        			width : 3
		        		},{
		        			xtype     : 'extextfield',
        	       	 		reference : 'bud_no',
        	       	 		width     : 150
		        		},{
		        			width : 3
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">계좌상태</span>',
		        			labelWidth   :70,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'lc_cms_account_status',
		                    width        : 170,
		                    value        : '',
		                    bind:{
		                     	store:'{ds_cms_account_status}'
		                    }
		        		},{
		        			width : 3
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">CMS삭제</span>',
		        			labelWidth   :70,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'del_yn',
		                    width        : 170,
		                    value        : '',
		                    bind:{
		                     	store:'{ds_del}'
		                    }
		        		},{
		        			width : 3
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">신도삭제</span>',
		        			labelWidth   :70,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'sin_del_yn',
		                    width        : 170,
		                    value        : '',
		                    bind:{
		                     	store:'{ds_del}'
		                    }
		        		},{
		        			width : 5
		        		},{
		    	    		xtype     : 'exbutton',
		              		text      : '조회',
		              		handler   : 'onSelect',
		    	    	},{
		        			width : 5,	        		
		    	    	},{
		    	    		xtype     : 'exbutton',	              		
		              		text      : '저장',
		              		handler   : 'onSave',
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
            	    		}]
	        			}]
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_05_b',
	                    cls           : 'none-dirty-grid asp044w_05_b',
	                    height        : 533,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_main}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    listeners      : {
	                    	selectionchange : 'onSelection'
	                    },
	                    columns:[{
	                    	text        : '신도번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'BUD_NO',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '신도명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'NAME_KOR',                    
	                        exAlign     : 'left',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '은행',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'IF_PAYMENT_BANK_CD',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        sortable    : true,
	                    },{
	                    	text        : '계좌번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'IF_PAYMENT_ACCOUNT',                    
	                        exAlign     : 'left',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCOUNT_SEQ',                    
	                        exAlign     : 'center',
	                        width       : 60,
	                        sortable    : true,
	                    },{
	                    	text        : '출금일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CMS_PAYMENT_DAY',                    
	                        exAlign     : 'center',
	                        width       : 65,
	                        sortable    : true,
	                    },{
	                    	text        : 'CMS삭제',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'REG_GBN',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_del2');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_del2}'
	                            }
	                        },
	                    },{
	                    	text        : '신도삭제',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ORG_REG_NO',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        //	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_del2');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                    },{
	                    	text        : '사철정보',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CMS_TRADE_CD',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        sortable    : true,
	                    },{
	                    	text        : '휴대전화',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'MOBILE_TELNO',                    
	                        exAlign     : 'left',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '사용',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'USE_YN',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_del2');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                    },{
	                    	text        : '계좌상태',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CMS_ACCOUNT_STATUS',                    
	                        exAlign     : 'center',
	                        width       : 95,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_cms_account_status');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        
	                    },{
	                    	text        : '수정일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ORG_IF_PAYMENT_ACCOUNT',                    
	                        exAlign     : 'center',
	                        width       : 145,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	return value.substr(0,8);
	                        }
	                    },{
	                    	text        : '수정자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'IF_MEMBER_ID',                    
	                        exAlign     : 'center',
	                        width       : 110,
	                        sortable    : true,
	                    },{
	                    	text        : '비고',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'REMARK',                    
	                        exAlign     : 'left',
	                        width       : 230,
	                        sortable    : true,
	                    }],
	                    viewConfig: {
		                	getRowClass: function(record, index) {
		                        var CMS_ACCOUNT_STATUS = record.get("CMS_ACCOUNT_STATUS")
		                        
		                        if(CMS_ACCOUNT_STATUS == '4'){
		                        	return 'suvila_error_bg';
		                        }else if(CMS_ACCOUNT_STATUS == '3'){
		                        	return 'useYnBack';
		                        }else if(CMS_ACCOUNT_STATUS == '2'){
		                        	return 'suvila_grid_bg';
		                        }else{
		                        	return 'suvila_green_bg';
		                        }
		                    }
		                }
	        		},{
	        			height : 2
	        		},{
	        			height : 10,
	        		},{
	        			height : 2
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_05_c',
	                    cls           : 'none-dirty-grid asp044w_05_c',
	                    height        : 257,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_rec}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    columns:[{
	                    	text        : '순번',
	                        xtype       : 'rownumberer',
	                        width       : 70,
	                        align       : 'center', 
	                    },{
	                    	text        : '기도명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCEPT_NAME',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '접수명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROD_NAME',                    
	                        exAlign     : 'left',
	                        width       : 240,
	                        sortable    : true,
	                    },{
	                    	text        : '접수번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCEPT_SEQ',                    
	                        exAlign     : 'center',
	                        width       : 170,
	                        sortable    : true,
	                    },{
	                    	text        : '상세',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'SEQ',                    
	                        exAlign     : 'center',
	                        width       : 65,
	                        sortable    : true,
	                    },{
	                    	text        : '신도번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_BUD_NO',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '대주명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_BUD_NM',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '취소여부',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'DEL_YN',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_del2');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_del2}'
	                            }
	                        },
	                    },{
	                    	text        : '수정일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_DATE',                    
	                        exAlign     : 'center',
	                        width       : 190,
	                        sortable    : true,
	                    },{
	                    	text        : '수정자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_USER',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    	
	                    },{
	                    	text        : '비고',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'REMARK',                    
	                        exAlign     : 'left',
	                        width       : 350,
	                        sortable    : true,
	                    }]
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});