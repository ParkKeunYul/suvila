Ext.define('ExFrm.view.sin.sin008w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
    alias:'widget.sin008w_01',
    requires:[
    	'ExFrm.view.sin.sin008w_01Controller',
        'ExFrm.view.sin.sin008w_01Model',
    ],
    controller :'sin008w_01',
    viewModel:{
        type   :'sin008w_01'
    },
    name:'sin008w_01',
    isRootView:true,
    title:'발송관리',
    closable:true,
    scrollable:true,
    layout  : 'hbox',
    items :[{
    	width : '0.5%'
    },{
    	xtype:'exformmain',
    	width  : '99%',
    	layout : 'vbox',
    	items  : [{
    		height : 5
    	},{
    		width  : '100%',
    		layout : 'hbox',
    		height : 30,
    		items  : [{
    			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">SMS 발송관리</div>',
    		},{
    			width : 10,
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
          		margin    : '6px 0 0 0'
	    	},{
	    		width : 0,
	    		height : 0,
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
	        	},{
        			xtype            : 'extextfield',
                    reference        : 'txt_sel_index',
                    value            : '-1',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
	    		}]
    		}]
    	},{
    		height : 10,
    	},{
    		exGroupRef    : true,
            xtype         : 'exgrid',
            reference     : 'sin008w_01_a',
            cls           : 'none-dirty-grid',
            height        : 250,
            width         : '99%',
            /*selModel      : {
                mode: 'MULTI'
            },*/
            bind          : {
                store:'{ds_main}'
            },
            plugins     : [{
            	ptype:'cellediting',
            	clicksToEdit: 1
            }],
            listeners      : {
            	selectionchange : 'onSelectionChange',
            	edit            : 'onEdit'
            },
            columns:[{
            	text  :'순번',
                xtype :'rownumberer',
                align : 'center',
                width : 65,
            },{
            	text        : '사용유무',
            	xtype       : 'excheckcolumn',
                dataIndex   : 'USE_YN',                    
                exAlign     : 'center',                    
                width       : 100,           
                listeners   : {
                	checkchange : 'onCheckRowSelect'
                },
            },{
            	text        : '접수종류',
            	xtype       : 'excolumn',
                dataIndex   : 'NAME',                    
                exAlign     : 'left',                    
                width       : 140, 
            },{
            	text        : '발송일(전)',
            	xtype       : 'excolumn',
                dataIndex   : 'ALARM_DAY',                    
                exAlign     : 'right',                    
                width       : 120, 
                editor      : {
                	xtype         : 'extextfield',
                },
                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit'
                	return value;
                }
            },{
            	text        : '발송시간',
            	xtype       : 'excolumn',
                dataIndex   : 'ALARM_TIME',                    
                exAlign     : 'center',                    
                width       : 120, 
                editor      : {
                	xtype         : 'extextfield',
                },
                renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
                	meta.tdCls = 'recCellEdit'
                		
                	try{
                		var time   = exCommon.getRepVal(value);
                    	var roop   = time.length;
                    	
                    	for(var i=0 ; i < 4-roop; i++ ){
                    		time = "0"+ time;                		
                    	}//         
                	}catch (e) {}
                	//record.set("ALARM_TIME", time);
                	return time.substr(0,2)+":"+time.substr(2,2);
                }
            }],
            viewConfig: {
            	getRowClass: function(record, index) {
                   	return 'color_depth_1';
                }
            }
    	},{
    		height : 10,
    	},{
    		layout : 'hbox',
        	width  : '100%',
        	items  : [{
        		
        		layout : 'vbox',
        		items  :[{
        			layout : 'hbox',
        			items  :[{
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">SMS 서식관리</div>',
        			},{
        				width : 10
                	},{
                		xtype     : 'exbutton',
                  		text      : '추가',
                  		handler   : 'onAddDoc',
                  		margin    : '6px 0 0 0'
                	},{
            			width : 5,
                	},{
                		xtype     : 'exbutton',
                  		text      : '삭제',
                  		handler   : 'onDeleteDoc',
                  		margin    : '6px 0 0 0'
                	},{
            			width : 5,
                	},{
                		xtype     : 'exbutton',
                  		text      : '저장',
                  		handler   : 'onSaveDoc',
                  		margin    : '6px 0 0 0'
        			}]
        		},{
        			height : 5
        		},{
        			exGroupRef    : true,
                    xtype         : 'exgrid',
                    reference     : 'sin008w_01_b',
                    cls           : 'none-dirty-grid',
                    height        : 300,
                    width         : 900,
                    bind          : {
                        store:'{ds_smsDoc}'
                    },
                    plugins     : [{
                    	ptype:'cellediting',
                    	clicksToEdit: 1
                    }],
                    listeners      : {
                    	selectionchange : 'onSelectionChangeSMS',
                    },
                    columns:[{
                    	text  :'순번',
                        xtype :'rownumberer',
                        align : 'center',
                        width : 65,
                    },{
                    	text        : '선택',
                    	xtype       : 'excheckcolumn',
                        dataIndex   : 'CHECK_YN',                    
                        exAlign     : 'center',                    
                        width       : 65,
                        listeners   : {
                        	checkchange : 'onChangeCheckYn'
                        },
                    },{
                    	text        : '내용',
                    	xtype       : 'excolumn',
                        dataIndex   : 'CONTENTS',                    
                        exAlign     : 'left',                    
                        width       : 550, 
                    },{
                    	text        : '비고',
                    	xtype       : 'excolumn',
                        dataIndex   : 'REMARK',                    
                        exAlign     : 'left',                    
                        width       : 200, 
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	meta.tdCls = 'recCellEdit'
                        	return value;
                        },
                        editor      : {
                        	xtype         : 'extextfield',
                        },
                    }],
                    viewConfig: {
    	            	getRowClass: function(record, index) {
    	                    	return 'color_depth_1';
    	                }
    	            }
        		}]
        		
        		
        	},{
        		width : 10
        	},{
        		layout : 'vbox',
        		items  :[{
        			layout : 'hbox',
        			items  :[{
        				html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">SMS 내용</div>',
        			},{
        				width : 10
        			},{
        				xtype        : 'excombobox',
                        valueField   : 'COL_ID',
                        displayField : 'COL_NAME',
                        reference    : 'lc_smsItem',
                        emptyText    : '선택',
                        width        : 120,
                        bind         : {
                        	store:'{ds_smsItem}'
                        },
                        listeners       : [{
	                    	 change: 'onChangeSmsItem'	                    	
	                    }]
        			}]
        		},{
        			height : 5
        		},{        			
	        		xtype   :'exfieldsetblockbox',
	        		items   : [{
	        			xtype:'exblockrow',
	                    items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">내용</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype      : 'extextarea',
	                    		reference  : 'ta_memo',
	                            name       : 'MEMO',
	                            width      : 340,
	                            height     : 297
	                    	}]
	                    }]
	        		}]
        		}]
        	}]
    	}]
    },{
    	width : '0.5%',
    }]
});
