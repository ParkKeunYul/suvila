Ext.define('ExFrm.view.asp.asp044w_04',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.asp044w_04',
	requires:[
		'ExFrm.view.asp.asp044w_04Controller',
        'ExFrm.view.asp.asp044w_04Model'
	],
	controller:'asp044w_04',
	viewModel:{
        type:'asp044w_04'
    },
    name:'asp044w_03',
    isRootView:true,
    title:'인등 소등관리',
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
	        	width  : '99%',
	        	layout : 'hbox',
	        	items  : [{
	        		width : 310,
	        		layout : 'vbox',
	        		items  : [{
	        			height : 5
	        		},{
	        			html    : '<span style="font-weight:700;line-height:30px;">사찰정보</span>',
	        			height : 30
	        		},{
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_04_a',
	                    cls           : 'none-dirty-grid asp044w_04_a',
	                    height        : 800,
	                    width         : '100%',
	                    bind          : {
	                        store:'{ds_templeCd}'
	                    },
	                    listeners      : {
	                    	selectionchange : 'onSelectionTemple'
	                    },
	                    columns:[{
	                    	text        : '사찰코드',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_CD',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                        sortable    : true,
	                    },{
	                    	text        : '사찰명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'TEMPLE_NM',                    
	                        exAlign     : 'left',
	                        width       : 200,
	                        sortable    : true,
	                    }]
	        		}]
	        	},{
	        		width : 5
	        	},{
	        		layout : 'vbox',
	        		flex   : 1,
	        		items  : [{
	        			height : 5
	        		},{
	        			height : 30,
	        			layout : 'hbox',
	        			items  : [{
	        				xtype        : 'extextfield',
	        				fieldLabel   : '<span style="font-weight: 700;">가족코드</span>',
	                		labelWidth   : 80,
	                        width        : 270,
	                        reference    :'bud_no',
	                        value        : '01-00002-0'
	        			},{
	        				width : 3
	        			},{
	        				xtype     : 'exbutton',
	                  		text      : '조회',
	                  		handler   : 'onSelect',
	        			},{
	        				width : 3
	        			},{
	        				xtype     : 'exbutton',
	                  		text      : '선택삭제',
	                  		handler   : 'onDel',
	        			},{
	        				width : 3
	        			},{
	        				xtype     : 'exbutton',
	                  		text      : '저장',
	                  		handler   : 'onSave',
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
	        			height : 5
	        		},{
	        			exGroupRef    : true,
	                    xtype         : 'exgrid',
	                    reference     : 'asp044w_04_b',
	                    cls           : 'none-dirty-grid asp044w_04_b',
	                    height        : 350,
	                    width         : '100%',
	                    bind          : {
	                        store:'{ds_main}'
	                    },
	                    plugins     : [{
	                    	ptype:'cellediting',
	                    	clicksToEdit: 1
	                    }],
	                    selModel: {
		                    mode: 'MULTI'
		                },
	                    listeners      : {
	                    	selectionchange : 'onSelectionMain'
	                    },
	                    columns:[{
	                    	text        : '순번',
	                        xtype       : 'rownumberer',
	                        width       : 70,
	                        align       : 'center', 
	                    },{
	                    	text        : '대표신도',
	                    	xtype       : 'excheckcolumn',
	                        dataIndex   : 'DAEJU_YN',                    
	                        exAlign     : 'center',
	                        width       : 90,
	                        exHidden    : true,
	                        listeners   : {
	                            beforecheckchange: function() {
	                                return false; // HERE
	                            }
	                        }
	                    },{
	                    	text        : '가족코드',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'BUD_CODE',                    
	                        exAlign     : 'center',
	                        width        : 110,
	                    },{
	                    	text        : '신도번호',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'BUD_NO',                    
	                        exAlign     : 'center',
	                        width        : 120,
	                    },{
	                    	text        : '성명',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'NAME_KOR',                    
	                        exAlign     : 'left',
	                        width        : 110,
	                    },{
	                    	text        : 'CMS',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'CMS_CNT',                    
	                        exAlign     : 'center',
	                        width        : 70,
	                    },{
	                    	text        : '생년월일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'BIRTHDAY',                    
	                        exAlign     : 'center',
	                        width        : 100,
	                        exType      : 'date',
	                    },{
	                    	text        : '삭제여부',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'DEL_YN',                    
	                        exAlign     : 'center',
	                        width        : 100,
	                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                        	meta.tdCls = 'recCellEdit'
                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_gbn');
                            	return exCommon.getComboVal(value,store, '' );
	                        },
	                        editor        : {
	                        	xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind:{
	                                store:'{ds_yn_gbn}'
	                            }
	                        },
	                    },{
	                    	text        : '수정일',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_DATE',                    
	                        exAlign     : 'center',
	                        width        : 150,
	                    },{
	                    	text        : '수정자',
	                    	xtype       : 'excolumn',
	                        dataIndex   : 'UPT_USER',                    
	                        exAlign     : 'center',
	                        width        : 120,
	                    }],
	                    viewConfig: {
		                	getRowClass: function(record, index) {
		                        var DEL_YN = record.get('DEL_YN');
		                        
		                        if(DEL_YN == 'T'){
		                        	return 'useYnBack';
		                        }else{
		                        	return 'color_depth_1';
		                        }
		                    }
		                }
	        		},{
	        			height : 2
	        		},{
	        			width  : '100%',
	        			layout :'hbox',
	        			items  :[{
	        				flex  : 7,
	        				layout : 'vbox',
	        				items : [{
	        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">영가정보</div>',
	        				},{
			        			exGroupRef    : true,
			                    xtype         : 'exgrid',
			                    reference     : 'asp044w_04_c',
			                    cls           : 'none-dirty-grid asp044w_04_c',
			                    height        : 350,
			                    width         : '100%',
			                    bind          : {
			                        store:'{ds_young}'
			                    },	                    
			                    columns:[{
			                    	text        : '복위자번호',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BOKWI_BUD_NO',                    
			                        exAlign     : 'center',
			                        width        : 110,
			                    },{
			                    	text        : '영가명',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'NAME_KOR',                    
			                        exAlign     : 'left',
			                        width        : 110,
			                    },{
			                    	text        : '행관계',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'HYO_REL',                    
			                        exAlign     : 'center',
			                        width        : 90,
			                    },{
			                    	text        : '복위기부',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BOKWI_KIBU_GBN',                    
			                        exAlign     : 'center',
			                        width        : 80,
			                    },{
			                    	text        : '망관계',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'DECE_REL',                    
			                        exAlign     : 'center',
			                        width        : 110,
			                    },{
			                    	text        : '본',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BON',                    
			                        exAlign     : 'center',
			                        width        : 70,
			                    },{
			                    	text        : '성별',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'SEX_GBN',                    
			                        exAlign     : 'center',
			                        width        : 70,
			                    },{
			                    	text        : '법명',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'SACRED_KOR',                    
			                        exAlign     : 'center',
			                        width        : 110,
			                    },{
			                    	text        : '양력음력',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'LUNAR_SOLAR',                    
			                        exAlign     : 'center',
			                        width        : 80,
			                    },{
			                    	text        : '기일',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'DEATH_DAY',                    
			                        exAlign     : 'center',
			                        width       : 100,
			                        exType      : 'date', 
			                    }]
	        				}]
	        			},{
	        				width : 3
	        			},{
	        				flex : 3,
	        				layout : 'vbox',
	        				items : [{
	        					layout: 'hbox',
	        					items : [{
	        						html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">분가정보</div>',
	        					},{
	        						width : 3
	        					},{
	        						xtype     : 'exbutton',
			                  		text      : '분가이력 전체삭제',
			                  		handler   : 'onDelBranch',
	        					}]
	        				},{
	        					exGroupRef    : true,
			                    xtype         : 'exgrid',
			                    reference     : 'asp044w_04_c',
			                    cls           : 'none-dirty-grid asp044w_04_c',
			                    height        : 350,
			                    width         : '100%',
			                    bind          : {
			                        store:'{ds_branch}'
			                    },	                    
			                    columns:[{
			                    	text        : '순서',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'SEQ_NO',                    
			                        exAlign     : 'center',
			                        width        : 70,
			                    },{
			                    	text        : '가족명단',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'NAME_KOR',                    
			                        exAlign     : 'center',
			                        width        : 110,
			                    },{
			                    	text        : '구분',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BRANCH_GBN',                    
			                        exAlign     : 'center',
			                        width        : 80,
			                    },{
			                    	text        : '합분가이후번호',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BUD_CODE_AFTER',                    
			                        exAlign     : 'center',
			                        width        : 120,
			                    },{
			                    	text        : '현재번호',
			                    	xtype       : 'excolumn',
			                        dataIndex   : 'BUD_NO',                    
			                        exAlign     : 'center',
			                        width        : 110,
			                    }]
	        				}]
	        			}]
	        		},{
	        			height : 2
	        		},{
	        			width  : '100%',
	        			layout : 'vbox',
	        			items  :[{
	        				layout : 'hbox',
	        				items  :[{
	        					html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;border-top-left-radius:5px;border-top-right-radius:5px;display:inline-block;padding:0 15px;">CMS정보</div>',
	        				},{
	        					width : 3
	        				},{
	        					labelWidth   : 60,
	                            fieldLabel   : '<span style="font-weight: 700;">신도명</span>',
	        					xtype           : 'extextfield',
	                            reference       : 'name_kor',	                           
	                            //enableKeyEvents : true,
	                            width           : 200 ,
	                            /*listeners       : {
	                         	   keyup : 'onSearchEnter',
	                         	   blur  : 'onSearchBlur'
	                            },*/
	        					
	        				},{
	        					width : 3
	        				},{
	        					xtype     : 'exbutton',
		                  		text      : '조회',
		                  		handler   : 'onSelectCms',	
	        				}]
	        			},{
	        				exGroupRef    : true,
		                    xtype         : 'exgrid',
		                    reference     : 'asp044w_04_d',
		                    cls           : 'none-dirty-grid asp044w_04_d',
		                    height        : 350,
		                    width         : '100%',
		                    bind          : {
		                        store:'{ds_name}'
		                    },	                    
		                    columns:[{
		                    	text        : '순번',
		                        xtype       : 'rownumberer',
		                        width       : 70,
		                        align       : 'center',  
		                    },{
		                    	text        : '신도번호',
		                    	xtype       : 'excolumn',
		                        dataIndex   : 'BUD_NO',                    
		                        exAlign     : 'center',
		                        width       : 160,
		                    },{
		                    	text        : '성명',
		                    	xtype       : 'excolumn',
		                        dataIndex   : 'NAME_KOR',                    
		                        exAlign     : 'center',
		                        width       : 160,
		                    },{
		                    	text        : '삭제여부',
		                    	xtype       : 'excolumn',
		                        dataIndex   : 'DEL_YN',                    
		                        exAlign     : 'center',
		                        width       : 160,
		                        renderer     : function(value, meta, record, rowIndex, colIndex, store, view){
	                            	var store = this.up('[isRootView=true]').getViewModel().getStore('ds_yn_gbn');
	                            	return exCommon.getComboVal(value,store, '' );
		                        },
		                    },{
		                    	text        : '둥록된 계좌 수',
		                    	xtype       : 'excolumn',
		                        dataIndex   : 'CMS_CNT',                    
		                        exAlign     : 'center',
		                        width       : 160,
		                    },{
		                    	text        : '생년월일',
		                    	xtype       : 'excolumn',
		                        dataIndex   : 'BIRTHDAY',                    
		                        exAlign     : 'center',
		                        exType      : 'date',
		                        width       : 160,
		                    }],
		                    viewConfig: {
			                	getRowClass: function(record, index) {
			                        var DEL_YN = record.get('DEL_YN');
			                        
			                        if(DEL_YN == 'T'){
			                        	return 'useYnBack';
			                        }else{
			                        	return 'color_depth_1';
			                        }
			                    }
			                }
	        			}]
	        		
	        		}]
	        	}]
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});