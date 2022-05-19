Ext.define('ExFrm.view.asp.asp008w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp008w_01',
	requires:[
		'ExFrm.view.asp.asp008w_01Controller',
        'ExFrm.view.asp.asp008w_01Model'
	],
	controller:'asp008w_01',
	viewModel:{
        type:'asp008w_01'
    },
    name:'asp008w_01',
    isRootView:true,
    title:'사찰회계 관리',
    closable:true,
    scrollable:true,
    items:[{
    	height : 10,
    },{    	
        xtype:'exformmain',       
        items:[{
        	xtype:'container',
	    	layout:'hbox',
	    	items:[{
	    		xtype:'excombobox',
            	fieldLabel:'사찰명',
            	labelWidth:60,
                valueField:'TEMPLE_CD',
                displayField:'TEMPLE_NM',
                reference:'lc_templeCd',
                name:'lc_templeCd',                    
                value : '000000',
                width : 240,
                bind:{
                 	store:'{ds_temple}'
                }
	    	},{
	    		width : 15
	    	},{
	    		xtype:'excombobox',
            	fieldLabel:'세입/세출',
            	labelWidth:60,
                valueField:'CODE',
                displayField:'NAME',
                reference:'lc_iegbn',
                name:'lc_iegbn',                    
                value : 'I',
                width : 140,
                bind:{
                 	store:'{ds_iegbn}'
                }
	    	},{
	    		width : 5
	    	},{
            	xtype : 'exbutton',
          		reference : 'selectBtn',
          		name : 'selectBtn',
          		handler : 'onSelect',
          		text:'조회'          		
	    	}]
        },{
        	height : 10,
        },{
        	height : 20,
        	html : '<span style="color:red;">해당 프로그램은 입력만 가능하고 절대 수정이 불가능 함으로 입력 시 주의가 필요합니다. </span>'
        },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{        	
	        	width : '36%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{                 
	                },{
	                	flex : 1,
	                	html : '목',
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addLeftBtn',
	              		name : 'addLeftBtn',
	              		handler : 'onAddLeft',
	              		text:'추가',  
	              		margin : '0 0 5 0'
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveLeftBtn',
	              		name : 'saveLeftBtn',
	              		handler : 'onSaveLeft',
	              		text:'저장',  
	              		margin : '0 0 5 0'
	                },{
	                   	 xtype:'extextfield',
	                   	 width : 0,
	                   	 reference:'txt_left_templeCd',
	                   	 name:'LEFT_TEMPLE_CD',
	                   	 value : "",
	                   	 inputType : 'hidden'
	                },{
	                   	 xtype:'extextfield',
	                   	 width : 0,
	                   	 reference:'txt_left_iegbn',
	                   	 name:'LEFT_IEGBN',
	                   	 value : "",
	                   	 inputType : 'hidden'   		 
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
	                reference:'asp008w_01_a',
	                height:820,              
	                bind:{
	                    store:'{ds_kwan}'
	                },
	                listeners: {
	                	selectionchange : 'onSelectionChange',
	                	beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "KWAN_NAME"){
	                        	return false;
	                        }
	                    }
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                cls : 'asp008w_01_a',	                
	                columns:[{	                	
	                	text:'코드(관)',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'KWAN',
	                    flex : 1,
	              
	                },{
	                	text:'계정명(관)',
	                	xtype:'excolumn',
	                    dataIndex:'KWAN_NAME',                    
	                    exAlign:'left',
	                    flex : 4,	    
	                    editor:{
                            xtype:'extextfield'
                        }
	                }]
	            }]
	        },{
	        	width : '0.5%'
	        },{
	        	width : '63%',
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{            	
	        		layout:'hbox',
	                xtype:'container',
	                height : '30',
	                items:[{
	                	html : '항',
	                	flex : 1 ,
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addRightBtn',
	              		name : 'addRightBtn',
	              		handler : 'onAddRight',
	              		text:'추가',  
	              		margin : '0 0 5 0'
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'saveRightBtn',
	              		name : 'saveRightBtn',
	              		handler : 'onSaveRight',
	              		text:'저장',  
	              		margin : '0 0 5 0'
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
	                reference:'asp008w_01_b',                
	                height:820,
	                width : '70%',
	                bind:{
	                    store:'{ds_hang}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                	beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "HANG_NAME"){
	                        	return false;
	                        }
	                    }
	                },
	                columns:[{
	                	text:'코드(항)',                        
	                    xtype:'excolumn',
	                    exAlign:'center',
	                    dataIndex: 'HANG',
	                    flex : 1,
	              
	                },{
	                	text:'계정명(항)',
	                	xtype:'excolumn',
	                    dataIndex:'HANG_NAME',                    
	                    exAlign:'left',
	                    flex : 5,
	                    editor:{
                            xtype:'extextfield'
                        }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});