Ext.define('ExFrm.view.com.memo',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.memoController',
    	'ExFrm.view.com.memoModel'
    ],
    controller:'memo',
    viewModel:{
        type:'memo'
    },
    isModal:true,
    name:'memo',
    title:'신도메모',
    closable:true,
    width:1000,
    height:660,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype  : 'exformmain',
        width  : '99.9%',
        cls    : 'exformmain',
        layout : {
            type:'vbox',
            align:'stretch'
        },
        items  :[{
        	height : 35,
        	layout  : 'hbox',
	       	items   : [{
	       		 xtype        : 'excombobox',
	           	 fieldLabel   : '검색조건',
	           	 labelWidth   : 70,
	             valueField   : 'CODE',
	             displayField : 'NAME',
	             reference    : 'lc_searchGbn',
	             name         : 'V_SEARCH_GBN',                    	                    
	             width        : 170,
	             value        : '1',
	             bind:{
	                 	store:'{ds_search}'
	             } 
	       	 },{
	       		 width : 3
	       	 },{
	       		 xtype          : 'extextfield',
	             fieldLabel     : '검색어 ',
	             reference      : 'txt_searchWord',
	             name           : 'V_SEARCH_PARAM',
	             labelAlign     : 'left',                        
	             labelWidth     : 50,
	             exLabel        : '검색어',
	             enableKeyEvents: true,
	             width          : 280,
	             listeners:{
	            	 keyup : 'onSearchEnter'
	             }
	       	 },{
	       		  width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 reference : 'selectBtn',
	          	 name      : 'selectBtn',
	          	 handler   : 'onSelect',
	          	 text      : '조회',
	       	},{
	       		  width : 3
	       	 },{
	       		 xtype     : 'exbutton',
	          	 reference : 'addBtn',
	          	 name      : 'addBtn',
	          	 handler   : 'onAdd',
	          	 text      : '신규',
	       	 },{
	         	 width     : 3
		     },{
		    	 xtype     : 'exbutton',
	          	 reference : 'deleteBtn',
	          	 name      : 'deleteBtn',
	          	 handler   : 'onDelete',
	          	 text      : '삭제',
		     },{
	         	 width     : 3
		     },{
		    	 xtype     : 'exbutton',
	          	 reference : 'tempSaveBtn',
	          	 name      : 'tempSaveBtn',
	          	 handler   : 'onTempSave',
	          	 text      : '임시저장',
		     },{
	        	 width     : 3
		     },{
		    	 xtype     : 'exbutton',
	          	 reference : 'saveBtn',
	          	 name      : 'saveBtn',
	          	 handler   : 'onSave',
	          	 text      : '저장',
		     },{
	        	 width     : 3
		     },{
		    	 xtype     : 'exbutton',
	          	 reference : 'closeBtn',
	          	 name      : 'closeBtn',
	          	 handler   : 'onClose',
	          	 text      : '닫기',
		     },{
		    	 width     : 0,
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
 	       	 		 inputType : 'hidden',
 	       	 		 reference : 'bud_no',
 	       	 		 name      : 'V_BUD_NO', 
		    	  }]
	       	 }]
        },{
        	layout : 'hbox',
        	items  : [{
                width : '0.5%'
            },{
            	 width  : '48%',
            	 items  :[{
             		exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'memo_a',
                    /*plugins    : [{
                     	ptype : 'bufferedrenderer',
                    }],*/
                    width      : '98%',
                    height     : 530,
                    align      : 'center',                    
                    bind:{
                        store:'{ds_memoHis}'
                    },                 
                    listeners:{
                    	selectionchange : 'onSelectionChange'
                    },
                    columns:[{                   
                     	xtype       : 'excolumn',
                        text        : '접수일',
                        dataIndex   : 'CRT_DATE',                        
                        exAlign     : 'center',
                        flex        : 1.6,
                        renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
                        	if(value == undefined || value == "" || value == null){
                         		return "";
                        	}
                         	return exCommon.getFormat(value,'dateYMD' );
                        }
                    },{
                     	xtype       : 'excolumn',
                        text        : '제목',
                        dataIndex   : 'TITLE',
                        exAlign     : 'elft',
                        flex        : 4                                
                    }]
             	}]            	 	
            },{
            	width : '0.5%'
            },{
            	width   : '49%',
            	layout  : 'hbox',
            	items   : [{
            		xtype   :'exfieldsetblockbox',
            		width   : '95%',
            		items   :[{
            			xtype   : 'exblockrow',
	            		items   : [{
	            			xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">제목</div>'
	            		},{
	            			xtype   : 'exblockfield',
	                    	items   : [{
	                    		 xtype      :'extextfield',
	                             reference  : 'txt_title',
	                             name       : 'TITLE',
	                             exLabel    : '제목',
	                             width      : '99%',
	                    	}]
	            		}]
            		},{
            			xtype   : 'exblockrow',
	            		items   : [{
	            			xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">내용</div>'
	            		},{
	            			xtype   : 'exblockfield',
	                    	items   : [{
	                    		 xtype      :'extextarea',
	                             reference  : 'ta_contents',
	                             name       : 'CONTENTS',
	                             exLabel    : '내용',
	                             width      : '99%',
	                             height     : 500,
	                    	}]
	            		}]
            		}]
            	}]
            },{
            	width : '0.5%'
            }]
        }]
        
    }]
})