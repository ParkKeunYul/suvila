Ext.define('ExFrm.view.asp.asp044w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_01',
	requires:[
		'ExFrm.view.asp.asp044w_01Controller',
        'ExFrm.view.asp.asp044w_01Model'
	],
	controller:'asp044w_01',
	viewModel:{
        type:'asp044w_01'
    },
    name:'asp044w_01',
    isRootView:true,
    title:'인등 소등관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width  : '99%',
	        	layout : 'hbox',
	        	items  : [{
	        		width : 310,
	        		layout : 'vbox',
	        		items  : [{
	        			height : 5
	        		},{
	        			html    : '<span style="font-weight:700;line-height:30px;">사찰정보</span>',
	        			height : 30
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_01_a',
	                    cls           : 'none-dirty-grid asp044w_01_a',
	                    height        : 800,
	                    width         : '100%',
	                    bind          : {
	                        store:'{ds_templeCd}'
	                    },
	                    listeners      : {
	                    	selectionchange : 'onSelectionTemple'
	                    },
	                    columns:[{
	                    	text        : '사찰코드',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_CD',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                        sortable    : true,
	                    },{
	                    	text        : '사찰명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_NM',                    
	                        exAlign     : 'left',
	                        width       : 200,
	                        sortable    : true,
	                    }]
	        		}]
	        	},{
	        		width : 5
	        	},{
	        		layout : 'vbox',
	        		flex   : 1,
	        		items  : [{
	        			height : 5
	        		},{
	        			layout : 'hbox',
	        			items  : [{
	        				html :'<div style="text-align:center;line-height:30px;font-weight:700;padding-right:5px;">접수일 : </div>',
	        			},{
	        				xtype          : 'exdatefield',
	                        reference      : 'me_AcceptSDateID',
	                        format         : 'Y-m-d',
	            		},{
	            			html :'<div style="text-align:center;width:20px;line-height:30px;">~</div>',
	            			width : 20
	            		},{
	            			xtype          : 'exdatefield',
	                        reference      : 'me_AcceptEDateID',
	                        format         : 'Y-m-d',
	            		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">전각명</span>',
		        			labelWidth   :50,
		                    valueField   :'JUNGAK_CD',
		                    displayField :'JUNGAK_NM',
		                    reference    :'lc_IDJungakInfo',
		                    width        : 200,
		                    bind:{
		                     	store:'{ds_IDJGKindInfo}'
		                    },
		                    listeners   : {
                                change : 'onJKchange',
                            },
		                    
		        		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">인등명 </span>',
		        			labelWidth   :50,
		                    valueField   :'LIGHT_CODE',
		                    displayField :'LIGHT_NM',
		                    reference    :'lc_IDKindInfo',
		                    width        : 250,
		                    bind:{
		                     	store:'{ds_IDKindInfo}'
		                    },
		        		},{
		        			width : 5
		        		},{
		        			xtype        :'excombobox',
		        			fieldLabel   : '<span style="font-weight: 700;text-align:right;display:inline-block;">소등여부</span>',
		        			labelWidth   :60,
		                    valueField   :'CODE',
		                    displayField :'NAME',
		                    reference    :'close_yn',
		                    width        : 150,
		                    bind:{
		                     	store:'{ds_close}'
		                    }
		        		},{
		        			width : 5
		        		},{
		    	    		xtype     : 'exbutton',
		              		text      : '조회',
		              		handler   : 'onSelect',
		    	    	},{
		        			width : 5,	        		
		    	    	},{
		    	    		xtype     : 'exbutton',	              		
		              		text      : '저장',
		              		handler   : 'onSave',
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
	                    reference     : 'asp044w_01_b',
	                    cls           : 'none-dirty-grid asp044w_01_b',
	                    height        : 427,
	                    width         : '100%',	                    
	                    bind          : {
	                        store:'{ds_IDRec}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    /*features   : [{
	                    	ftype : 'summary',
	                    	dock  : 'bottom'  // 하단 잠금
	                    }],*/
	                    columns:[{
	                    	text        : '순번',
	                        xtype       : 'rownumberer',
	                        width       : 70,
	                        align       : 'center',                    
	                    },{
	                    	text        : '접수번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'ACCEPT_SEQ',                    
	                        exAlign     : 'center',
	                        width       : 160,
	                        sortable    : true,
	                    },{
	                    	text        : '신도번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_BUD_NO',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '신청자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PROPOSAL_NAME_KOR',                    
	                        exAlign     : 'left',
	                        width       : 105,
	                        sortable    : true,
	                    },{
	                    	text        : '인등종류',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'LIGHT_NM',                    
	                        exAlign     : 'center',
	                        width       : 120,
	                        sortable    : true,
	                    },{
	                    	text        : '신도명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'NAME_KOR',                    
	                        exAlign     : 'left',
	                        width       : 90,
	                    },{
	                    	text        : '인등번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'LIGHT_NO',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                    },{
	                    	text        : '소등여부',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CLOSE_YN',                    
	                        exAlign     : 'center',
	                        width       : 100,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_close_g');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_close_g}'
	                            }
	                        },
	                    },{
	                    	text        : '인등위치',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'JUNGAK_NM',                    
	                        exAlign     : 'left',
	                        width       : 120,
	                    },{
	                    	text        : '년',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'INDEUNG_YEAR',                    
	                        exAlign     : 'center',
	                        width       : 60,
	                        sortable    : true,
	                    },{
	                    	text        : '월',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'INDEUNG_MONTH',                    
	                        exAlign     : 'center',
	                        width       : 60,
	                        sortable    : true,
	                    },{
	                    	text        : '기간',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'INDEUNG_PERIOD',                    
	                        exAlign     : 'center',
	                        width       : 60,
	                        sortable    : true,
	                    },{
	                    	text        : '동참금',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PAYMENT_PLAN_AMT',                    
	                        exAlign     : 'right',
	                        width       : 110,
	                        sortable    : true,
	                        exType      : 'number'
	                        /*summaryType    : 'sum',
	                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                        	if(value > 0){
	                        		return exCommon.setNumberFormat(value)+' 원';
	                        	}                        
	                        },*/
	                    },{
	                    	text        : '납부금액',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'PAYMENT_AMT',                    
	                        exAlign     : 'right',
	                        width       : 110,
	                        sortable    : true,
	                        exType      : 'number'
	                       /* summaryType    : 'sum',
	                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                        	if(value > 0){
	                        		return exCommon.setNumberFormat(value)+' 원';
	                        	}                        
	                        },*/
	                    },{
	                    	text        : '미수금액',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'MISU_AMT',                    
	                        exAlign     : 'right',
	                        width       : 110,
	                        sortable    : true,
	                        exType      : 'number'
	                        /*summaryType    : 'sum',
	                        summaryRenderer: function(value, summaryData, dataIndex, rowIndex, colIndex, store, view) {
	                        	if(value > 0){
	                        		return exCommon.setNumberFormat(value)+' 원';
	                        	}                        
	                        },*/
	                    }],
	                    viewConfig: {
		                	getRowClass: function(record, index) {
		                        var CLOSE_YN = record.get('CLOSE_YN');
		                        var APPROVAL_GBN = record.get("APPROVAL_GBN")
		                        
		                        if(CLOSE_YN == 'T'){
		                        	return 'useYnBack';
		                        }else if(APPROVAL_GBN == '3'){
		                        	return 'cmsline';
		                        }else{
		                        	return 'color_depth_1';
		                        }
		                    }
		                }
	        		},{
	        			height : 5
	        		},{
	        			height : 30,
	        			layout : 'hbox',
	        			items  : [{
	        				xtype           : 'extextfield',
	                        reference       : 'txt_jungak_nm',
	                        value           : '',
	                        enableKeyEvents : true,
	                        width           : 200 ,
	                        fieldLabel      : '<span style="font-weight: 700;">전각명</span>',
	                		labelWidth      : 60,
	                		exReadOnly      : true  
	        			},{
	        				width : 5
	        			},{
	        				xtype           : 'extextfield',
	                        reference       : 'me_verti',
	                        value           : '',
	                        enableKeyEvents : true,
	                        width           : 130 ,
	                        fieldLabel      : '<span style="font-weight: 700;color:red;">열겟수</span>',
	                		labelWidth      : 60,
	                		exType          : 'number',
	                		exReadOnly      : true
	        			},{
	        				width : 5
	        			},{
	        				xtype           : 'extextfield',
	                        reference       : 'me_horiz',
	                        value           : '',
	                        enableKeyEvents : true,
	                        width           : 130 ,
	                        fieldLabel      : '<span style="font-weight: 700;color:blue;">행겟수</span>',
	                		labelWidth      : 60,
	                		exType          : 'number',
	                		exReadOnly      : true
	            		},{
	        				width : 5
	        			},{
	        				layout: 'hbox',
	        				items :[{
	        					html : '<img src="./resources/img/bg/light_gbn_popup.gif" height="19px" width="486px" >',
	        				}]
	        			}]
	        		},{
	        			height : 3
	        		},{
	        			width  : '100%',
	        			layout : 'hbox',
	        			items  : [{
	        				flex       : 1,
                     		exGroupRef : true,
                            xtype      :'exgrid',
                            reference  :'rec000p_03_a',
                            cls        :'rec000p_03_a',
                            height     : 335,
                            align      : 'center',                    
                            bind:{
                                store:'{ds_crossLight}'
                            },                 
                            listeners:{
                            	cellclick      :  'onLightClick',
                            	//celldblclick : 'onCellDbClick',
                            	itemcontextmenu : 'onCrossLineClick'
                            },
                            columns:[{                   
                            	text  :'행/열',
                                xtype :'rownumberer',
                                width : 70,
                                align : 'center',
                            }]
	        			},{
	        				width : 5
	        			},{
	        				width  : 350,
	        				layout : 'hbox',        				
	        				items  : [{
	        					xtype    :'exfieldsetblockbox',
	        					width    : '100%',
	        					items    : [{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">전각명</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_jungak_nm',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">등번호</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_light_no',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신도번호</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_proposal_bud_no',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청자</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_bud_name',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">축원인</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_chuk_name',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">납부금액</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'me_payment_amt',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true,
	       	                                exNumberComma : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">미수금액</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'me_misu_amt',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true,
	       	                             	exNumberComma : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                    	xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">신청일</div>'
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		xtype      : 'extextfield',
	        	                    		reference  : 'txt_sindo_crt_date',
	       	                             	width      : '100%',
	       	                             	exReadOnly : true
	        	                    	}]
	        	                    }]
	        					},{
	        						xtype:'exblockrow',
	        	                    items:[{
	        	                        xtype   : 'exblocklabel',
	        	                        html    : '<div style="text-align:left;padding-left:5px;font-weight:700;">주소</div>'                           
	        	                    },{
	        	                    	xtype   : 'exblockfield',
	        	                    	items   : [{
	        	                    		 xtype      : 'extextarea',
	        	                			 reference  : 'txt_sindo_addr',
	        	                             width      : '100%',
	        	                             height     : 92,
	        	                             exReadOnly : true
	        	                    	}]
	        	                    }]	  
	        					}]
	        				}]
	        			}]
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});