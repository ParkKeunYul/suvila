Ext.define('ExFrm.view.cad.cad002w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cad002w_01',
	requires:[
		'ExFrm.view.cad.cad002w_01Controller',
        'ExFrm.view.cad.cad002w_01Model'
	],
	controller:'cad002w_01',
	viewModel:{
        type:'cad002w_01'
    },
    name:'cad002w_01',
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
	        	width : 400,
	        	items:[{	        		
	        		height : 30,
	        		layout:'hbox',
	        		items:[{
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-radius:5px;display:inline-block;padding:0 15px;">그룹정보</div>',
	        		},{
	        			flex : 1
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'addLeftBtn',
	              		name      : 'addLeftBtn',
	              		handler   : 'onLeftAdd',
	              		text      : '신규',
	        		},{
	                	width : 3
	        		},{
	                	xtype     : 'exbutton',
	              		reference : 'delLeftBtn',
	              		name      : 'delLeftBtn',
	              		handler   : 'onLeftDel',
	              		text      : '삭제',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'saveLeftBtn',
	              		name      : 'saveLeftBtn',
	              		handler   : 'onSaveLeft',
	              		text      : '저장',
	        		},{
	        			layout : 'hbox',
	        			hidden : true,
	        			items  : [{
	        				xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'newData',
	               	 		name      : 'newData',
	               	 		width : 0
		                },{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'uptData',
	               	 		name      : 'uptData',
	               	 		width : 0
		                },{
		                	xtype     : 'extextfield',
	               	 		inputType : 'hidden',
	               	 		reference : 'delData',
	               	 		name      : 'delData',
	               	 		width : 0	
	        			}]
	        		}]
	        	},{
	        		height : 5
	        	},{
		        	exGroupRef:true,
	                xtype:'exgrid',
	                reference:'cad002w_01_a',
	                height:600,
	                width:'100%',
	                bind:{
	                    store:'{ds_classMgt}'
	                },
	                plugins:[{	                
	                	 ptype:'cellediting',
	                	 clicksToEdit: 1
	                }],
	                listeners:{
	                    selectionchange : 'onSelectionChange'
		            },
	                columns:[{
	                	text      :'No',
	                	xtype     :'rownumberer',
	                    align     :'center',
	                    width     : 60,
	                },{
	                	text      :'사용유무',
	                	xtype     :'excheckcolumn',
	                    dataIndex :'USE_YN',	                    
	                    exAlign   :'center',
	                    width     : 80,	                    
	                },{
	                	text      :'그룹명',
	                	xtype     :'excolumn',
	                    dataIndex :'CLASS_NAME',	                    
	                    exAlign   :'left',
	                    width     : 250,
	                    editor:{
	                        xtype:'extextfield',
	                    }
	                }]
	        	 },{
	        		 height : 30,
	        		 html : '<div style="color:#cc3366;">* 그룹을 선택하시면 명함정보가 조회됩니다</div>'
	        	 },{
	        		 height : 20,
	        		 html : '<div style="widht:100%;text-align:center;font-weight:700;background:#f6f9fd;border:1px solid #ced9ec;">* 비고</div>'
	        	 },{
	        		 xtype:'extextarea',
        			 reference:'ta_remark',
                     name:'REMARK',
                     width : '100%',
                     height:155,
	             }]
	        },{
	        	width : '1%',
	        },{
	        	flex : 1,
	        	items:[{
	        		
	        		layout :'hbox',
	        		width  : '100%',
	        		items:[{
	        			html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">인명관리</div>',
	        		},{
	        			width : 5
	        		},{
	        			html : '<div style="color:#cc3366;line-height:28px;padding-right : 15px;">*하단의 리스트에서 선택한 신도들을 사용중인 다른 폴더로 복사 또는 이동이 가능합니다</div>'
	        		},{
	        			xtype     : 'exbutton',
	              		reference : 'addRightBtn',
	              		name      : 'addRightBtn',
	              		handler   : 'onRightAdd',
	              		text      : '추가',
	        		},{
	                	width : 3
	        		},{
	                	xtype     : 'exbutton',
	              		reference : 'delRightBtn',
	              		name      : 'delRightBtn',
	              		handler   : 'onRightDel',
	              		text      : '삭제',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'saveRightBtn',
	              		name      : 'saveRightBtn',
	              		handler   : 'onSaveRight',
	              		text      : '저장',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'excelRightBtn',
	              		name      : 'excelRightBtn',
	              		handler   : 'onExcelRight',
	              		text      : '엑셀',
	        		}]
	        	},{
	        		height : 5
	        	},{
	        		layout : 'hbox',
	        		height : 30,
	        		items:[{
	        			xtype         : 'excombobox',
	                    valueField    : 'CLASS_CD',
	                    displayField  : 'CLASS_NAME',
	                    reference     : 'lc_group',
	                    name          : 'V_GROUP',
	                    width         : 300,
	                    emptyText     : '전체',	                    
	                    bind:{
	                     	store:'{ds_group}'
	                    },
	                    
	                   
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'copyGroupBtn',
	              		name      : 'copyGroupBtn',
	              		handler   : 'onCopyGroup',
	              		text      : '복사',
	        		},{
	                	width : 3
	        		},{
	    	    		xtype     : 'exbutton',
	              		reference : 'moveGroupBtn',
	              		name      : 'moveGroupBtn',
	              		handler   : 'onMoveGroup',
	              		text      : '이동',
	        		}]
	        		
	        	},{
	        		exGroupRef:true,
	                xtype:'exgrid',
	                reference:'cad002w_01_b',
	                height:720,
	                width:'100%',
	                bind:{
	                    store:'{ds_nameCard}'
	                },
	                plugins:[{	                
	                	ptype: 'gridexporter'	               
	                }],
	                multiSelect: true,
	                columns:[{
	                	text:'순번',
	                	xtype:'rownumberer',
	                    align:'center',
	                    width : 70
	                },{
	                	text:'성명',
	                	xtype:'excolumn',
	                    dataIndex:'NAME_KOR',	                    
	                    exAlign:'left',
	                    width : 150                 
	                },{
	                	text:'전화번호',
	                	xtype:'excolumn',
	                    dataIndex:'TELNO',	                    
	                    exAlign:'left',
	                    width : 150
	                },{
	                	text:'휴대전화번호',
	                	xtype:'excolumn',
	                    dataIndex:'MOBILE_TELNO',	                    
	                    exAlign:'left',
	                    width : 150
	                },{
	                	text:'우편번호',
	                	xtype:'excolumn',
	                    dataIndex:'ZIP_CD',	                    
	                    exAlign:'left',
	                    width : 100
	                },{
	                	text:'주소1',
	                	xtype:'excolumn',
	                    dataIndex:'ADDR1',	                    
	                    exAlign:'left',
	                    width : 250
	                },{
	                	text:'주소2',
	                	xtype:'excolumn',
	                    dataIndex:'ADDR2',	                    
	                    exAlign:'left',
	                    width : 250
	                }]
	        	},{
	        		 height : 30,
	        		 html : '<div style="color:#cc3366;line-height:40px;">* Shift,Ctrl 키조합으로 신도를 다중 선택 할 수 있습니다. </div>'
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});