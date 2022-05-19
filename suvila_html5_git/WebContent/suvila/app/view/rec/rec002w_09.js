Ext.define('ExFrm.view.rec.rec002w_09',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_09',
    requires:[
    	'ExFrm.view.rec.rec002w_09Controller',
        'ExFrm.view.rec.rec002w_09Model'
    ],
    controller:'rec002w_09',
    viewModel:{
        type:'rec002w_09'
    },
    name:'rec002w_09',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{           
    	xtype:'exformmain',     
        layout:{
            type:'hbox',
            align:'stretch'
        },
        width  : '100%',
        items :[{
        	width : '0.5%'
        },{
        	layout : 'vbox',
        	width  : '99%',
        	items  : [{        		        		
        		height : 330,
        		layout : 'vbox',
        		width  : '100%',
        		items  : [{
        			layout : 'hbox',
        			width  : '100%',
        			height : 30,
        			items :[{
        				//html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록구분</div>'
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">기도목록구분</div>',
        			},{
        				xtype        : 'radiogroup',
            			reference    : 'mr_pray_gbn',
            			name         : 'mr_pray_gbn',
            			width        : 120,
            			listeners    : {
            				change : 'onMenuChange'
            			},
                		items     :[{
            				boxLabel   : '일반', 
                        	inputValue : 1,    
                        	width      : 50,
                        	reference  : 'mr_pray_gbn1',
                        	checked    : true
            			},{
            				boxLabel   : '특별', 
            				inputValue : 2,    
                        	width      : 50,
                        	reference  : 'mr_pray_gbn2',
            			}]
        			},{
        				width : 5
        			},{
        	    		xtype     : 'exbutton',
                		handler   : 'onSortUp1',
                		iconCls   : 'fa fa-angle-up',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		handler   : 'onDownUp1',	            		
                		iconCls   : 'fa fa-angle-down',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		handler   : 'onSave1',
        		    },{
        			    width : 5
        		    /*},{
        			    xtype     : 'exbutton',
        			    text      : '조회' ,
                		reference : 'selectBtn1',
                		name      : 'selectBtn1',
                		handler   : 'onSelect1',*/
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
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_09_a',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    width         : '100%',
                    bind          : {
                        store:'{ds_Ing}'
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
                    	text        : '기도구분',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN',                    
                        exAlign     : 'center',
                        width       : 140,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_pray_gbn_up');
                        	return exCommon.getComboVal(value , store);
                        }
                    },{
                    	text        : '기도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_NM',                    
                        exAlign     : 'left',
                        width       : 240,
                    },{
                    	text        : '입제일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'FDATE',                    
                        exAlign     : 'center',
                        width       : 130,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                    	text        : '회향일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'RDATE',                    
                        exAlign     : 'center',
                        width       : 130,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.getFormat(value,'dateYMD');
                        },
                    },{
                    	text        : '기도비',
                    	xtype       : 'excolumn',
                        dataIndex   : 'AMT',                    
                        exAlign     : 'center',
                        width       : 130,
                        exAlign     : 'right',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        }
                    },{
                    	text        : '정렬순서',
                    	xtype       : 'excolumn',
                        dataIndex   : 'SORT_SEQ',                    
                        exAlign     : 'center',
                        width       : 100,
                        editor      : {
                        	xtype         : 'extextfield',
                        }
                    }]
        		}]
        	},{
        		height : 5
        	},{
        		layout : 'hbox',
        		width  : '100%',
        		items  : [{
        			layout        : 'vbox',
        			height        : 450,
        			width         : '50%',
        			items :[{
        				layout : 'hbox',
        				items :[{
        					//html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록설정</div>',
        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">기도목록설정</div>',
        				},{
            				width : 5
            			},{
            	    		xtype     : 'exbutton',
                    		reference : 'upBtn',
                    		name      : 'upBtn',
                    		handler   : 'onSortUp2',
                    		iconCls   : 'fa fa-angle-up',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
                    		reference : 'downBtn',
                    		name      : 'downBtn',
                    		handler   : 'onDownUp2',	            		
                    		iconCls   : 'fa fa-angle-down',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '조회' ,
                    		reference : 'selectBtn2',
                    		name      : 'selectBtn2',
                    		handler   : 'onSelect2',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '신규' ,
                    		reference : 'addBtn2',
                    		name      : 'addBtn2',
                    		handler   : 'onAdd2',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '삭제' ,
                    		reference : 'delBtn2',
                    		name      : 'delBtn2',
                    		handler   : 'onDel2',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '저장' ,
                    		reference : 'saveBtn2',
                    		name      : 'saveBtn2',
                    		handler   : 'onSave2',
        					
        				}]
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec002w_09_b',
                        cls           : 'none-dirty-grid',
                        height        : 410,
                        width         : '99%',
                        bind          : {
                            store:'{ds_General}'
                        },
                        plugins     : [{
    	                	ptype:'cellediting',
    	                	clicksToEdit: 1
    	                }],
                        listeners      : {
                            selectionchange : 'onSelectionChange',
                            celldblclick    : 'onCellDbClick2',
                        },
                        columns:[{
                        	text        : '순번',
                            xtype       : 'rownumberer',
                            width       : 70,
                            align       : 'center',
                        },{
                        	text        : '기도구분',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 90,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	
                            	var KHM = record.get("KWAN")+""+record.get("HANG")+""+record.get("MOK");
                             	if(KHM == exCommon.khm.IN ){
                             		meta.tdCls = "sinCard";
                             	}
                            	
                             	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_pray_gbn_up');
    	                        return exCommon.getComboVal(value , store);
    	                        
                            }
                        },{
                        	text        : '기도명',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_NM',                    
                            exAlign     : 'left',
                            width       : 220,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var KHM = record.get("KWAN")+""+record.get("HANG")+""+record.get("MOK");
                            	if(KHM == exCommon.khm.IN ){
                            		meta.tdCls = "sinCard";
                            	}
                            	return value;
                            },
                            editor      : {
                            	xtype         : 'extextfield',
                            }
                        },{
                        	text        : '기도비',
                        	xtype       : 'excolumn',
                            dataIndex   : 'AMT',                    
                            exAlign     : 'center',
                            width       : 100,
                            exAlign     : 'right',
                            hidden      : true,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var KHM = record.get("KWAN")+""+record.get("HANG")+""+record.get("MOK");
                            	if(KHM == exCommon.khm.IN ){
                            		meta.tdCls = "sinCard";
                            	}
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            },
                            editor      : {
                            	xtype         : 'extextfield',
                            }
                        },{
                        	text        : '기간',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PERIOD',                    
                            exAlign     : 'center',
                            width       : 80,
                            exAlign     : 'right',
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var KHM = record.get("KWAN")+""+record.get("HANG")+""+record.get("MOK");
                            	if(KHM == exCommon.khm.IN ){
                            		meta.tdCls = "sinCard";
                            	}
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            },
                            editor      : {
                            	xtype         : 'extextfield',
                            }
                        },{
                        	text        : '계정과목',
                        	xtype       : 'excolumn',
                            dataIndex   : 'ACCNAME',                    
                            exAlign     : 'left',
                            width       : 210,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	var KHM = record.get("KWAN")+""+record.get("HANG")+""+record.get("MOK");
                            	if(KHM == exCommon.khm.IN ){
                            		meta.tdCls = "sinCard";
                            	}
                            	return value;
                            }
                        },{
                        	text        : '정렬순서',
                        	xtype       : 'excolumn',
                            dataIndex   : 'SORT_SEQ',                    
                            exAlign     : 'center',
                            width       : 80,
                            editor      : {
                            	xtype         : 'extextfield',
                            }
                        }]
        			}]
        			
        		},{
        			flex  : 1,
    				items :[{
        				layout : 'hbox',
        				items :[{
        					//html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록별 상세설정</div>'
        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">기도목록별 상세설정</div>',
        				},{
        					width : 5
        				},{
            			    xtype     : 'exbutton',
            			    text      : '신규' ,
                    		handler   : 'onAdd3',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '삭제' ,
                    		handler   : 'onDel3',
            		    },{
            			    width : 5
            		    },{
            			    xtype     : 'exbutton',
            			    text      : '저장' ,
                    		handler   : 'onSave3',
        				}]	
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec002w_09_c',
                        cls           : 'none-dirty-grid',
                        height        : 410,
                        flex          : 1,
                        bind          : {
                            store:'{ds_Detail}'
                        },
                        plugins     : [{
                        	ptype:'cellediting',
                        	clicksToEdit: 1
                        }],
                        listeners      : {
                            edit : 'onEdit3',
                        },
                        columns:[{
                        	text        : '순번',
                            xtype       : 'rownumberer',
                            width       : 70,
                            align       : 'center',
                        },{
                            text        : '입제일',
                        	xtype       : 'excolumn',
                            dataIndex   : 'FDATE',                    
                            exAlign     : 'center',
                            width       : 130,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.getGridDateFormat(value,'/', 8);
                            },
                            editor      : {
                            	xtype    : 'exdatefield',
                            	format   : 'Ymd'
                            }
                        },{
                        	text        : '회향일',
                        	xtype       : 'excolumn',
                            dataIndex   : 'RDATE',                    
                            exAlign     : 'center',
                            width       : 130,
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	meta.tdCls = 'recCellNotEdit';
                            	return exCommon.getGridDateFormat(value,'/', 8);
                            },
                        },{
                        	text        : '마감여부',
                        	xtype       : 'excheckcolumn',
                            dataIndex   : 'USE_YN',                    
                            exAlign     : 'center',
                            width       : 130,
                            /*listeners: {
                            	checkchange : 'onCheckChange'                                  
                            },*/
                        },{
                        	text        : '기도비',
                        	xtype       : 'excolumn',
                            dataIndex   : 'AMT',                    
                            exAlign     : 'center',
                            width       : 110,
                            exAlign     : 'right',
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	meta.tdCls = 'recCellNotEdit';
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            },
                            editor      : {
                            	xtype         : 'extextfield',
                            }
                        }]
        			}]
        		}]
        	}]
        },{
        	width : '0.5%'
        }]
        
    }]
});
