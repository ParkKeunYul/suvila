Ext.define('ExFrm.view.rec.rec002w_08',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_08',
    requires:[
    	'ExFrm.view.rec.rec002w_08Controller',
        'ExFrm.view.rec.rec002w_08Model'
    ],
    controller:'rec002w_08',
    viewModel:{
        type:'rec002w_08'
    },
    name:'rec002w_08',
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
        	layout : 'vbox',
        	width  : '100%',
        	items  : [{        		        		
        		height : 330,
        		layout : 'vbox',
        		width  : '100%',
        		items  : [{
        			layout : 'hbox',
        			//width  : '100%',
        			height : 30,
        			items :[{
        				html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록구분안씀</div>'
        			},{
        				xtype        : 'radiogroup',
            			reference    : 'mr_pray_gbn',
            			name         : 'mr_pray_gbn',
            			width        : 120,
            			listeners    : {
            			//	change : 'onMenuChange'
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
                		reference : 'upBtn',
                		name      : 'upBtn',
                		handler   : 'onSortUp1',
                		iconCls   : 'fa fa-angle-up',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
                		reference : 'downBtn',
                		name      : 'downBtn',
                		handler   : 'onDownUp1',	            		
                		iconCls   : 'fa fa-angle-down',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		reference : 'saveBtn1',
                		name      : 'saveBtn1',
                		handler   : 'onSave1',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '조회' ,
                		reference : 'selectBtn1',
                		name      : 'selectBtn1',
                		handler   : 'onSelect1',
        			}]
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_08_a',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    	width         : '99%',
                    bind          : {
                        store:'{ds_Ing}'
                    },
                    plugins     : [{
                    	ptype:'cellediting'
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
                    },{
                    	text        : '기도명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN',                    
                        exAlign     : 'center',
                        width       : 240,
                        sortable    : true,
                    },{
                    	text        : '입제일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN',                    
                        exAlign     : 'center',
                        width       : 130,
                        sortable    : true,
                    },{
                    	text        : '회향일',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN',                    
                        exAlign     : 'center',
                        width       : 130,
                        sortable    : true,
                    },{
                    	text        : '기도비',
                    	xtype       : 'excolumn',
                        dataIndex   : 'PRAY_GBN',                    
                        exAlign     : 'center',
                        width       : 130,
                        sortable    : true,
                        exAlign     : 'right',
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
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
        					html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록설정</div>'
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
        				height : 5
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec002w_08_b',
                        cls           : 'none-dirty-grid',
                        height        : 410,
                        width         : '99%',
                        bind          : {
                            store:'{ds_General}'
                        },
                        plugins     : [{
                        	ptype:'cellediting'
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
                            width       : 120,
                        },{
                        	text        : '기도명',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 220,
                        },{
                        	text        : '기도비',
                        	xtype       : 'excolumn',
                            dataIndex   : 'AMT',                    
                            exAlign     : 'center',
                            width       : 110,
                            exAlign     : 'right',
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            }
                        },{
                        	text        : '기간',
                        	xtype       : 'excolumn',
                            dataIndex   : 'AMT',                    
                            exAlign     : 'center',
                            width       : 90,
                            exAlign     : 'right',
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            }
                        },{
                        	text        : '계정과목',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 210,
                        }]
        			}]
        			
        		},{
        			width : '50%',
    				items :[{
        				layout : 'hbox',
        				items :[{
        					html : '<div style="padding:0 25px 0 0;line-height:25px;">기도목록별 상세설정</div>'
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
        				height : 5 	
        			},{
        				exGroupRef    : true,
                        xtype         : 'exgrid',
                        reference     : 'rec002w_08_b',
                        cls           : 'none-dirty-grid',
                        height        : 410,
                        width         : '98%',
                        bind          : {
                            store:'{ds_Detail}'
                        },
                        plugins     : [{
                        	ptype:'cellediting'
                        }],
                        columns:[{
                        	text        : '순번',
                            xtype       : 'rownumberer',
                            width       : 70,
                            align       : 'center',
                        },{
                            text        : '입제일',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 130,
                        },{
                        	text        : '회향일',
                        	xtype       : 'excolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 130,                        
                        },{
                        	text        : '마감여부',
                        	xtype       : 'excheckcolumn',
                            dataIndex   : 'PRAY_GBN',                    
                            exAlign     : 'center',
                            width       : 130,
                        },{
                        	text        : '기도비',
                        	xtype       : 'excolumn',
                            dataIndex   : 'AMT',                    
                            exAlign     : 'center',
                            width       : 110,
                            exAlign     : 'right',
                            renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                            	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                            }
                        }]
        			}]
        		}]
        	}]
        	
        }]
        
    }]
});
