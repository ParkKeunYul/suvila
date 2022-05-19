Ext.define('ExFrm.view.cms.cms002w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cms002w_01',
	requires:[
		'ExFrm.view.cms.cms002w_01Controller',
        'ExFrm.view.cms.cms002w_01Model'
	],
	controller:'cms002w_01',
	viewModel:{
        type:'cms002w_01'
    },
    name:'cms002w_01',
    isRootView:true,
    title:'CMS회원',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	xtype:'excombobox',
            	fieldLabel:'사찰계좌정보',
            	fieldStyle: 'text-align: right;',
            	labelWidth:90,
                valueField:'CMS_TRADE_CD',
                displayField:'CMS_CUSTOMER_COMMENT',
                reference:'lc_cms_trade_cd',
                emptyText : '선택[]',
                value : '',
                width : 280,
                bind:{
                 	store:'{ds_temple_CMS_info}'
                },
                listConfig: {
                    itemTpl: [
                        '<div data-qtip="{CMS_TRADE_CD}: {description}"><span >{CMS_CUSTOMER_COMMENT}</span>[{CMS_TRADE_CD}]</div>'
                    ]
                },
                listeners:{
                	change:'onSearchTypeChange'
                }
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
        	},{
        		width : '0.5%'
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	 /*layout:'vbox',*/
	        	 width:'99%',
	        	 xtype:'exfieldsetblockbox',
	             items:[{
	            	 xtype:'exblockrow',
	            	 items:[{
                         xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">계정ID</div>'                           
                     },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'txt_cms_trade_cd',
                             exLabel:'계정ID',
                             name : 'CMS_TRADE_CD',
                             exReadOnly: true
                         }]
                     }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">미납금 출금 방식</div>'
	            	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'excombobox',
                             reference:'lc_misu_method',
                             exLabel:'미납금 출금 방식',
                             exReadOnly: true ,
                             valueField:'CODE',
                             displayField:'NAME',
                             bind:{
                              	store:'{ds_misu_method}'
                              }
                         }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">사용구분</div>'
	            	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'excombobox',
                             reference:'lc_use_yn',
                             exLabel:'사용구분',
                             exReadOnly: true,
                             valueField:'CODE',
                             displayField:'NAME',
                             bind:{
                              	store:'{ds_use_yn}'
                              }
                         }]
	            	 }]
	             
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">월출금한도금액</div>'
	            	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'em_month_limit_amount',
                             exLabel:'월출금한도금액',
                             exReadOnly: true,
                             exNumberComma : true,
                             exAlign : 'right'
                         }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">건당최대이체금액</div>'
	            	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'em_once_max_amount',
                             exLabel:'건당최대이체금액',
                             exReadOnly: true,
                             exNumberComma : true,
                             exAlign : 'right'
                         }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">수수료계정과목</div>'
	            	 },{
                    	 xtype:'exblockfield',
                         items:[{
                        	 xtype:'extextfield',
                             reference:'txt_accname',
                             exLabel:'수수료계정과목',
                             exReadOnly: true
                         }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">출금일관리</div>'
	            	 },{
	            		 xtype:'exblockfield',
                         items:[{
	                        	//html : '그리드'
	         		        	exGroupRef:true,
	         	                xtype:'exgrid',
	         	                reference:'cms002w_01_a',
	         	                height:180,
	         	                width:'100%',
	         	                bind:{
	         	                    store:'{ds_payDay}'
	         	                },
	         	               listeners:{},
	         	               columns:[{
	         	            	  text:'출금일',
	      	                	  xtype:'excolumn',
	      	                      dataIndex:'CMS_PAYMENT_DAY',
	      	                      width : 150,
	      	                      exAlign:'center',
	         	               },{
	         	            	  text:'출금방식',
	      	                	  xtype:'excolumn',
	      	                      dataIndex:'CMS_REQUEST_GBN',
	      	                      width : 150,
	      	                      exAlign:'center',
	      	                      renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                            	 var store = this.up('[isRootView=true]').getViewModel().getStore('ds_payment_day_gbn');
	                                 var index = store.find('CODE',value);
	                                 if(index != -1){
	                                    return store.getAt(index).get('NAME');
	                                 }else {
	                                    return value;
	                                 }                        	
	                              }
	         	              },{
	         	            	  text:'비고',
	         	            	//  xtype:'excombobox',
	      	                      dataIndex:'REMARK',
	      	                      width : 500,
	      	                      exAlign:'center',
	         	               }]
                         }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">CMS 출금 성공<br/>SMS 문자서식*</div>'
	            	 },{
	            		 xtype:'exblockfield',
	            		 layout:{
            		        type:'vbox',
            		        align:'left',   
	            		 },
	            		 items:[{
	            			 xtype:'excombobox',
                             valueField:'COL_NAME',
                             displayField:'COL_NAME',
                             reference:'lc_sect',
                             name:'SECT_CD',
                             value : "선택",
                             bind:{
                             	store:'{ds_smsItem}'
                             },
                             listeners:{
                             	change:'onAddSmsWord'
                             }
	            		 },{
	            			 xtype:'extextarea',
	            			 reference:'tx_sms_format',
	                         name:'SMS_FORMAT',
	                         width : '100%',
	                         listeners:{
	                        	 change:'onChangeForamt'
                             }
	            		 },{
	            			 width : '100%',
	            			 html : '<div style="width:100%;text-align:center;"><span id="sp_byte">0</span>/ <span id="sp_max">80 bytes (단문)</span></div>'
	            		 }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
	            	 items:[{ 
	            		 xtype:'exblocklabel',
                         html:'<div style="text-align:left;padding-left:5px;">비고</div>'
	            	 },{
	            		 xtype:'exblockfield',
	            		 items:[{
	            			 xtype:'extextarea',
	            			 reference:'tx_remark',
	                         name:'REMARK',
	                         width : '100%'
	            		 }]
	            	 }]
	             },{
	            	 xtype:'exblockrow',
		               	items:[{
		               		 xtype:'exblocklabel',
		                     html:'<div style="text-align:left;padding-left:5px;">설명</div>',
		                     height : 200
		               	},{
		               		xtype:'exblockfield',
		               		height:200,
		               		width : 1000,
		               		items:[{
			                	 html:' <div style="color:red;z-index:9999;posiotion:absolute;padding-top:5px;"><img src="./resources/img/cms/cms002w_01.png" >',
				                 height: 200,
				                 width : 1000,
			                }]
		               	}]
	             }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});