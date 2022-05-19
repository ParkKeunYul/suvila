Ext.define('ExFrm.view.rec.rec003w_22',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec003w_22',
    requires:['ExFrm.view.rec.rec003w_22Controller',
              'ExFrm.view.rec.rec003w_22Model',
              ],
    controller:'rec003w_22',
    viewModel:{
        type:'rec003w_22'
    },
    name:'rec003w_22',
    isRootView:true,
    header:false,
    closable:false,
    scrollable:true,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        xtype:'exformmain',     
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            xtype:'rec000w_02'
        },{
            xtype:'container',
            height:1
        },{
        	
        },{
           layout : 'hbox',
           items  :[{
        	   flex   : 1,
        	   layout : 'vbox',
        	   items  : [{
        		   html :'<span class="x-btn x-btn-default-small" style="color:#fff;border-radius:0px;padding-left:15px;padding-right:15px;font-weight:700;cursor:default;">대상 및 접수항목 선택</span>',
        		   height : 30
        	   },{
        		   xtype    :'tabpanel',
        		   cls      : 'selectTab',
        		   width    : '100%',        		   
        		   items    : [{        			   
		        	   title      : '영가',
		          	   xtype      : 'exgrid',
		          	   reference  : 'rec003w_21_a',
		          	   cls        : 'rec003w_02_b none-dirty-grid',
		          	   width      : '100%',
		          	   height 	   : 150,
		               bind       : {
		                   store:'{ds_spiritSelInfo}'
		               },
		               columns:[{
		              	 	text         : '선택',
		              	 	xtype        : 'excheckcolumn',
		                    dataIndex    : 'SEL_YN',                    
		                    exAlign      : 'center',
		                    flex         : 1, 
		                    stopSelection: false,
		                    sortable     : false,
		                    listeners    : {
    		                	   checkchange : 'spritCheckChange'
    		                   },
		                },{
		               	 	text         :'복위자명',
		               	 	xtype        :'excolumn',
		                    dataIndex    :'BOKWIJA_NM',
		                    flex         : 1.6,
		                    exAlign      : 'left',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
		                   	 var DEATH_YN = record.get("DEATH_YN");
		                   	 
		                   	 var color = "recCellEdit";
		                   	 
		                   	 if(DEATH_YN == 1){
		                   		 color = "recCellNotEdit";
		                   	 }else if(DEATH_YN == 2){
		                   		 color = "cmsline";
		                   	 }
		                   	 meta.tdCls = color;
		                   	 
		                   	 return value;
		                    }
		                },{
		               	 	text         :'관계',
		                	xtype        :'excolumn',
		                    dataIndex    :'DECE_REL',
		                    flex         : 1.4,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
		                   	 var DEATH_YN = record.get("DEATH_YN");
		                   	 
		                   	 var color = "recCellEdit";
		                   	 
		                   	 if(DEATH_YN == 1){
		                   		 color = "recCellNotEdit";
		                   	 }else if(DEATH_YN == 2){
		                   		 color = "cmsline";
		                   	 }
		                   	 meta.tdCls = color;
		                   	 
		                   	 return value;
		                    }
		                },{
		                	text         :'본',
		                    xtype        :'excolumn',
		                    dataIndex    :'BON_NM',
		                    flex         : 1.2,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
			                   	 var DEATH_YN = record.get("DEATH_YN");
			                   	 
			                   	 var color = "recCellEdit";
			                   	 
			                   	 if(DEATH_YN == 1){
			                   		 color = "recCellNotEdit";
			                   	 }else if(DEATH_YN == 2){
			                   		 color = "cmsline";
			                   	 }
			                   	 meta.tdCls = color;
			                   	 
			                   	 return value;
		                    }
		                },{
		               	 	text         :'영가자명',
		                 	xtype        :'excolumn',
		                    dataIndex    :'NAME_KOR',
		                    flex         : 1.6,
		                    exAlign      : 'left',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
		                   	 var DEATH_YN = record.get("DEATH_YN");
		                   	 
		                   	 var color = "recCellEdit";
		                   	 
		                   	 if(DEATH_YN == 1){
		                   		 color = "recCellNotEdit";
		                   	 }else if(DEATH_YN == 2){
		                   		 color = "cmsline";
		                   	 }
		                   	 meta.tdCls = color;
		                   	 
		                   	 return value;
		                    }
		                },{
		                	text         :'음력/양력',
		                    xtype        :'excolumn',
		                    dataIndex    :'LUNAR_SOLAR_NM',
		                    flex         : 1.4,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
			                   	 var DEATH_YN = record.get("DEATH_YN");
			                   	 
			                   	 var color = "recCellEdit";
			                   	 
			                   	 if(DEATH_YN == 1){
			                   		 color = "recCellNotEdit";
			                   	 }else if(DEATH_YN == 2){
			                   		 color = "cmsline";
			                   	 }
			                   	 meta.tdCls = color;
			                   	 
			                   	 return value;
		                    }
		                },{
		                	text         :'기일',
		                    xtype        :'excolumn',
		                    dataIndex    :'DEATH_DAY',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
		                   	 
			                   	 var DEATH_YN = record.get("DEATH_YN");
			                   	 
			                   	 var color = "recCellEdit";
			                   	 
			                   	 if(DEATH_YN == 1){
			                   		 color = "recCellNotEdit";
			                   	 }else if(DEATH_YN == 2){
			                   		 color = "cmsline";
			                   	 }
			                   	 meta.tdCls = color;
			                   	return exCommon.getGridDateFormat(value, '-' , 8);
		                    }
		                },{
		                	text         :'사망시간',
		                    xtype        :'excolumn',
		                    dataIndex    :'DEATH_TIME',
		                    flex         : 1.6,
		                    exAlign      : 'center',
		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
			                   	 var DEATH_YN = record.get("DEATH_YN");
			                   	 
			                   	 var color = "recCellEdit";
			                   	 
			                   	 if(DEATH_YN == 1){
			                   		 color = "recCellNotEdit";
			                   	 }else if(DEATH_YN == 2){
			                   		 color = "cmsline";
			                   	 }
			                   	 meta.tdCls = color;
			                   	 
			                   	 if( exCommon.getLength(value) == 4 ){
			                   		return value.substr(0,2) + ":" + value.substr(2); 
			                   	 }
			                   	 return value;
		                    }
		               }]
	        	   }]
        	   },{
        		   height : 5
        	   },{
	          	   xtype      : 'exgrid',
	          	   reference  : 'rec003w_21_49',
	          	   cls        : 'rec002w_02_b none-dirty-grid',
	          	   width      : '100%',
	          	   height 	  : 135,
		           plugins    : [{
		                	ptype:'cellediting',
		                	clicksToEdit: 1
		           }],
	               bind       : {
	                   store:'{ds_saguJaeKind}'
	               },
	               listeners      : {
	                	edit         : 'onEdit'
	                   ,beforeedit   : 'onBeforeedit',
                   },
	               columns:[{
	            	    text         :'구분',
	            	    xtype        : 'excheckcolumn',
		                dataIndex    :'ACCEPT_YN',
		                flex         : 1,
		                exAlign      : 'center',
		                /*listeners    : {
		                   checkchange : 'bokwiCheckChange'
		                },*/
	               },{
	            	   	text         :'제사종류',
		                xtype        :'excolumn',
		                dataIndex    :'JESA_NM',
		                flex         : 2,
		                exAlign      : 'left',
		                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    meta.tdCls = 'recCellNotEdit'
		                    return value;
		                }
	               },{
	            	   	text         :'음력/양력',
		                xtype        :'excolumn',
		                dataIndex    :'LUNAR_SOLAR',
		                flex         : 1.6,
		                exAlign      : 'center',
		                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    meta.tdCls = 'recCellNotEdit'
		                    	
		                    var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunarSolar');
   		                	return exCommon.getComboVal(value,store, '' );
		                    //return value;
		                }
	               },{
	            	   	text         :'제사일',
		                xtype        :'excolumn',
		                dataIndex    :'EVENT_DATE',
		                flex         : 1.8,
		                exAlign      : 'center',
		                exType       : 'date',
		                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    meta.tdCls = 'recCellEdit'
		                    return exCommon.getGridDateFormat(value, '-' , 8);
		                  //  return value;
		                },
		                editor: {
	                    	xtype         : 'exdatefield',
	                    	format        : 'Ymd'
	                    },
	               },{
	            	   	text         :'제사시간',
		                xtype        :'excolumn',
		                dataIndex    :'EVENT_TIME',
		                flex         : 1.6,
		                exAlign      : 'center',
		                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    meta.tdCls = 'recCellEdit'
		                    return value;
		                },
		                editor    : {
	                    	xtype         : 'extextfield',
	                    },
	               },{
	            	   	text         :'참여인원',
		                xtype        :'excolumn',
		                dataIndex    :'NUMBER_COUNT',
		                flex         : 1.6,
		                exAlign      : 'right',
		                renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		                    meta.tdCls = 'recCellEdit'
		                    return exCommon.setNumberFormat(value,0 );
		                },
		                editor    : {
	                    	xtype         : 'extextfield',
	                    },
	               }]
        	   }]
           },{
        	   width : 5,        	   
           },{
        	   layout: 'vbox',
        	   items :[{
        		   height : 30
        	   },{
        		   height: 150,
        		   layout:{
                       type:'vbox',
                       align:'center',
                       pack:'center'
                   },
                   items:[{
                       xtype   : 'exbutton',
                       iconCls : 'fa fa-caret-right',
                       handler : 'onShift'
                   }]
        	   }]
           },{
        	   width : 5
           },{
        	   flex : 1,
        	   layout: 'vbox',
        	   items :[{
        		    layout : 'hbox',
           			height : 30,
           			width  : '100%',
           			items  :[{
	           			flex : 1,
	           			//html   :'<div style="text-align:left;padding-left:2px;font-weight:700;padding-top:5px;">접수버튼 영역</div>',
	           		},{
	           			xtype     :'radiogroup',
	           			reference : 'rdo_ApprovalGbn_r03_22',
	           			name      : 'rdo_ApprovalGbn_r03_22',
	           			/*listeners: {
	       					change : 'onRadioChange',
	       				},*/
	           			items     :[{
	           				boxLabel   : '현금', 
	   	                	inputValue : 1,    
	   	                	width      : 60,
	   	                	reference  : 'rdo_ApprovalGbn1',
	   	                	checked    : true
	           			},{
	           				boxLabel   : '카드', 
	   	                	inputValue : 2,    
	   	                	width      : 60,
	   	                	reference  : 'rdo_ApprovalGbn2',
	           			},{
	           				boxLabel   : '무통장', 
	   	                	inputValue : 4,    
	   	                	width      : 60,
	   	                	reference  : 'rdo_ApprovalGbn3',
	           			}]
	           		},{
	           			width : 3
	           		},{
	           			xtype     : 'exbutton',
	                 	reference : 'delAllBtn',
	                 	name      : 'delAllBtn',
	                 	text      : '전체취소',
	                 	handler   : 'onDelAll',
	           		},{
	           			width : 3
	           		},{
	           			xtype     : 'exbutton',
	                 	reference : 'saveBtn',
	                 	name      : 'saveBtn',
	                 	text      : '접수완료',
	                 	handler   : 'onSave',
	           		},{
	           			width : 0,
	           			items : [{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_saguJae',
	   	                    name             : 'ds_saguJae',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_saguJaeSpirit',
	   	                    name             : 'ds_saguJaeSpirit',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_saguJaeBokwi',
	   	                    name             : 'ds_saguJaeBokwi',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_saguJaeKind',
	   	                    name             : 'ds_saguJaeKind',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_acceptRecAmt',
	   	                    name             : 'ds_acceptRecAmt',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_sms',
	   	                    name             : 'ds_sms',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_pgCardInfo',
	   	                    name             : 'ds_pgCardInfo',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			}]
	           	   }]
        	   },{
        		   width  : '100%',
        		   //html : '오른쪽'
        		   layout : 'hbox',
        		   items  : [{
        			   flex : 1,
        			   items :[{
        				   xtype    :'tabpanel',
        				   cls      : 'selectTab',
                		   width    : '100%',
                		   items    :[{
                			   title      : '49재',
        		          	   xtype      : 'exgrid',
        		          	   reference  : 'rec003w_21_b',
        		          	   cls        : 'rec002w_02_b none-dirty-grid',
        		          	   width      : '100%',
        		          	   height 	  : 150,
	        		           plugins    : [{
	     		                	ptype:'cellediting',
	     		                	clicksToEdit: 1
	     		               }],
        		               bind       : {
        		                   store:'{ds_saguJaeSpirit}'
        		               },
        		               columns:[{
        		              	 	text         : '순번',
        		              	 	xtype        : 'rownumberer',
        		                    dataIndex    : 'SEL_YN',                    
        		                    align        : 'center',
        		                    flex         : 1, 
        		                    renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
        		                    	meta.tdCls = 'recCellNotEdit'
        		                    	return (rowIndex+1);
        		                    }
        		                },{
        		                	text         :'행관계',
 	       		                    xtype        :'excolumn',
 	       		                    dataIndex    :'HYO_REL',
 	       		                    flex         : 1.6,
 	       		                    exAlign      : 'left',
 	       		                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	       		                	    meta.tdCls = 'recCellNotEdit'
 	       		                	    return value;
 	       		                    }
        		                },{
        		                	text         :'영가자명',
 	       		                    xtype        :'excolumn',
 	       		                    dataIndex    :'DECE_NAME_KOR',
 	       		                    flex         : 1.6,
 	       		                    exAlign      : 'left',
 	       		                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	       		                	    meta.tdCls = 'recCellNotEdit'
 	       		                	    return value;
 	       		                    }
        		                },{
        		                	text         :'망과계',
 	       		                    xtype        :'excolumn',
 	       		                    dataIndex    :'DECE_REL',
 	       		                    flex         : 1.6,
 	       		                    exAlign      : 'left',
 	       		                    renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
 	       		                	    meta.tdCls = 'recCellEdit'
 	       		                	    return value;
 	       		                    },
 	       		                    editor        : {
	       		                	   xtype        : 'extextfield',
	       		                    }
        		                }]
                		   }]
        			   }]
        		   },{
        			   width  : 5
        		   },{        			   
        			   flex : 1,
        			   items :[{
        				   xtype    :'tabpanel',
                		   width    : '100%',
                		   cls      : 'selectTab',
                		   items    :[{
                			   title      : '복위자',
        		          	   xtype      : 'exgrid',
        		          	   reference  : 'rec003w_21_c',
        		          	   cls        : 'rec002w_02_b none-dirty-grid',
        		          	   width      : '100%',
        		          	   height 	   : 150,
        		               bind       : {
        		                   store:'{ds_saguJaeBokwi}'
        		               },
        		               plugins     : [{
        		                	ptype:'cellediting',
        		                	clicksToEdit: 1
        		               }],
        		               columns:[{
        		            	   text         :'대표',
        		            	   xtype        : 'excheckcolumn',
	       		                   dataIndex    :'REP_YN',
	       		                   flex         : 1,
	       		                   exAlign      : 'center',
	       		                   listeners    : {
	       		                	   checkchange : 'bokwiCheckChange'
	       		                   },
        		               /*},{
        		            	   text         :'관계',
	       		                   xtype        :'excolumn',
	       		                   dataIndex    :'DECE_REL',
	       		                   flex         : 1,
	       		                   exAlign      : 'center',*/
        		               },{
        		            	   text         :'행관계',
	       		                   xtype        :'excolumn',
	       		                   dataIndex    :'HYO_REL',
	       		                   flex         : 1.2,
	       		                   exAlign      : 'center',
	       		                   renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	       		                	   meta.tdCls = 'recCellEdit'
	       		                	   return value;
	       		                   },
	       		                   editor        : {
	       		                	   xtype        : 'extextfield',
	       		                   }
        		               },{
        		            	   text         :'복위자명',
	       		                   xtype        :'excolumn',
	       		                   dataIndex    :'BOKWEJA_NM',
	       		                   flex         : 1.5,
	       		                   exAlign      : 'left',
	       		                   renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
	       		                	   meta.tdCls = 'recCellNotEdit'
	       		                	   return value;
	       		                   }
        		               },{
        		            	   text         :'복위기부',
	       		                   xtype        :'excolumn',
	       		                   dataIndex    :'BOKWI_KIBU_GBN',
	       		                   flex         : 1.6,
	       		                   exAlign      : 'center',
	       		                   renderer    : function(value, meta, record, rowIndex, colIndex, store, view){
		       		                	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_bokwigibu');
		       		                	return exCommon.getComboVal(value,store, '' );
	       		                   },
		       		               editor        : {
		       	                    	xtype        : 'excombobox',
		       	                        valueField   : 'CODE',
		       	                        displayField : 'NAME',
		       	                        bind:{
		       	                            store:'{ds_bokwigibu}'
		       	                        }
		       	                    },
        		               }]
                		   }]
        			   }]
        		   }]
        	   },{
        		   height : 5
        	   },{
        		   width   : '100%',
        		   xtype   :'exfieldsetblockbox',
		    	   items   : [{
		    			xtype:'exblockrow',
	                    items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">동참금</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype     : 'extextfield',
	                            reference : 'me_saguPaymentPlanAmt',
	                            exLabel   : '동참금',                            
	                            name      : 'PAYMENT_PLAN_AMT',
	                            width     : '99%',
	                            exType    : 'number',
	                            exAlign   : 'right',
	                            listeners : {
	                            	blur : 'onAmoutBlur'
	                            }
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">당일납부</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype     : 'extextfield',
	                            reference : 'me_saguPaymentAmt',
	                            exLabel   : '동참금',                            
	                            name      : 'PAYMENT_AMT',
	                            width     : '99%',	
	                            exType    : 'number',
	                            exAlign   : 'right',
	                            listeners : {
	                            	blur : 'onAmoutBlur'
	                            }
	                    	}]
	                    }]
		    	   },{
		    		   xtype:'exblockrow',
	                    items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">미수금액</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype     : 'extextfield',
	                            reference : 'me_saguMisuAmt',
	                            exLabel   : '미수금액',                            
	                            name      : 'MISU_AMT',
	                            width     : '99%',
	                            exReadOnly: true,
	                            exType    : 'number',
	                            exAlign   : 'right',
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">담당스님</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
                          	xtype        : 'excombobox',
	                            valueField   : 'USER_ID',
	                            displayField : 'USER_NM',
	                            reference    : 'lc_damdangMonkId',
	                            name         : 'DAMDANG_MONK_ID',
	                            emptyText    : '선택',
	                            bind         : {
	                            	store:'{ds_monk}'
	                            },
	                            listeners    : {
	                            	change : 'onMonKChange'
	                            },
	                            width : 200	
	                    	}]
	                    }]
		    	   },{
		    		   xtype:'exblockrow',
	                    items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">전화번호</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items:[{
	                    		xtype      : 'extextfield',
	                             reference  : 'txt_MonkTelNo1',
	                             name       : 'TELNO1',
	                             exLabel    : '전화2',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    	},{
	                    		 xtype      : 'extextfield',
	                             reference  : 'txt_MonkTelNo2',
	                             name       : 'TELNO2',
	                             exLabel    : '전화2',
	                             width      : 70,
	                             exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    	},{
	                    		xtype       : 'extextfield',
	                             reference  : 'txt_MonkTelNo3',
	                             name       : 'TELNO3',
	                             exLabel    : '전화3',
	                             width      : 70,
	                             exReadOnly : true,
	                    	}]
	                    },{
	                    	xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">휴대전화번호</div>'
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		xtype     : 'extextfield',
	                            reference : 'txt_MonkMTelNo1',	                                         
	                            name      : 'MOBILE_TELNO1',
	                            width     : 60,
	                            exReadOnly : true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    	},{
	                    		xtype     : 'extextfield',
	                            reference : 'txt_MonkMTelNo2',
	                            name      : 'MOBILE_TELNO2',
	                            width     : 60,
	                            exReadOnly: true,
	                    	},{
	                    		width : 20,
	                    		html  : '<div style="width:20px;text-align:center;"> - </div>'
	                    	},{
	                    		xtype     : 'extextfield',
	                            reference : 'txt_MonkMTelNo3',
	                            name      : 'MOBILE_TELNO3',
	                            width     : 60,
	                            exReadOnly: true,
	                    	}]
	                    }]
		    	   },{
		    		   xtype:'exblockrow',
	                   items:[{
	                        xtype   : 'exblocklabel',
	                        html    : '<div style="text-align:left;padding-left:5px;">메모</div>'                           
	                    },{
	                    	xtype   : 'exblockfield',
	                    	items   : [{
	                    		 xtype      : 'extextarea',
	                			 reference  : 'ta_remark',
	                             name       : 'REMARK',
	                             width      : '99%',
	                             height     : 39
	                    	}]
	                    }]	
		    	   }]
        	   }]
           }]
        },{
            xtype:'rec000w_03'
        }]
    }]
});
