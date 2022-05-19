Ext.define('ExFrm.view.sin.sin010w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.sin010w_01',
	requires:[
		'ExFrm.view.sin.sin010w_01Controller',
        'ExFrm.view.sin.sin010w_01Model'
	],
	controller:'sin010w_01',
	viewModel:{
        type:'sin010w_01'
    },
    name:'sin010w_01',
    isRootView:true,
    title:'그룹분류',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : 450,
	        	items:[{
	        		//html : '분류항목관리',
	        		height : 30,
	        		layout:'hbox',
	        		items:[{
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">분류항목관리</div>',
	        		},{
	        			flex : 1
	        		},{
	    	    		xtype     : 'exbutton',
	            		reference : 'upBtn',
	            		name      : 'upBtn',
	            		handler   : 'onSortUp',
	            		iconCls   : 'fa fa-angle-up',
	    		    },{
	    			    width : 5
	    		    },{
	    			    xtype     : 'exbutton',
	            		reference : 'downBtn',
	            		name      : 'downBtn',
	            		handler   : 'onDownUp',	            		
	            		iconCls   : 'fa fa-angle-down',
	    		    },{
	    			    width : 5
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'addLeftBtn',
	              		name      : 'addLeftBtn',
	              		handler   : 'onLeftAdd',
	              		text      : '신규',
	        		},{
	                	width : 3
	        		},{
	                	xtype     : 'exbutton',
	              		reference : 'delLeftBtn',
	              		name      : 'delLeftBtn',
	              		handler   : 'onLeftDel',
	              		text      : '삭제',
	        		},{
	                	width : 3
	        		},{
	                	xtype     : 'exbutton',
	              		reference : 'saveLeftBtn',
	              		name      : 'saveLeftBtn',
	              		handler   : 'onSaveLeft',
	              		text      : '저장',
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
		        	exGroupRef : true,
	                xtype      :'exgrid',
	                reference  :'sin010w_01_a',
	                cls        :'sin010w_01_a',
	                height     : 580,
	                width      : '100%',
	                bind       : {
	                    store:'{ds_classMgt}'
	                },
	                plugins   : [{	                
	                	 ptype:'cellediting'	                	
	                }],
	                listeners:{
	                    selectionchange : 'onSelectionChange'
		            },
	                columns:[{
	                	text:'No',
	                	xtype:'rownumberer',
	                    align:'center',
	                    width      : 55,	  
	                },{
	                	text       : '사용유무',
	                	xtype      : 'excheckcolumn',
	                    dataIndex  : 'USE_YN',	                    
	                    exAlign    : 'center',
	                    width      : 80,	                    
	                },{
	                	text       : '그룹명',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'CLASS_NAME',	                    
	                    exAlign    : 'left',
	                    flex       : 1,
	                    editor     : {
	                        xtype:'extextfield',
	                    }
	                },{
	                	text       : '정렬순서',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'SORT_SEQ',	                    
	                    exAlign    : 'center',
	                    width      : 80,
	                    editor     : {
	                        xtype:'extextfield',
	                    }
	                }]
	        	 },{
	        		 height : 30,
	        		 html : '<div style="color:#cc3366;">* 그룹을 선택하시면 명함정보가 조회됩니다</div>'
	        	 },{
	        		 height : 20,
	        		 html : '<div style="widht:100%;text-align:center;font-weight:700;background:#f6f9fd;border:1px solid #ced9ec;">* 비고</div>'
	        	 },{
	        		 xtype      : 'extextarea',
        			 reference  : 'ta_remark',
                     name       : 'REMARK',
                     width      : '100%',
                     height     : 170,
	             }]
	        },{
	        	width : '1%',
	        },{
	        	flex  : 1,
	        	items:[{
	        		height : 30,
	        		layout:'hbox',
	        		items:[{	        			
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">신도정보</div>',
	        			width: 60,
	        		},{
	        			xtype     : 'extextfield',
                        reference : 'txt_className',
                        exLabel   : '종류',                            
                        name      : 'txt_className',
                        width     : 200,
                        exReadOnly: true
	        		},{
	        			width : 5
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'addRightBtn',
	              		name      : 'addRightBtn',
	              		handler   : 'onRightAdd',
	              		text      : '추가',
	        		},{
	                	width : 3
	        		},{
	                	xtype     : 'exbutton',
	              		reference : 'delRightBtn',
	              		name      : 'delRightBtn',
	              		handler   : 'onDelRight',
	              		text      : '삭제',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'saveRightBtn',
	              		name      : 'saveRightBtn',
	              		handler   : 'onSaveRight',
	              		text      : '저장',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'excelRightBtn',
	              		name      : 'excelRightBtn',
	              		handler   : 'onExcelRight',
	              		text      : '엑셀',
	        		}]
	        	},{
	        		 height : 30,
	        		 html : '<div style="color:#cc3366;">*하단의 리스트에서 선택한 신도들을 사용중인 다른 폴더로 복사 또는 이동이 가능합니다</div>'
	        	},{
	        		layout : 'hbox',
	        		height : 30,
	        		items:[{
	        			xtype        : 'excombobox',
	                    valueField   : 'CLASS_CD',
	                    displayField : 'CLASS_NAME',
	                    reference    : 'lc_group',
	                    name         : 'V_GROUP',                    	                    
	                    width        : 300,
	                    value        : 0,
	                    bind         : {
	                     	store:'{ds_com_classMgt}'
	                    },
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'copyGroupBtn',
	              		name      : 'copyGroupBtn',
	              		handler   : 'onCopyGroup',
	              		text      : '복사',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'moveGroupBtn',
	              		name      : 'moveGroupBtn',
	              		handler   : 'onMoveGroup',
	              		text      : '이동',
	        		}]
	        		
	        	},{
	        		exGroupRef:true,
	                xtype     : 'exgrid',
	                reference : 'sin010w_01_b',
	                height    : 720,
	                width     : '100%',
	                bind      : {
	                    store:'{ds_sindo}'
	                },
	                plugins   : [{	                
	                	ptype: 'gridexporter'	               
	                }],
//	                multiSelect: true,
	                selModel      : {
	                    mode: 'MULTI'
	                },
	                columns:[{
	                	text     : '순번',
	                	xtype    : 'rownumberer',
	                    align    : 'center',
	                    width    : 70,
	                    sortable : true
	                },{
	                	text       : '신도번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'BUD_NO',	                    
	                    exAlign    : 'left',
	                    width      : 110,
	                    sortable   : true
	                },{
	                	text       : '신도명',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'NAME_KOR',	                    
	                    exAlign    : 'left',
	                    width      : 90,
	                    sortable   : true
	                /*},{
	                	text       : '카드번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'CARD_NO',	                    
	                    exAlign    : 'left',
	                    width      : 140,
	                    sortable   : true*/
	                },{
	                	text       : '법명',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'SACRED_KOR',	                    
	                    exAlign    : 'left',
	                    width      : 90,
	                    sortable   : true
	                },{
	                	text       : '나이',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'AGE',	                    
	                    exAlign    : 'left',
	                    width      : 90,
	                    sortable   : true
	                },{
	                	text       : '전화번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'TELNO',	                    
	                    exAlign    : 'left',
	                    width      : 110,
	                    sortable   : true
	                },{
	                	text       : '휴대전화',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'MOBILE_TELNO',	                    
	                    exAlign    : 'left',
	                    width      : 110,
	                    sortable   : true
	                },{
	                	text       : '주소1',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'ADDR1',	                    
	                    exAlign    : 'left',
	                    width      : 300,
	                    sortable   : true
	                },{
	                	text       : '주소2',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'ADDR2',	                    
	                    exAlign    : 'left',
	                    width      : 200,
	                    sortable   : true
	                },{
	                	text       : '우편번호',
	                	xtype      : 'excolumn',
	                    dataIndex  : 'ZIP_CD',	                    
	                    exAlign    : 'center',
	                    width      : 90,
	                    sortable   : true,
	                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getFormat(value, 'zip')
	                    }
	                }]
	        	},{
	        		 height : 30,
	        		 html : '<div style="color:#cc3366;line-height:40px;">* Shift,Ctrl 키조합으로 신도를 다중 선택 할 수 있습니다. </div>'
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});