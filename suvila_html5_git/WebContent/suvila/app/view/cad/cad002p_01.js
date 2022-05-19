Ext.define('ExFrm.view.cad.cad002p_01',{
    extend:'ExFrm.view.widget.container.ExWindow',
    alias:'widget.cad002p_01',
    requires:[
    	'ExFrm.view.cad.cad002p_01Controller',
    	'ExFrm.view.cad.cad002p_01Model'
    ],
    controller:'cad002p_01',
    viewModel:{
        type:'cad002p_01'
    },
    isModal:true,
    name:'cad002p_01',
    title:'인명관리',
    closable:true,
    width:1200,
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
                },{
                	layout:'hbox',
                	height : 30,
                	items:[{
                		xtype:'extextfield',
                		fieldLabel:'성명 ',
                		labelWidth: 50,
                		reference:'txt_keyword',
                		name : 'V_SEARCH_WORD',
                		value : '',
                		enableKeyEvents: true,
                		listeners : [{
                       	 	keydown : 'onSearchEnter'
                        }]
                	},{
                		width : 5
                	},{
                		xtype : 'exbutton',
                		reference : 'findSindoBtn',
                		name : 'findSindoBtn',
                		handler : 'onFindSindo',
                		text:'조회',
                	},{
                		width : 5
                	},{
                		xtype : 'exbutton',
                		reference : 'returnBtn',
                		name : 'returnBtn',
                		handler : 'onReturn',
                		text:'확인',
                	},{
                		width : 5
                	},{
                		xtype : 'exbutton',
                		reference : 'closeBtn',
                		name : 'closeBtn',
                		handler : 'onClose',
                		text:'닫기',
                	}]
                                    
                },{
                    exGroupRef:true,
                    xtype:'exgrid',
                    //iconCls: 'icon-grid',
                    reference:'cad002p_01_a',
                    /*plugins:[{
                    	ptype : 'bufferedrenderer',
                    }],*/
                    width:700,
                    height : 500,
                    align : 'center',
                    columnLines: true,
                    bind:{
                        store:'{ds_main}'
                    },                 
                    listeners:{
                    	//itemdblclick:'onGridDbClick'
                    	celldblclick : 'onCellDbClick'
                    },
                    selModel: {
                        type: 'checkboxmodel',
                        checkOnly: true,
                        headerText: '선택',
                        headerWidth : 60,
                        listeners : {
                        	 deselect : 'onDeSelect'
                        	,select   : 'onSelect'
                        }
                    },
                    columns:[{                       
                       /* text:'순번',
                        xtype:'excolumn',
                        dataIndex:'SEQ',
                        width : 60,
                        exAlign:'center',
                    },{*/
                    	xtype:'excolumn',
                        text:'성명',
                        dataIndex:'NAME_KOR',
                        exAlign:'center',
                        style: 'text-align:center',
                        flex : 3
                    },{
                    	xtype:'excolumn',
                        text:'전화번호',
                        dataIndex:'ACCT_NM',
                        exAlign:'center',
                        style: 'text-align:center',
                        flex : 3,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	var tel1 = record.get("TELNO1");
                        	var tel2 = record.get("TELNO2");
                        	var tel3 = record.get("TELNO3");
                        	
                        	
                        	if(tel1 == undefined) tel1 = "";
                        	if(tel2 == undefined) tel2 = "";
                        	if(tel3 == undefined) tel3 = "";
                        	
	                    	
                        	var tel = tel1 + "-" + tel2+ "-" + tel3;
                        	    tel = tel.replace('--', '');
	                    	
	                    	return tel;
	                    }
                    },{
                    	xtype:'excolumn',
                        text:'핸드폰',
                        dataIndex:'ACCT_NM',
                        width:100,
                        exAlign:'center',
                        flex : 3,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	var tel1 = record.get("MOBILE_TELNO1");
                        	var tel2 = record.get("MOBILE_TELNO2");
                        	var tel3 = record.get("MOBILE_TELNO3");
                        	
                        	
                        	if(tel1 == undefined) tel1 = "";
                        	if(tel2 == undefined) tel2 = "";
                        	if(tel3 == undefined) tel3 = "";
                        	
	                    	
                        	var tel = tel1 + "-" + tel2+ "-" + tel3;
                        	    tel = tel.replace('--', '');
                    	
                    	    return tel;
	                    }
                    },{
                    	xtype:'excolumn',
                        text:'우편번호',
                        dataIndex:'ZIP_CD',
                        width:100,
                        exAlign:'center',
                        style: 'text-align:center',
                        flex : 3,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
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
                    	xtype:'excolumn',
                        text:'주소',
                        dataIndex:'ADDR1',
                        width:100,
                        exAlign:'left',
                        style: 'text-align:center',
                        flex : 6    
                    },{
                    	xtype:'excolumn',
                        text:'상세주소',
                        dataIndex:'ADDR2',
                        width:100,
                        exAlign:'left',
                        style: 'text-align:center',
                        flex : 6,
                        renderer:function(value, meta, record, rowIndex, colIndex, store, view){
                        	
                        	var addr2 = record.get("ADDR2");
                        	var addr3 = record.get("ADDR3");
                        	
                        	if(addr2 == null || addr2 == "" || addr2 == undefined){
                        		addr2 = "";
                        	}
                        	
                        	if(addr3 == null || addr3 == "" || addr3 == undefined){
                        		addr3 = "";
                        	}
                        	
                        	return addr2+ " " + addr3;
                        }
                    }]
                }]
            }]
        }]
    }]
})