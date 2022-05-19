Ext.define('ExFrm.view.asp.asp008w_02Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp008w_02',    
    onCalled:function(params){
    },
    onInit:function(me){
    	
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	var params = {
    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
       		,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
       	};
       	setTimeout(function(){
       		me.callStore(me, 'ds_kwan', '', params, me.onSelectCallback);    		
       	},300);
    },
    onKhmChange : function(){
    	var me  = this;
    	
    	var params = {
    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
       		,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
       	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_kwan', '', params, me.onSelectCallback);
    	},10);
    },    
    onSelectCallback : function (me, success, records, operation){
    	console.log('onSelectCallback', success + " : "+ records.length);
    	
    	if(success && records.length > 0){
    		setTimeout(function(){
    			me.lookupReference('asp008w_02_a').getView().select(0);
    		},10);	
    	}
    	
    },
    dsHangCallback : function (me, success, records, operation){
    	if(success && records.length > 0){
    		setTimeout(function(){
    			me.lookupReference('asp008w_02_b').getView().select(0);
    		},10);
    	}
    },
    dsMoKCallback : function (me, success, records, operation){
    	if(success && records.length > 0){
    		setTimeout(function(){
    			me.lookupReference('asp008w_02_c').getView().select(0);
    		},10);
    	}
    },
    onSelectionChangeKwan : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	console.log( 'onSelectionChangeKwan', record[0]);
    	/*ds_kwan_detail.ClearData();
    	ds_hang.ClearData();
    	ds_hang_detail.ClearData();
    	ds_mok.ClearData();
    	ds_mok_detail.ClearData();
    	ds_mok_use.ClearData();*/
    	
    	me.getViewModel().getStore('ds_kwan_detail').removeAll();
    	me.getViewModel().getStore('ds_hang').removeAll();
    	me.getViewModel().getStore('ds_hang_detail').removeAll();
    	me.getViewModel().getStore('ds_mok').removeAll();
    	me.getViewModel().getStore('ds_mok_detail').removeAll();
    	me.getViewModel().getStore('ds_mok_use').removeAll();
    	
    	if(record.length > 0){
    		var params = {
	    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
	    		,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
	    		,V_KWAN     : record[0].get("KWAN")
	    	};
	    	
    		setTimeout(function(){
    			me.callStore(me, 'ds_kwan_detail', '', params, null);
    		},10);
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_hang', '', params, me.dsHangCallback);
    		},10);
	    	
    	        	
    	}
    },
    onSelectionChangeHang : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	/*ds_hang_detail.ClearData();
    	ds_mok.ClearData();
    	ds_mok_detail.ClearData();
    	ds_mok_use.ClearData();*/
    	
    	me.getViewModel().getStore('ds_hang_detail').removeAll();
    	me.getViewModel().getStore('ds_mok').removeAll();
    	me.getViewModel().getStore('ds_mok_detail').removeAll();
    	me.getViewModel().getStore('ds_mok_use').removeAll();
    	
    	if(record.length > 0){
    		var params ={
	    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
	    	    ,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
	    	    ,V_KWAN     : encodeURI(record[0].get("KWAN"))	
	    	    ,V_HANG     : encodeURI(record[0].get("HANG"))
	    	    ,V_HANG_NM  : encodeURI(record[0].get("HANG_NAME"))
	    	};
    		setTimeout(function(){
    			me.callStore(me, 'ds_hang_detail', '', params, null);
    		},10);
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_mok', '', params, me.dsMoKCallback);
    		},10);
	    	
	    	
    	}
    },
    onSelectionChangeMok : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	if(record.length > 0){
    		me.getViewModel().getStore('ds_mok_detail').removeAll();
        	me.getViewModel().getStore('ds_mok_use').removeAll();
    		var params ={
   	    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
   	    	    ,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
   	    	    ,V_KWAN     : encodeURI(record[0].get("KWAN"))	
   	    	    ,V_HANG     : encodeURI(record[0].get("HANG"))
   	    	    ,V_HANG_NM  : encodeURI(record[0].get("HANG_NAME"))
   	    	    ,V_MOK      : encodeURI(record[0].get("MOK"))
   	    	    ,V_MOK_NM   : encodeURI(record[0].get("MOK_NAME"))
   	    	    ,V_SUVILA_YN: encodeURI(record[0].get("SUVILA_YN"))
   	    	};
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_mok_detail', '', params, null);
    		},10);
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_mok_use', '', params, null);
    		},10);
    		
    		
    		
    	}
    },
    beforeeditKwan : function  ( editor, context, eOpts ) {
    	var me = this;
    	if(me.lookupReference('asp008w_02_a').getStore().getAt(context.rowIdx).get("SUVILA_YN") != "Y"){
    		return false;
    	}
    },
    beforeeditHang : function  ( editor, context, eOpts ) {
    	var me = this;
    	if(me.lookupReference('asp008w_02_b').getStore().getAt(context.rowIdx).get("SUVILA_YN") != "Y"){
    		return false;
    	}
    },
    beforeeditMok : function  ( editor, context, eOpts ) {
    	var me = this;
    	if(me.lookupReference('asp008w_02_c').getStore().getAt(context.rowIdx).get("SUVILA_YN_USE") != "Y"){
    		return false;
    	}
    },
    beforeeditMokDetail : function  ( editor, context, eOpts ) {
    	var me = this;
    	if(me.lookupReference('asp008w_02_f').getStore().getAt(context.rowIdx).get("SUVILA_YN") == "Y"){
    		return false;
    	}
    },
    underLine : function(val){
    	if(val != null && val != "" ){
    		return "<span style='text-decoration: underline;color:blue;cursor: pointer;'>"+val+"</span>"
    	}
    	
    },
    onAddLeft : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_kwan').getCount();
    	
    	for(var i =0; i < rowCount ; i++){
    		var kwanNm = me.lookupReference('asp008w_02_a').getStore().getAt(i).get("KWAN_NAME");
    		if( kwanNm == null || kwanNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(관)을 입력하세요.');
    			return;    			
    		}    		
    	}
    	
    	var data = {
    		 KWAN      : rowCount+1
    		,CNT       : 0
    		,KWAN_NAME : ""
    		,SUVILA_YN : "Y"    		    	
    	};
    	me.getViewModel().getStore('ds_kwan').add(data);
    	me.lookupReference('asp008w_02_a').getView().select(rowCount);
    	me.lookupReference('asp008w_02_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    	
    	me.getViewModel().getStore('ds_kwan_detail').removeAll();
    	me.getViewModel().getStore('ds_hang').removeAll();
    	me.getViewModel().getStore('ds_hang_detail').removeAll();
    	me.getViewModel().getStore('ds_mok').removeAll();
    	me.getViewModel().getStore('ds_mok_detail').removeAll();
    	me.getViewModel().getStore('ds_mok_use').removeAll();
    	
    	
    },
    onDelLeft : function(){
    	var me = this;
    	
    	var hangCnt = me.getViewModel().getStore('ds_hang').getCount();
    	if(hangCnt > 0 ){
    		Ext.Msg.alert('알림', '항을 먼저 삭제하세요.');
    		return;
    	}
    	exCommon.gridRemove(me , 'asp008w_02_a', null)
    },
    onSaveKwan : function(){
    	var me = this;
    	
    	me.lookupReference('txt_acct_gbn_nm').setExValue( me.lookupReference('lc_AcctGbn').getDisplayValue() );
    	
    	var rowCount = me.getViewModel().getStore('ds_kwan').getCount();
    	for(var i =0; i < rowCount ; i++){
    		var kwanNm = me.lookupReference('asp008w_02_a').getStore().getAt(i).get("KWAN_NAME");
    		if( kwanNm == null || kwanNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(관)은 필수입력 사항입니다.');
    			return;    			
    		}    		
    	}
    	exCommon.fnGridSaveAll(me
				             ,'ds_kwan'
				             ,'addData'
				             ,'uptData'
				             ,'delData'
				             ,'/asp/asp008w_02/kwanSave.suvila'
				             , me.onSaveKwanCallback);
    },
    onSaveKwanCallback: function(me, success, form, action){    	    	
    	
    	
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_kwan');
    	
    	if(success){
    		
    		var params = {
	   		     V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
	      		,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
	      	};
    		
    		setTimeout(function(){
          		me.callStore(me, 'ds_kwan', '', params, me.onSelectCallback);    		
          	},10);
    	}
    	
      	
    },
    onAddHang : function(){
    	var me = this;

    	var hangCount = me.getViewModel().getStore('ds_hang').getCount();
    	for(var i =0; i < hangCount ; i++){
    		var hangNm = me.lookupReference('asp008w_02_b').getStore().getAt(i).get("HANG_NAME");
    		if( hangNm == null || hangNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(항)은 필수입력 사항입니다.');
    			return;
    		}    		
    	}
    	
    	var selectKwan = me.lookupReference('asp008w_02_a').getView().getSelectionModel().getSelection()[0];    	
    	var data = {
    			KWAN 	  : selectKwan.get("KWAN")
    		   ,KWAN_NAME : selectKwan.get("KWAN_NAME")
    		   ,HANG 	  : hangCount + 1
    		   ,SUVILA_YN : "Y"    
    		   ,CNT       : 0
    	};
    	
    	me.getViewModel().getStore('ds_hang').add(data);
    	me.lookupReference('asp008w_02_b').getView().select(hangCount);
    	me.lookupReference('asp008w_02_b').plugins[0].startEditByPosition({
            row: hangCount,
            column: 1
        });
    },
    onDelHang : function(){
    	
    	var me = this;
    	
    	var hangCnt = me.getViewModel().getStore('ds_mok').getCount();
    	if(hangCnt > 0 ){
    		Ext.Msg.alert('알림', '목을 먼저 삭제하세요.');
    		return;
    	}
    	exCommon.gridRemove(me , 'asp008w_02_b', null)
    },
    onSaveHang : function(){
    	
    	var me = this;
    	
    	me.lookupReference('txt_acct_gbn_nm').setExValue( me.lookupReference('lc_AcctGbn').getDisplayValue() );
    	
    	var hangCount = me.getViewModel().getStore('ds_hang').getCount();
    	for(var i =0; i < hangCount ; i++){
    		var hangNm = me.lookupReference('asp008w_02_b').getStore().getAt(i).get("HANG_NAME");
    		if( hangNm == null || hangNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(항)은 필수입력 사항입니다.');
    			return;    			
    		}    		
    	}
    	
    	exCommon.fnGridSaveAll(me
				             ,'ds_hang'
				             ,'addData'
				             ,'uptData'
				             ,'delData'
				             ,'/asp/asp008w_02/hangSave.suvila'
				             , me.onSaveHangCallback);
    },
    onSaveHangCallback : function(me, success, form, action){
    	console.log('onSaveHangCallback',success );
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_hang' );
    	
    	if(success){
    		var selectKwan = me.lookupReference('asp008w_02_a').getView().getSelectionModel().getSelection()[0];
        	var params = {
        		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
        		,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
        		,V_KWAN     : selectKwan.get("KWAN")
        	};
       	    
       	    
	       	setTimeout(function(){
	       		me.callStore(me, 'ds_hang', '', params, me.dsHangCallback);    		
	       	},10);
    	}
    	   
    	
    },
    onAddMok : function(){
    	var me = this;
    	
    	var selectKwan = me.lookupReference('asp008w_02_a').getView().getSelectionModel().getSelection();
    	var selectMok  = me.lookupReference('asp008w_02_b').getView().getSelectionModel().getSelection();
    	var mokCnt    = me.getViewModel().getStore('ds_mok').getCount();
    	
    	
    	
    	if(selectKwan.length == 0 ){
    		Ext.Msg.alert('경고', '관  선택후 추가할수 있습니다.');
    		return;
    	}
    	
    	if(selectMok.length  == 0){
    		Ext.Msg.alert('경고', '항  선택후 추가할수 있습니다.');
    		return;
    	}
    	
    	
    	var mokCount = me.getViewModel().getStore('ds_mok').getCount();
    	for(var i =0; i < mokCount ; i++){
    		var mokNm = me.lookupReference('asp008w_02_c').getStore().getAt(i).get("MOK_NAME");
    		if( mokNm == null || mokNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(목)은 필수입력 사항입니다.');
    			return;
    		}    		
    	}
    	
    	
    	var data ={
    			 KWAN      : selectMok[0].get("KWAN")
    			,KWAN_NAME : selectMok[0].get("KWAN_NAME")
    			,HANG 	   : selectMok[0].get("HANG")
    			,HANG_NAME : selectMok[0].get("HANG_NAME")
    			,MOK 	   : mokCnt + 1
    			,SUVILA_YN : "Y"      			
    			,CNT       : 0
    			,SUVILA_YN_USE : "Y"
    	};
    	
    	console.log('data', data);
    	
    	me.getViewModel().getStore('ds_mok').add(data);
    	me.lookupReference('asp008w_02_c').plugins[0].startEditByPosition({
            row: mokCnt,
            column: 1
        });
    },
    onSaveMok : function(){
    	
    	var me = this;
    	
    	me.lookupReference('txt_acct_gbn_nm').setExValue( me.lookupReference('lc_AcctGbn').getDisplayValue() );
    	
    	var mokCount = me.getViewModel().getStore('ds_mok').getCount();
    	for(var i =0; i < mokCount ; i++){
    		var mokNm = me.lookupReference('asp008w_02_c').getStore().getAt(i).get("MOK_NAME");
    		if( mokNm == null || mokNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '계정명(목)은 필수입력 사항입니다.');
    			return;
    		}    		
    	}
    	exCommon.fnGridSaveAll(me
				             ,'ds_mok'
				             ,'addData'
				             ,'uptData'
				             ,'delData'
				             ,'/asp/asp008w_02/mokSave.suvila'
				             , me.onSaveMokCallback);
    },
    onSaveMokCallback : function(me, success, form, action){
    	console.log('onSaveMokCallback',success );
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_mok' );
    	
    	if(success){
    		me.getViewModel().getStore('ds_mok_detail').removeAll();
        	me.getViewModel().getStore('ds_mok_use').removeAll();
        	
    		var selectMok  = me.lookupReference('asp008w_02_b').getView().getSelectionModel().getSelection()[0];
        	var params ={
        		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
        	    ,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
        	    ,V_KWAN     : encodeURI(selectMok.get("KWAN"))	
        	    ,V_HANG     : encodeURI(selectMok.get("HANG"))
        	    ,V_HANG_NM  : encodeURI(selectMok.get("HANG_NAME"))
        	};
        	
        	
        	
        	setTimeout(function(){
        		me.callStore(me, 'ds_mok', '', params, me.dsMoKCallback);    		
	       	},10);
    	}
    },
    onOneTableDel : function (){
    	var me = this;
    	
    	var selectedRecord = me.lookupReference('asp008w_02_f').getView().getSelectionModel().getSelection();
    	
    	console.log('selectedRecord.lenth', selectedRecord.length);
    	
    	if(selectedRecord.length == 0){
    		Ext.Msg.alert('알림', '삭제할 계정을 선택하세요.');
    	}
    	var selTempleCd = selectedRecord[0].get("TEMPLE_CD");
    	var mokUseCount = me.getViewModel().getStore('ds_mok_use').getCount();
    	
    	if(mokUseCount > 0){
    		for(var i =0; i < mokUseCount ; i++){
    			var templeCd = me.lookupReference('asp008w_02_g').getStore().getAt(i).get("TEMPLE_CD");
    			if(templeCd == selTempleCd ){
    				Ext.Msg.alert('경고', '사용중인 계정입니다.');
    				return;
    			}
    		}// for
    	}// if
    	
    	exCommon.gridRemove(me , 'asp008w_02_f', 'ds_mok_detail', false);
    },
    onAllTableDel : function(){
    	var me = this;
    	
    	var mokUseCount = me.getViewModel().getStore('ds_mok_use').getCount();
    	if(mokUseCount > 0){
			Ext.Msg.alert('경고', '사용중인 계정이 포함되어 있어 삭제할수 없습니다.');
			return;
    	}// if
    	
    	exCommon.gridRemove(me , 'asp008w_02_f', 'ds_mok_detail', true);
    },
    onOneTableSave : function(){
    	var me = this;
    	
    	exCommon.fnGridSaveAll(me
				             ,'ds_mok_detail'
				             ,'addData'
				             ,'uptData'
				             ,'delData'
				             ,'/asp/asp008w_02/mokDetailSave.suvila'
				             , me.oneTableSaveCallback);
    },
    oneTableSaveCallback  : function(me, success, form, action){
    	console.log('oneTableSaveCallback',success );
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_mok_detail' );
    	
    	if(success){
    		me.getViewModel().getStore('ds_mok_detail').removeAll();
        	me.getViewModel().getStore('ds_mok_use').removeAll();
        	me.getViewModel().getStore('ds_mok').removeAll();
        	
        	
        	var selectedRecord = me.lookupReference('asp008w_02_b').getView().getSelectionModel().getSelection();
        	
        	var params ={
   	    		 V_ACCT_GBN : encodeURI(me.lookupReference('lc_AcctGbn').getExValue())
   	    	    ,V_IE_GBN   : encodeURI(me.lookupReference('lc_IeGbn').getExValue())
   	    	    ,V_KWAN     : encodeURI(selectedRecord[0].get("KWAN"))	
   	    	    ,V_HANG     : encodeURI(selectedRecord[0].get("HANG"))
   	    	    ,V_HANG_NM  : encodeURI(selectedRecord[0].get("HANG_NAME"))
   	    	};
   	    	
   	    	
   	    	setTimeout(function(){
   	    		me.callStore(me, 'ds_hang_detail', '', params, null);    		
	       	},10);
   	    	
   	    	setTimeout(function(){
   	    		me.callStore(me, 'ds_mok', '', params, me.dsMoKCallback);    		
	       	},10);
    	}
    	
    },
    onMoveKhm : function( tablepanel, td, cellIndex, record, tr, rowIndex, e, eOpts ){
    	var me = this;
    	
    	if(cellIndex == 4 && record.get("SUVILA_YN") == "Y" &&  record.get("SUVILA_YN_USE")  != "Y"){
    		
    		setTimeout(function(){
    			var mokUseCount = me.getViewModel().getStore('ds_mok_use').getCount();
	    		if(mokUseCount <= 0){
	    			Ext.Msg.alert('알림', '사용중인 사찰이 없습니다.');
	    			return;
	    		}
	    		
	    		var records = me.getViewModel().getStore('ds_mok').getUpdatedRecords();
	        	if(records.lenth > 0){
	        		Ext.Msg.alert('알림', '계정과목 수정중인 건이 있습니다.');
	    			return;
	        	}
	    		
	    		Ext.Msg.prompt('알림', '관 코드를입력하세요', function(btn, kwan) {  
	    		    Ext.Msg.prompt('알림', '항 코드를입력하세요', function(btn, hang) {  
	    		    	Ext.Msg.prompt('알림', '목 코드를입력하세요', function(btn, mok) {
	    		    		console.log('1222 = ', kwan + " :" +hang + " : "+ mok);
	    		    		
	    		    		if(kwan==null||hang==null||mok==null||kwan==""||hang==""||mok==""){
			    			  Ext.Msg.alert('알림', '계정과목코드를 정확하게 입력하세요');
			    			  return;
			    			}
	    		    		
	    		    		var mokData = me.lookupReference('asp008w_02_c').getView().getSelectionModel().getSelection()[0];
	    		    		console.log('hangData',mokData);
	    		    		if(kwan == mokData.get("KWAN") && hang == mokData.get("HANG") && mok == mokData.get("MOK")){
	    		    			Ext.Msg.alert('알림', '계정과목이 동일합니다.');
				    			return;
	    		    		}
	    		    		
	    		    		mokData.set("V_KWAN", kwan);
	    		    		mokData.set("V_HANG", hang);
	    		    		mokData.set("V_MOK",  mok);
	    		    		
	    		    		console.log('mokData', mokData);
	    		    		
	    		    		mokData.set("CHANGE", "이동중");
	    		    		
	    		    		me.onSaveMok();
	    		    		
	    	    		});
		    		});
	    		});
	    		
	    		
    		},600);
    		
    		
    	}// 4 if
    	
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onTopSave();
    	}
    },
    onTopSave : function(){
    	var me   = this;
    	var NAME =  me.lookupReference('txt_change_acct_gbn_nm').getExValue();
    	
    	if( NAME == null || NAME == "" ){
    		Ext.Msg.alert('알림', '변경할 계정항목명을 입력하세요.');
    		return;
    	}
    	
    	Ext.MessageBox.confirm('경고', '저장하시겠습니까?', function(btn){
    		var params = {
    			 CODE : me.lookupReference('lc_AcctGbn').getExValue()
    			,NAME : encodeURI( me.lookupReference('txt_change_acct_gbn_nm').getExValue() )
    		};
    		
    		console.log('onTopSave', params);
    		
    		
    		setTimeout(function(){
    			me.callAjax(me, '/asp/asp008w_02/saveAcctGbn.suvila', params, me.onTopSaveCallback , false , true);    		
	       	},10);
    	});
    },
    onTopSaveCallback : function(me, success, res, record){
    	console.log('onTopSaveCallback', success);
    	if(success){
    		Ext.Msg.alert('알림', '저장되었습니다.');
    		
    		setTimeout(function(){
    			me.callStore(me, 'ds_AcctGbn', '', null, me.ds_AcctGbnCallback);    		
	       	},10);
    	}
    	
    },
    ds_AcctGbnCallback : function (me, success, records, operation){
    	if(success){
    		me.lookupReference('txt_acct_gbn_nm').setExValue(records[0].get("NAME"));
    	}
    }
    
    
})