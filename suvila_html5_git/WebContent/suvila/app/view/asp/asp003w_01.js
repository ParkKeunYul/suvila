Ext.define('ExFrm.view.asp.asp003w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp003w_01',
	requires:[
		'ExFrm.view.asp.asp003w_01Controller',
        'ExFrm.view.asp.asp003w_01Model'
	],
	controller:'asp003w_01',
	viewModel:{
        type:'asp003w_01'
    },
    name:'asp003w_01',
    isRootView:true,
    title:'공통코드',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%'
	        },{
	        	width : '38.5%',        	
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
	                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">그룹코드</div>',
	                },{
	                	xtype:'excombobox',                	
	                	labelWidth:60,
	                    valueField:'value',
	                    displayField:'display',
	                    reference:'txt_search_type',
	                    name:'V_SEARCH_TYPE',                    
	                    value : 'GROUP_CD',
	                    width : 100,
	                    bind:{
	                     	store:'{ds_searchType}'
	                     }
	                },{
	                	width : 10
	                },{
	                	xtype:'extextfield',
	                	reference:'txt_search_value',
	                    name:'V_SEARCH_VALUE',
	                    width : 100
	                },{
	                	width : 4                	
	                },{
	                	xtype : 'exbutton',
	              		reference : 'groupSelectBtn',
	              		name : 'groupSelectBtn',
	              		handler : 'onGroupSelect',
	              		text:'조회',
	                },{
	                	width : 4                	
	                },{
	                	xtype : 'exbutton',
	              		reference : 'groupAddBtn',
	              		name : 'groupAddBtn',
	              		handler : 'onGroupAdd',
	              		text:'추가',
	                },{
	                	width : 4
	                },{
	                	xtype : 'exbutton',
	              		reference : 'groupSaveBtn',
	              		name : 'groupSaveBtn',
	              		handler : 'groupSave',
	              		text:'저장',
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'groupNewData',
               	 		name      : 'groupNewData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'groupUptData',
               	 		name      : 'groupUptData',
               	 		width : 0
	                }]
	            },{            	
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp003w_01_a',
	                height:820,              
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                bind:{
	                    store:'{ds_group}'
	                },               
	                cls : 'asp003w_01_a',
	                listeners: {
	                    beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "GROUP_CD"){
	                        	return false;
	                        }
	                    },
	                    selectionchange : 'onSelectionChange'
	                },
	                columns:[{
	                	text:'순번',                        
	                    xtype:'rownumberer',
	                    align:'center',
	                    width : 60,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                   		meta.style = 'background-color:#e3ecc6;';                   		
	                    	return (rowIndex+1);
	                    }
	              
	                },{
	                	text:'그룹코드',
	                	xtype:'excolumn',
	                    dataIndex:'GROUP_CD',                    
	                    exAlign:'left',
	                    flex : 4,
	                    renderer:function(value, meta, record, rowIndex, colIndex, store, view){
	                   		meta.style = 'background-color:#f6f9fd;';
	                    	return value;
	                    }
	                	,editor:{
	                        xtype:'extextfield'
	                    }
	                    
	                },{
	                	text:'그룹명',
	                	xtype:'excolumn',
	                    dataIndex:'NAME',                    
	                    exAlign:'left',
	                    flex : 4,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                }]
	            }]
	        },{
	        	width : '0.5%',
	        },{
	        	width : '59%',
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
	                	html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">공통코드</div>',
	                	flex : 1 ,                            
	                	
	                },{
	                	xtype : 'exbutton',
	              		reference : 'addCodeBtn',
	              		name : 'addCodeBtn',
	              		handler : 'onAddCode',
	              		text:'추가',
	                },{
	                	width : 5
	                },{
	                	xtype : 'exbutton',
	              		reference : 'codeSaveBtn',
	              		name : 'codeSaveBtn',
	              		handler : 'onCodeSave',
	              		text:'저장',
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'codeNewData',
               	 		name      : 'codeNewData',
               	 		width : 0
	                },{
	                	xtype     : 'extextfield',
               	 		inputType : 'hidden',
               	 		reference : 'codeUptData',
               	 		name      : 'codeUptData',
               	 		width : 0
	                }]
	            },{
	            	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'asp003w_01_b',                
	                height:820,
	                bind:{
	                    store:'{ds_code}'
	                },
	                plugins:[{
	                    ptype:'cellediting'
	                }],
	                listeners: {
	                    beforeedit: function(e, editor){
	                        if (editor.value != "" && editor.field == "CODE"){
	                        	return false;
	                        }
	                    }
	                },
	                columns:[{                	
	                	xtype:'excolumn',
	                	text:'코드',
	                    dataIndex:'CODE',                    
	                    align:'center',
	                    flex : 1,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	xtype:'excolumn',
	                	text:'코드명',
	                    dataIndex:'NAME',                    
	                    exAlign:'left',
	                    flex : 3,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	text:'사용',
	                    dataIndex:'USE_YN',
	                    flex : 2,
	                    exAlign:'left',
	                    xtype: 'excolumnwidgetcombo',
	                    exValueField:'value',
	                    exDisplayField:'display',
	                    exBindStore:'use_yn'
	                },{
	                	xtype:'excolumn',
	                	text:'정렬',
	                    dataIndex:'SORT_SEQ',                    
	                    align:'left',
	                    flex : 2,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	xtype:'excolumn',
	                	text:'그룹1',
	                    dataIndex:'ETC1',                    
	                    align:'left',
	                    flex : 1,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	xtype:'excolumn',
	                	text:'그룹2',
	                    dataIndex:'ETC2',                    
	                    align:'left',
	                    flex : 1,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	xtype:'excolumn',
	                	text:'그룹3',
	                    dataIndex:'ETC3',                    
	                    align:'left',
	                    flex : 1,
	                    editor:{
	                        xtype:'extextfield'
	                    }
	                },{
	                	xtype:'excolumn',
	                	text:'비고',
	                    dataIndex:'REMARK',                    
	                    align:'left',
	                    flex : 3,
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