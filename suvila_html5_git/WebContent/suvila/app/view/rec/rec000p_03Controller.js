Ext.define('ExFrm.view.rec.rec000p_03Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_03',
    onInit:function(){},
    onAfterRender:function(){},
    onCalled:function(params){
        var me = this;
        
        
        me.lookupReference('lc_acceptGbn').setExValue(params.V_ACCEPT_GBN);
        me.lookupReference('lc_jungakGbn').setExValue(params.V_JUNGAK_GBN);
        
        if(params.V_ACCEPT_GBN == 14 || params.V_ACCEPT_GBN == 12){
        	me.lookupReference('lc_jungakGbn').setHidden(true);
        }
        
        
        params.V_USE_YN = "T";
        console.log('params = ', params);
        
        setTimeout(function(){
       		me.callStore(me, 'ds_jungakGbn', '', params ,me.ds_jungakGbnCallback);
       	},50);
        
        setTimeout(function(){
    		me.lookupReference('p_light_no').setExValue(params.V_LIGHT_NO);
    		console.log('p_light_no = ', me.lookupReference('p_light_no').getExValue());
       	},550);
        
    },
    ds_jungakGbnCallback : function(me, success, form, action){
    	
    	
    	
    	me.getViewModel().getStore('ds_jungakKind').removeAll();
    	
    	
    	
    	var params = {
    		 V_ACCEPT_GBN :	action._params.V_ACCEPT_GBN
    		,V_JUNGAK_GBN :	action._params.V_JUNGAK_GBN
    		,V_JUNGAK_CD  :	action._params.V_JUNGAK_CD
    		,V_USE_N      : "T"
    	}
    	setTimeout(function(){
       		me.callStore(me, 'ds_jungakKind', '', params ,me.ds_jungakKindCallback);
       	},50);
    },
    ds_jungakKindCallback : function(me, success, form, action){
    	
    	var V_JUNGAK_CD = exCommon.getRepVal(action._params.V_JUNGAK_CD ,"");
    	
    	if(V_JUNGAK_CD == "" || V_JUNGAK_CD == " "){
    		V_JUNGAK_CD = me.getViewModel().getStore('ds_jungakKind').getAt(0).get("JUNGAK_CD");
    	}else{
    		console.log('ds_jungakKindCallback', V_JUNGAK_CD);
    	}
    	me.lookupReference('lc_jungakKind').setExValue(V_JUNGAK_CD);
    	
    	me.lookupReference('type_flag').setExValue('0');
    		
    	me.onSelect();
    },
    onSelectGbn : function(){
    	var me = this;
    	
    	if(me.lookupReference('type_flag').getExValue() =='1'){
    		return false;
    	}
    	
    	
    	var params = {
    		 V_ACCEPT_GBN : me.lookupReference('lc_acceptGbn').getExValue()
    		,V_USE_N      : "T"
    		,V_JUNGAK_CD  : ""
    		,V_JUNGAK_GBN : me.lookupReference('lc_jungakGbn').getExValue()
    	}
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_jungakGbn', '', params ,me.ds_jungakGbnCallback);
       	},50);
    	
    },
    onSelect : function(){
    	var me = this;
    	
    	//console.log('onSelect = ', me.lookupReference('type_flag').getExValue());
    	if(me.lookupReference('type_flag').getExValue() =='1'){
    		return false;
    	}
    	
    	var params = {
    		 V_ACCEPT_GBN  : me.lookupReference('lc_acceptGbn').getExValue()
    		,V_JUNGAK_CD   : me.lookupReference('lc_jungakKind').getExValue()
    	}
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_deung', '', params ,me.onSelectCallback);
       	},50);
    	
    },
    onSelectCallback : function(me, success, form, action){
    	var params = {
       		 V_ACCEPT_GBN  : me.lookupReference('lc_acceptGbn').getExValue()
       		,V_JUNGAK_CD   : me.lookupReference('lc_jungakKind').getExValue()
       	}
       	    	    
    	
    	
       	setTimeout(function(){
      		me.callStore(me, 'ds_building', '', params ,me.dsBuildCallback);
      	},50);
    	
    	
    	me.lookupReference('txt_sindo_jungak_nm').setExValue("" );
    	me.lookupReference('txt_sindo_light_no').setExValue( "");
    	me.lookupReference('txt_sindo_proposal_bud_no').setExValue( "" );
    	me.lookupReference('txt_sindo_bud_name').setExValue("" );
    	me.lookupReference('me_payment_amt').setExValue( "");
    	me.lookupReference('me_misu_amt').setExValue("" );
    	me.lookupReference('txt_sindo_crt_date').setExValue( "" );
    	me.lookupReference('txt_sindo_addr').setExValue( "" );
    },
    dsBuildCallback : function(me, success, form, action){
    	//console.log('dsBuildCallback');
    	
    	try{
    		var cols = me.getViewModel().getStore('ds_building').getAt(0).get("VER_LINE");
            var rows = me.getViewModel().getStore('ds_building').getAt(0).get("HOZ_LINE");
            
            console.log('cols * rows = ', cols  * rows);            
            
            
            console.log(me.getViewModel().getStore('ds_deung').getCount());
            
            var row = me.getViewModel().getStore('ds_deung').getCount();
            var tot = cols  * rows;
            
            if(row != tot){ 
            	var PRE_LIGHT_NO = '';
            	for(i=row-1; i>=0 ; i--){
            		var record   = me.getViewModel().getStore('ds_deung').getAt(i);
            		var LIGHT_NO =  record.get("LIGHT_NO");
            		
            		if(PRE_LIGHT_NO == LIGHT_NO){
            			me.getViewModel().getStore('ds_deung').removeAt(i);
            		}
            		PRE_LIGHT_NO = LIGHT_NO;
            	}
            	
            }// if row
            console.log(me.getViewModel().getStore('ds_deung').getCount());
            
            
            me.setGridData(cols, rows);
    	}catch (e) {
    		console.log('catch');
    		me.getViewModel().getStore('ds_crossLight').removeAll();
		}
    	
    },
    setGridData:function(cols, rows){
    	 var me = this;
         var grid = me.lookupReference('rec000p_03_a');
         if(grid.columnManager.columns != null){
             for(var i= grid.columnManager.columns.length-1; i> 0; i--){
                 grid.headerCt.remove(grid.columnManager.columns[i]);
             }
         }
         
         
         me.getViewModel().getStore('ds_crossLight').removeAll();
         for(var i=0; i< cols; i++){
             me.lookupReference('rec000p_03_a').headerCt.add({
            	 xtype      :'excolumn',
            	 dataIndex  :'LIGHT_NO' + i,
                 text       :(i+1),
                 exAlign    : 'center',
                 width      : 55,
                 renderer:function(value, meta, record,  rowIndex, colIndex){
                     
                	 if(record.get('BG_COLOR' + (colIndex-1)) == 'A'){  
                         meta.style='background-color:#FF6600 !important;';
                     }else if(record.get('BG_COLOR' + (colIndex-1))  == 'B'){
                         meta.style='background-color:#FFFFFF !important;';
                     }else if(record.get('BG_COLOR' + (colIndex-1))  == 'C'){
                         meta.style='background-color:#6699FF !important;';
                     }else if(record.get('BG_COLOR' + (colIndex-1))  == 'D'){
                         meta.style='background-color:#99CCFF !important;';
                     }else {
                         meta.style='background-color:#2BD768 !important;'; 
                     }
                     return value;
                 }
             });
         }
         // 레코드 & 설정치 중 최소값.
         
         
         var ds_size = me.getViewModel().getStore('ds_deung').data.length;
         
         var strRecord = '{';        
         for(var i=0; i< ds_size && i < (cols * rows); i++){
             var state = me.getViewModel().getStore('ds_deung').getAt(i).get("BG_COLOR");
             strRecord += '"LIGHT_NO' + (i % cols) + '":' + (i+1) + ', "BG_COLOR' + (i % cols) + '":"' + state + '", "cols":' + cols;
             if( (i != 0 && i % cols == cols-1 ) || i == ds_size -1 || i == (cols*rows)-1 || (cols == 1 && i==0 && rows != 0) ){
                 strRecord += '}';
                 me.getViewModel().getStore('ds_crossLight').add(Ext.decode(strRecord));
                 strRecord = '{';
             }
             else {
                 strRecord += ',';
             }
         }
         /*
         for(var i=me.downloadRecord.data.list.length; i< (cols * rows); i++){
             console.log('레코드 이외의 추가분');
             var state = '0';
             strRecord += '"num' + (i % cols) + '":' + (i+1) + ', "state' + (i % cols) + '":"' + state + '", "cols":' + cols;
             if( (i != me.downloadRecord.data.list.length && i % cols == cols-1 ) || i == (cols * rows) -1 ){
                 console.log('>>>>>', i);
                 // 데이터 넣기
                 strRecord += '}';
                 me.getViewModel().getStore('testInfo').add(Ext.decode(strRecord));
                 strRecord = '{';
             }
             else {
                 strRecord += ',';
             }
         }*/
    },
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    
    onCellClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        var V_LIGHT_NO = exCommon.getRepVal(record.get(clickedDataIndex), "")
        
        var BG_COLOR = record.get("BG_COLOR"+(cellIndex-1))
        
        
        if( !(BG_COLOR == "D" || BG_COLOR == "C")   ){
        	me.lookupReference('txt_sindo_jungak_nm').setExValue("" );
        	me.lookupReference('txt_sindo_light_no').setExValue( "");
        	me.lookupReference('txt_sindo_proposal_bud_no').setExValue( "" );
        	me.lookupReference('txt_sindo_bud_name').setExValue("" );
        	me.lookupReference('me_payment_amt').setExValue( "");
        	me.lookupReference('me_misu_amt').setExValue("" );
        	me.lookupReference('txt_sindo_crt_date').setExValue( "" );
        	me.lookupReference('txt_sindo_addr').setExValue( "" );
        	
        	return false;
        }
        
    	var params = {
    		 V_JUNGAK_CD  : me.lookupReference('lc_jungakKind').getExValue()
    		,V_ACCEPT_GBN : me.lookupReference('lc_acceptGbn').getExValue()
    		,V_LIGHT_NO   : V_LIGHT_NO
    	};
    	
        setTimeout(function(){
      		me.callStore(me, 'ds_sindoInfo', '', params ,me.dsSindoInfoCallback);
      	},50);
        
    },
    dsSindoInfoCallback : function(me, success, record, action){
    	
    	if(record == undefined || record == "" || record == null){
    		return false;
    	}
    	
    	me.lookupReference('txt_sindo_jungak_nm').setExValue( record[0].get("JUNGAK_NM") );
    	me.lookupReference('txt_sindo_light_no').setExValue( record[0].get("LIGHT_NO") );
    	me.lookupReference('txt_sindo_proposal_bud_no').setExValue( record[0].get("PROPOSAL_BUD_NO") );
    	me.lookupReference('txt_sindo_bud_name').setExValue( record[0].get("BUD_NAME") );
    	me.lookupReference('me_payment_amt').setExValue( record[0].get("PAYMENT_AMT") );
    	me.lookupReference('me_misu_amt').setExValue( record[0].get("MISU_AMT") );
    	me.lookupReference('txt_sindo_crt_date').setExValue( record[0].get("CRT_DATE") );
    	me.lookupReference('txt_sindo_addr').setExValue( record[0].get("ADDR") );
    },
    onCellDbClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        //console.log('onCellDbClick = ', record);
        
        var V_LIGHT_NO = exCommon.getRepVal(record.get(clickedDataIndex), "")
        var BG_COLOR = record.get("BG_COLOR"+(cellIndex-1))
        
    	if(BG_COLOR == "D" || BG_COLOR == "C" || BG_COLOR == "E"){
    		exCommon.msgAlert("사용중인 등번호입니다.");
    		return false;
    	}
        
        if(BG_COLOR == "A" || BG_COLOR == "A"){
    		exCommon.msgAlert("선택하신 등번호는 사용할수 없습니다.");
    		return false;
    	}
        
        var params = {
       		 JUNGAK_CD      : me.lookupReference('lc_jungakKind').getExValue()
       		,ACCEPT_GBN     : me.lookupReference('lc_acceptGbn').getExValue()
       		,JUNGAK_NM      : me.lookupReference('lc_jungakKind').getRawValue()
       		,LIGHT_NO       : V_LIGHT_NO
       		,JUNGAK_GBN     : me.lookupReference('lc_jungakGbn').getExValue()
       		,RESERVATION_YN : "T"
       	};
        
        setTimeout(function(){
      		me.callStore(me, 'ds_reservation', '', params ,me.dsReservCallback);
      	},50);
        
        
    },
    dsReservCallback : function(me, success, record, action){
    	//console.log('action = ', action);
    	me.receiveTo(action._params , true);
    },
    onGridClick:function(record, data, index, rowIndex, eOpts){
    	
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	/*console.log('data = ', data);
    	console.log('eOpts= ', eOpts);
    	console.log('eOpts.position.colIdx = ', eOpts.position.colIdx);
    	console.log('eOpts.position.rowIdx = ', eOpts.position.rowIdx);*/
    	
    	var dataIndex = eOpts.position.colIdx -1;
    	
    	
    	var light_no = data.get("LIGHT_NO"+dataIndex);
    	var bgVal    = data.get("BG_COLOR"+dataIndex);
    	
    	console.log('light_no = ', light_no);
    	console.log('bgVal = ', bgVal);
    	
    	if ( bgVal == 'C'  ||  bgVal == 'D'){
    		var params = {
	    		 V_JUNGAK_CD    : me.lookupReference('lc_jungakKind').getExValue()
	    		,V_ACCEPT_GBN   : me.lookupReference('lc_acceptGbn').getExValue()
	    		,V_LIGHT_NO     : light_no
	    		,LIGHT_NO 		: light_no
        		,BG_COLOR 		: bgVal
        		,JUNGAK_CD      : me.lookupReference('lc_jungakKind').getExValue()
           		,ACCEPT_GBN     : me.lookupReference('lc_acceptGbn').getExValue()
           		,JUNGAK_NM      : me.lookupReference('lc_jungakKind').getRawValue()
           		,JUNGAK_GBN     : me.lookupReference('lc_jungakGbn').getExValue()           		
	    	};
    		
	        setTimeout(function(){
	      		me.callStore(me, 'ds_sindoInfo', '', params ,me.dsSindoInfoCallbackMouse);
	      	},5);
    		
    		
    	}else{
    		var UPT_USER =  me.getViewModel().getStore('ds_deung').getAt(light_no-1).get("UPT_USER");
        	var LIGHT_NO =  me.getViewModel().getStore('ds_deung').getAt(light_no-1).get("LIGHT_NO"); 
        	
        	if( exCommon.user.userId !=  UPT_USER  && bgVal == "E"){
        		exCommon.msgAlert("선택하신 등번호를 취소할수 없습니다.");
        		return false;
        	}
        	
        	var params = {
        		 LIGHT_NO 		: light_no
        		,BG_COLOR 		: bgVal
        		,JUNGAK_CD      : me.lookupReference('lc_jungakKind').getExValue()
           		,ACCEPT_GBN     : me.lookupReference('lc_acceptGbn').getExValue()
           		,JUNGAK_NM      : me.lookupReference('lc_jungakKind').getRawValue()
           		,JUNGAK_GBN     : me.lookupReference('lc_jungakGbn').getExValue()
           		,PERIOD         : 0
        	}
        	me.openPopup('ExFrm.view.rec.rec000p_03_mouse',  params , me.onReceivePopup);
    	}
    },
    //
    dsSindoInfoCallbackMouse : function(me, success, record, action){
    	
    	me.lookupReference('txt_sindo_jungak_nm').setExValue( record[0].get("JUNGAK_NM") );
    	me.lookupReference('txt_sindo_light_no').setExValue( record[0].get("LIGHT_NO") );
    	me.lookupReference('txt_sindo_proposal_bud_no').setExValue( record[0].get("PROPOSAL_BUD_NO") );
    	me.lookupReference('txt_sindo_bud_name').setExValue( record[0].get("BUD_NAME") );
    	me.lookupReference('me_payment_amt').setExValue( record[0].get("PAYMENT_AMT") );
    	me.lookupReference('me_misu_amt').setExValue( record[0].get("MISU_AMT") );
    	me.lookupReference('txt_sindo_crt_date').setExValue( record[0].get("CRT_DATE") );
    	me.lookupReference('txt_sindo_addr').setExValue( record[0].get("ADDR") );
    	
    	action._params.V_ACCEPT_SEQ = record[0].get("ACCEPT_SEQ");
    	action._params.SEQ          = record[0].get("SEQ");
    	action._params.PERIOD       = record[0].get("PERIOD");
    	
    	me.openPopup('ExFrm.view.rec.rec000p_03_mouse',  action._params , me.onReceivePopup);
    	
    },
    onReceivePopup:function(params, me){
        //console.log('onReceived',params);
        
        var RESERVATION_YN = exCommon.getRepVal(params.RESERVATION_YN);
        if(RESERVATION_YN == "F"){
        	console.log("onReceivePopup  = ",RESERVATION_YN);
        	var parmas = {
        		RESERVATION_YN : "F"
        	}
        	me.receiveTo(parmas , true);
        }else{
        	//console.log("onReceivePopup  = else ");
        	me.onSelect();
        }
        //me.lookupReference('targetInput').setValue(params.custName);
    },
})