Ext.define('ExFrm.view.ser.ser009w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser009w_01',
	requires:[
		'ExFrm.view.ser.ser009w_01Controller',
        'ExFrm.view.ser.ser009w_01Model'
	],
	controller:'ser009w_01',
	viewModel:{
        type:'ser009w_01'
    },
    name:'ser009w_01',
    isRootView:true,
    title:'메뉴관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '45%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	height : 15
	            },{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{                 
	                	xtype         : 'excombobox',                	
	                	labelWidth    : 80,
	                	fieldLabel    : '시스템구분',
	                    valueField    : 'CODE',
	                    displayField  : 'NAME',
	                    reference     : 'lc_SysGroup',
	                    name          : 'V_SERVICE_GBN',                    
	                    width         : 180,
	                    bind          : {
	                     	store:'{ds_SysGroup}'
	                    },
	                    listeners : {
	                    	change : 'onSelChange'
	                    }
	               
	                }]
	            },{
	            	height : 5
	            },{            	
	        		exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'ser009w_01_a',
	                height      : 780,              
	                /*plugins:[{
	                    ptype:'cellediting'
	                }],*/
	                bind:{
	                    store:'{ds_main}'
	                },
	                selModel: {
	                    mode: 'MULTI'
	                },
	                cls : 'ser009w_01_a',
	                columns:[{
	                	text:'프로그램ID',
	                	xtype:'excolumn',
	                    dataIndex:'PGM_ID',
	                    flex : 1,
	                    exAlign:'left',
	                },{
	                	text:'메뉴명',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_NM',                    
	                    exAlign:'left',
	                    flex : 4,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var rtn = value.replace(/ /g, '&nbsp;').replace('<', '&lt;').replace('>', '&gt;');
	                    	return rtn;
	                    }
	                }]
	            }]
	        },{
	        	width : '9%',
	        	      
                xtype:'container',
                layout: {
                    type: 'vbox',
                    pack :'center',
                    align: 'center',
                }, 
                height : '100%',
                items:[{
            		items:[{    
            			xtype     : 'exbutton',
	              		reference : 'inRightButton',
	              		name      : 'inRightMoveBtn',
	              		handler   : 'inRightMove',
	              		text      : '>',
	              		width     : 35,
	              		flex      : 1,
	              		exAlign   : 'center'
            		},{
            			height : 20
            		},{
            			xtype     : 'exbutton',
	              		reference : 'inLeftMoveBtn',
	              		name      : 'inLeftMoveBtn',
	              		handler   : 'inLeftMove',
	              		text      : '<',
	              		width     : 35,
	              		flex      : 1,
	              		exAlign   : 'center'
            		},{
            			height : 20
	                },{
	                	xtype     : 'exbutton',
	              		reference : 'inRightAllButton',
	              		name      : 'inRightAllButton',
	              		handler   : 'inRightAllMove',
	              		text      : '>>',
	              		width     : 35,
	              		flex      : 1,         
	              		exAlign   : 'center'
	                },{
            			height : 20
	                },{
	                	xtype     : 'exbutton',
	              		reference : 'inLeftAllButton',
	              		name      : 'inLeftAllButton',
	              		handler   : 'inLeftAllMove',
	              		text      : '<<',
	              		width     : 35,
	              		flex      : 1,         
	              		exAlign   : 'center'
	                }]
                }]
	        },{
	        	width : '45%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	height : 15
	            },{
	        		layout   : 'hbox',
	                xtype    : 'container',
	                height   : '30',
	                items:[{
	                	xtype        : 'excombobox',
	                	fieldLabel   : '권한구분',
	                	labelWidth   : 70,
	                    valueField   : 'CODE',
	                    displayField : 'NAME',
	                    reference    : 'lc_AuthGroup',
	                    name         : 'V_AUTH_GROUP',                    	                    
	                    width        : 170,
	                    bind:{
	                     	store:'{ds_AuthGroup}'
	                    },
	                    listeners : {
	                    	change : 'onSelChange'
	                    }/*,
	                    listConfig: {
	                    	itemTpl: [
	                    		'console.log("TEMPLE_CD", {TEMPLE_CD})'
	                    	]
	                    }*/
	                },{
	                	width : 5
	                },{
	                	xtype     : 'exbutton',
	              		reference : 'saveBtn',
	              		name      : 'saveBtn',
	              		handler   : 'onSave',
	              		text      : '저장',
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'newData',
               	 		name      : 'newData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'delData',
               	 		name      : 'delData',
               	 		width : 0
	                }]
	            },{
	            	height : 5
	            },{
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'ser009w_01_b',                
	                height:780,
	                //cls : 'cmsGrid',
	                bind:{
	                    store:'{ds_authmenu}'
	                },
	                /*plugins:[{
	                    ptype:'cellediting'
	                }],*/
	                listeners: {
	                    /*beforeedit: function(e, editor){
	                        if (editor.field == "MENU_GBN"){
	                        	return false;
	                        }
	                    }*/
	                },
	                selModel: {
	                    mode: 'MULTI'
	                },
	                columns:[{
	                	text:'프로그램ID',                        
	                    xtype:'excolumn',
	                    exAlign:'left',
	                    dataIndex: 'PGM_ID',
	                    flex : 1,
	                },{
	                	text:'메뉴명',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_NM',                    
	                    exAlign:'left',
	                    flex : 4,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var rtn = value.replace(/ /g, '&nbsp;').replace('<', '&lt;').replace('>', '&gt;');
	                    	return rtn;
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});