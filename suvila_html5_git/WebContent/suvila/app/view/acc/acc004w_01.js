Ext.define('ExFrm.view.acc.acc004w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.acc004w_01',
	requires:[
		'ExFrm.view.acc.acc004w_01Controller',
        'ExFrm.view.acc.acc004w_01Model'
	],
	controller:'acc004w_01',
	viewModel:{
        type:'acc004w_01'
    },
    name:'acc004w_01',
    isRootView:true,
    title:'계정등록',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 30,
	    },{
    		layout : 'hbox',
    		height : 30,
        	items : [{
            	xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_acctGbn',
                name         : 'V_ACCT_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">회계구분</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 200,
                value        : 1,
                bind         : {
                 	store:'{ds_acctGbn}'
                },
                listeners    : {
                	change : 'onSelect'
                }
	    	},{
        		width     : 5
	    	},{
	    		xtype        : 'excombobox',
                valueField   : 'CODE',
                displayField : 'NAME',
                reference    : 'lc_iegbn',
                name         : 'V_IE_GBN',                    
                fieldLabel   : '<span style="font-weight: 700;">세입/세출</span>',
                labelAlign   : 'right',
                labelWidth   : 70,
                width        : 150,
                value        : 'I',
                bind         : {
                 	store:'{ds_iegbn}'
                },
                listeners    : {
                	change : 'onSelect'
                }
	    	},{
	    		width     : 10
	    	},{
	    		xtype     : 'exbutton',
          		reference : 'selectBtn',
          		name      : 'selectBtn',
          		handler   : 'onSelect',
          		text      : '조회',	    	
        	}]
	    },{
	    	 height : 0,
	    	 items :[{
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
	         },{
            	xtype     : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'txt_total',       	 		
       	 		width     : 0,
       	 		value     : 0
	         }]
	   },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '32%',
	        	items : [{
	        		height : 30,
	        		html : '<span style="font-weight: 700;">관</span>'
	        	},{
	        		exGroupRef:true,
	                xtype     :'exgrid',
	                reference :'acc004w_01_a',                
	                height    : 800,	             
	                bind      :{
	                    store:'{ds_kwan}'
	                },
	                listeners:{
	                     selectionchange : 'onKwanSelection'
	                 },
	                columns:[{
	                	text      :'No',                        
	                    xtype     :'rownumberer',
	                    align     :'center',
	                    flex      : 1,
	                },{
	                	text      :'계정명(관)',
	                	xtype     :'excolumn',
	                    dataIndex :'KWAN_NAME',                    
	                    exAlign   :'left',
	                    flex      : 4
	                }]
	        	}]
	        },{
	        	width : '1.5%'
	        },{
	        	width : '32%',
	        	items :[{
	        		height : 30,
	        		html : '<span style="font-weight: 700;">항</span>'
	        	},{
	        		exGroupRef  :true,
	                xtype       :'exgrid',
	                reference   :'acc004w_01_b',                
	                height      :800,
	                bind        :{
	                    store:'{ds_hang}'
	                },
	                listeners:{
	                     selectionchange : 'onHangSelection'
	                 },
	                columns:[{
	                	text      :'No',                        
	                    xtype     :'rownumberer',
	                    align     :'center',
	                    flex      : 1,
	                },{
	                	text      :'계정명(항)',
	                	xtype     :'excolumn',
	                    dataIndex :'HANG_NAME',                    
	                    exAlign   :'left',
	                    flex      : 4
	                }]
	        	}]
	        },{
	        	width : '1.5%'
	        },{
	        	width : '32%',
	        	items :[{
	        		height : 30,
	        		layout : 'hbox',
	        		items  :[{
	        			html : '<span style="font-weight: 700;">목</span>',
	        			flex : 1
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'addBtn',
	              		name      : 'addBtn',
	              		handler   : 'onAdd',
	              		text      : '추가',
	        		},{
	        			width     : 5
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'saveBtn',
	              		name      : 'saveBtn',
	              		handler   : 'onSave',
	              		text      : '저장',
	        		}]
	        	},{
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'acc004w_01_c',
	                height       : 800,              
	                bind:{
	                    store:'{ds_mok}'
	                },
	                plugins      :[{
                        ptype:'cellediting'
                    }],
	                columns:[{
	                	text      :'No',                        
	                    xtype     :'rownumberer',
	                    align     :'center',
	                    flex      : 1,
	                },{
	                	text      :'계정명(목)',
	                	xtype     :'excolumn',
	                    dataIndex :'MOK_NAME',                    
	                    exAlign   :'left',
	                    flex      : 4,
	                    editor:{
                            xtype:'extextfield',
                        },
	                }]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});