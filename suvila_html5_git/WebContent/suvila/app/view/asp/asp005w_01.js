Ext.define('ExFrm.view.asp.asp005w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp005w_01',
	requires:[
		'ExFrm.view.asp.asp005w_01Controller',
        'ExFrm.view.asp.asp005w_01Model'
	],
	controller:'asp005w_01',
	viewModel:{
        type:'asp005w_01'
    },
    name:'asp005w_01',
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
	        	width : '0.5%',
	        },{
	        	width : '55.5%',        	
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
	                },{
	                	flex : 1,
	                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">대상 및 접수항목 선택 <span style="color:black;display:inline-block;margin-left:10px;"> [기준사찰]</span></div>',
	                },{
	                	xtype:'excombobox',                	
	                	labelWidth:60,
	                    valueField:'CODE',
	                    displayField:'NAME',
	                    reference:'lc_SysGroup',
	                    name:'V_SEARCH_VALUE',                    
	                    value : '1',
	                    width : 100,
	                    bind:{
	                     	store:'{ds_serviceGbn_l}'
	                    },
	                    listeners : {
	                    	change : 'onMenuChange'
	                    }
	                },{
	                	width : 10
	                },{
	                	xtype : 'exbutton',
	              		reference : 'leftAddBtn',
	              		name : 'leftAddBtn',
	              		handler : 'onLeftAdd',
	              		text:'신규',
	                },{
	                	width : 4                	
	                },{
	                	xtype : 'exbutton',
	              		reference : 'leftDelBtn',
	              		name : 'leftDelBtn',
	              		handler : 'onLeftDel',
	              		text:'삭제',
	                },{
	                	width : 4
	                },{
	                	xtype : 'exbutton',
	              		reference : 'leftSaveBtn',
	              		name : 'leftSaveBtn',
	              		handler : 'leftSave',
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
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp005w_01_a',
	                height:820,              
	                plugins:[{
	                    ptype:'cellediting',
	                    clicksToEdit: 1
	                }],
	                bind:{
	                    store:'{ds_main}'
	                },
	                selModel: {
	                    mode: 'MULTI'
	                },
	                cls : 'asp005w_01_a',
	                listeners: {
	                    beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "PGM_ID"){
	                        	return false;
	                        }
	                    },
	                },
	                columns:[{
	                	text:'프로그램ID',                        
	                    xtype:'excolumn',
	                    exAlign:'left',
	                    dataIndex: 'PGM_ID',
	                    flex : 3,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                   		meta.style = 'background-color:#f6f9fd;';
	                    	return value;
	                    },
	                    editor:{
	                        xtype:'extextfield'
	                    }
	              
	                },{
	                	text:'메뉴명',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_NM',                    
	                    exAlign:'left',
	                    flex : 3,
	                	editor:{
	                        xtype:'extextfield'
	                    }
	                    
	                },{
	                	text:'레벨',
	                	xtype:'excolumnwidgetcombo',
	                    dataIndex:'MENU_LVL',                    
	                    exAlign:'center',
	                    exValueField:'value',
	                    exDisplayField:'display',
	                    flex : 1.5,
	                    exBindStore:'ds_level'
	                },{
	                	text:'구분',
	                	xtype:'excolumnwidgetcombo',
	                    dataIndex:'MENU_GBN',                    
	                    exAlign:'center',
	                    flex : 2.5,
	                    exValueField:'value',
	                    exDisplayField:'display',
	                    exBindStore:'ds_gbn'
	                },{
	                	text:'순서',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_SEQ',                    
	                    exAlign:'center',
	                    flex : 1.5,
	                    exBindStore:'ds_level',
	                    editor:{
	                        xtype:'extextfield',
	                    }
	                   
	                },{
	                	text:'사용',
	                	xtype:'excolumnwidgetcombo',
	                    dataIndex:'USE_YN',                    
	                    exAlign:'center',
	                    flex : 2,
	                    exValueField:'value',
	                    exDisplayField:'display',
	                    exBindStore:'ds_useYn'
	                },{
	                	text:'경로',
	                	xtype:'excolumn',
	                    dataIndex:'CODE',                    
	                    exAlign:'left',
	                    flex : 4,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                }]
	            }]
	        },{
	        	width : '5.5%',
	        	      
                xtype:'container',
                layout: {
                    type: 'vbox',
                    pack :'center',
                    align: 'center',
                }, 
                height : '100%',
                items:[{
            		items:[{    
	                	xtype : 'exbutton',
	              		reference : 'inLeftMoveOneBtn',
	              		name : 'inLeftMoveOneBtn',
	              		handler : 'onLeftOne',
	              		text:'>',
	              		width : 35,
	              		flex : 1,
	              		exAlign : 'center'
            		},{
            			height : 20
	                },{
	                	xtype : 'exbutton',
	              		reference : 'inLeftMoveAllBtn',
	              		name : 'inLeftMoveOneAllBtn',
	              		handler : 'onLeftALL',
	              		text:'>>',
	              		width : 35,
	              		flex : 1,         
	              		exAlign : 'center'
	                }]
                }]
	        },{
	        	width : '38%',
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
	                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">대상 사찰 메뉴 현황</div>',
	                	flex : 1 ,                            
	                },{
	                	xtype:'excombobox',
	                	/*fieldLabel:'사찰선택',*/
	                	/*labelWidth:80,*/
	                    valueField:'TEMPLE_CD',
	                    displayField:'TEMPLE_NM',
	                    reference:'lc_templeCd',
	                    name:'V_SEARCH_TEMPLE_VALUE',                    
	                    value : '000000',
	                    width : 120,
	                    bind:{
	                     	store:'{ds_templeCd}'
	                    },
	                    listeners : {
	                    	change : 'onTempleChange'
	                    }/*,
	                    listConfig: {
	                    	itemTpl: [
	                    		'console.log("TEMPLE_CD", {TEMPLE_CD})'
	                    	]
	                    }*/
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'rightDelBtn',
	              		name : 'rightDelBtn',
	              		handler : 'onRightDel',
	              		text:'삭제',
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'rightSaveBtn',
	              		name : 'rightSaveBtn',
	              		handler : 'onRightSave',
	              		text:'저장',
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
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp005w_01_b',                
	                height:820,
	                bind:{
	                    store:'{ds_templeMenu}'
	                },
	                listeners: {
	                },
	                selModel: {
	                    mode: 'MULTI'
	                },
	                columns:[{
	                	text:'프로그램ID',                        
	                    xtype:'excolumn',
	                    exAlign:'left',
	                    dataIndex: 'PGM_ID',
	                    flex : 3,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                   		meta.style = 'background-color:#f6f9fd;';
	                    	return value;
	                    }
	              
	                },{
	                	text:'메뉴명',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_NM',                    
	                    exAlign:'left',
	                    flex : 3,
	                	editor:{
	                        xtype:'extextfield'
	                    }
	                    
	                },{
	                	text:'레벨',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_LVL',                    
	                    exAlign:'center',
	                    flex : 1.5,
	                },{
	                	text:'구분',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_GBN',                    
	                    exAlign:'center',	                    
	                    flex : 2.5,	                    
	                    /*editor:{
                            xtype:'excombobox',
                            valueField:'value',
                            displayField:'display',
                            bind:{
                                store:'{ds_gbn}'
                            }
                        },*/
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_gbn');
                            var index = store.find('value',value);
                            if(index != -1){
                                return store.getAt(index).get('display');
                            }
                            else {
                                return value;
                            }                        	
                        }
	                },{
	                	text:'순서',
	                	xtype:'excolumn',
	                    dataIndex:'MENU_SEQ',                    
	                    exAlign:'center',
	                    flex : 1.5,
	                    exBindStore:'ds_level'
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});