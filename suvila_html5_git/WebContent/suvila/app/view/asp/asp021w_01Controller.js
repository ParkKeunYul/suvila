Ext.define('ExFrm.view.asp.asp021w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp021w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	setTimeout(function(){
    		
    	},100);
    },   
    onInit:function(me){
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', null, me.onInitCallback);    		
    	},100);  
    },
    onInitCallback : function(me, success, records, operation){
    	console.log("records", records.length + " : "+ success);
    	
    	if(success && records.length > 0){
    		me.lookupReference('asp021w_01_a').getView().select(0);
    	} 
    	else if(success && records.length == 0){
    		me.lookupReference('txt_PgName').setExValue("");
    		me.lookupReference('txt_Rate_Commission').setExValue("");
    		me.lookupReference('txt_Commission_From').setDateValue("");
    		me.lookupReference('txt_Commission_To').setDateValue("");
    		me.lookupReference('txt_remark').setExValue("");
    		me.lookupReference('lc_use_yn').setExValue("");
    		me.lookupReference('txt_sql_mode').setExValue("");
    		me.lookupReference('txt_pg_code').setExValue("");
    		    		
    		me.lookupReference('asp021w_01_b').getStore().removeAll();
    	}
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSelect();
    	}
    },
    onSelectionChange : function( me , record , selections , eOpts ) {
    	try{
    		
			var data = record[0].data;
    		this.lookupReference('txt_PgName').setExValue(data.PGNAME);
    		this.lookupReference('txt_Rate_Commission').setExValue(data.RATE_COMMISSION);
    		this.lookupReference('txt_Commission_From').setDateValue(data.COMMISSION_FROM);
    		this.lookupReference('txt_Commission_To').setDateValue(data.COMMISSION_TO);
    		this.lookupReference('txt_remark').setExValue(data.REMARK);
    		this.lookupReference('lc_use_yn').setExValue(data.USE_YN);
    		this.lookupReference('txt_sql_mode').setExValue(data.SQL_MODE);
    		this.lookupReference('txt_pg_code').setExValue(data.PGCODE);
    		
    		var params = {
	    		PGCODE : data.PGCODE 	
	    	};
    		this.callStore(me, 'ds_sub', '', params, null);
    		
    	}catch(Exception){
    		
    	}
    },
    onSettingData : function (me,data){
    	console.log('onSettingData', data.get("RATE_COMMISSION"));    	
    },
    onSelect: function(){
    	var me = this;
    	var params = {
			"PGNAME" :  encodeURI(me.lookupReference('txt_find_PgName').getExValue())
		};    	
		me.callStore(me, 'ds_main', '', params, me.onInitCallback);
    },
    onAdd : function (){
    	var me = this;
    	
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	for(var i =0; i < rowCount ; i++){
    		var data = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		var PGNAME          = data.get("PGNAME");
    		var RATE_COMMISSION = data.get("RATE_COMMISSION");
    		
    		if(PGNAME == null || PGNAME == ""){
    			me.lookupReference('asp021w_01_a').getView().select(i);
    			setTimeout(function(){ Ext.Msg.alert('확인',  "PG명을 입력하세요."); },50);
        		me.lookupReference('txt_PgName').focus();        		        		
        		return;
    		}
    	}// for
    	
    	var data = {
    		"COMMISSION_FROM"  : exCommon.getNowDate(),
    		"COMMISSION_TO"    : exCommon.getNowDate(),
    		"USE_YN"           : "T",
    		"SQL_MODE"         : "I"
    	};
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('asp021w_01_a').getView().select(rowCount);   
    	
    },
    onSave : function (){
    	var me = this;
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	var SQL_MODE = me.lookupReference('txt_sql_mode').getExValue();
    	if(SQL_MODE == "I"){
    		var COMMISSION_TO = me.lookupReference('txt_Commission_To').getDateValue();
    		if(COMMISSION_TO == null || COMMISSION_TO == "") COMMISSION_TO = "00000000";
    		
    		var subData = {
    				"PGNAME"          : me.lookupReference('txt_PgName').getExValue(),
    				"PGCODE"          : me.lookupReference('txt_pg_code').getExValue(),
    				"RATE_COMMISSION" : me.lookupReference('txt_Rate_Commission').getExValue(),
    				"COMMISSION_FROM" : me.lookupReference('txt_Commission_From').getExValue(),
    				"COMMISSION_TO"   : me.lookupReference('txt_Commission_To').getExValue(),
    		};
    		me.getViewModel().getStore('ds_sub').add(subData);
    		exCommon.fnGridSaveAll( me
    				               ,'ds_sub'
    				               ,'newData'
    				               ,'uptData'
    				               ,'delData'
    				               ,'/asp/asp021w_01/savePG.suvila'
    				               ,me.onSaveCallback)
    		
    	}else if(SQL_MODE == "S"){
    		console.log('SQL_MODE', SQL_MODE);
    		var selection = this.lookupReference('asp021w_01_a').getView().getSelectionModel().getSelection()[0];
    		
    		var uptFlag = false;
    		var NOW_COMMISSION_TO =  me.lookupReference('txt_Commission_To').getExValue();
    		
    		if(NOW_COMMISSION_TO == null || NOW_COMMISSION_TO == "") NOW_COMMISSION_TO = "00000000"
    		
    		
    		if( me.lookupReference('txt_Commission_From').getExValue() != selection.get("COMMISSION_FROM")    ||
    			NOW_COMMISSION_TO                                      != selection.get("COMMISSION_TO")  	  ||
    			me.lookupReference('txt_Rate_Commission').getExValue() != selection.get("RATE_COMMISSION")     ){
    			uptFlag = true;
    		}
    		
    		if(uptFlag  ){    	
    			
    			console.log('111 = ', me.onCheckFromTo(me, me.lookupReference('txt_Commission_From').getExValue() , NOW_COMMISSION_TO ));
    			
    			if( me.onCheckFromTo(me, me.lookupReference('txt_Commission_From').getExValue() , NOW_COMMISSION_TO ) ){
    				Ext.MessageBox.confirm('경고', '저장하시겠습니까?', function(btn){  
    					if (btn == 'yes') {
    						
    						me.callForm(me, '/asp/asp021w_01/savePgHis.suvila', me.savePgHisCallback , false);
    					}
    				});
    			}
    		}else{
    			Ext.Msg.alert('알림', '선택된 행의 변경된 자료가 없습니다.');
    		}
    	}
    	
    },
    onSaveCallback  : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me,success ,action , 'ds_sub');
    	me.callStore(me, 'ds_main', '', null, me.onInitCallback);
    },
    savePgHisCallback :  function(me, success, form, action){
    	console.log('success', success);
    	if(success){
    		var params = {
				"PGNAME" :  encodeURI(me.lookupReference('txt_find_PgName').getExValue())
			};    	
			me.callStore(me, 'ds_main', '', params, me.onInitCallback);
    	}    	
    },
    onCheckFromTo : function (me ,  strFrom , strTo  ){
    	
    	if (strTo =="00000000"){
    		strTo ="99999999";
    	}
    	
    	if (strFrom > strTo){
    		Ext.Msg.alert('경고', '기간 설정이 잘못되었습니다.');
    		return false;
    	}
    	
    	
    	var rowCount = me.getViewModel().getStore('ds_sub').getCount();
    	for(var i =0; i < rowCount ; i++){
    		var data = me.getViewModel().getStore('ds_sub').getAt(i);
    		
    		var tgtFrom = data.get("COMMISSION_FROM") ;
    		var tgtTo   = data.get("COMMISSION_TO") ;
    		
    		if (tgtTo =="00000000"){
    			tgtTo ="99999999";
    		}
    		
    		if (strFrom <= tgtFrom){    		
    			Ext.Msg.alert('경고', '기간 From 보다 작거나 같은수 없습니다.');
    			return false;
    		}
    		
    		if (tgtTo !="99999999"){
    			
    			if(  strFrom  <=  tgtTo ||  strTo   <=  tgtTo){
    				Ext.Msg.alert('경고', '수수료 적용 기간이 겹칩니다.');
					return false;
    			}
    			
    			/*if (strFrom >=tgtFrom && strFrom < tgtTo){
    				var strToday =  new Number(exCommon.getNowDate());
    				if ( tgtFrom > strToday) {
    					Ext.Msg.alert('경고', '수수료 적용 기간이 겹칩니다.');
    					return false;
    				}
    			}*/
    		}// if
    		
    	}// for
    	return true;
    }
})