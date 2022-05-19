Ext.define('ExFrm.view.asp.asp044w_03',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_03',
	requires:[
		'ExFrm.view.asp.asp044w_03Controller',
        'ExFrm.view.asp.asp044w_03Model'
	],
	controller:'asp044w_03',
	viewModel:{
        type:'asp044w_03'
    },
    name:'asp044w_03',
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
	                    reference     : 'asp044w_03_a',
	                    cls           : 'none-dirty-grid asp044w_03_a',
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
	        				html :'<div style="text-align:center;line-height:30px;font-weight:700;padding-right:5px;">접수일 : </div>',
	        			},{
	        				xtype          : 'exdatefield',
	                        reference      : 'me_AcceptSDateID',
	                        format         : 'Y-m-d',
	            		},{
	            			html :'<div style="text-align:center;width:20px;line-height:30px;">~</div>',
	            			width : 20
	            		},{
	            			xtype          : 'exdatefield',
	                        reference      : 'me_AcceptEDateID',
	                        format         : 'Y-m-d',
	            		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">기도종류</span>',
		        			labelWidth   :70,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'lc_acceptGbn',
		                    width        : 200,
		                    bind:{
		                     	store:'{ds_acceptGbn}'
		                    },
		                    listeners   : {
                                change : 'onAcceptChange',
                            },
		                    
		        		},{
		        			width : 3
		        		},{
		        			xtype        :'excombobox',
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'lc_subacceptGbn',
		                    width        : 150,
		                    bind:{
		                     	store:'{ds_subacceptGbn}'
		                    },
		        		},{
		        			width : 5
		        		},{
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">신도번호</span>',
		        			labelWidth   : 70,
	                    	xtype        : 'extextfield',
	                        reference    : 'bud_no',
	                        width        : 200 ,
		                      
		        		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">취소여부</span>',
		        			labelWidth   :60,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'del_yn',
		                    width        : 150,
		                    value        : '',
		                    bind:{
		                     	store:'{ds_close}'
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
	                    reference     : 'asp044w_03_b',
	                    cls           : 'none-dirty-grid asp044w_03_b',
	                    height        : 513,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_main}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    listeners      : {
	                    	selectionchange : 'onSelectionMain'
	                    },
	                    columns:[{
	                    	text        : '순번',
	                        xtype       : 'rownumberer',
	                        width       : 70,
	                        align       : 'center', 
	                    },{
	                    	text        : '기도명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCEPT_NAME',                    
	                        exAlign     : 'left',
	                        width       : 100,
	                        sortable    : true,
	                    },{
	                    	text        : '접수명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROD_NAME',                    
	                        exAlign     : 'left',
	                        width       : 180,
	                        sortable    : true,
	                    },{
	                    	text        : '접수번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCEPT_SEQ',                    
	                        exAlign     : 'center',
	                        width       : 160,
	                        sortable    : true,
	                    },{
	                    	text        : '상세',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'SEQ',                    
	                        exAlign     : 'center',
	                        width       : 70,
	                        sortable    : true,
	                    },{
	                    	text        : '신도번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_BUD_NO',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '대주명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_BUD_NM',                    
	                        exAlign     : 'left',
	                        width       : 105,
	                        sortable    : true,
	                    },{
	                    	text        : '취소여부',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'DEL_YN',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_close_g');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_close_g}'
	                            }
	                        },
	                    },{
	                    	text        : '수정일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_DATE',                    
	                        exAlign     : 'center',
	                        width       : 145,
	                        sortable    : true,
	                    },{
	                    	text        : '수정자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_USER',                    
	                        exAlign     : 'left',
	                        width       : 105,
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
		                        var CLOSE_YN = record.get('DEL_YN');
		                        var APPROVAL_GBN = record.get("APPROVAL_GBN")
		                        
		                        if(CLOSE_YN == 'T'){
		                        	return 'useYnBack';
		                        }else if(APPROVAL_GBN == '3'){
		                        	return 'cmsline';
		                        }else{
		                        	return 'color_depth_1';
		                        }
		                    }
		                }
	        		},{
	        			height : 2
	        		},{
	        			width  : '100%',
	        			layout : 'hbox',
	        			items  :[{
	        				flex : 1
	        			},{
	        				xtype     : 'exbutton',	              		
		              		text      : '저장',
		              		handler   : 'onSaveMisu',
	        			}]
	        		},{
	        			height : 2
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_03_c',
	                    cls           : 'none-dirty-grid asp044w_03_c',
	                    height        : 257,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_misuRec}'
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
	                    	text        : '접수자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CRT_USER',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '수납일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'SUB_DATE',                    
	                        exAlign     : 'center',
	                        width       : 140,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	return exCommon.getFormat(value,'dateYMD' );
	                        }
	                    },{
	                    	text        : '납부금액',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'AMOUNT',                    
	                        exAlign     : 'right',
	                        exType      : 'number',
	                        width       : 140,
	                        sortable    : true,
	                    },{
	                    	text        : '결제방법',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'APPROVAL_GBN',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_approvalGbn');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_approvalGbn}'
	                            }
	                        },
	                    },{
	                    	text        : '비고',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'REMARK',                    
	                        exAlign     : 'left',
	                        width       : 350,
	                        sortable    : true,
	                        editor        : {
	                        	xtype        : 'extextfield',
	                        }
	                    }]
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});