Ext.define('ExFrm.view.com.post',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.post',
    requires:[
    	'ExFrm.view.com.postController',
    	'ExFrm.view.com.postModel'
    ],
    controller:'post',
    viewModel:{
        type:'post'
    },
    isModal:true,
    name:'post',
    title:'우편번호 및 주소입력',
    closable:true,
    width:1190,
    height:600,
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
        items:[
        {
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
                    cls : 'postExample',
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
                        /*fieldLabel:'검색지역',*/
                        reference:'V_ADDR_GBN',
                        name:'V_ADDR_GBN',
                        valueField:'value',
                        displayField:'display',
                        value : 'ASP_DORO_SEOUL',
                        width : 130,
                        bind:{
                         	store:'{doName}'
                        },
                	},{
                		width : 5
                	},{
                		xtype:'extextfield',
                		reference:'V_POSTNM',
                		name : 'V_POSTNM',
                		width : 200,
                		value : '강서로15길139',
                		enableKeyEvents: true,
                		listeners : [{
                       	 	keydown : 'onKeyDown'
                        }]
                	},{
                		width : 5
                	},{
                		xtype : 'exbutton',
                		reference : 'findAddrBtn',
                		name : 'findAddrBtn',
                		handler : 'onFindAddr',
                		text:'조회',
                	}]
                                    
                },{
                    exGroupRef :true,
                    xtype      :'exgrid',
                    reference  :'postGrid',
                    plugins    : [{
                    	ptype : 'bufferedrenderer',
                    }],
                    width      : 700,
                    height     : 500,
                    align      : 'center',                    
                    bind:{
                        store:'{addrInfo}'
                    },                 
                    listeners:{
                    	celldblclick : 'onCellDbClick'
                    },
                    columns:[{                       
                        text        : '우편번호',
                        dataIndex   : 'ZIPCODE',
                        xtype       : 'excolumn',
                        exAlign     : 'center',
                        flex        : 2.2
                    },{

                        text        : '지번주소',
                        dataIndex   : 'ADDR2',
                        exAlign     : 'elft',
                        xtype       : 'excolumn',
                        flex        : 8
                    },{
                        text        : '도로명주소',
                        xtype       : 'excolumn',
                        dataIndex   : 'ADDR1',
                        exAlign     : 'left',
                        flex        : 8
                    },{
                        text        : '건물명',
                        xtype       : 'excolumn',
                        dataIndex   : 'ADDR3',
                        width       : 100,
                        exAlign     : 'left',
                        flex        : 6                    
                    }]
                }]
            }]
        }]
    }]
})