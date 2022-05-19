Ext.define('ExFrm.view.ser.ser023w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser023w_01',
	requires:[
		'ExFrm.view.ser.ser023w_01Controller',
        'ExFrm.view.ser.ser023w_01Model'
	],
	controller:'ser023w_01',
	viewModel:{
        type:'ser023w_01'
    },
    name:'ser023w_01',
    isRootView:true,
    title:'본관_등록',
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
        		xtype          : 'extextfield',
                fieldLabel     : '<span style="font-weight:400;">계율명</span>',
                reference      : 'txt_find_confNm',
                name           : 'V_FIND_CONFNAME',
                labelAlign     : 'right',                        
                labelWidth     : 70,
                enableKeyEvents: true,                
                width          : 220,
                listeners      : {
            	  // keyup : 'onSearchEnter'
                }
	    	},{
        		width     : 5
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
	    	},{
            	width : 5
        	},{
	    		xtype     : 'exbutton',
          		reference : 'gridApplyBtn',
          		name      : 'gridApplyBtn',
          		handler   : 'onGridApply',
          		text      : '그리드적용',
        	},{
            	width : 5
        	},{
	    		xtype     : 'exbutton',
          		reference : 'deleteBtn',
          		name      : 'deleteBtn',
          		handler   : 'onDelete',
          		text      : '삭제',	
        	},{
            	width : 5
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
        	}]
	     },{
	    	 height : 0,
	    	 items  : [{
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
	     },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '30%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'ser023w_01_a',
	                height     : 790,              
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind      : {
	                    store:'{ds_main}'
	                },
	                listeners : {
	                	selectionchange : 'onSelectionChange'
                    },
	                cls       : 'ser023w_01_a',
	                columns   : [{
	                	xtype     :'rownumberer',	                    
	                    text      :'No',
	                    width     : 40
	                },{
	                	text      :'계율명',
	                	xtype     :'excolumn',
	                    dataIndex :'CONF_NAME',                    
	                    exAlign   :'left',
	                    flex      : 1,	                    
	                    sortable  : true,
	                },{
	                	text      :'메모',
	                	xtype     :'excolumn',
	                    dataIndex :'MEMO',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    exHidden  : true,
	                    sortable  : true,
	                },{
	                	text      :'계율내용',
	                	xtype     :'excolumn',
	                    dataIndex :'CONF_CONTENTS',                    
	                    exAlign   :'left',
	                    flex      : 1,
	                    exHidden  : true,
	                    sortable  : true,
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        },{
	        	width : '65.5%',      
	        	xtype :'exfieldsetblockbox',
	        	items:[{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype  :'exblocklabel',
                        html   :'<div style="text-align:left;padding-left:5px;">계율명</div>'
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				xtype     : 'extextfield',
                            reference : 'txt_confNm',
                            exLabel   : '계율명',
                            name      : 'CONF_NAME',
                            width     : '100%'
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	        		items:[{
	        			xtype:'exblocklabel',
	                    html:'<div style="text-align:left;padding-left:5px;">사용유무</div>'
	        		},{
	        			xtype:'exblockfield',
	        			items:[{
	        				xtype        : 'excombobox',
	                        valueField   : 'CODE',
	                        displayField : 'NAME',
	                        reference    : 'lc_UseYn',
	                        name         : 'USE_YN',                    
	                        value        : '',
	                        emptyText    : '선택',
	                        width        : 120,
	                        bind         : {
	                         	store:'{ds_useYn}'
	                        }
	        			}]
	        		}]
	        	},{
	        		xtype:'exblockrow',
	               	items:[{
	                   	 xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">메모</div> '
	               	},{
	               		 xtype:'exblockfield',
	               		 items:[{
	               			 xtype    : 'extextarea',
	               			 reference: 'txt_memo',
	                         name     : 'MEMO',
	                         width    : '100%'
	               		 }]
	               	}]
	        	},{
	        		xtype:'exblockrow',
	               	items:[{
	                   	 xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">계율내용</div> '
	               	},{
	               		 xtype:'exblockfield',
	               		 items:[{
	               			 xtype    : 'extextarea',
	               			 reference: 'txt_conf_contents',
	                         name     : 'CONF_CONTENTS',
	                         width    : '100%',
	                         height   : 300,
	               		 }]
	               	}]
	        	}]
	        },{
	        
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546