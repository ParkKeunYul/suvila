Ext.define('ExFrm.view.rec.rec003w_42',{
    extend: 'ExFrm.view.widget.container.ExPanelBox',
    alias:'widget.rec003w_42',
    requires:['ExFrm.view.rec.rec003w_42Controller',
              'ExFrm.view.rec.rec003w_42Model',
              ],
    controller:'rec003w_42',
    viewModel:{
        type:'rec003w_42'
    },
    name:'rec003w_42',
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
		          	   reference  : 'rec003w_42_a',
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
	           			reference : 'rdo_ApprovalGbn_r03_42',
	           			name      : 'rdo_ApprovalGbn_r03_42',
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
	   	                    reference        : 'ds_giJae',
	   	                    name             : 'ds_giJae',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_giJaeSpirit',
	   	                    name             : 'ds_giJaeSpirit',
	   	                    value            : '',
	   	                    inputType        : 'hidden',
	           			},{
	           				xtype            : 'extextfield',
	   	                    reference        : 'ds_giJaeBokwi',
	   	                    name             : 'ds_giJaeBokwi',
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
                			   title      : '기제',
        		          	   xtype      : 'exgrid',
        		          	   reference  : 'rec003w_42_b',
        		          	   cls        : 'rec002w_02_b none-dirty-grid',
        		          	   width      : '100%',
        		          	   height 	  : 150,
	        		           plugins    : [{
	     		                	ptype:'cellediting',
	     		                	clicksToEdit: 1
	     		               }],
        		               bind       : {
        		                   store:'{ds_giJaeSpirit}'
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
        				   cls      : 'selectTab',
                		   width    : '100%',
                		   items    :[{
                			   title      : '복위자',
        		          	   xtype      : 'exgrid',
        		          	   reference  : 'rec003w_42_c',
        		          	   cls        : 'rec002w_02_b none-dirty-grid',
        		          	   width      : '100%',
        		          	   height 	   : 150,
        		               bind       : {
        		                   store:'{ds_giJaeBokwi}'
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
        	   }]
           }]
        },{
       	    xtype      : 'exgrid',
       	    reference  : 'rec003w_42_d',
       	    cls        : 'rec002w_02_b none-dirty-grid',
       	    width      : '100%',
       	    height 	   : 60,
	            plugins    : [{
              	ptype:'cellediting',
              	clicksToEdit: 1
            }],
            listeners      : {
            	 edit         : 'onEdit'
           // 	,beforeedit   : 'onBeforeEdit'
            },
            bind       : {
                store:'{ds_giJae}'
            },
            columns:[{
            	text         :'음력/양력',
                xtype        :'excolumn',
                dataIndex    :'LUNAR_SOLAR',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	
                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunarSolar');
                	return exCommon.getComboVal(value,store);
                },
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    bind:{
                        store:'{ds_lunarSolar}'
                    }
                },
            },{
            	text         :'윤달/평달',
                xtype        :'excolumn',
                dataIndex    :'LEAP_MONTH',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_leapmonth');
                	return exCommon.getComboVal(value,store);
                },
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'CODE',
                    displayField : 'NAME',
                    bind:{
                        store:'{ds_leapmonth}'
                    }
                },
            },{
            	text         :'제사일',
                xtype        :'excolumn',
                dataIndex    :'EVENT_DATE',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	return exCommon.getGridDateFormat(value, '-' , 8);
                },
                editor: {
                	xtype         : 'exdatefield',
                	format        : 'Y/m/d',
                	dateFormat     : 'Y/m/d'
                },
            },{
            	text         :'제사시간',
                xtype        :'excolumn',
                dataIndex    :'EVENT_TIME',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
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
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	 meta.style = 'background-color:#ffffff !important;';
                   	 return value;
                },
                editor    : {
                	xtype         : 'extextfield',
                },
            },{
            	text         :'담당스님',
                xtype        :'excolumn',
                dataIndex    :'DAMDANG_MONK_ID',
                flex         : 1.6,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_monk');
                	return exCommon.getComboVal(value,store, 'user', 'USER_ID', 'USER_NM');
                },
                editor        : {
                	xtype        : 'excombobox',
                    valueField   : 'USER_ID',
                    displayField : 'USER_NM',
                    bind:{
                        store:'{ds_monk}'
                    },
                    emptyText : '선택',
                },
            },{
            	text         :'전화번호',
                xtype        :'excolumn',
                dataIndex    :'TELNO',
                flex         : 2,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#f6f9fd !important;';
                   	 return value;
                }
            },{
            	text         :'휴대전화',
                xtype        :'excolumn',
                dataIndex    :'MOBILE_TELNO',
                flex         : 2,
                exAlign      : 'center',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#f6f9fd !important;';
                   	 return value;
                }
            },{
            	text         :'접수금액',
                xtype        :'excolumn',
                dataIndex    :'PAYMENT_PLAN_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	 return exCommon.setNumberFormat(value);
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            },{
            	text         :'납부금액',
                xtype        :'excolumn',
                dataIndex    :'PAYMENT_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	 return exCommon.setNumberFormat(value);
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            
            },{
            	text         :'미수금액',
                xtype        :'excolumn',
                dataIndex    :'MISU_AMT',
                flex         : 2,
                exAlign      : 'right',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	 return exCommon.setNumberFormat(value);
                },
                
            },{
            	text         :'비고',
                xtype        :'excolumn',
                dataIndex    :'REMARK',
                flex         : 2,
                exAlign      : 'left',
                renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
                   	 var DEATH_YN = record.get("DEATH_YN");
                   	meta.style = 'background-color:#ffffff !important;';
                   	 return value;
                },
                editor        : {
                	xtype         : 'extextfield',
                },
            }]
        },{
        	height : 5
        },{
            xtype:'rec000w_03'
        }]
    }]
});
