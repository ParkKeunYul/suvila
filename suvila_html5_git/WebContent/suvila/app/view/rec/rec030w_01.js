Ext.define('ExFrm.view.rec.rec030w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.rec030w_01',
	requires:[
		'ExFrm.view.rec.rec030w_01Controller',
        'ExFrm.view.rec.rec030w_01Model'
	],
	controller:'rec030w_01',
	viewModel:{
        type:'rec030w_01'
    },
    name:'rec030w_01',
    isRootView:true,
    title:'기부금출력관리',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 10,
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{      
	        	width : '0.5%',
	        },{
	        	width : '99%',        	
	    		layout:{
	                type:'vbox',
	                align:'stretch'
	            },
	            items:[{
	            	layout : 'hbox',
	    	    	width  : '100%',
	    	    	height : 30,
	    	    	items  : [{
	    	    		xtype          : 'exdatefield',
                        reference      : 'me_SDate',
                        format         : 'Y-m-d',
                        width          : 100
	        		},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',
	              		reference : 'selectBtn',
	              		name      : 'selectBtn',
	              		text      : '가져오기',
	              		handler   : 'onSelect',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '엑셀',
	              		handler   : 'onExcel',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '발급신청취소',
	              		handler   : 'onCancel',
	    	    	},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '발급신청삭제',
	              		handler   : 'onDelete',
	    	    	/*},{
	        			width : 5,	        		
	    	    	},{
	    	    		xtype     : 'exbutton',	              		
	              		text      : '발급신청저장',
	              		handler   : 'onSave',*/
	        		},{
	        			width : 0,
	        			heigth: 0,
	        			items : [{
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
	    	    		}]
	    	    	}]
	            },{
	        		exGroupRef : true,
	                xtype      : 'exgrid',
	                reference  : 'rec030w_01_a',
	                height     : 400,
	                plugins    :[{
	                	ptype: 'gridexporter'
	                }],
	                bind       : {
	                    store:'{ds_main}'
	                },
	                listeners      : {
                    	selectionchange : 'onSelectionChange'
                    },
	                cls       : 'rec030w_01_a  none-dirty-grid',
	                columns   : [{
	                	headerCheckbox : true,
	                	text      :'선택',
	                	xtype     :'excheckcolumn',
	                    dataIndex :'CHECK_P',                    
	                    exAlign   :'center',
	                    width     : 55,
	                },{
	                	text      :'순번',
                        xtype     :'rownumberer',
                        align     : 'center',
                        width     : 55,
	                },{
	                	text      :'신도번호',
	                	xtype     :'excolumn',
	                    dataIndex :'BUD_NO',                    
	                    exAlign   :'center',
	                    width     : 150,
	                },{
	                	text      :'성명',
	                	xtype     :'excolumn',
	                    dataIndex :'NAME_KOR',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'접수번호',
	                	xtype     :'excolumn',
	                    dataIndex :'ACCEPT_SEQ',                    
	                    exAlign   :'center',
	                    width     : 160,
	                },{
	                	text      :'접수일',
	                	xtype     :'excolumn',
	                    dataIndex :'REC_DATE',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'신청일',
	                	xtype     :'excolumn',
	                    dataIndex :'CRT_DATE',                    
	                    exAlign   :'center',
	                    width     : 100,
	                },{
	                	text      :'발급상태',
	                	xtype     :'excolumn',
	                    dataIndex :'ISSUE_STATE',                    
	                    exAlign   :'center',
	                    width     : 100,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_issue');
	                    	return exCommon.getComboVal(value+'',store );
	                    },
	                },{
	                	text      :'기존 신도증 파일',
	                	xtype     :'excolumn',
	                    dataIndex :'R_PHOTO',
	                    width     : 150,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	
	                    	var R_PHOTO      = exCommon.getRepVal( record.get("R_PHOTO"), '' );
	                    	//var PHOTO_IP     = exCommon.getRepVal( record.get("PHOTO_IP"), '' );
	                    	var PHOTO	     = exCommon.getRepVal( record.get("PHOTO"), '' );
	                    	var PHOTO_FOLDER = exCommon.getRepVal( record.get("PHOTO_FOLDER"), '' );
	                    	
	                    	var url = "/suvila/upload"+PHOTO_FOLDER+"/"+PHOTO;
	                    	
	                    	if(R_PHOTO != ''){
	                    		return '<img src="'+url+'" height="40">';
	                    	}else{
	                    		return '';
	                    	}
	                    	
	                    	var PHOTO_IP     = exCommon.getRepVal( record.get("PHOTO_IP"), "" );
	                    	var PHOTO	     = exCommon.getRepVal( record.get("PHOTO"), "" );
	                    	var PHOTO_FOLDER = exCommon.getRepVal( record.get("PHOTO_FOLDER"), "" );
	                    }
	                }],
	                viewConfig: {	                	
	                }
	            },{
	            	height : 5
	            },{
	            	items : [{
                    	xtype     : 'exbutton',	              		
	              		text      : '발급정보저장',
	              		handler   : 'onSaveInfo',
	              		width     : 140,
                    }]
	            },{
	            	xtype:'exfieldsetblockbox',
	                height:230,
	                layout:{
	                    type:'vbox',
	                    align:'stretch'
	                },
	                items:[{
	                	
	                    xtype:'exblockrow',
	                    flex:1,
	                    layout:{
	                        type:'hbox',
	                        align:'stretch'
	                    },
	                    items:[{
	                        xtype:'exblockrow',
	                        width:140,
	                        layout:{
	                            type:'vbox',
	                            align:'stretch'
	                        },
	                        items:[{
	                            xtype  : 'exblocklabel',
	                            html   : '첨부할 사진',
	                            height : 30
	                        },{
	                            flex     : 1,
	                            xtype    : 'exblockfield',
	                            reference: 'imageBlock',
	                            items    : [{
	                            	xtype     : 'image',
	                            	reference : 'image',
	                            	height    : '100%',
	                                width     : '100%',
	                            }]
	                        }]
	                    },{
	                        xtype:'exblocklabel',
	                        width:80,
	                        html:'메모'
	                    },{
	                        flex:1,
	                        xtype:'exblockfield',
	                        reference:'memoBlock',
	                        items:[{
	                        	xtype     : 'extextarea',
	                        	rows      : 6,
	                            width     :'100%',
	                            height    :'100%',
	                            reference : 'memo',
	                            name      : 'memo',
	                        }]
	                    }]

	                },{
	                    xtype:'exblockrow',
	                    items:[{
	                        xtype     : 'exblockfield',
	                        reference : 'fileBlock',
	                        width     : 140,
	                        flex      : null,
	                        items     : [{
	                            xtype      : 'exfile',		
	                            buttonOnly : true,
	                            buttonText : '첨부',
	                            width      : 60,
	                            reference  : 'file',
	                            name       : 'file',
	                            listeners  : {
	                                change:'onChangeFile'
	                            }
	                        },{
	                        	xtype   : 'button',		
	                        	text    : '삭제',
	                        	listeners  : {
	                                click:'onDeleteFile'
	                            }
	                        }]
	                    },{
	                        xtype : 'exblocklabel',
	                        width : 80,
	                        html  : '첨부파일명'
	                    },{
	                        flex:1,
	                        xtype:'exblockfield',
	                        reference:'fileNameBlock',
	                        items:[{
	                        	xtype     : 'extextfield',	
	                        	text      : '삭제',
	                        	reference : 'fileName',
	                        	width     : '100%',
	                        }]
	                    }]
	                }]
	            }]// 가운데	      
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});

// 010 - 5745 - 2546