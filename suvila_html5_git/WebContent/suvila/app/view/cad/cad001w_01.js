Ext.define('ExFrm.view.cad.cad001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.cad001w_01',
	requires:[
		'ExFrm.view.cad.cad001w_01Controller',
        'ExFrm.view.cad.cad001w_01Model'
	],
	controller:'cad001w_01',
	viewModel:{
        type:'cad001w_01'
    },
    name:'cad001w_01',
    isRootView:true,
    title:'신규등록',
    closable:true,
    scrollable:true,
    items:[{
        xtype:'exformmain',
	    items:[{
	    	height : 15
	    },{
	    	height : 30,
	    	width  : '100%',
	    	layout :'hbox',
            xtype  :'container',
            items  : [{
            	width : '0.5%'
            },{
            	xtype           : 'extextfield',
                reference       : 'txt_keyword',
                name            : 'V_KEYWORD',
                fieldLabel      :'<span style="font-weight:700;">성명</span>',
                labelWidth      : 40,
                enableKeyEvents : true,
                width           : 170,
                listeners       : {
            	   keyup : 'onSearchEnter'
                }
            },{
            	width : 3
            },{
            	xtype        : 'excombobox',
                valueField   : 'CLASS_CD',
                displayField : 'CLASS_NAME',
                reference    : 'lc_group',
                name         : 'V_GROUP_CD',
                emptyText    : '전체',
                value        : 0,
                bind         : {
                	store:'{ds_group}'
                },
                width : 120
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		handler   : 'onSelect',
          		text      : '조회',
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		handler   : 'onAdd',
          		text      : '신규',
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		handler   : 'onSindoAdd',
          		text      : '신도추가',
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		handler   : 'onDel',
          		text      : '삭제',
            },{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onExcel',
          		text      : '엑셀',
          		/*
        	},{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onGridApply',
          		text      : '임시저장',
          		*/
        	},{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		handler   : 'onSave',
          		text      : '저장',
        	},{
        	},{
    	    	html : '<div id="layerCad001" class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;"><img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top: 30px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"></div>'
        	},{
        		hidden    : true,
        		layout    : 'hbox',
        		items     : [{
        			xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'newData',
           	 		name      : 'newData',
            	},{
           	 		xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'uptData',
           	 		name      : 'uptData',
            	},{
           	 		xtype     : 'extextfield',
           	 		inputType : 'hidden',
           	 		reference : 'delData',
           	 		name      : 'delData',
            	},{
        			xtype            : 'extextfield',
                    reference        : 'txt_sel_index',
                    value            : '-1',
                    width            : 0,
                    height           : 0,
                    inputType        : 'hidden',
        		}]
            }]
	    },{
	    	xtype  : 'container',
	    	layout : 'hbox',
	    	width  : '100%',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : 750,
	        	items:[{
	        		//html : '인명관리',
	        		height : 30,
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">인명관리</div>',
	        	},{
	        		//html : '그리드'
		        	exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'cad001w_01_a',
	                cls         : 'none-dirty-grid',
	                height      : 759,
	                width       : '100%',
	                bind        : {
	                    store:'{ds_main}'
	                },
	                plugins:[{	                
	                	ptype: 'gridexporter'
	                }],
	                listeners:{
	                    selectionchange : 'onSelectionChange'
		            },
	                columns:[{
	                	text      : '성명',
	                	xtype     : 'excolumn',
	                    dataIndex : 'NAME_KOR',
	                    width     : 108,
	                    exAlign   :'left',
	                    sortable  : true
	                },{
	                	text      : '전화번호',
	                	xtype     : 'excolumn',
	                    dataIndex : 'TELNO',
	                    width     : 110,
	                    exAlign   : 'left',
	                    sortable  : true,
	                },{
	                	text      : '핸드폰',
	                	xtype     : 'excolumn',
	                    dataIndex : 'MOBILE_TELNO',
	                    width     : 110,
	                    exAlign   :'left',
	                    sortable  : true,
	                },{
	                	text      : '우편번호',
	                	xtype     : 'excolumn',
	                    dataIndex : 'ZIP_CD',
	                    width     : 88,
	                    exAlign   :'center',
	                    sortable  : true,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	var zipCd = record.get("ZIP_CD");
	                    	if(zipCd != null && zipCd != "" && zipCd != undefined){
	                    		if(zipCd.length == 6){
	                    			zipCd = zipCd.substr(0,3) + "-" + zipCd.substr(3,3);
	                    		}
	                    	}else{
	                    		zipCd = "";
	                    	}
	                    	return zipCd;
	                    }
	                },{
	                	text      : '주소',
	                	xtype     : 'excolumn',
	                    dataIndex : 'ADDR',
	                    width     : 450,
	                    exAlign   : 'left',
	                    sortable  : true
	                }]
	             }]
	        },{
	        	width : 10
	        },{
	        	flex  : 1,
	        	items:[{
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">기본정보</div>',
	        	    height : 30
	        	},{
	        		xtype:'exfieldsetblockbox',
		        	items:[{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">성명</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_name_kor',
	                            exLabel:'성명',
	                            exMand:true,
	                            name:'NAME_KOR'
		        			}]
		        		},{
	                        xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">법명</div>',
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_sacred_kor',
	                            exLabel:'법명',                          
	                            name:'SACRED_KOR'
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">우편번호</div>'
		        		},{	
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype      : 'extextfield',
	                            reference  : 'em_zip_cd',
	                            exReadOnly : true,
	                            name       :'ZIP_CD',
	                            width      : 80,
		        			},{
		        				 width : 5,
		        			},{
		        				xtype     : 'exbutton',
		                  		handler   : 'onFindAddr',
		                  		text      : '우편번호',
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">주소</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_addr1',
	                            exLabel:'주소',                            
	                            name:'ADDR1',
	                            exReadOnly:true,
	                            width : 600,
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">상세주소</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_addr2',
	                            exLabel:'상세주소',                            
	                            name:'ADDR2',                            
	                            width : 350,
		        			},{
		        				width : 5,
		        			},{
		        				xtype:'extextfield',
	                            reference:'txt_addr3',
	                            exLabel:'동,빌딩명',                            
	                            name:'ADDR3',
	                            exReadOnly:true,
	                            width : 245,
		        			},{
		        				xtype:'extextfield',
		        				inputType : 'hidden',
	                            reference:'txt_bldg_num',
	                            exLabel:'빌딩번호',                            
	                            name:'BLDG_NUM',
	                            exReadOnly:true,
	                            width : 0,
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">전화번호</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_telno1',
	                            name:'TELNO1',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_telno}'
	                            },
	                            width : 80
		        			},{
		        				width : 15, 
		        				html  : '<div style="text-align:center;width:100%;">-</div>'
		        			},{
	                       	 	xtype:'extextfield',
	                            reference:'txt_telno2',
	                            name:'TELNO2',
	                            exLabel:'전화번호2',
	                            width : 80,
	                            enforceMaxLength: true,
	                            maxLength : 4,
		        			},{
		        				width : 15, 
		        				html  : '<div style="text-align:center;width:100%;">-</div>'
		        			},{
	                       	 	xtype:'extextfield',
	                            reference:'txt_telno3',
	                            name:'TELNO3',
	                            exLabel:'전화번호2',
	                            width : 80,
	                            enforceMaxLength: true,
	                            maxLength : 4,	        			
		        			}]
		        		},{
	                        xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">핸드폰</div>',
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                       	 	xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_mobile_telno1',
	                            name:'MOBILE_TELNO1',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_mobile_telno}'
	                            },
	                            width : 80
	                        },{
	                       	 	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_mobile_telno2',
	                            name:'MOBILE_TELNO2',
	                            exLabel:'전화번호2',
	                            width : 80,
	                            enforceMaxLength: true,
	                            maxLength : 4,
	                        },{
	                        	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_mobile_telno3',
	                            name:'MOBILE_TELNO3',
	                            exLabel:'전화번호3',
	                            width : 80 ,
	                            enforceMaxLength: true,
	                            maxLength : 4,
	                        }]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">E-mail</div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	 xtype:'extextfield',
	                             reference:'txt_email',
	                             name:'EMAIL',
	                             exLabel:'E-mail',
	                        }]
		        		},{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">재적사찰</div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'extextfield',
	                            reference:'txt_sachal_nm',
	                            exLabel:'재적사찰',                            
	                            name:'SACHAL_NM',
	                        }]
		        		}]
		        	}]
	        	},{	        
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">추가정보</div>',
	        		height : 30
	        	},{
	        		xtype:'exfieldsetblockbox',
		        	items:[{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">직장명</div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'extextfield',
	                            reference:'txt_company_name',
	                            exLabel:'직장명',                            
	                            name:'COMPANY_NAME',
	                        }]
		        		},{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">부서명</div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'extextfield',
	                            reference:'txt_company_pos',
	                            exLabel:'부서명',                            
	                            name:'COMPANY_POS',
	                        }]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">직장전화</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_company_tel1',
	                            name:'COMPANY_TEL1',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_telno}'
	                            },
	                            width : 80
		        			},{
	                       	 	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_company_tel2',
	                            name:'COMPANY_TEL2',
	                            exLabel:'직장전화2',
	                            width : 80,
	                            enforceMaxLength: true,
	                            maxLength : 4,
	                        },{
	                        	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_company_tel3',
	                            name:'COMPANY_TEL3',
	                            exLabel:'직장전화3',
	                            width : 80 ,
	                            enforceMaxLength: true,
	                            maxLength : 4,
		        			}]
		        		},{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">Fax</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_faxno1',
	                            name:'FAXNO1',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_telno}'
	                            },
	                            width : 80
		        			},{
	                       	 	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_faxno2',
	                            name:'FAXNO2',
	                            exLabel:'팩스2',
	                            width : 80,
	                            enforceMaxLength: true,
	                            maxLength : 4,
	                        },{
	                        	html : '<span style="display:inline-block;width:20px;text-align:center">-</span>',
	                       	 	width : 20
	                        },{
	                       	 	xtype:'extextfield',
	                            reference:'txt_faxno3',
	                            name:'FAXNO3',
	                            exLabel:'팩스3',
	                            width : 80 ,
	                            enforceMaxLength: true,
	                            maxLength : 4,
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">메모</div>'
		        		},{
		        			xtype:'exblockfield',
	                		 items:[{
	                			 xtype:'extextarea',
	                			 reference:'ta_memo',
	                             name:'MEMO',
	                             width : '100%',
	                             height : 180,
	                		 }]
		        		}]
		        	}]
	        	},{
	        	//	html : '그룹정보',
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">그룹정보</div>',
	        		height : 30
	        	},{
	        		exGroupRef   : true,
	                xtype        : 'exgrid',
	                reference    : 'cad001w_01_b',
	                height       : 255,
	                width        : '100%',
	                bind         : {
	                    store:'{ds_groupInfo}'
	                },
	                listeners:{},
	                columns:[{
	                	text      : '번호',
	                    xtype     : 'rownumberer',
	                    width     : 50,
	                    align     : 'center',
	                },{
	                	text      : '그룹명',
	                	xtype     : 'excolumn',
	                    dataIndex : 'CLASS_NAME',
	                    width     : 300,
	                    exAlign   :'left',
	                    sortable  : true
	                },{
	                	text      : '비고',
	                	xtype     : 'excolumn',
	                    dataIndex : 'REMARK',
	                    width     : 300,
	                    exAlign   : 'left',
	                    sortable  : true
	                }]
	        	}] /// exfieldsetblockbox
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});