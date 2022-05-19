Ext.define('ExFrm.view.com.hwaju',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.hwaju',
    requires:[
    	'ExFrm.view.com.hwajuController',
    	'ExFrm.view.com.hwajuModel'
    ],
    controller:'hwaju',
    viewModel:{
        type:'hwaju'
    },
    isModal:true,
    name:'hwaju',
    title:'신도검색',
    closable:true,
    width:1400,
    height:380,
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype:'exformmain',*/
        width:'100%',
        height:'100%',
        cls : 'exformmain',
        layout:{
            type:'vbox',
            align:'stretch'
        },
        items:[{
            layout:'hbox',
            items:[{
                flex:1,
                layout:{
                    type:'vbox',
                    align:'stretch'
                },
                height:550,
                items:[{
                    layout:'hbox',
                    cls : 'hwajuExample',
                    items:[{
                       /* html:'해당 지역을 선택후 동명,도로명,건물명을 이용해서 검색하십시오.<br>'
                        	+'번지를 함께 이용하시면 더욱 정확한 결과가 검색됩니다<br/>'
                        	+'<font color="RED">예) 번  &nbsp;&nbsp;지 검색시 : 망원동 , 망원동 472-4 ,남산리 ,남산리 598-7<br/>' 
                        	+'  도로명 검색시 : 월드컵로 , 월드컵로 165<br>'
                            +'  건물명 검색시 : 마포구청 , 월드컵로 마포구청 <br/>'*/
                    }]
                },{
                	layout:'hbox',
                	height : 30,                	                  
                	items:[{
                		xtype:'excombobox',
                	//	fieldLabel:'신도검색',
                	//	labelWidth:70,
                    	fieldStyle: 'text-align: right;',
                        reference:'sel_BudSearchGbn',
                        displayField:'name',
                        valueField:'code',
                        exCommonDmnCode:'001',  
                        name : 'V_SEARCH_GBN',
                        width : 170,
                        store:{},
                        listeners:{
                        	change:'onChange'
                        },
                	},{
                		width : 5
                	},{
                		xtype:'extextfield',
                		reference:'txt_name',
                		name : 'V_SEARCH_WORD',
                		width : 200,
                		value : '',
                		enableKeyEvents: true,
                		exMand:true,
                		listeners : [{
                       	 	keydown : 'onSearchEnter'
                        }]
                	},{
                		width : 5
                	},{
                		xtype : 'exbutton',
                		reference : 'searchBtn',
                		name : 'searchBtn',
                		handler : 'onSearch',
                		text:'찾기',
                	}]
                },{
                	 xtype:'container',
                	 reference:'hwaju_a',
                	 width: '100%',
                	 items:[{
                		 exGroupRef:true,
                         exGroupFields:['DAEJU_NAME_KOR'],
                         cls : 'grid-group ',
                         xtype:'exgrid',
                         reference:'postGrid',
                         width: '100%',
                         height : 250,
                         align : 'center',                    
                         bind:{
                             store:'{ds_main}'
                         },                 
                         listeners:{                         
                         	celldblclick : 'onCellDbClick'
                         } ,                     
                         columns:[{                       
                             text:'NO',
                             xtype:'rownumberer',
                             dataIndex:'',                        
                             align:'center',
                             flex : 1.8,
                             sortable: true,
                         },{
                         	text:'신도종류',
                         	xtype:'excolumn',
                             dataIndex:'SINDO_GBN_TXT',                        
                             exAlign:'center',
                             flex : 2.5,
                             sortable: true,
                         },{
                          	  text:'대표',
                          	  xtype:'excolumn',
                              dataIndex:'DAEJU_NAME_KOR',                        
                              exAlign:'center',
                              flex : 3,
                              sortable: true,
                         },{
                         	text:'신도번호',
                         	xtype:'excolumn',
                             dataIndex:'BUD_NO',                        
                             exAlign:'center',
                             flex : 3.5,
                             sortable: true,
                         },{
                         	text:'성명',
                         	xtype:'excolumn',
                             dataIndex:'NAME_KOR',                        
                             exAlign:'left',
                             flex : 3,
                             sortable: true,
                         },{
                         	text:'관계',
                         	xtype:'excolumn',
                             dataIndex:'REPRESEN_REL',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 2
                         },{
                         	text:'전화번호',
                         	xtype:'excolumn',
                             dataIndex:'TEL_NO_RENDER',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 3.5                        
                         },{
                         	text:'휴대번호',
                         	xtype:'excolumn',
                             dataIndex:'MOBILE_TELNO_RENDER',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 3.5                      
                         },{
                         	text:'주소',
                         	xtype:'excolumn',
                             dataIndex:'ADDR',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 9
                         },{
                         	text:'법명',
                         	xtype:'excolumn',
                             dataIndex:'SACRED_KOR',                        
                             exAlign:'left',
                             sortable: true,
                             flex : 3
                         },{
                         	text:'가족코드',
                         	xtype:'excolumn',
                             dataIndex:'BUD_CODE',                        
                             exAlign:'center',
                             sortable: true,
                             flex : 3.5                 
                         }]
                	 }]
                }]
            }]
        }]
    }]
})