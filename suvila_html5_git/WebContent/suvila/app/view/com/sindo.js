Ext.define('ExFrm.view.com.sindo',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.sindo',
    requires:[
    	'ExFrm.view.com.sindoController',
    	'ExFrm.view.com.sindoModel'
    ],
    controller:'sindo',
    viewModel:{
        type:'sindo'
    },
    isModal:true,
    name:'sindo',
    title:'신도검색',
    closable:true,
    isRootView:true,
    width:1300,
    height:380,
    reference : 'sindoSearchPop',
    layout:{
        type:'vbox',
        align:'stretch'
    },
    items:[{
        /*xtype:'exformmain',*/
        width:'99.9%',
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
                    cls : 'sindoExample',
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
                		xtype          :'excombobox',
                    	fieldStyle     :'text-align: right;',
                        reference      :'sel_BudSearchGbn',
                        displayField   :'name',
                        valueField     :'code',
                        exCommonDmnCode:'001',  
                        name           :'V_SEARCH_GBN',
                        width          : 170,
                        store          : {},
                        listeners      :{
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
                	},{
                		width            : 0,
                		height           : 0,
                		items            :[{
                        	xtype     : 'extextfield',
                   	 		inputType : 'hidden',
                   	 		reference : 'V_gbn',
                   	 		name      : 'V_gbn',
                   	 		width     : 0
                		}]
                	}]
                },{
                	 xtype     : 'container',
                	 reference : 'sindo_a',
                	 width     : '100%',
                	 items     : [{
                		 exGroupRef   : true,
                         exGroupFields: ['DAEJU_NAME_KOR'],
                         cls          : 'grid-group ',
                         xtype        : 'exgrid',
                         reference    : 'postGrid',
                         width        : '100%',
                         height       : 250,
                         align        : 'center',                    
                         bind         : {
                             store:'{ds_main}'
                         },                 
                         listeners    : {
                         	celldblclick : 'onCellDbClick'
                         },                     
                         columns:[{                       
                             text      :'NO',
                             xtype     :'rownumberer',
                             align     :'center',
                             flex      : 1.8,
                             sortable  : true,
                         },{
                         	 text      :'신도종류',
                         	 xtype     :'excolumn',
                             dataIndex :'SINDO_GBN_TXT',                        
                             exAlign   :'center',
                             flex      : 2.5,
                             sortable  : true,
                         },{
                          	 text      :'대표',
                          	 xtype     :'excolumn',
                             dataIndex :'DAEJU_NAME_KOR',                        
                             exAlign   :'center',
                             flex      : 3,
                             sortable  : true,                         
                         },{
                         	 text      :'신도번호',
                         	 xtype     :'excolumn',
                             dataIndex :'BUD_NO',                        
                             exAlign   :'center',
                             flex      : 3.5,
                             sortable  : true,
                         },{
                         	 text      :'성명',
                         	 xtype     :'excolumn',
                             dataIndex :'NAME_KOR',                        
                             exAlign   :'left',
                             flex      : 3,
                             sortable  : true,
                         },{
                         	 text      :'관계',
                         	 xtype     :'excolumn',
                             dataIndex :'REPRESEN_REL',                        
                             exAlign   :'left',
                             sortable  : true,
                             flex      : 2
                         },{
                         	 text      :'전화번호',
                         	 xtype     :'excolumn',
                             dataIndex :'TEL_NO_RENDER',                        
                             exAlign   :'left',
                             sortable  : true,
                             flex      : 3.5                        
                         },{
                         	 text      :'휴대번호',
                         	 xtype     :'excolumn',
                             dataIndex :'MOBILE_TELNO_RENDER',                        
                             exAlign   :'left',
                             sortable  : true,
                             flex      : 3.5                      
                         },{
                         	 text      :'주소',
                         	 xtype     :'excolumn',
                             dataIndex :'ADDR',                        
                             exAlign   :'left',
                             sortable  : true,
                             flex      : 9
                         },{
                         	 text      :'법명',
                         	 xtype     :'excolumn',
                             dataIndex :'SACRED_KOR',                        
                             exAlign   :'left',
                             sortable  : true,
                             flex      : 3
                         },{
                         	 text      :'가족코드',
                         	 xtype     :'excolumn',
                             dataIndex :'BUD_CODE',                        
                             exAlign   :'center',
                             sortable  : true,
                             flex      : 3.5                 
                         }]
                	 }]
                },{
                	// 영가
                		exGroupRef:true,
                        cls : 'grid-group ',
                        xtype:'exgrid',
                        reference:'sindo_b',
                        width: 1600,
                        height : 250,
                        columnLines: true,
                        syncRowHeight: false,
                        lockable: true,
                        align : 'center',                    
                        bind:{
                            store:'{ds_main}'
                        },                 
                        listeners:{
                        	//itemdblclick:'onGridDbClick'
                        	celldblclick : 'onCellDbClick'
                        },
                        viewConfig: {
                        	 stripeRows: true                        	 
                        }, 
                        columns:[
                        {                       
                            text:'NO',
                            xtype:'rownumberer',
                            dataIndex:'',                        
                            align:'center',
                            //flex : 1.8
                            sortable: true,
                            width : 60
                        },{
                        	text:'신도번호',
                        	xtype:'excolumn',
                            dataIndex:'BUD_NO',                        
                            exAlign:'center',
                            //flex : 3.5,
                            width : 110,
                            sortable: true,
                            locked: true,
                        },{
                        	text:'복위자명',
                        	xtype:'excolumn',
                            dataIndex:'NAME_KOR',                        
                            exAlign:'left',
                            sortable: true,
                            locked: true,
                        },{
                        	text:'행관계',
                        	xtype:'excolumn',
                            dataIndex:'HYO_REL',                        
                            exAlign:'left',
                            sortable: true,
                            
                        },{
                        	text:'복위기부',
                        	xtype:'excolumn',
                            dataIndex:'BOKWI_KIBU_GBN_NAME',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'망관계',
                        	xtype:'excolumn',
                            dataIndex:'DECE_REL',                        
                            exAlign:'center',
                            sortable: true,
                        },{
                        	text:'본',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_BON_NAME',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'성별',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_SEX_GBN_NAME',                        
                            exAlign:'center',
                            sortable: true,
                        },{
                        	text:'영가명',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_NAME_KOR',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'영가법명',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_SACRED_KOR',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'양력음력',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_LUNAR_SOLAR_NAME',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'기일',
                        	xtype:'excolumn',
                            dataIndex:'DEATH_DAY',                        
                            exAlign:'left',
                            sortable: true,
                        },{
                        	text:'전화번호',
                        	xtype:'excolumn',
                            dataIndex:'TEL_NO_RENDER',                        
                            exAlign:'left',
                            width : 120,
                            sortable: true,
                        },{
                        	text:'휴대번호',
                        	xtype:'excolumn',
                            dataIndex:'MOBILE_TELNO_RENDER',                        
                            exAlign:'left',
                            width : 120,
                            sortable: true,
                        },{
                        	text:'주소',
                        	xtype:'excolumn',
                            dataIndex:'ADDR',                        
                            exAlign:'left',
                            width : 350,
                            sortable: true,
                        },{
                        	text:'가족코드',
                        	xtype:'excolumn',
                            dataIndex:'BUD_CODE',                        
                            exAlign:'center',
                            sortable: true,
                        }]
                },{
                	height : 10
                },{
                	layout :{
	           			 type : 'hbox',
	           			 pack : 'center'
	           		 }, 
	           		 items  : [{
	           			/*xtype     : 'exbutton',
	                   	reference : 'confirmBtn',
	                   	name      : 'confirmBtn',
	                   	handler   : 'onConfirm',
	                   	text      : '확인',
	           		 },{
	           			 width : 10*/
	           		 },{
	           			xtype     : 'exbutton',
	                    reference : 'closeBtn',
	                    name      : 'closeBtn',
	                    handler   : 'onClose',
	                    text      : '닫기',
	           		 }]
                }]
            }]
        }]
    }]
})