Ext.define('ExFrm.view.rec.rec002w_37',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec002w_37',
    requires:[
    	'ExFrm.view.rec.rec002w_37Controller',
        'ExFrm.view.rec.rec002w_37Model'
    ],
    controller:'rec002w_37',
    viewModel:{
        type:'rec002w_37'
    },
    name:'rec002w_37',
    isRootView:true,
    //title:'상시접수조회',
    header:false,
    //closable:true,
    closable:false,
    scrollable:true,
    layout:{
        type:'hbox',
        align:'stretch'
    },
    items:[{
    	width : '0.5%'
    },{
    	xtype:'exformmain',     
        layout:{
            type:'vbox',
            align:'stretch',            
        },
        width : '100%',
        items :[{
        	height : 330,
        	layout : 'hbox',        	
        	items  :[{
        		width  : '49.9%',
        		layout : 'vbox',
        		items  : [{
        			height : 5
        		},{
        			height : 30,
        			layout : 'hbox',
        			/*width  : '100%',*/
        			items  : [{
        				html : '<img src="./resources/img/title/new_rec002w_11_t1.gif" >',
        				width : 191,
        				height : 30,
        			},{
        			    width : 5
        			},{
        				xtype     : 'exbutton',
        			    text      : '조회1' ,
                		handler   : 'onSelect1',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '신규' ,
                		handler   : 'onAdd1',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '삭제' ,
                		handler   : 'onDel1',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		handler   : 'onSave1',
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
                    reference     : 'rec002w_11_a',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    	width         : '99%',
                    bind          : {
                        store:'{ds_General}'
                    },
                    plugins     : [{
                    	ptype:'cellediting'
                    }],
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],
	                listeners      : {
                        celldblclick    : 'onCellDbClick1',
                        selectionchange : 'onSelectionChange1',
                    },
	                columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        flex        : 1,
                        align       : 'center', 
	                },{
                    	text        : '불사명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_NM',                    
                        exAlign     : 'left',
                        flex        : 2,
                        editor      : {
                        	xtype         : 'extextfield',
                        },
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
	                },{
                    	text        : '계정과목',
                    	xtype       : 'excolumn',
                        dataIndex   : 'ACCNAME',                    
                        exAlign     : 'left',
                        flex        : 2,
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
	                },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        flex        : 3,
                        editor      : {
                        	xtype         : 'extextfield',
                        },
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return value;
                        },
                    }]
        		}]
        	},{
        		width : '0.2%'
        	},{
        		width  : '49.9%',
        		layout : 'vbox',
        		items  : [{
        			height : 5
        		},{
        			height : 30,
        			layout : 'hbox',
        			/*width  : '100%',*/
        			items  : [{
        				html : '<img src="./resources/img/title/new_rec002w_11_t2.gif" >',
        				width : 191,
        				height : 30,
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '신규' ,
                		handler   : 'onAdd2',
        		    },{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '삭제' ,
                		handler   : 'onDel2',
        			},{
        			    width : 5
        		    },{
        			    xtype     : 'exbutton',
        			    text      : '저장' ,
                		name      : 'saveBtn2',
                		handler   : 'onSave2',        		    
        			}]
        		},{
        			height : 5
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'rec002w_11_b',
                    cls           : 'none-dirty-grid',
                    height        : 290,
                    	width         : '99%',
                    bind          : {
                        store:'{ds_Detail}'
                    },
                    plugins     : [{
	                	ptype:'cellediting',
	                	clicksToEdit: 1
	                }],	                
	                columns:[{
                    	text        : '순번',
                        xtype       : 'rownumberer',
                        flex        : 0.8,
                        align       : 'center', 
	                },{
                    	text        : '불사명',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_NM',                    
                        exAlign     : 'left',
                        flex        : 2.6,                        
	                },{
                    	text        : '내역',
                    	xtype       : 'excolumn',
                        dataIndex   : 'BULSA_DETAIL',                    
                        exAlign     : 'left',
                        flex        : 2,
                        editor      : {
                        	xtype         : 'extextfield',
                        }
	                },{
                    	text        : '금액',
                    	xtype       : 'excolumn',
                        dataIndex   : 'AMOUNT',                    
                        exType      : 'number',
                        flex        : 1.4,
                        editor      : {
                        	xtype         : 'extextfield',
                        },
                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit';
                        	return exCommon.setNumberFormat(exCommon.getRepNum(value));
                        },
	                },{
                    	text        : '사용',
                    	xtype       : 'excheckcolumn',
                        dataIndex   : 'USE_YN',                    
                        exAlign     : 'left',
                        flex        : 1,
	                },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',
                        flex        : 2.4,
                        editor      : {
                        	xtype         : 'extextfield',
                        }
                    }]
        		}]
        	}]
        },{
        	height : 5
        },{
        	height : 30,
        	layout : 'hbox',
        	items  : [{
        		html : '<img src="./resources/img/title/new_rec002w_11_t3.gif" >',
        		width : 191,
        		height : 30,
			},{
			    width : 5
		    },{
		    	xtype     : 'exbutton',
			    text      : '조회' ,
        		handler   : 'onSelect3',
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
        	height : 5
        },{
        	exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'rec002w_11_c',
            cls           : 'none-dirty-grid',
            height        : 435,
            	width         : '99%',
            bind          : {
                store:'{ds_Ing}'
            },
            plugins     : [{
            	ptype:'cellediting',
            	clicksToEdit: 1
            }],
            columns:[{
            	text        : '번호',
                xtype       : 'rownumberer',
                flex        : 1,
                align       : 'center', 
            },{
            	text        : '불사명',
            	xtype       : 'excolumn',
                dataIndex   : 'BULSA_CD',                    
                exAlign     : 'left',
                flex        : 5,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellNotEdit';
                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_Bulsa_nm');
                	return exCommon.getComboVal(value,store, 'user' , 'BULSA_CD'  , 'BULSA_NM' );
                }
            },{
            	text        : '게시일',
            	xtype       : 'excolumn',
                dataIndex   : 'ACPT_FDATE',                    
                exAlign     : 'center',
                flex        : 2.4,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit';
                	return exCommon.getGridDateFormat(value,'/', 8);
                },
                editor      : {
                	xtype    : 'exdatefield',
                	format   : 'Ymd'
                }
            },{
            	text        : '마감예정일',
            	xtype       : 'excolumn',
                dataIndex   : 'ACPT_EDATE',                    
                exAlign     : 'center',
                flex        : 2.4,
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit';
                	return exCommon.getGridDateFormat(value,'/', 8);
                },
                editor      : {
                	xtype    : 'exdatefield',
                	format   : 'Ymd'
                }
            },{
            	text        : '마감상태',
            	xtype       : 'excheckcolumn',
                dataIndex   : 'ACPT_CLOSE',                    
                exAlign     : 'left',
                flex        : 2,
            },{
            	text        : '비고',
            	xtype       : 'excolumn',
                dataIndex   : 'REMARK',                    
                exAlign     : 'left',
                flex        : 4,
                editor      : {
                	xtype         : 'extextfield',
                },
                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit';
                	return value;
                },
            
            }]
        }]
    },{
    	width : '0.5%'
    }]
});
