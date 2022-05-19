Ext.define('ExFrm.view.ser.ser020w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser020w_01',
	requires:[
		'ExFrm.view.ser.ser020w_01Controller',
        'ExFrm.view.ser.ser020w_01Model'
	],
	controller:'ser020w_01',
	viewModel:{
        type:'ser020w_01'
    },
    name:'ser020w_01',
    isRootView:true,
    title:'공지사항',
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
        		html : "<span style='text-align:right;font-weight:700;line-height:25px;padding:0 10px;'>등록일 : </span>"
        	},{
	    		xtype          : 'exdatefield',
                reference      : 'em_sDate',
                name           : 'SDATE',                                                   
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
	    		width : 20,
	    		html : '<div style="text-align:center;line-height:25px;font-weight:700;">~</div>'
	    	},{
	    		xtype          :'exdatefield',
                reference      :'em_eDate',
                name           :'EDATE',                                   
                width          : 170,
                exFormat       : 'Y/m/d',
                exSubmitFormat : 'Ymd',
	    	},{
        		width : 5
	    	},{
                xtype        : 'excombobox',
            	fieldLabel   : '<span style="font-weight:700;">검색조건</span>',
            	labelWidth   : 70,
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_searchGbn',
                name         : 'V_SEARCH_GBN',                    	                    
                width        : 170,
                value        : 'TITLE',
                bind:{
                 	store:'{ds_search}'
                }
	    	},{
        		width : 10
	    	},{
	    		xtype          : 'extextfield',
                fieldLabel     : '<span style="font-weight:700;">검색어</span> ',
                reference      : 'txt_searchWord',
                name           : 'V_SEARCH_WORD',
                labelAlign     : 'left',                        
                labelWidth     : 50,
                exLabel        : '검색어',
                enableKeyEvents: true,
                width          : 200,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
	    	},{
        		width : 10
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
          		reference : 'addBtn',
          		name      : 'addBtn',
          		handler   : 'onAdd',
          		text      : '신규',
          	/*	
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'applyGridBtn',
          		name      : 'applyGridBtn',
          		handler   : 'onApplyGrid',
          		text      : '그리드적용',
          		*/
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'deleteBtn',
          		name      : 'deleteBtn',
          		handler   : 'onDelete',
          		text      : '삭제',
	    	},{
        		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
	    	},{
	    		width     : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'excelBtn',
          		name      : 'excelBtn',
          		handler   : 'onExcel',
          		text      : '엑셀',
	    	},{
        		width     : 0,
        		layout    : 'hbox',
        		items     : [{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'newData',
           	 		name      : 'newData',
    	    	},{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'uptData',
           	 		name      : 'uptData',
                },{
                	xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'delData',
           	 		name      : 'delData',
                },{
        			xtype     : 'extextfield',
                    reference : 'txt_sel_index',
                    value     : '-1',
                    inputType : 'hidden',
        		}]
        	}]
	     },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	/*width : '48.5%',*/
	        	width  : 990,
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	        		exGroupRef    : true,
	                xtype         : 'exgrid',
	                reference     : 'ser020w_01_a',
	                height        : 790,
	                cls           : 'ser020w_01_a none-dirty-grid',
	                plugins       :[{
	                	ptype: 'gridexporter',
	                }],
	                bind          :{
	                    store:'{ds_Main}'
	                },
	                listeners:{
	                    selectionchange : 'onSelectionChange'
		            },
	                columns:[{
	                	xtype     :'rownumberer',	                    
	                    text      :'No',
	                    width     : 60,
	                    align     :'center',
	                },{
	                	text      :'공지유형',
	                	xtype     :'excolumn',
	                    dataIndex :'TYPE',                    
	                    exAlign   :'center',
	                    width     : 90,	   
	                    sortable  : true,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_type');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text      :'제목',
	                	xtype     :'excolumn',
	                    dataIndex :'TITLE',                    
	                    exAlign   :'left',
	                    width     : 200,
	                    sortable  : true,
	                },{
	                	text      :'내용',
	                	xtype     :'excolumn',
	                    dataIndex :'CONTENTS',                    
	                    exAlign   :'left',
	                    width     : 250,
	                    sortable  : true,
	                },{
	                	text      :'등록자',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_USER',                    
	                    exAlign   :'center',
	                    width     : 90,
	                    sortable  : true,
	                },{
	                	text      :'등록일',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_DATE',                    
	                    exAlign   :'left',
	                    width     : 90,
	                    sortable  : true,
	                },{
	                	text      :'사용',
	                	xtype     :'excolumn',
	                    dataIndex :'USE_YN',                    
	                    exAlign   :'center',
	                    width     : 70,
	                    sortable  : true,
	                    renderer  :function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_useYn');
	                    	return exCommon.getComboVal(value,store, '' );
	                    }
	                },{
	                	text      :'비고',
	                	xtype     :'excolumn',
	                    dataIndex :'REMARK',                    
	                    exAlign   :'left',
	                    width     : 200,
	                }]
	            },{
	            	height : 10
	            }]// 가운데	      
	        },{
	        	width : '0.5%'
	        },{
	        	flex  : 1,
	        	layout:'hbox',
	        	items:[{
	        		width  : '100%',
	        		xtype  :'exfieldsetblockbox',
	        		items:[{
	        			xtype        :'exblockrow',
	        			reference    : 'row_type',
		        		items  :[{
		        			xtype :'exblocklabel',
	                        html  :'<div style="text-align:left;padding-left:5px;">공지유형</div>'
		        		},{
		        			 xtype:'exblockfield',
	                         items:[{
	                        	 xtype        : 'excombobox',
	                             valueField   : 'CODE',
	                             displayField : 'NAME',
	                             reference    : 'txt_type',
	                             name         : 'TYPE',
	                             bind         : {
	                             	store:'{ds_type}'
	                             }
	                         }]
		        		}]
	        		},{
	                    xtype:'exblockrow',
		        		items  :[{
		        			xtype : 'exblocklabel',
	                        html  : '<div style="text-align:left;padding-left:5px;">제목</div>'
		        		},{
		        			 xtype:'exblockfield',
	                         items:[{
	                        	 xtype     : 'extextfield',
	                             reference : 'txt_title',
	                             exLabel   : '제목',
	                             exMand    : true,
	                             name      : 'TITLE',
	                             width     : '100%'
	                         }]
		        		}]
	        		},{
	        			xtype:'exblockrow',
		        		items  :[{
		        			xtype : 'exblocklabel',
	                        html  : '<div style="text-align:left;padding-left:5px;">내용</div>'
		        		},{
		        			 xtype:'exblockfield',
	                         items:[{
	                        	 xtype     : 'extextarea'  ,
	                             reference : 'txt_contents',
	                             exLabel   : '비고',
	                             name      : 'CONTENTS',
	                             width     : '100%',
	                             height    : 500
	                         }]
		        		}]
	        		},{
	        			xtype:'exblockrow',
		        		items  :[{
		        			xtype : 'exblocklabel',
	                        html  : '<div style="text-align:left;padding-left:5px;">비고</div>'
		        		},{
		        			 xtype:'exblockfield',
	                         items:[{
	                        	 xtype     : 'extextfield',
	                             reference : 'txt_remark',
	                             exLabel   : '비고',
	                             name      : 'REMARK',
	                             width     : '100%'
	                         }]
		        		}]
	        		},{
	                    xtype:'exblockrow',
		        		items  :[{
		        			xtype :'exblocklabel',
	                        html  :'<div style="text-align:left;padding-left:5px;">사용유무</div>'
		        		},{
		        			 xtype:'exblockfield',
	                         items:[{
	                        	 xtype        : 'excombobox',
	                             valueField   : 'CODE',
	                             displayField : 'NAME',
	                             reference    : 'sel_UseYn',
	                             name         : 'TYPE',
	                             bind         : {
	                             	store:'{ds_useYn}'
	                             }
	                         }]
		        		}]
	        		},{
	        			height : 0,
	        			items  : [{
	                        xtype     : 'extextfield',
	                    	inputType : 'hidden',
	                    	reference : 'txt_seqNo',
	                    	name      : 'SEQ_NO',
	                    	width     : 0
	        			},{
	        				xtype     : 'extextfield',
	                    	inputType : 'hidden',
	                    	reference : 'txt_no',
	                    	name      : 'NO',
	                    	width     : 0
	        			}]
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});