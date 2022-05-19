Ext.define('ExFrm.view.ser.ser001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.ser001w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },   
    onInit:function(me){
    	
    	var me = this;
    	me.remarkPoP(me);
    	setTimeout(function(){
    		me.callStore(me, 'ds_lunar_solar', '', null, me.dsLunarCallback);
    	},50);
    },
    dsLunarCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno1', '', null, me.dsTel1Callback);
    	},50);
    	
    },
    dsTel1Callback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno1', '', null, me.dsMobile1Callback);
    	},50);
    },
    dsMobile1Callback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_servearmy', '', null, me.dsServArmyCallback);
    	},50);
    },
    dsServArmyCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_use_yn', '', null, me.dsUseCallback);
    	},50);
    },
    dsUseCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_relation_tab1', '', null, me.dsRelTabCallback);
    	},50);
    }, 
    dsRelTabCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_sexagenary_tab1', '', null, me.dsSexTabCallback);
    	},50);
    },
    dsSexTabCallback : function (me, success, records, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_last_schola_tab2', '', null, me.dsLastScolaCallback);
    	},50);
    },
    dsLastScolaCallback : function (me, success, records, action){
    	setTimeout(function(){
    		// 마지막에
    		me.callStore(me, 'ds_AuthGroup', '', null, null);
    	},50);
    },
    remarkRow:[],
    remarkPoP : function(me){
    	var roop = me.remarkRow.length;
    	for(var i = 0; i<roop ; i++){
    		me.remarkRow.pop();
    	}
    },
    onSearch : function( ){
    	var me = this;

    	console.log('onSearch = ');
    	
    	try{
    		var params = {
	       		 user_nm    : encodeURI(me.lookupReference('txt_find_user_nm').getExValue())
	       		,auth_group : me.lookupReference('lc_AuthGroup').getExValue()
	       	};
	       	
	       	setTimeout(function(){
	       		me.callStore(me, 'ds_main', '', params, me.onSearchCallback);
	       	},10);
    	}catch (e) {
			console.log('e = ', e);
		}
    	
    },
    onSearchCallback : function (me, success, records, action){
    	
    	try{
    		if(success && records.length > 0){
        		me.lookupReference('ser001w_01_a').getView().select(0);
        	}
    	}catch (e) {
			console.log('e = ', e);
		}
    	
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onSearch();
    	}
    },
    onFindAddr : function(){
    	var params = {};
        this.openPopup('ExFrm.view.com.post',  params, this.onFindAddrReceive);
    },
    onFindAddrReceive : function(params, me){
    	
    	me.lookupReference('em_zip_cd').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_addr2').focus();
    	
    },
    onAdd : function(){
    	var me = this;
    	
    	var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    	
    	var today  =exCommon.setDateFormat( exCommon.getNowDate()).replace(/-/gi, '');
    	
    	var data = {
    		 TEMPLE_CD     : exCommon.user.templeCd
    		,AUTH_GROUP    : "8S"
    		,SERVEARMY_GBN : "T"
    		,LUNAR_SOLAR   : "T"
    		,USE_YN        : "T"
    		,BIRTHDAY      : today
    		,ENTRCOMP_DATA : today
    		,SQL_MODE      : "I"
    	}
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	
    	me.lookupReference('ser001w_01_a').getView().select(rowCnt);
    	me.lookupReference('txt_user_id').focus();
    },
    onGridApply : function(){
    	var me = this;
    	
    	me.onSettingStore(me);
    },
    onSave : function(){
    	var me = this;
    	
    	
    	me.onSettingStore(me);
    	
    	var changeCnt = exCommon.ChangeCount('ds_main', me);
    	
    	console.log('changeCnt = '+ changeCnt);
    	
    	if(changeCnt > 0){
    		
    		var rowCnt = me.getViewModel().getStore('ds_main').getCount();
    		for(var i =0; i < rowCnt ; i++){
    			
    			var USER_ID = me.lookupReference('ser001w_01_a').getStore().getAt(i).get("USER_ID");
    			var USER_NM = me.lookupReference('ser001w_01_a').getStore().getAt(i).get("USER_NM");
    			var PASSWD  = me.lookupReference('ser001w_01_a').getStore().getAt(i).get("PASSWD");
    			
    			
    			if(USER_ID == null || USER_ID == "" || USER_ID == undefined ){
    				setTimeout(function(){
    					Ext.Msg.alert('알림', '사용자ID는 필수 입력 사항입니다.');    				
    				},50);
    				me.lookupReference('txt_user_id').focus();
    				
    				return;
    			}
    			
    			if(USER_NM == null || USER_NM == "" || USER_NM == undefined ){
    				setTimeout(function(){
    					Ext.Msg.alert('알림', '사용자명은 필수 입력 사항입니다.');    				
    				},50);
    				me.lookupReference('txt_name_kor').focus();
    				return;
    			}
    			
    			if(PASSWD == null || PASSWD == "" || PASSWD == undefined ){
    				setTimeout(function(){
    					Ext.Msg.alert('알림', '비밀번호는 필수 입력 사항입니다.');    				
    				},50);
    				me.lookupReference('txt_passwd').focus();
    				return;
    			}
    			
    		}// for tab1Cnt
    		
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '변동된 내역이 없습니다.');
    		},50);
    	}
    	
    	exCommon.fnGridSaveAll(
    		 me
    		,'ds_main'
    		,'newData'
    		,'uptData'
    		,'delData'
    		,'/ser/SER001W_01/UserSave.suvila'
    		,me.onSaveCallback
    	);
    	
    },
    onSaveCallback : function(me, success, form, action){
    	exCommon.fnGridSaveCallback(me, success , action , 'ds_main');
    },
    onSettingStore(me){
    	var selection = me.lookupReference('ser001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	selection.set("USER_ID"           , me.lookupReference('txt_user_id').getExValue());
    	selection.set("PASSWD"            , me.lookupReference('txt_passwd').getExValue());
    	selection.set("USER_NM"           , me.lookupReference('txt_name_kor').getExValue());
    	selection.set("SACRED_KOR"        , me.lookupReference('txt_sacred_kor').getExValue());
    	selection.set("SACRED_HAN"        , me.lookupReference('txt_name_han').getExValue());
    	selection.set("AUTH_GROUP"        , me.lookupReference('lc_AuthGroup_I').getExValue());
    	selection.set("BIRTHDAY"          , me.lookupReference('me_birthday').getExValue());
    	selection.set("LUNAR_SOLAR"       , me.lookupReference('lc_lunar_Solar').getExValue());
    	selection.set("ZIP_CD"     		  , me.lookupReference('em_zip_cd').getExValue());
    	selection.set("ADDR1"     		  , me.lookupReference('txt_addr1').getExValue());
    	selection.set("ADDR2"     		  , me.lookupReference('txt_addr2').getExValue());
    	selection.set("ADDR3"     		  , me.lookupReference('txt_addr3').getExValue());
    	selection.set("BLDG_NUM"     	  , me.lookupReference('txt_bldg_num').getExValue());
    	selection.set("TELNO1"     		  , me.lookupReference('lc_telno1').getExValue());
    	selection.set("TELNO2"     		  , me.lookupReference('txt_telno2').getExValue());
    	selection.set("TELNO3"     		  , me.lookupReference('txt_telno3').getExValue());
    	selection.set("MOBILE_TELNO1"     , me.lookupReference('lc_mobile_telno1').getExValue());
    	selection.set("MOBILE_TELNO2"     , me.lookupReference('txt_mobile_telno2').getExValue());
    	selection.set("MOBILE_TELNO3"     , me.lookupReference('txt_mobile_telno3').getExValue());
    	selection.set("DEPT_NM"     	  , me.lookupReference('txt_deptNm').getExValue());
    	selection.set("POSITION_CODE"     , me.lookupReference('txt_position').getExValue());
    	selection.set("ENTRCOMP_DATA"     , me.lookupReference('me_enter').getExValue());
    	selection.set("SERVEARMY_GBN"     , me.lookupReference('lc_servearmy').getExValue());
    	selection.set("USE_YN"         	  , me.lookupReference('lc_use_yn').getExValue());
    	
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	
    	try{
    		if(record.length <= 0){
    			return;
    		}
    		
    		if(me.remarkRow.length > 0 ){
				var preRowData = me.lookupReference('ser001w_01_a').store.getAt( me.remarkRow[0]);
				me.remarkPoP(me);
			}
    		
    		var selectedRecord = me.lookupReference('ser001w_01_a').getSelectionModel().getSelection()[0];
			var row            = me.lookupReference('ser001w_01_a').store.indexOf(selectedRecord);
			me.remarkRow.push(row);
    		
			
    		me.getViewModel().getStore('ds_tab1').removeAll();
    		me.getViewModel().getStore('ds_tab2').removeAll();
    		me.getViewModel().getStore('ds_tab3').removeAll();
    		
    		
    		me.lookupReference('tabpanel').setActiveTab(0);
    		
    		var params = {
    			USER_ID : record[0].get("USER_ID")
    		};
    		
    		me.lookupReference('txt_user_id').setExValue(record[0].get("USER_ID"));
    		me.lookupReference('txt_passwd').setExValue(record[0].get("PASSWD"));
    		me.lookupReference('txt_name_kor').setExValue(record[0].get("USER_NM"));
    		me.lookupReference('txt_sacred_kor').setExValue(record[0].get("SACRED_KOR"));
    		me.lookupReference('txt_name_han').setExValue(record[0].get("SACRED_HAN"));
    		me.lookupReference('lc_AuthGroup_I').setExValue(record[0].get("AUTH_GROUP"));
    		me.lookupReference('me_birthday').setExValue(record[0].get("BIRTHDAY"));
    		me.lookupReference('lc_lunar_Solar').setExValue(record[0].get("LUNAR_SOLAR"));
    		me.lookupReference('em_zip_cd').setExValue(record[0].get("ZIP_CD"));
    		me.lookupReference('txt_addr1').setExValue(record[0].get("ADDR1"));
    		me.lookupReference('txt_addr2').setExValue(record[0].get("ADDR2"));
    		me.lookupReference('txt_addr3').setExValue(record[0].get("ADDR3"));
    		me.lookupReference('txt_bldg_num').setExValue(record[0].get("BLDG_NUM"));
    		me.lookupReference('lc_telno1').setExValue(record[0].get("TELNO1"));
    		me.lookupReference('txt_telno2').setExValue(record[0].get("TELNO2"));
    		me.lookupReference('txt_telno3').setExValue(record[0].get("TELNO3"));
    		me.lookupReference('lc_mobile_telno1').setExValue(record[0].get("MOBILE_TELNO1"));
    		me.lookupReference('txt_mobile_telno2').setExValue(record[0].get("MOBILE_TELNO2"));
    		me.lookupReference('txt_mobile_telno3').setExValue(record[0].get("MOBILE_TELNO3"));
    		me.lookupReference('txt_deptNm').setExValue(record[0].get("DEPT_NM"));
    		me.lookupReference('txt_position').setExValue(record[0].get("POSITION_CODE"));
    		me.lookupReference('me_enter').setExValue(record[0].get("ENTRCOMP_DATA"));
    		me.lookupReference('lc_servearmy').setExValue(record[0].get("SERVEARMY_GBN"));
    		me.lookupReference('lc_use_yn').setExValue(record[0].get("USE_YN"));
    		
    		
    		setTimeout(function(){
           		me.callStore(me, 'ds_tab1', '', params, null);
           	},10);
    		
    		setTimeout(function(){
           		me.callStore(me, 'ds_tab2', '', params, null);
           	},60);
    		
    		setTimeout(function(){
           		me.callStore(me, 'ds_tab3', '', params, null);
           	},110);
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    onChangeAuth  : function (){
    	var me = this;
    	console.log('onChangeAuth');
    	me.onSearch();
    },
    onTabChange:function(tappanel, panel){
    	console.log(panel.value);
    	
    	console.log('panel', panel);
    },
    addBot : function(){
    	var me = this;
    	
    	var selectGridNm  = me.lookupReference('tabpanel').getActiveTab().value ;
    	var selectStoreNm = me.lookupReference('tabpanel').getActiveTab().bind.store.stub.name
    	console.log( selectGridNm,  selectStoreNm);
    	
    	var tabCnt = me.getViewModel().getStore(selectStoreNm).getCount();
    	
    	
    	var selectedMainRecord = me.lookupReference('ser001w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	var today  =exCommon.setDateFormat( exCommon.getNowDate()).replace(/-/gi, '');
    	
    	var SQL_MODE = selectedMainRecord.get("SQL_MODE");
    	
    	if(SQL_MODE == "I"){
    		setTimeout(function(){
				Ext.Msg.alert('알림', '신규등록 계정은 저장후 추가할수 있습니다.');    				
			},50); 
    		return;
    	}
    	
    	var data = {
    		 USER_ID  : selectedMainRecord.get("USER_ID")
    		,BIRTHDAY : today
    		,SDATE    : today
    	    ,EDATE    : today
    	    ,EDU_SDATE: today
    	    ,EDU_EDATE: today
    	};
    	
    	me.getViewModel().getStore(selectStoreNm).add(data);
    	
    	/*me.lookupReference(selectGridNm).plugins[0].startEditByPosition({
            row    : tabCnt ,
            column : 2
        });*/
    	
    },
    delBot : function(){
    	var me = this;
    	
    	var selectGridNm  = me.lookupReference('tabpanel').getActiveTab().value ;
    	var selectStoreNm = me.lookupReference('tabpanel').getActiveTab().bind.store.stub.name
    	
    	exCommon.gridRemove(me , selectGridNm ,selectStoreNm );
    	
    	/*var selectedRecord = me.lookupReference(selectGridNm).getView().getSelectionModel().getSelection()[0];
		var selectIndex    = me.getViewModel().getStore(selectStoreNm).indexOf(selectedRecord);
		me.lookupReference(selectGridNm).getStore().remove(selectedRecord);*/
    },
    saveBot : function(){
    	var me = this;
    	
    	
    	
    	me.lookupReference('newData1').setValue("");
    	me.lookupReference('uptData1').setValue("");
    	me.lookupReference('delData1').setValue("");
    	
    	me.lookupReference('newData2').setValue("");
    	me.lookupReference('uptData2').setValue("");
    	me.lookupReference('delData2').setValue("");
    	
    	me.lookupReference('newData3').setValue("");
    	me.lookupReference('uptData3').setValue("");
    	me.lookupReference('delData3').setValue("");
    	
    	var tab1Cnt = exCommon.ChangeCount('ds_tab1', me);
    	var tab2Cnt = exCommon.ChangeCount('ds_tab2', me);
    	var tab3Cnt = exCommon.ChangeCount('ds_tab3', me);
    	
    	console.log('tabCnt1 = ', (tab1Cnt  ) );
    	console.log('tabCnt2 = ', (tab2Cnt  ) );
    	console.log('tabCnt3 = ', (tab3Cnt ) );
    	
    	if(tab1Cnt + tab2Cnt + tab3Cnt > 0){
    		
    		var tab1Cnt = me.getViewModel().getStore('ds_tab1').getCount();
    		for(var i =0; i < tab1Cnt ; i++){
    			
    			var REPRESEN_REL = me.lookupReference('mg_tab1').getStore().getAt(i).get("REPRESEN_REL");
    			
    			if(REPRESEN_REL == null || REPRESEN_REL == "" || REPRESEN_REL == undefined ){
    				
    				me.lookupReference('tabpanel').setActiveTab(0);
    				
    				setTimeout(function(){
    					Ext.Msg.alert('알림', '관계항목은 필수 입력 사항입니다.');    				
    				},50); 
    				
    				me.lookupReference('mg_tab1').plugins[0].startEditByPosition({
    		            row    : i ,
    		            column : 2
    		        });
    				
    				return;
    			}
    		}// for tab1Cnt
    		
    		
    		
    		exCommon.gridParamSetting(me , 'ds_tab1' , 'newData1' , 'uptData1' , 'delData1'  );
    		exCommon.gridParamSetting(me , 'ds_tab2' , 'newData2' , 'uptData2' , 'delData2'  );
    		exCommon.gridParamSetting(me , 'ds_tab3' , 'newData3' , 'uptData3' , 'delData3'  );
    		
    		Ext.MessageBox.confirm('알림', '저장 하시겠습니까?', function(btn){
    			if (btn == 'yes') {
        			setTimeout(function(){
        				me.callForm(me, '/ser/SER001W_01/UserSaveTab.suvila', me.saveBotCallback , false);
        			},10);	
        		}
    		});
    		
    	}else{
    		setTimeout(function(){
    			Ext.Msg.alert('알림', '변동된 내역이 없습니다.');
    		},50);
    	}
    	
    },
    saveBotCallback : function(me, success, form, action){
    	
    	var msgType = "경고";
    	if(success){
    		msgType = "알림";
    		me.getViewModel().getStore('ds_tab1').commitChanges();
    		me.getViewModel().getStore('ds_tab2').commitChanges();
    		me.getViewModel().getStore('ds_tab3').commitChanges();
    	}
    	
    	
    	setTimeout(function(){
    		Ext.Msg.alert(msgType, Ext.decode(action.response.responseText).msg);    				
		},50); 
    	
    }
    
   
})