Ext.define('ExFrm.view.ser.ser001w_01',{
	extend:'ExFrm.view.widget.container.ExWindowMain',
	alias:'widget.ser001w_01',
	requires:[
		'ExFrm.view.ser.ser001w_01Controller',
        'ExFrm.view.ser.ser001w_01Model'
	],
	controller:'ser001w_01',
	viewModel:{
        type:'ser001w_01'
    },
    name:'ser001w_01',
    isRootView:true,
    title:'신규등록',
    closable:true,
    scrollable:true,
    items:[{
    	height  : 10
    },{
    	html : '<div id="layerSer001" class="find_addr_layer_pop" style="display:none;position:fixed;overflow:hidden;z-index:3;-webkit-overflow-scrolling:touch;"><img src="//t1.daumcdn.net/postcode/resource/images/close.png" id="btnCloseLayer" style="cursor:pointer;position:absolute;right:-3px;top:-3px;z-index:1" onclick="closeDaumPostcode()" alt="닫기 버튼"></div>'
    },{
        xtype:'exformmain',
	    items:[{
	    	height : 40,
	    	width : '100%',
	    	layout:'hbox',
            xtype:'container',
            items:[{
            	width : '0.5%'
            },{
            	xtype        :'excombobox',
                valueField   :'CODE',
                displayField :'NAME',
                reference    :'lc_AuthGroup',
                name         :'auth_group',                                    
                emptyText    : '전체',
                fieldLabel   :'<span style="font-weight:400;font-weight:700;">권한등급</span>',
                labelAlign   :'right',
                labelWidth   : 60,
                width        : 180,
                value        : '',
                bind         : {
                 	store:'{ds_AuthGroup}'
                },
                listeners:{
                	change:'onChangeAuth'
                },
            },{
            	width : 3
            },{
            	xtype           : 'extextfield',
                fieldLabel      : '<span style="font-weight:400;font-weight:700;">사용자명</span>',
                reference       : 'txt_find_user_nm',
                name            : 'user_nm',
                labelAlign      : 'right',                        
                labelWidth      : 70,
                enableKeyEvents : true,                
                width           : 170,
                listeners:{
            	   keyup : 'onSearchEnter'
                }
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		reference : 'selectCmsBtn',
          		name      : 'selectCmsBtn',
          		handler   : 'onSearch',
          		text      : '조회',
            },{
            	width : 3
            },{
            	xtype     : 'exbutton',
          		reference : 'addBtn',
          		name      : 'addBtn',
          		handler   : 'onAdd',
          		text      : '신규',
        	},{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		reference : 'gridApplyBtn',
          		name      : 'gridApplyBtn',
          		handler   : 'onGridApply',
          		text      : '그리드적용',
        	},{
            	width : 3
        	},{
	    		xtype     : 'exbutton',
          		reference : 'saveBtn',
          		name      : 'saveBtn',
          		handler   : 'onSave',
          		text      : '저장',
        	},{
        		width : '0.5%'
        	},{
       	 		xtype : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'newData',
       	 		name : 'newData',
       	 		width : 0
        	},{
       	 		xtype : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'uptData',
       	 		name : 'uptData',
       	 		width : 0
        	},{
       	 		xtype : 'extextfield',
       	 		inputType : 'hidden',
       	 		reference : 'delData',
       	 		name : 'delData',
       	 		width : 0
            }]
	    },{
	    	xtype:'container',
	    	layout:'hbox',
	        items:[{
	        	width : '0.5%',
	        },{
	        	width : 450,
	        	items : [{
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">인명관리</div>',
	        	},{
	        		height : 5
	        	},{
	        		//html : '그리드'
		        	exGroupRef  : true,
	                xtype       : 'exgrid',
	                reference   : 'ser001w_01_a',
	                height      : 720,
	                width       : '100%',
	                bind:{
	                    store:'{ds_main}'
	                },
	                listeners:{
	                    selectionchange : 'onSelectionChange'
		            },
	                columns:[{
	                	text   : '번호',
	                    xtype  : 'rownumberer',
	                    width  : 60,
	                    align  : 'center',
	                },{
	                	text      : '사용자ID',
	                	xtype     : 'excolumn',
	                    dataIndex : 'USER_ID',
	                    width     : 130,
	                    exAlign   : 'left',
	                    sortable  : true
	                },{
	                	text      : '사용자명',
	                	xtype     : 'excolumn',
	                    dataIndex : 'USER_NM',
	                    width     : 130,
	                    exAlign   : 'left',
	                    sortable  : true,
	                    
	                },{
	                	text      : '사용유무',
	                	xtype     : 'excolumn',
	                    dataIndex : 'USE_YN',
	                    width     : 110,
	                    exAlign   : 'center',
	                    sortable  : true,
	                    renderer  : function(value, meta, record, rowIndex, colIndex, store, view){
	                    	return exCommon.getFormat(value,'useYN' );
	                    }
	                }]
	             }]
	        },{
	        	width : '1%',
	        },{
	        	flex : 1,
	        	items:[{
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">기본정보</div>',
	        	},{
	        		height : 5
	        	},{
	        		xtype:'exfieldsetblockbox',
		        	items:[{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">사용자 ID</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_user_id',
	                            exLabel:'사용자 ID',
	                         //   exMand:true,
	                            name:'USER_NM',
	                         //   exMand:true,
		        			}]
		        		},{
	                        xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">비밀번호</div>',
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_passwd',
	                            exLabel:'비밀번호',                          
	                            name:'PASSWD',
	                            inputType: 'password',
	                         //   exMand:true,
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">사용자명</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_name_kor',
	                            exLabel:'사용자명',
	                          //  exMand:true,
	                            name:'NAME_KOR',
		        			},{
		        				width : 5
		        			},{
		        				html : '<font color="RED">(한글)</font>',
		        				width : 60
		        			},{
		        				xtype:'extextfield',
	                            reference:'txt_name_han',
	                            name:'NAME_KOR',
	                        //    exMand:true,
		        			},{
		        				width : 5
		        			},{
		        				html : '<font color="BLUE">(한자)</font>',
		        				width : 60
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">불명</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'extextfield',
	                            reference:'txt_sacred_kor',
	                            exLabel:'불명',
	                            exMand:true,
	                            name:'SACRED_KOR',
	                            exMand:true,
		        			},{
		        				width : 5
		        			},{
		        				html : '<font color="RED">(한글)</font>',
		        				width : 60
		        			},{
		        				xtype:'extextfield',
	                            reference:'txt_sacred_han',
	                            name:'SACRED_HAN',
	                            exMand:true,
		        			},{
		        				width : 5
		        			},{
		        				html : '<font color="BLUE">(한자)</font>',
		        				width : 60
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">권한등급</div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'excombobox',
		                        valueField:'CODE',
		                        displayField:'NAME',
		                        reference:'lc_AuthGroup_I',
		                        name:'AUTH_GROUP',                    
		                        value : '',
		                        emptyText : '선택',
		                        width : 120,
		                        bind:{
		                         	store:'{ds_AuthGroup}'
		                        }
		        			}]
		        		}]
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">생년월일 </div>'
		        		},{
		        			xtype:'exblockfield',
		        			items:[{
		        				xtype:'exdatefield',
		                        reference:'me_birthday',
		                        name:'BIRTHDAY',                                                   
		                        exFormat : 'Y/m/d',
		                        exSubmitFormat : 'Ymd',
		        			},{
		        				width : 5
		        			},{
		        				xtype:'excombobox',
		                        valueField:'CODE',
		                        displayField:'NAME',
		                        reference:'lc_lunar_Solar',
		                        name:'LUNAR_SOLAR',                    
		                        value : '',
		                        emptyText : '선택',
		                        width : 70,
		                        bind:{
		                         	store:'{ds_lunar_solar}'
		                        }
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
		        				xtype:'extextfield',
	                            reference:'em_zip_cd',
	                            exLabel:'우편번호',
	                            exReadOnly:true,
	                            name:'ZIP_CD',
	                            width : 80,
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
	                            	store:'{ds_telno1}'
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
	                       	 	xtype       : 'excombobox',
	                            valueField  : 'CODE',
	                            displayField: 'NAME',
	                            reference   : 'lc_mobile_telno1',
	                            name        : 'MOBILE_TELNO1',
	                            emptyText   : '선택',
	                            bind:{
	                            	store:'{ds_mobile_telno1}'
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
	                        html:'<div style="text-align:left;padding-left:5px;">부서명</div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	 xtype:'extextfield',
	                             reference:'txt_deptNm',
	                             name:'DEPT_NM',
	                             exLabel:'부서명',
	                        }]
		        		},{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">직책 </div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'extextfield',
	                            reference:'txt_position',
	                            exLabel:'직책',                            
	                            name:'POSITION_CODE',
	                        }]
		        		}]
		        	
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">입사일 </div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'exdatefield',
		                        reference:'me_enter',
		                        name:'ENTRCOMP_DATA',                                                   
		                        exFormat : 'Y/m/d',
		                        exSubmitFormat : 'Ymd',
	                        }]
		        		},{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">병역관계  </div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_servearmy',
	                            name:'SERVEARMY_GBN',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_servearmy}'
	                            },
	                            width : 80
	                        }]
		        		}]
		        	
		        	},{
		        		xtype:'exblockrow',
		        		items:[{
		        			xtype:'exblocklabel',
	                        html:'<div style="text-align:left;padding-left:5px;">사용유무 </div>'
		        		},{
		        			xtype:'exblockfield',
	                        items:[{
	                        	xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            reference:'lc_use_yn',
	                            name:'USE_YN',
	                            emptyText : '선택',
	                            bind:{
	                            	store:'{ds_use_yn}'
	                            },
	                            width : 80
	                        }]
		        		}]
		        	}]
	        		
	        	},{
	        		html   : '<div style="height : 30px;background-color:#3892d4;color:#ffffff;font-weight:700;line-height:30px;text-align:center;center;border-radius:5px;display:inline-block;padding:0 15px;">그룹정보</div>',
	        		height : 40,	        		
	        		items:[{
	        			height : 0,
	        			items  : [{
	        				xtype     : 'extextfield',
		        			inputType : 'hidden',
		        			reference : 'newData1',
		        			name      : 'newData1',
		        			height    : 0,
		        			width     : 0,
	        			},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'uptData1',
		           	 		name      : 'uptData1',
		           	 		height    : 0,
		           	 		width     : 0
		        		},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'delData1',
		           	 		name      : 'delData1',
		           	 		height    : 0,
		           	 		width     : 0
		        		},{
		        			xtype     : 'extextfield',
		        			inputType : 'hidden',
		        			reference : 'newData2',
		        			name      : 'newData2',
		        			height    : 0,
		        			width     : 0
		        		},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'uptData2',
		           	 		name      : 'uptData2',
		           	 		height    : 0,
		           	 		width     : 0
		        		},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'delData2',
		           	 		name      : 'delData2',
		           	 		height    : 0,
		           	 		width     : 0
		        		},{
		        			xtype     : 'extextfield',
		        			inputType : 'hidden',
		        			reference : 'newData3',
		        			name      : 'newData3',
		        			height    : 0,
		        			width     : 0
		        		},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'uptData3',
		           	 		name      : 'uptData3',
		           	 		height    : 0,
		           	 		width     : 0
		        		},{
		        			xtype     : 'extextfield',
		           	 		inputType : 'hidden',
		           	 		reference : 'delData3',
		           	 		name      : 'delData3',
		           	 		height    : 0,
		           	 		width     : 0
	        			}]
	        		}]
	        	},{
	        		xtype     : 'tabpanel',
	        		reference : 'tabpanel',
	        		listeners :{
	                    tabChange:'onTabChange'
	                },
	                items:[{
	                	title      :'가족사항',	                	
	                    xtype      :'exgrid',
	                    value      :'mg_tab1',
	                    reference  :'mg_tab1',
	                    height     : 273, 
	                    plugins    : [{
	                        ptype:'cellediting',
	                        clicksToEdit: 1
	                    }],
	                    bind:{
	                         store:'{ds_tab1}'
	                    },
	                    columns:[{
	                        text:'번호',
	                        xtype:'rownumberer',
	                        width : 70,
	                    },{
	                        text      : '사용자ID',
	                        xtype     : 'excolumn',
	                        dataIndex : 'USER_ID',
	                        sortable  : true,
	                        width     : 90,
	                        hidden    : true,
	                    },{
	                        text      : '관계',
	                        xtype     : 'excolumn',
	                        dataIndex :'REPRESEN_REL',
	                        sortable  : true,
	                        width     : 90,
	                        editor    : {
	                            xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',	                            
	                            bind         : {
	                                store:'{ds_relation_tab1}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_relation_tab1');
	                            return exCommon.getComboVal(value, store);
	                        }
	                        /*xtype:'excolumnwidgetcombo',
	                        exAlign:'center',
		                    exValueField:'CODE',
		                    exDisplayField:'NAME', 
		                    exBindStore:'ds_relation_tab1'*/
	                    },{
	                        text:'간지',
	                        xtype:'excolumn',
	                        dataIndex:'SEXAGENARY',
	                        sortable : true,
	                        width : 90,
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_sexagenary_tab1}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_sexagenary_tab1');
	                            return exCommon.getComboVal(value, store);
	                        }
	                    },{
	                        text:'성명',
	                        xtype:'excolumn',
	                        dataIndex:'NAME_KOR',
	                        sortable : true,
	                        width : 120,
	                        exAlign : 'left',
	                        editor:{
	                            xtype:'extextfield',	                            
	                        }
	                    },{
	                        text:'불명',
	                        xtype:'excolumn',
	                        dataIndex:'SACRED_KOR',
	                        sortable : true,
	                        width : 120,
	                        exAlign : 'left',
	                        editor:{
	                            xtype:'extextfield',	                            
	                        }
	                    },{
	                        text:'성별',
	                        xtype:'excolumn',
	                        dataIndex:'SEX_GBN',
	                        sortable : true,
	                        width : 70,
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_gender}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_gender');
	                        	return exCommon.getComboVal(value, store);
	                        	
	                        }
	                    },{
	                        text:'음양',
	                        xtype:'excolumn',
	                        dataIndex:'LUNAR_SOLAR',
	                        sortable : true,
	                        width : 70,
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_lunar}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_lunar');
	                            return exCommon.getComboVal(value, store);
	                            
	                        }
	                    },{
	                        text:'생년월일',
	                        xtype:'excolumn',
	                        exType:'date',
	                        dataIndex:'BIRTHDAY',
	                        sortable : true,
	                        width : 110,
	                        editor:{
	                            xtype:'exdatefield',
	                            exFormat : 'Y/m/d',
	                            exSubmitFormat : 'Ymd',	       
	                        },
	                        onRenderer:function(orgValue,value){
	                        	
	                        	try{
	                        		return exCommon.getGridDateFormat(value );
	                        	}catch (e) {
									return "";
								}
	                        	
	                        }
	                        
	                    },{
	                        text:'윤평',
	                        xtype:'excolumn',
	                        dataIndex:'LEAP_MONTH',
	                        sortable : true,
	                        width : 70,
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_leap}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_leap');
	                            return exCommon.getComboVal(value, store);
	                        }
	                    },{
	                        text:'생시생분',
	                        xtype:'excolumn',
	                        dataIndex:'BIRTHTIME',
	                        sortable : false,
	                        width : 90,
	                        onRenderer:function(orgValue,value){
	                        	try{
	                        		if(value.length == 4){
		                        		return value.substr(0,2) + ":"+ value.substr(2,2); 
		                        	}else{
		                        		return value;
		                        	}
	                        	}catch (e) {
									return value;
								}
	                        },
	                        editor:{
	                            xtype:'extextfield',	                            
	                        }
	                    }]
	                },{
	                	title:'학력사항',
	                	xtype:'exgrid',
	                	value : 'mg_tab2',
	                    reference:'mg_tab2',
	                    height: 273, 
	                    bind:{
	                         store:'{ds_tab2}'
	                    },
	                    plugins:[{
	                        ptype:'cellediting',
	                        clicksToEdit: 1
	                    }],
	                    columns:[{
	                        text:'번호',
	                        xtype:'rownumberer',
	                        width : 70,
	                    },{
	                        text:'사용자ID',
	                        xtype:'excolumn',
	                        dataIndex:'USER_ID',
	                        sortable : true,
	                        width : 90,
	                        hidden: true,
	                    },{
	                        text:'시작일',
	                        xtype:'excolumn',
	                        exType:'date',
	                        dataIndex:'SDATE',
	                        sortable : true,
	                        width : 110,
	                        editor:{
	                            xtype:'exdatefield',
	                            exFormat : 'Y/m/d',
	                            exSubmitFormat : 'Ymd',	       
	                        },
	                        onRenderer:function(orgValue,value){
	                        	try{
	                        		if(value.length <= 10){
		                        		return value
		                        	}else{
		                        		return Ext.util.Format.date(value, 'Y-m-d');
		                        	}
	                        	}catch (e) {
									return "";
								}
	                        	
	                        }
	                    },{
	                        text:'종료일',
	                        xtype:'excolumn',
	                        exType:'date',
	                        dataIndex:'EDATE',
	                        sortable : true,
	                        width : 100,
	                        editor:{
	                            xtype:'exdatefield',
	                            exFormat : 'Y/m/d',
	                            exSubmitFormat : 'Ymd',	       
	                        },
	                        onRenderer:function(orgValue,value){
	                        	try{
	                        		if(value.length <= 10){
		                        		return value
		                        	}else{
		                        		return Ext.util.Format.date(value, 'Y-m-d');
		                        	}
	                        	}catch (e) {
									return "";
								}
	                        	
	                        }
	                    },{
	                        text:'최종학력',
	                        xtype:'excolumn',
	                        dataIndex:'LAST_SCHOLA',
	                        sortable : true,
	                        exAlign : 'left',
	                        width : 110,
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_last_schola_tab2}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_last_schola_tab2');
	                            return exCommon.getComboVal(value, store);
	                        }
	                    },{
	                        text:'전공학과',
	                        xtype:'excolumn',
	                        dataIndex:'MAJOR',
	                        sortable : true,
	                        width : 110,
	                        editor:{
	                            xtype:'extextfield',	                            
	                        }
	                    },{
	                        text:'졸업구분',
	                        xtype:'excolumn',
	                        dataIndex:'GRADUATION_GBN',
	                        sortable : true,
	                        width : 110,
	                        exAlign : 'left',
	                        editor:{
	                            xtype:'excombobox',
	                            valueField:'CODE',
	                            displayField:'NAME',
	                            bind:{
	                                store:'{ds_graduation_gbn}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_graduation_gbn');
	                            return exCommon.getComboVal(value, store);
	                        }
	                    },{
	                        text:'기타사항',
	                        xtype:'excolumn',
	                        dataIndex:'REMARK',
	                        sortable : true,
	                        width : 220,
	                        exAlign : 'left',
	                        editor:{
	                            xtype:'extextfield',	                            
	                        }
	                    }]
	                },{
	                	title     : '교육사항',
	                	value     : 'mg_tab3',	                	
	                    reference : 'mg_tab3',
	                	xtype     : 'exgrid',
	                    height    : 273, 
	                    plugins   : [{
	                        ptype:'cellediting',
	                        clicksToEdit: 1
	                    }],
	                    bind:{
	                         store:'{ds_tab3}'
	                    },
	                    columns:[{
	                        text    : '번호',
	                        xtype   : 'rownumberer',
	                        width   : 70,
	                    },{
	                        text      :'사용자ID',
	                        xtype     : 'excolumn',
	                        dataIndex : 'USER_ID',
	                        sortable  : true,
	                        width     : 90,
	                        hidden    : true,
	                    },{
	                        text      : '시작일',
	                        xtype     : 'excolumn',
	                        dataIndex : 'EDU_SDATE',
	                        sortable  : true,
	                        width     : 110,
	                        editor    : {
	                            xtype:'exdatefield',
	                            exFormat : 'Y/m/d',
	                            exSubmitFormat : 'Ymd',	       
	                        },
	                        onRenderer:function(orgValue,value){
	                        	try{
	                        		return exCommon.getGridDateFormat(value );
	                        	}catch (e) {
									return "";
								}
	                        }
	                    },{
	                        text      : '일련번호',
	                        xtype     : 'excolumn',
	                        dataIndex : 'SEQ_NO',
	                        sortable  : true,
	                        width     : 100,
	                        hidden    : true,
	                    },{
	                        text      : '종료일',
	                        xtype     : 'excolumn',
	                        dataIndex :'EDU_EDATE',
	                        sortable  : true,
	                        width     : 110,
	                        editor    : {
	                            xtype:'exdatefield',
	                            exFormat : 'Y/m/d',
	                            exSubmitFormat : 'Ymd',	       
	                        },
	                        onRenderer:function(orgValue,value){
	                        	try{
	                        		return exCommon.getGridDateFormat(value );
	                        	}catch (e) {
									return "";
								}
	                        	
	                        }
	                    },{
	                        text      : '교육명',
	                        xtype     : 'excolumn',
	                        dataIndex : 'EDU_NAME',
	                        sortable  : true,
	                        width     : 170,
	                        exAlign   : 'left',
	                        editor    : {
	                            xtype:'extextfield',	                            
	                        }
	                    },{
	                        text      : '이수구분',
	                        xtype     : 'excolumn',
	                        dataIndex :'COMPLETION_GBN',
	                        sortable  : true,
	                        width     : 120,
	                        editor    : {
	                            xtype        : 'excombobox',
	                            valueField   : 'CODE',
	                            displayField : 'NAME',
	                            bind         : {
	                                store:'{ds_issue}'
	                            }
	                        },
	                        onRenderer:function(orgValue,value){
	                            var store = this.up('[isRootView=true]').getViewModel().getStore('ds_issue');
	                            return exCommon.getComboVal(value, store);
	                        }
	                    },{
	                        text      : '기타사항',
	                        xtype     : 'excolumn',
	                        dataIndex : 'REMARK',
	                        sortable  : true,
	                        width     : 240,
	                        exAlign   : 'left',
	                        editor    :{
	                            xtype  : 'extextfield',	                            
	                        }
	                    }]	              
	                }]
	                ,listeners: {
	                    afterrender: function(panel){
	                        var bar = panel.tabBar;
	                        bar.insert(3,[
	                            {
	                            	xtype:'container',
	                            	flex : 1
	                            },{
	                                xtype: 'button',
	                                text: ' 추가 ',
                              		handler   : 'addBot',
	                            },{
	                                xtype: 'button',
	                                text: ' 삭제 ',
                              		handler   : 'delBot',
	                            },{
	                                xtype: 'button',
	                                text: ' 저장 ',
                              		handler   : 'saveBot',
	                            }                
	                        ]);
	                    }
	                }
	        		
	        	}] /// exfieldsetblockbox
	        },{
	        	width : '0.5%',
	        }]
	    }]/*container*/
    }]/*exformmain*/ 
});