Ext.define('ExFrm.view.asp.asp006w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp006w_01',
	requires:[
		'ExFrm.view.asp.asp006w_01Controller',
        'ExFrm.view.asp.asp006w_01Model'
	],
	controller:'asp006w_01',
	viewModel:{
        type:'asp006w_01'
    },
    name:'asp006w_01',
    isRootView:true,
    title:'SMS문자컬럼관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '56%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	height : 30
	            },{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{                 
	                /*},{
	                	flex : 1,
	                	html : '<div style="line-height:30px;font-weight:700;">대상 및 접수항목 선택 <span style="color:red;display:inline-block;margin-left:10px;"> [기준사찰]</span></div>',
	                */	
	                },{
	                	xtype:'excombobox',                	
	                	labelWidth:100,
	                	fieldLabel : '문자컬럼항목 ',
	                    valueField:'CODE',
	                    displayField:'NAME',
	                    reference:'lc_alarm',
	                    name:'V_CODE',                    
	                    value : '1',
	                    width : 200,
	                    bind:{
	                     	store:'{ds_alarmItem}'
	                    },
	                    listeners : {
	                    	change : 'onSmsChange'
	                    }
	                },{
	                	width : 10
	                },{
	                	xtype : 'exbutton',
	              		reference : 'delBtn',
	              		name : 'delBtn',
	              		handler : 'onDel',
	              		text:'삭제',
	                },{
	                	width : 4
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveBtn',
	              		name : 'saveBtn',
	              		handler : 'onSave',
	              		text:'저장',
	                },{
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
	                }]
	            },{
	            	height : 5
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp006w_01_a',
	                height:820,              
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	               bind:{
	                    store:'{ds_alarmItemMgt}'
	                },
	               /* selModel: {
	                    mode: 'MULTI'
	                },*/
	                cls : 'asp006w_01_a',
	                listeners: {
	                    beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "PGM_ID"){
	                        	return false;
	                        }
	                    },
	                },
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'선택',
	                	xtype:'excheckcolumn',
	                    dataIndex:'SEL_YN',                    
	                    exAlign:'left',
	                    flex : 1,
	                },{
	                	text:'컬럼 ID',
	                	xtype:'excolumn',
	                    dataIndex:'COL_ID',                    
	                    exAlign:'left',
	                    flex : 3,
	                    editor:{
	                        xtype:'extextfield',
	                    }
	                },{
	                	text:'컬럼명',
	                	xtype:'excolumn',
	                    dataIndex:'COL_NAME',                    
	                    exAlign:'left',
	                    flex : 3,
	                    editor:{
	                        xtype:'extextfield',
	                    }
	                },{
	                	text:'사용유무',
	                	xtype:'excheckcolumn',
	                    dataIndex:'USE_YN',                    
	                    exAlign:'center',
	                    flex : 2
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{
	        	width : '43%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	            	height : 30
	            },{
	        		layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{
	                	xtype:'excombobox',
	                	fieldLabel:'테이블명',
	                	labelWidth:70,
	                    valueField:'TABLE_NAME',
	                    displayField:'TABLE_NAME',
	                    reference:'lc_table',
	                    name:'V_TABLE_NAME',                    
	                    value : 'ASP_ANNOUNCE',
	                    width : 300,
	                    bind:{
	                     	store:'{ds_table}'
	                    },
	                    listeners : {
	                    	change : 'onTableChange'
	                    }
	                    /*listConfig: {
	                    	itemTpl: [
	                    		'console.log("TEMPLE_CD", {TEMPLE_CD})'
	                    	]
	                    }*/
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addBtn',
	              		name : 'addBtn',
	              		handler : 'onAdd',
	              		text:'추가',
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'rightNewData',
               	 		name      : 'rightNewData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'rightUptData',
               	 		name      : 'rightUptData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'rightDelData',
               	 		name      : 'rightDelData',
               	 		width : 0
	                }]
	            },{
	            	height : 5
	            },{
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp006w_01_b',                
	                height:820,
	                //cls : 'cmsGrid',
	                bind:{
	                    store:'{ds_column}'
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
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    flex : 1,
	                },{
	                	text:'선택',
	                	xtype:'excheckcolumn',
	                    dataIndex:'SEL_YN',                    
	                    exAlign:'left',
	                    flex : 1
	                },{
	                	text:'컬럼명',
	                	xtype:'excolumn',
	                    dataIndex:'COLUMN_NAME',                    
	                    exAlign:'left',
	                    flex : 6,
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});