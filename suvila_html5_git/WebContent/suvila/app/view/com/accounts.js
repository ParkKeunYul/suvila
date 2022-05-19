Ext.define('ExFrm.view.com.accounts',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp012w_01',
	requires:[
		'ExFrm.view.com.accountsController',
        'ExFrm.view.com.accountsModel'
	],
	controller:'accounts',
	viewModel:{
        type:'accounts'
    },
    name:'accounts',
    isRootView:true,
    title:'회계계정과목',
    closable:true,
    scrollable:true,
    height:520,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
	    	items:[{
	    		xtype:'excombobox',
            	fieldLabel:'회계구분',
            	labelWidth:60,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_acctGbn',
              // name:'tr_msg_gb',                    
                value : '1',
                width : 200,
                bind:{
                 	store:'{ds_acctGbn}'
                },
                listeners : {
                	change : 'onKhmChange'
                }
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'세입/세출',
            	labelWidth:80,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_ieGbn',
              // name:'tr_msg_gb',                    
                width : 160,
                bind:{
                 	store:'{ds_ieGbn}'
                },
                listeners : {
                	change : 'onKhmChange'
                }
	    	},{
	    		xtype:'extextfield',
	    		fieldLabel:'목명',
	    		reference:'txt_mok_name',
	    		name : '',
	    		value : '기도수입',
            	labelWidth:50,
	    		width : 250,
	    		enableKeyEvents: true,
	    		listeners:{
             	   keyup : 'onSearchEnter'
                 }
	    	},{
	    		width : 5
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'searchBtn',
          		name      : 'searchBtn',
          		handler   : 'onSearch',
          		text      : '검색',
	    	},{
	    		width : '0.5%'
	    	}]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : '32%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : 0,
	                items:[{                 
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'leftNewData',
               	 		name      : 'leftNewData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'leftUptData',
               	 		name      : 'leftUptData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'leftDelData',
               	 		name      : 'leftDelData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'txt_init_value',
	               	 	value : 1,
	           	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'call_kwan',
	               	 	value : 0,
	           	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'call_hang',
	               	 	value : 0,
	           	 		width : 0
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'accounts_a',
	                height:400,              
	               bind:{
	                    store:'{ds_mok}'
	                },
	                cls : 'asp012w_01_a',
	                listeners: {
	                	selectionchange : 'onSelectionChangeMok',
	                	itemdblclick : 'onCellDbClick'
	                },
	                columns:[{
	                	text:'No',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'계정명(목)',
	                	xtype:'excolumn',
	                    dataIndex:'MOK_NAME',                    
	                    exAlign:'left',
	                    flex : 4
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{
	        	width : '32%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'accounts_b',                
	                height:400,
	                //cls : 'cmsGrid',
	                bind:{
	                    store:'{ds_hang}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                    /*beforeedit: function(e, editor){
	                        if (editor.field == "MENU_GBN"){
	                        	return false;
	                        }
	                    }*/
	                },
	                columns:[{
	                	text:'No',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'계정명(항)',
	                	xtype:'excolumn',
	                    dataIndex:'HANG_NAME',                    
	                    exAlign:'left',
	                    flex : 4
	                },{
	                	text:'선택',
	                	xtype:'checkcolumn',
	                    dataIndex:'USE_YN',                    
	                    exAlign:'left',
	                    flex : 1,
	                    listeners: {
	                        beforecheckchange: function() {
	                            return false; // HERE
	                        }
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{	        	
	        	width : '34%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'accounts_c',                
	                height:400,	             
	                bind:{
	                    store:'{ds_kwan}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                    /*beforeedit: function(e, editor){
	                        if (editor.field == "MENU_GBN"){
	                        	return false;
	                        }
	                    }*/
	                },
	                columns:[{
	                	text:'No',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'계정명(관)',
	                	xtype:'excolumn',
	                    dataIndex:'KWAN_NAME',                    
	                    exAlign:'left',
	                    flex : 4
	                },{
	                	text:'선택',
	                	xtype:'checkcolumn',
	                    dataIndex:'USE_YN',                    
	                    exAlign:'left',
	                    flex : 1,
	                    listeners: {
	                        beforecheckchange: function() {
	                            return false; // HERE
	                        }
	                    }
	                }]
	            }]
	        }]
	    },{
	    	height : 10
	    },{
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            align : 'center',
            items:[{
            	flex : 1
            },{
            	xtype     : 'exbutton',
          		reference : 'confirmlBtn',
          		name      : 'confirmlBtn',
          		handler   : 'onConfirm',
          		text      : '확인',
            },{
            	width : 10
            },{
            	xtype     : 'exbutton',
          		reference : 'cancelBtn',
          		name      : 'cancelBtn',
          		handler   : 'onCancel',
          		text      : '취소',
            },{
            	flex : 1
            }]
	    }]/*container*/
    }]/*exformmain*/ 
});