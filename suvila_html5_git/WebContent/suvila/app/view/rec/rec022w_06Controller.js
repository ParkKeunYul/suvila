Ext.define('ExFrm.view.rec.rec022w_06Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec022w_06',
    onDestroy : function() {
    },
    onAfterRender:function(){
    	var me = this;
    	
   
    	me.inDeungReload( me 
						 ,'12'
						 ,me.lookupReference('jungakGbn').getValue().jungakGbn
						 ,'start');
    	
    },
    onJungakChange : function(field, newValue, oldValue, options) {
    	var me = this;
   	
    	me.inDeungReload( me 
    					 ,'12'
    					 ,newValue.jungakGbn );
    },
    inDeungReload : function(me ,V_ACCEPT_GBN  , V_JUNGAK_GBN , start){
    	
    	var params = {
      		 V_ACCEPT_GBN  : V_ACCEPT_GBN
      		,V_JUNGAK_GBN  : V_JUNGAK_GBN
      		,V_START       : start
      	}
      	
    	me.resetGridData(me);
    	
      	setTimeout(function(){
  			me.callStore(me, 'ds_jungak', '', params ,me.dsJungakCallback); 
  		},50);
    },
    dsJungakCallback : function(me, success, form, action){
    	me.lookupReference('mg_jungak').getView().select(0);
    	
    	
    	if( action._params.V_START == 'start' ){
    		console.log('load deung');
    		setTimeout(function(){
      			me.callStore(me, 'ds_grade', '', action._params ,me.dsGradCallback); 
      		},50);
    	}
    	
    },
    dsGradCallback : function(me, success, form, action){
    	me.lookupReference('mg_grade').getView().select(0);
    },
    onDeungSelectBtn : function(){
    	var me  = this;
    	
    	var params = {
    		V_ACCEPT_GBN  : '12'
    	}
    	
    	setTimeout(function(){
  			me.callStore(me, 'ds_grade', '', params ,me.dsGradCallback); 
  		},50);
    },
    onDeungAddBtn : function(){
    	var me = this;
    	
    	var flag = me.inDeungValidation(me);
    	
    	if(!flag) return false;
    
    	var row = me.getViewModel().getStore('ds_grade').getCount();
    	
    	var data = {
    		 SQL_MODE   : 'I'
    		,ACCEPT_GBN : '12'
    		,JUNGAK_GBN : me.lookupReference('jungakGbn').getValue().jungakGbn
    		,LIGHT_CODE : ""
    		,TEMPLE_CD  : exCommon.user.templeCd
    		,SORT_SEQ   : row + 1
    		,USE_YN     : "true"
    		,PERIOD     : 0
    		,REMARK     : ""
    		,AMOUNT     : 0
    	}
    	
    	//console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_grade').add(data);
    	me.lookupReference('mg_grade').getView().select(row);
    	me.lookupReference('mg_grade').plugins[0].startEditByPosition({
            row    : row,
            column : 1
        });    	
    },
    inDeungValidation : function(me){
    	var row = me.getViewModel().getStore('ds_grade').getCount();
    	
    	for(var i = 0; i < row; i++){
    		var record = me.getViewModel().getStore('ds_grade').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_grade' , 'mg_grade', "LIGHT_NM"  , "등급명" ) ){
    			//console.log('1111');
    			return false;
    		}
    		
    		var JUNGAK_NM = exCommon.getRepVal(record.get("LIGHT_NM"), "");
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_grade').getAt(j);
    			var SUB_JUNGAK_NM =  exCommon.getRepVal( sub_record.get("LIGHT_NM") );
    			
    			if(JUNGAK_NM == SUB_JUNGAK_NM && i != j){
    				me.lookupReference('mg_grade').getView().select(j);
					exCommon.msgAlert('등급명이 중복되었습니다. 중복된 등급명을 수정하세요.');
					return false;
    			}
    		}// for
    		
    		
    	}// for
    	return true;
    },
    onDeungSaveBtn : function(){
    	var me = this;
    	
    	var count = exCommon.ChangeCount('ds_grade' , me);
    	
    	if(count  == 0){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
    		return false;
    	}// if
    	

    	var flag = me.inDeungValidation(me);
    	
    	if(!flag) return false;
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_grade'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC001W_07/GradeSave.suvila'
    		,me.onDeungSaveBtnnCallback
    	);
    },
    onDeungSaveBtnnCallback : function(me, success, form, action){
    	//console.log('onJungakSaveBtnCallback = ', success);
    	exCommon.fnGridSaveCallback(
    		 me
    		,success
    		,action
    		,'ds_grade'
    	);
    	if(success){
    		
    	}
    },
    onCellDbClickDeung : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me = this;
    	
    	var clickedDataIndex = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue = record.get(clickedDataIndex);
        
        
    	var OLD_YN = record.get("OLD_YN");
    	
    	if( OLD_YN != "T" && clickedDataIndex == "ACCNAME"){
    		var ACCT_GBN = record.get("ACCT_GBN");
        	var IE_GBN   = record.get("IE_GBN");
        	var KWAN     = record.get("KWAN");
        	var MOK      = record.get("MOK");
        	var HANG     = record.get("HANG");
        	var MOK_NAME = record.get("ACCNAME");
        	
        	
        	var params  =  {
        		 ACCT_GBN  : ACCT_GBN    		 
        		,IE_GBN    : IE_GBN
        		,KWAN      : KWAN
        		,MOK       : MOK
        		,HANG      : HANG
        		,MOK_NAME  : MOK_NAME
        	}
        	this.openPopup('ExFrm.view.com.accounts',  params, this.onCellDbClickDeungReceive);
    	}else{
    		return false;
    	}
    },
    checkGradeYn : function(the, rowIndex, checked, eOpts) {
    	var me  = this;
    	
    	var record = me.getViewModel().getStore('ds_grade').getAt(rowIndex);
    	
    	var SQL_MODE = exCommon.getRepVal(record.get("SQL_MODE"),"");
    	if(SQL_MODE != 'I'){
    		return false;
    	}
    },
    onCellDbClickDeungReceive : function(params, me){
    	console.log('onCellDbClickDeungReceive', params);
    	
    	var selectedRecord = me.lookupReference('mg_grade').getView().getSelectionModel().getSelection()[0];
    	
    	selectedRecord.set("ACCT_GBN" , params.ACCT_GBN);
    	selectedRecord.set("IE_GBN"   , params.IE_GBN);
    	selectedRecord.set("KWAN"     , params.KWAN);
    	selectedRecord.set("HANG"     , params.HANG);
    	selectedRecord.set("MOK"      , params.MOK);
    	selectedRecord.set("ACCNAME"  , params.MOK_NAME);
    },
    onSelectionJungak : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	console.log('onSelectionJungak');
    	
    	try{
    		
    		me.lookupReference('me_verti').setExValue( 0 );
            me.lookupReference('me_horiz').setExValue( 0 );
            me.lookupReference('txt_jungak_nm').setExValue( "" );
            
    		if(record.length <=  0){
    			return;
    		}
    		var JUNGAK_CD = exCommon.getRepVal(record[0].get("JUNGAK_CD") , "");
    		var JUNGAK_NM = exCommon.getRepVal(record[0].get("JUNGAK_NM") , "");
    		
    		
    		if(JUNGAK_CD != ""){
    			
    			me.lookupReference('txt_jungak_nm').setExValue( JUNGAK_NM );
    			
    			var params = {
    				 V_JUNGAK_CD  : record[0].get("JUNGAK_CD")
	       			,V_JUNGAK_GBN : record[0].get("JUNGAK_GBN")
	       			,V_ACCEPT_GBN : record[0].get("ACCEPT_GBN")
	       		}
	       		
	       		setTimeout(function(){
	       			me.callStore(me, 'ds_building', '', params ,me.dsBuildCallback);
	           	},50);
    		}else{
    			//	me.getViewModel().getStore('ds_jungak').removeAll();
    		}
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsBuildCallback : function(me, success, form, action){
    	console.log('onDsDeungkCallback = ', success);
    	
    	var row = me.getViewModel().getStore('ds_building').getCount();
    	
    	console.log('<-----> dsBuildCallback row= ', row);
    	
    	if( row != 0 ){
    		var cols = me.getViewModel().getStore('ds_building').getAt(0).get("VER_LINE");
            var rows = me.getViewModel().getStore('ds_building').getAt(0).get("HOZ_LINE");
                        
            me.lookupReference('me_verti').setExValue( cols );
            me.lookupReference('me_horiz').setExValue( rows );
    		
    		setTimeout(function(){
           		me.callStore(me, 'ds_deung', '', action._params ,me.onDsDeungkCallback);
           	},50);
    		
    	}else{
    		me.resetGridData(me);
    	}
    	
    },
    onDsDeungkCallback : function(me, success, form, action){
    	console.log('onDsDeungkCallback = ', me.getViewModel().getStore('ds_deung').getCount() );
    	
    	var cols = me.getViewModel().getStore('ds_building').getAt(0).get("VER_LINE");
        var rows = me.getViewModel().getStore('ds_building').getAt(0).get("HOZ_LINE");
        
        console.log('onDsDeungkCallback cols = ', cols);
        console.log('onDsDeungkCallback rows = ', rows);
        
        me.setGridData(cols, rows);
        
        me.inSindoInfo(1);
    },
    resetGridData : function(me){
    	me.getViewModel().getStore('ds_deung').removeAll();
    	me.getViewModel().getStore('ds_crossLight').removeAll();
    	
    	me.lookupReference('rec000p_03_a').headerCt.removeAll();
    	me.lookupReference('rec000p_03_a').headerCt.add({
    		text  :'행/열',
            xtype :'rownumberer',
            width : 70,
            align : 'center',
    	});
    	
    	me.lookupReference('txt_sindo_jungak_nm').setExValue( ""  );
		me.lookupReference('txt_sindo_light_no').setExValue( ""  );
		me.lookupReference('txt_sindo_proposal_bud_no').setExValue( ""  );
		me.lookupReference('txt_sindo_bud_name').setExValue( "" );
		me.lookupReference('txt_sindo_chuk_name').setExValue( "" );
		me.lookupReference('me_payment_amt').setExValue( "" );
		me.lookupReference('me_misu_amt').setExValue( "" );
		me.lookupReference('txt_sindo_crt_date').setExValue( ""  );
		me.lookupReference('txt_sindo_addr').setExValue( "" );
    	
    },
    setGridData:function(cols, rows){
    	
    	console.log('setGridData cols= ', cols);
    	console.log('setGridData rows= ', rows);
    	
   	 	var me = this;
        var grid = me.lookupReference('rec000p_03_a');
        if(grid.columnManager.columns != null){
            for(var i= grid.columnManager.columns.length-1; i> 0; i--){
                grid.headerCt.remove(grid.columnManager.columns[i]);
            }//for
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
                
           	 if(record.get('BG_COLOR' + (colIndex-1)) == 'A'){  // 컬럼이 하나 있으므로
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
        }// for
        //
        
        
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
   },
    onJungakSelectBtn : function(){
    	var me = this;
    	
    	me.inDeungReload( me 
						 ,me.lookupReference('rdo_ApprovalGbn').getValue().rdo_ApprovalGbn
						 ,me.lookupReference('jungakGbn').getValue().jungakGbn );
    },
    onJungakAddBtn : function(){
    	var me  = this;
    	
    	var flag = me.inJungakValidation(me);
    	
    	if(!flag) return false;
    
    	var row = me.getViewModel().getStore('ds_jungak').getCount();
    	
    	var data = {
    		 SQL_MODE   : 'I'
    		,ACCEPT_GBN : '12'
    		,JUNGAK_GBN : me.lookupReference('jungakGbn').getValue().jungakGbn
    		,JUNGAK_CD  : ""
    		,TEMPLE_CD  : exCommon.user.templeCd
    		,SORT_SEQ   : row + 1
    		,USE_YN     : "true"
    		,REMARK     : ""
    	}
    	
    	console.log('data = ', data);
    	
    	me.getViewModel().getStore('ds_jungak').add(data);
    	me.lookupReference('mg_jungak').getView().select(row);
    	me.lookupReference('mg_jungak').plugins[0].startEditByPosition({
            row    : row,
            column : 1
        });
    	
    },
    inJungakValidation : function(me){
    	var row = me.getViewModel().getStore('ds_jungak').getCount();
    	
    	for(var i = 0; i < row; i++){
    		var record = me.getViewModel().getStore('ds_jungak').getAt(i);
    		
    		if( !exCommon.gridFormVal(me, i ,'ds_jungak' , 'mg_jungak', "JUNGAK_NM"  , "전각명" ) ){
    			//console.log('1111');
    			return false;
    		}
    		
    		var JUNGAK_NM = exCommon.getRepVal(record.get("JUNGAK_NM"), "");
    		
    		for( var j = 0; j< row ; j++ ){
    			var sub_record  = me.getViewModel().getStore('ds_jungak').getAt(j);
    			var SUB_JUNGAK_NM =  exCommon.getRepVal( sub_record.get("JUNGAK_NM") );
    			
    			if(JUNGAK_NM == SUB_JUNGAK_NM && i != j){
    				me.lookupReference('mg_jungak').getView().select(j);
					exCommon.msgAlert('전각명이 중복되었습니다. 중복된 전각명을 수정하세요.');
					return false;
    			}
    		}// for
    		
    		
    	}// for
    	return true;
    },
    onJungakSaveBtn : function(){
    	var me = this;
    	
    	var count = exCommon.ChangeCount('ds_jungak' , me);
    	
    	if(count  == 0){
    		exCommon.msgAlert('변경된 자료가 없습니다.');
    		return false;
    	}// if
    	

    	var flag = me.inJungakValidation(me);
    	
    	if(!flag) return false;
    	
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_jungak'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/rec/REC001W_07/JungakSave.suvila'
    		,me.onJungakSaveBtnCallback
    	);
    },
    onJungakSaveBtnCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(
    		 me
    		,success
    		,action
    		,'ds_jungak'
    	);
    	if(success){
    		me.inDeungReload( 
    			me 
    		   ,'12'
			   ,me.lookupReference('jungakGbn').getValue().jungakGbn 
			);
    	}
    },
    inSindoInfo : function(sindo_light_no){
    	var me = this;
    	
    	var selection = me.lookupReference('mg_jungak').getView().getSelectionModel().getSelection()[0];
    	var params = {
    		 V_JUNGAK_CD  : selection.get("JUNGAK_CD")
    		,V_ACCEPT_GBN : selection.get("ACCEPT_GBN")
    		,V_LIGHT_NO   : sindo_light_no
    	};
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_sindoInfo', '', params ,me.inSindoInfoCallback);
       	},50);
    },
    inSindoInfoCallback : function(me, success, form, action){
    	
    	if(me.getViewModel().getStore('ds_sindoInfo').getCount() != 0){
    		me.lookupReference('txt_sindo_jungak_nm').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("JUNGAK_NM")  );
    		me.lookupReference('txt_sindo_light_no').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("LIGHT_NO")  );
    		me.lookupReference('txt_sindo_proposal_bud_no').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("PROPOSAL_BUD_NO")  );
    		me.lookupReference('txt_sindo_bud_name').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("BUD_NAME")  );
    		me.lookupReference('txt_sindo_chuk_name').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("CHUK_NAME")  );
    		me.lookupReference('me_payment_amt').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("PAYMENT_AMT")  );
    		me.lookupReference('me_misu_amt').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("MISU_AMT")  );
    		me.lookupReference('txt_sindo_crt_date').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("CRT_DATE")  );
    		me.lookupReference('txt_sindo_addr').setExValue( me.getViewModel().getStore('ds_sindoInfo').getAt(0).get("ADDR")  );
    	}else{
    		me.lookupReference('txt_sindo_jungak_nm').setExValue( ""  );
    		me.lookupReference('txt_sindo_light_no').setExValue( ""  );
    		me.lookupReference('txt_sindo_proposal_bud_no').setExValue( ""  );
    		me.lookupReference('txt_sindo_bud_name').setExValue( "" );
    		me.lookupReference('txt_sindo_chuk_name').setExValue( "" );
    		me.lookupReference('me_payment_amt').setExValue( "" );
    		me.lookupReference('me_misu_amt').setExValue( "" );
    		me.lookupReference('txt_sindo_crt_date').setExValue( "" );
    		me.lookupReference('txt_sindo_addr').setExValue( "" );
    	}
    },
    onLightClick : function(view, cell, cellIndex, record,row, rowIndex, e) {
    	var me  = this;
    	
    	var clickedDataIndex  = view.panel.headerCt.getHeaderAtIndex(cellIndex).dataIndex;
        var clickedColumnName = view.panel.headerCt.getHeaderAtIndex(cellIndex).text;
        var clickedCellValue  = record.get(clickedDataIndex);
        
        var V_LIGHT_NO = exCommon.getRepVal(record.get(clickedDataIndex), "")
        
        me.inSindoInfo(V_LIGHT_NO);
        
    },
    onExec : function (){
    	var me  = this;
    	
    	var cnt = me.getViewModel().getStore('ds_jungak').getCount();
    	
    	if(cnt < 1){
    		exCommon.msgAlert("전각이 없는 등은 생성될 수 없습니다.");
    		return false;
    	}
    	
    	
    	var flag = exCommon.ChangeCount('ds_jungak', me);
    	if(flag >= 1){
    		exCommon.msgAlert("신규 전각  데이터가 있습니다. 먼저 저장해 주세요");
    		return false;
    	}
    	
    	var cols = 0;
    	var rows = 0;
    	try{
    		cols = me.getViewModel().getStore('ds_building').getAt(0).get("VER_LINE");
            rows = me.getViewModel().getStore('ds_building').getAt(0).get("HOZ_LINE");
    	}catch (e) {}
    	
        var verti = me.lookupReference('me_verti').getExValue( );
        var horiz = me.lookupReference('me_horiz').getExValue( );
        
        if ( verti == 0 ){
  			 exCommon.msgAlert("열갯수는 0(영)이 될수 없습니다.");
  			 me.lookupReference('me_verti').focus();
  			 return false;
		}
		
		if ( horiz == 0 ){
  			 exCommon.msgAlert("행갯수는 0(영)이 될수 없습니다.");
  			 me.lookupReference('me_horiz').focus();
  			 return false;
		}
        
        
    	if(cols != verti || rows != horiz ){
    		
    		
    		if ( verti > 99 ){
	   			 exCommon.msgAlert("열갯수는 99열까지만 가능합니다.");
	   			 me.lookupReference('me_verti').focus();
	   			 return false;
    		}
    		
    		if ( horiz > 1000 ){
    			 exCommon.msgAlert("행갯수는 1000행 까지만 가능합니다.");
	   			 me.lookupReference('me_horiz').focus();
	   			 return false;
    		}
    		
    		var num = verti * horiz;
    		var Deng_Cnt = me.getViewModel().getStore('ds_deung').getCount();
    		
    		var flag ="";
    		if ( num > Deng_Cnt ) {
				 flag = "P";
    		}else{
    			if ( ! me.inCreateCheck(me, num) ) return;
    			 flag = "M";
    		}
    		
    		
    		var jungakSelection = me.lookupReference('mg_jungak').getView().getSelectionModel().getSelection()[0];
    		var JUNGAK_NM       = jungakSelection.get("JUNGAK_NM");
    		var V_ACCEPT_GBN    = jungakSelection.get("ACCEPT_GBN");
    		var V_JUNGAK_CD     = jungakSelection.get("JUNGAK_CD");
    		
    		// 겟주정보
    		var buildCnt = me.getViewModel().getStore('ds_building').getCount();

    		if(buildCnt == 0){ // 신규
    			var data = {
    				 HOZ_LINE   : horiz
    				,VER_LINE   : verti
    				,USE_YN     : 'T'
    				,ACCEPT_GBN : V_ACCEPT_GBN
    				,JUNGAK_CD  : V_JUNGAK_CD
    				,TEMPLE_CD  : exCommon.user.templeCd
    				,FLAG       : flag
    				,NUM        : num
    				,SQL_MODE   : 'I'
    			};
    			
    			me.getViewModel().getStore('ds_building').add(data);
    			
    		}else{ // 수정
    			me.getViewModel().getStore('ds_building').getAt(0).set("HOZ_LINE" , horiz);
    			me.getViewModel().getStore('ds_building').getAt(0).set("VER_LINE" , verti);
    			me.getViewModel().getStore('ds_building').getAt(0).set("FLAG"     , flag);
    			me.getViewModel().getStore('ds_building').getAt(0).set("NUM"      , num);
    			me.getViewModel().getStore('ds_building').getAt(0).set("USE_YN"   , 'T');
    			me.getViewModel().getStore('ds_building').getAt(0).set("SQL_MODE" , 'U');
    		}
    		
    		console.log('ds_building = ', me.getViewModel().getStore('ds_building').getAt(0));
    		
    		
    		var msg   = "전각명 : "+JUNGAK_NM + " " + verti + "열 " + horiz + "행" + " 등번호를 생성하시겠습니까?<br>자료 성공 후 다소 시간이 걸릴수 있습니다.";
    		
    		exCommon.fnGridSaveAll(
    			 me
    			,'ds_building'
    			,'newData'
    			,'uptData'
    			,'delData'
    			,'/rec/REC001W_07/Deung_proc.suvila'
    			,me.onExecCallback
    			,false
    			,msg
    		);
    	}
    },
    onExecCallback : function(me, success, form, action){
    	console.log('onExecCallback = ', success);
    	
    	var selectionRecord = me.lookupReference('mg_jungak').getView().getSelectionModel().getSelection()[0];
		
		var params = {
			 V_JUNGAK_CD  : selectionRecord.get("JUNGAK_CD")
   			,V_JUNGAK_GBN : selectionRecord.get("JUNGAK_GBN")
   			,V_ACCEPT_GBN : selectionRecord.get("ACCEPT_GBN")
   		}
    	
    	if(success){
    		setTimeout(function(){
    			me.callStore(me, 'ds_building', '', params ,me.dsBuildCallback);
           	},50);
    	}else{
       		setTimeout(function(){
       			me.callStore(me, 'ds_building', '', params , null);
           	},50);
    	}
    	
    },
    inCreateCheck : function(me ,Cnt){
    	
    	var k   = 0;
    	var row = me.getViewModel().getStore('ds_deung').getCount();
    	
    	/*-- 등번호 배열 --*/
    	var light_no_array = new Array();
    	
    	for(var i = Cnt; i< row ; i++){
    		var flag = me.getViewModel().getStore('ds_deung').getAt(i).get("BG_COLOR");
    		
    		
    		if ( flag == "E" || flag == "C" || flag == "D") {
    			var LIGHT_NO = me.getViewModel().getStore('ds_deung').getAt(i).get("LIGHT_NO");
    			light_no_array[k] = LIGHT_NO;
        		k++;
    		}
    		
    		
    	}// for
    	
    	if ( k > 0 ) {
    		exCommon.msgAlert("등번호 "+Cnt+"보다 큰 등번호로 사용 or 미수  or  예약이 존재합니다.<br>등번호를 소등처리 하셔야 등번호가 생성됩니다.");
    		return false;
    	}
    	
    	return true;
    },
    onMoving : function(){
    	var me = this;

    	
    	/*-- 등번호 배열 --*/
    	var light_no_array = new Array();
    	var k = 0;
    	
    	var row = me.getViewModel().getStore('ds_deung').getCount();

    	
    	var find_user_nm =  exCommon.getRepVal(me.lookupReference('txt_find_user_nm').getValue(), "");
    	
    	if(find_user_nm == "" || find_user_nm == null || find_user_nm == undefined){
    		return;
    	}
    	
    	
    	for(var i = 0 ; i< row ; i++ ){
    		var record = me.getViewModel().getStore('ds_deung').getAt(i)
    		
    		
    		var BUD_NAME = exCommon.getRepVal(record.get("BUD_NAME"),"");
    		var LIGHT_NO = exCommon.getRepVal(record.get("LIGHT_NO"),"");
    		
    		if(find_user_nm == BUD_NAME){
    			light_no_array[k] = LIGHT_NO;
			    k++;
    		}
    	}// for
    	
    	console.log('light_no_array = ', light_no_array);
    	
    	if(k == 0){
    		exCommon.msgAlert(find_user_nm + " 신도로 검색된 등번호가 없습니다.");
    	}else{
    		exCommon.msgAlert(find_user_nm + " 신도로 검색된 등번호는 [" + light_no_array + "]번입니다.");
    	}
    	
    },
    onMovingEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onMoving();
    	}
    },
    onCrossLineClick:function(record, data, index, rowIndex, eOpts){
    	var me  = this;
    	
    	eOpts.preventDefault();
    	eOpts.cancelBubble = true;
    	
    	
    	var dataIndex = eOpts.position.colIdx -1;
    	
    	var light_no = data.get("LIGHT_NO"+dataIndex);
    	var bgVal    = data.get("BG_COLOR"+dataIndex);
    	
    	
    	console.log('light_no = ', light_no);
    	console.log('bgVal = ', bgVal);
    	
    	var selectionRecord = me.lookupReference('mg_jungak').getView().getSelectionModel().getSelection()[0];
		
    	console.log('selectionRecord = ', selectionRecord);
		
		
		if ( bgVal == 'C'  ||  bgVal == 'D'){
    		var params = {
	    		 V_JUNGAK_CD    : selectionRecord.get("JUNGAK_CD")
	    		,V_ACCEPT_GBN   : selectionRecord.get("ACCEPT_GBN")
	    		,V_LIGHT_NO     : light_no
	    		,LIGHT_NO 		: light_no
        		,BG_COLOR 		: bgVal
        		,JUNGAK_CD      : selectionRecord.get("JUNGAK_CD")
           		,ACCEPT_GBN     : selectionRecord.get("ACCEPT_GBN")
           		,JUNGAK_NM      : selectionRecord.get("JUNGAK_NM")
           		,JUNGAK_GBN     : selectionRecord.get("JUNGAK_GBN")           		
	    	};
    		
	        setTimeout(function(){
	      		me.callStore(me, 'ds_sindoInfoMouse', '', params ,me.dsSindoInfoCallbackMouse);
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
          		,JUNGAK_CD      : selectionRecord.get("JUNGAK_CD")
         		,ACCEPT_GBN     : selectionRecord.get("ACCEPT_GBN")
         		,JUNGAK_NM      : selectionRecord.get("JUNGAK_NM")
         		,JUNGAK_GBN     : selectionRecord.get("JUNGAK_GBN")
         		,PERIOD         : 0
          	}
          	me.openPopup('ExFrm.view.rec.rec000p_03_mouse',  params , me.onReceivePopup);
    	}
		
    },
    onReceivePopup:function(params, me){
    	var selectionRecord = me.lookupReference('mg_jungak').getView().getSelectionModel().getSelection()[0];
		
		var params = {
			 V_JUNGAK_CD  : selectionRecord.get("JUNGAK_CD")
   			,V_JUNGAK_GBN : selectionRecord.get("JUNGAK_GBN")
   			,V_ACCEPT_GBN : selectionRecord.get("ACCEPT_GBN")
   		};
		
		setTimeout(function(){
			me.callStore(me, 'ds_building', '', params ,me.dsBuildCallback);
       	},50);
    },
    dsSindoInfoCallbackMouse : function(me, success, record, action){
    	
    	console.log('record[0] = ', record[0]);
    	
    	action._params.V_ACCEPT_SEQ = record[0].get("ACCEPT_SEQ");
    	action._params.SEQ          = record[0].get("SEQ");
    	action._params.PERIOD       = record[0].get("PERIOD");
    	
    	me.openPopup('ExFrm.view.rec.rec000p_03_mouse',  action._params , me.onReceivePopup);
    	
    },
   
    
})
