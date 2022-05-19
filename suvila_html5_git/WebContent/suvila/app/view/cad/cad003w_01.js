Ext.define('ExFrm.view.cad.cad003w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cad003w_01',
	requires:[
		'ExFrm.view.cad.cad003w_01Controller',
        'ExFrm.view.cad.cad003w_01Model'
	],
	controller:'cad003w_01',
	viewModel:{
        type:'cad003w_01'
    },
    name:'cad003w_01',
    isRootView:true,
    title:'신규등록',
    closable:true,
    scrollable:true,
    items:[{    	    
        xtype:'exformmain',
	    items:[{
	    	height : 15
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',	        	
	        },{
	        	//width : '65%',
	        	flex  : 1,
	        	items:[{	        		
	        		layout : 'hbox',
	        		items  :[{
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-radius:5px;display:inline-block;padding:0 15px;">그룹정보</div>',
	        		},{
	        			xtype           : 'extextfield',
	                    fieldLabel      : '<span style="font-weight: 700;">성명 </span>',
	                    labelWidth      : 45,
	                    reference       : 'txt_keyword',
	                    name            : 'V_KEYWORD',
	                    enableKeyEvents : true,
	                    width           : 220,
	                    listeners       : {
	                	   keyup : 'onSearchEnter'
	                    }
	    	    	},{
	    	    		width : 10
	    	    	},{
	    	    		xtype        : 'excombobox',
	                    valueField   : 'CLASS_CD',
	                    displayField : 'CLASS_NAME',
	                    reference    : 'lc_group',
	                    name         : 'V_GROUP',
	                    emptyText    : '전체',
	                    fieldLabel   : '<span style="font-weight: 700;">그룹</span>',
	                    labelAlign   : 'right',
	                    labelWidth   : 45,
	                    width        : 280,
	                    value        : 0,
	                    bind         : {
	                     	store:'{ds_group}'
	                    }
	    	    	},{
	    	    		width : 5
	    	    	},{
	        			xtype     : 'exbutton',
	              		reference : 'findSindoBtn',
	              		name      : 'findSindoBtn',
	              		handler   : 'onFindSindo',
	              		text      : '조회',
	        		}]
	        	 },{
        			height : 5
	        	 },{
	        		 	exGroupRef : true,
		                xtype      : 'exgrid',
		                reference  :'cad003w_01_a',
		                cls        : 'topCheckHeader',
		                height     : 720,
		                width      : '100%',
		                bind:{
		                    store:'{ds_main}'
		                },
		                multiSelect: true,
		                columnLines: true,
		                selModel: {
		                	selType: 'checkboxmodel',
	                	    //mode: 'SINGLE', // 상단 체크박스 나오지 않음	                	    
	                	    allowDeselect: true  ,  // row 선택시 자동체크 해제
	                	    checkOnly: true,
	                	    headerText: '선택',
	                        headerWidth : 90,
	                        listeners : {
	                        	 deselect : 'onDeSelect'
	                        	,select   : 'onSelect'
	                        }
	                    },
		                columns:[{
		                	text      :'성명',
		                	xtype     :'excolumn',
		                    dataIndex :'NAME_KOR',	                    
		                    exAlign   :'left',
		                    width     : 150                 
		                },{
		                	text      : '전화번호',
		                	xtype     : 'excolumn',
		                    dataIndex : 'TELNO',	                    
		                    exAlign   : 'center',
		                    width     : 150
		                },{
		                	text      : '휴대전화번호',
		                	xtype     : 'excolumn',
		                    dataIndex : 'MOBILE_TELNO',	                    
		                    exAlign   : 'center',
		                    width     : 150
		                },{
		                	text      : '우편번호',
		                	xtype     : 'excolumn',
		                    dataIndex : 'ZIP_CD',	                    
		                    exAlign   : 'left',
		                    width     : 100
		                },{
		                	text      :'주소1',
		                	xtype     :'excolumn',
		                    dataIndex :'ADDR1',	                    
		                    exAlign   :'left',
		                    flex      : 1,
		                },{
		                	text      :'주소2',
		                	xtype     :'excolumn',
		                    dataIndex :'ADDR2',	                    
		                    exAlign   :'left',
		                    flex      : 1,
		                }]
	             }]
	        },{
	        	width : '1%',
	        },{
	        	width : 450,
	        	items:[{
	        		height : 30,
	        		layout : 'hbox',
	        		width  : '100%',
	        		items  : [{
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-radius:5px;display:inline-block;padding:0 15px;">인명관리</div>',
	        		},{
	        			flex : 1
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'smsSendBtn',
	              		name      : 'smsSendBtn',
	              		handler   : 'onSmsSend',
	              		text      : '발송',
	        		},{
	                	xtype     : 'extextfield',
	           	 		inputType : 'hidden',
	           	 		reference : 'newData',
	           	 		name      : 'newData',
	           	 		width : 0
	        		}]
	        	},{
	        		height : 5
	        	},{
	        		xtype:'exfieldsetblockbox',
	        		items:[{
	        			xtype:'exblockrow',
	                    items:[{
	                    	xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">회신번호</div>'
	                    },{
	                    	xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_callback',
	                            exLabel:'회신번호',
	                            exMand:true,
	                            name:'TR_CALLBACK'
		        			}]
	                    }]
	        		},{
	        			xtype:'exblockrow',
	                    items:[{
	                    	xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">발송구분</div>'
	                    },{
	                    	xtype:'exblockfield',
		        			items:[{
		        				xtype:'radiogroup',
		        				name :'TR_MSGTYPE',
		        				reference : 'exRadioGroup',
		        				listeners: {
		        					change : 'onRadioChange'
		        				},
	        					items :[{
	        						boxLabel: '즉시발송', 
	        	                	inputValue: 0,    
	        	                	width : 80,
	        	                	checked: true
	        					},{
	        						boxLabel: '예약발송', 
	        	                	inputValue: 1,    
	        	                	width : 80,
	        		    		},{
	        		            	xtype     : 'extextfield',
	        		       	 		inputType : 'hidden',
	        		       	 		reference : 'TR_ETC1',
	        		       	 		name      : 'TR_ETC1',
	        		       	 		width : 0
	        		    		},{
	        		            	xtype     : 'extextfield',
	        		       	 		inputType : 'hidden',
	        		       	 		reference : 'TR_ETC5',
	        		       	 		name      : 'TR_ETC5',
	        		       	 		width : 0    		
	        		    		},{
	        		            	xtype     : 'extextfield',
	        		       	 		inputType : 'hidden',
	        		       	 		reference : 'TR_MSG_GB',
	        		       	 		name      : 'TR_MSG_GB',
	        		       	 		value     : 'SMS',
	        		       	 		width : 0
	        					}]
		        			}]
	                    }]
	        		},{
	        			xtype:'exblockrow',
	        			reference : 'td_sendDate',
	                    items:[{
	                    	xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">발송일시</div>'
	                    },{
	                    	xtype:'exblockfield',
		        			items:[{
		        				xtype:'exdatefield',
	                            reference:'me_sendDate',
	                            exLabel:'발송일',
	                            exMand:true,
	                            name:'TR_SENDDATE'
		        			},{
		        				xtype:'timefield',
	                            reference:'me_sendTimeTemp',	                            	                            
	                            name:'TR_SENDTIME_TEMP',
	                            minValue: '00:00',
	                            maxValue: '23:55',
	                            format: 'H:i',
	                            altFormats:'H:i',
	                            increment: 5,	                            
	                            width : 90,
	                            value : '06:00',
	                            anchor: '100%',
	                            listeners :{
	                          //  	select : 'onTimeSelect'
	                            }
		        			},{
		                    	xtype     : 'extextfield',
		               	 		inputType : 'hidden',
		               	 		reference : 'me_sendTime',
		               	 		name      : 'TR_SENDTIME',
		               	 		value     : '0600',
		               	 		width : 0
		        			}]
	                    }]
	        		},{
	        			 xtype:'extextarea',
            			 reference:'ta_msg',
                         name:'TR_MESSAGE',
                         height : 150,
                         enableKeyEvents: true,
                         listeners:{
                        	 change:'onChangeForamt'
                         }
	        		},{
	        			html :'<div style="width:100%;text-align:center;"><span id="sp_byte">0</span>&nbsp;/ <span id="sp_max">80 bytes (단문)</span><div>',
	        			height : 20,
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});