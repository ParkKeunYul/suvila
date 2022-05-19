Ext.define('ExFrm.view.asp.asp001w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp001w_01',
    onMainInfo:function(params){
        var me = this;
        me.callStore(me, 'ds_main', '', params, me.onMainInfoCallback);
    },
    onMainInfoCallback:function(me, success, records, operation){
    	console.log('onMainInfoCallback', success);
        if(success == true){
        	try{
        		me.lookupReference('asp001w_01_a').getView().select(0);
        	}catch(Exception){}
        }
        
        setTimeout(function(){
    		me.callStore(me, 'ds_sect', '', null, me.dsSectCallback);
    	},50);
    },
    dsSectCallback:function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_mobile_telno', '', null, me.dsMobileTelCallback);
    	},50);
    },
    dsMobileTelCallback:function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_telno', '', null, me.dsTelnoCallback);
    	},50);
    },
    dsTelnoCallback:function(me, success, records, operation){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death_type', '', null, null);
    	},50);
    },
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', params, me.onMainInfoCallback)
    	},100);  
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    },
    onSearchEnter: function(me, e, eOpts ){
    	if(e.keyCode == 13){
    		this.onSearchItems();
    	}
    },
    onSearchItems:function(){
        var me = this;
        var params = {
        	PARAM_TEMPLE_NM : encodeURI(me.lookupReference('temple_nmSrch').getExValue())
        };
        me.onMainInfo(params);
    },
    selectedRecord:{},
    onMainGridClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
        me.onSettingData(me,record.data);
    },
    onSelectionChange : function( me , record , selections , eOpts ) {
    	try{
    		this.onSettingData(this,record[0].data);
    	}catch(Exception){}
    },
    onUpdate:function(){
        var me = this;
    },
    onUpdateCallback:function(me, success, form, action){
        if(success){
            me.getViewModel().getStore('ds_main').commitChanges();
        }
    },
    onKeyUpJumin : function (key){
    	var me = this;
    	var jumin  = me.lookupReference('me_admin_id').getExValue().replace('-','');
    	if(jumin.length > 6){
    		var juminB = jumin.substr(6, jumin.length-1);
    		var result = jumin.substr(0,6) + "-" + juminB;
    		me.lookupReference('me_admin_id').setExValue(result);
    	}else{
    		me.lookupReference('me_admin_id').setExValue(jumin);
    	}
    },
    onKeyUpReg : function (key){
    	var me  = this;
    	var reg = me.lookupReference('me_reg_number').getExValue();
    	
    	if(reg.length == 12){
    		me.lookupReference('me_reg_number').setExValue(reg);
    	}else{
    		reg = reg.replace(/-/g,"");
	    	var result = "";
	    	if(reg.length > 5){
	    		var regC = reg.substring(3,5);
	    		var regB = reg.substring(5, reg.length);
	    		result = reg.substr(0,3) + "-" + regC + "-"+regB;
	    		
	    		me.lookupReference('me_reg_number').setExValue(result);
	    	}else if(reg.length > 3){
	    		var regC = reg.substr(3, reg.length-1);    	
	    		result = reg.substr(0,3) + "-" + regC;
	    		me.lookupReference('me_reg_number').setExValue(result);
	    	}else{
	    		me.lookupReference('me_reg_number').setExValue(reg);
	    	}
    	}    	
    },
    onFindAddr : function(){
    	var params = {};
        this.openPopup('ExFrm.view.com.post',  params, this.onFindAddrReceive);
    },
    onFindAddrReceive : function(params, me){
    	me.lookupReference('em_depu_postno').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_depu_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_depu_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_depu_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_depu_addr2').focus();
    },
    onFindSojeAddr : function(){
    	var params = {};
        this.openPopup('ExFrm.view.com.post',  params, this.onFindSojeAddrReceive);
    },
    onFindSojeAddrReceive : function(params, me){
    	me.lookupReference('em_soje_postno').setExValue(params.ZIPCODE);
    	me.lookupReference('txt_soje_addr1').setExValue(params.ADDR1);
    	me.lookupReference('txt_soje_addr3').setExValue(params.ADDR3);
    	me.lookupReference('txt_soje_bldg_num').setExValue(params.BLDG_NUM);
    	me.lookupReference('txt_soje_addr2').focus();
    },
    onSettingData : function (me,data){
    	
    	me.lookupReference('txt_sql_mode').setValue(data.SQL_MODE);
    	
    	
    	me.lookupReference('txt_admin_id').setReadOnly(true);
    	if(data.SQL_MODE == "INSERT") me.lookupReference('txt_admin_id').setReadOnly(false);
    	
    	
    	me.lookupReference('txt_temple_cd').setValue(data.TEMPLE_CD);
    	me.lookupReference('txt_temple_nm').setValue(data.TEMPLE_NM);
    	me.lookupReference('lc_sect').setValue(data.SECT_CD);
    	me.lookupReference('txt_admin_id').setExValue(data.ADMIN_ID);
    	me.lookupReference('txt_passwd').setValue(data.PASSWD);
    	me.lookupReference('me_admin_id').setValue(data.REP_JUMINNO);
    	me.lookupReference('me_reg_number').setValue(data.REG_NUMBER);
    	me.lookupReference('txt_rep_name').setValue(data.REP_NAME);
    	me.lookupReference('em_depu_postno').setValue(data.REP_POSTNO);
    	me.lookupReference('txt_depu_addr1').setValue(data.DEPU_ADDR1);
    	me.lookupReference('txt_depu_addr2').setValue(data.DEPU_ADDR2);
    	me.lookupReference('txt_depu_addr3').setValue(data.DEPU_ADDR3);
    	me.lookupReference('txt_depu_bldg_num').setValue(data.DEPU_BLDG_NUM);
    	me.lookupReference('em_soje_postno').setValue(data.POSTNO);
    	me.lookupReference('txt_soje_addr1').setValue(data.SOJE_ADDR1);
    	me.lookupReference('txt_soje_addr2').setValue(data.SOJE_ADDR2);
    	me.lookupReference('txt_soje_addr3').setValue(data.SOJE_ADDR3);
    	me.lookupReference('txt_soje_bldg_num').setValue(data.SOJE_BLDG_NUM);
    	me.lookupReference('lc_mobile_telno').setValue(data.MOBILE_TELNO1);
    	me.lookupReference('txt_mobile_telno2').setValue(data.MOBILE_TELNO2);
    	me.lookupReference('txt_mobile_telno3').setValue(data.MOBILE_TELNO3);
    	me.lookupReference('lc_telno').setValue(data.TELNO1);
    	me.lookupReference('txt_telno2').setValue(data.TELNO2);
    	me.lookupReference('txt_telno3').setValue(data.TELNO3);
    	me.lookupReference('me_user_limit').setValue(data.USER_LIMIT);
    	me.lookupReference('me_act_limit').setValue(data.ACT_LIMIT);
    	me.lookupReference('lc_use_yn').setValue(data.USE_YN);
    	me.lookupReference('lc_sms_yn').setValue(data.SMS_YN);
    	me.lookupReference('lc_death_type').setValue(data.DEATH_TYPE);
    	me.lookupReference('lc_rec_result').setValue(data.REC_RESULT_TYPE);
    	me.lookupReference('lc_search_gbn').setValue(data.SEARCH_GBN);
    	me.lookupReference('lc_print_age_yn').setValue(data.PRINT_AGE_YN);
    	me.lookupReference('lc_print_yeondeung_yn').setValue(data.PRINT_YEONDEUNG_YN);
    	me.lookupReference('lc_print_form_yn').setValue(data.PRINT_FORM_YN);
    	me.lookupReference('file_name').setValue(data.FILE_NAME);
    	me.lookupReference('card_price_temple').setValue(data.PRICE_CARD_TEMPLE);
    	me.lookupReference('remark').setValue(data.REMARK);
    	me.lookupReference('crt_date').setValue(data.CRT_DATE);
    	me.lookupReference('lc_sect').setValue(data.SECT_CD);
    	me.lookupReference('txt_file_cnt').setValue(data.FILE_CNT);
    	
    	var SIN_SMS_YN   = data.SIN_SMS_YN.substr(0,1);
    	var SIN_BIRTH_YN = data.SIN_SMS_YN.substr(1,1);
    	var SIN_GROUP_YN = data.SIN_SMS_YN.substr(2,1);
    	
    	
    	me.lookupReference('sin_sms_yn').setValue(SIN_SMS_YN);
    	me.lookupReference('sin_birth_yn').setValue(SIN_BIRTH_YN);
    	me.lookupReference('sin_group_yn').setValue(SIN_GROUP_YN);
    	
    	
    	var jumin  = data.REP_JUMINNO.replace('-','');
    	if(jumin.length > 6){
    		var juminB = jumin.substr(6, jumin.length-1);
    		var result = jumin.substr(0,6) + "-" + juminB;
    		me.lookupReference('me_admin_id').setExValue(result);
    	}else{
    		me.lookupReference('me_admin_id').setExValue(jumin);
    	}
    	
    	
    	var reg = data.REG_NUMBER.replace('-','');
    	    reg = reg.replace('-','');
    	if(reg.length == 12){
    		me.lookupReference('me_reg_number').setExValue(reg);
    	}else{
    		reg = reg.replace(/-/g,"");
	    	var result = "";
	    	if(reg.length > 5){
	    		var regC = reg.substring(3,5);
	    		var regB = reg.substring(5, reg.length);
	    		result = reg.substr(0,3) + "-" + regC + "-"+regB;
	    		
	    		me.lookupReference('me_reg_number').setExValue(result);
	    	}else if(reg.length > 3){
	    		var regC = reg.substr(3, reg.length-1);    	
	    		result = reg.substr(0,3) + "-" + regC;
	    		me.lookupReference('me_reg_number').setExValue(result);
	    	}else{
	    		me.lookupReference('me_reg_number').setExValue(reg);
	    	}
    	}
    	
    	if(data.FILE_CNT == 1){
    		me.lookupReference('down_img').show();
    		me.lookupReference('del_img').show();
    	}else{
    		me.lookupReference('down_img').hide();
    		me.lookupReference('del_img').hide();
    	}
    	
    	    	    	    	
    	var params = {
    		V_NEW_TEMPLE_CD : data.TEMPLE_CD
    	}
    	
    	me.callStore(me, 'ds_approval', '', params, me.onAppDataCallback(me))
    },
    onAppDataCallback : function (me){
    	me.lookupReference('asp001w_01_b').getView().select(0);
    },
    onAppNew : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_approval').getCount();
    	
    	for(var i =0; i < rowCount ; i++){
    		var appTitle = me.lookupReference('asp001w_01_b').getStore().getAt(i).data.APPROVAL_TITLE;
    		if( appTitle == null || appTitle.trim()  == ""   ){
    			Ext.Msg.alert('경고', '결재담당자를 입력하세요.');    			
    			return;
    			
    		}    		
    	}
    	
    	var selection = this.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection();
    	
    	var data = {
    		SORT_SEQ: (rowCount+1),
    		TEMPLE_CD : selection[0].data.TEMPLE_CD,
    		APPROVAL_TITLE:'' 		
        };
    	me.getViewModel().getStore('ds_approval').add(data);
    	me.lookupReference('asp001w_01_b').getView().select(rowCount);    	
    	    	        
    	me.lookupReference('asp001w_01_b').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    },
    onAppDel : function(){
        var me = this;
        var selectedRecord = this.lookupReference('asp001w_01_b').getView().getSelectionModel().getSelection()[0];
        var removeRowIndex = me.getViewModel().getStore('ds_approval').indexOf(selectedRecord);
        
        Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
        
	        if (btn == 'yes') {  
	        	me.lookupReference('asp001w_01_b').getStore().remove(selectedRecord);
	        	
	        	var records = me.getViewModel().getStore('ds_approval').getRemovedRecords();
	        	
	            var params = {
	            		V_SORT_SEQ       : records[0].data.SORT_SEQ,
	            		V_TEMPLE_CD      : records[0].data.TEMPLE_CD,
	            		V_APPROVAL_TITLE : encodeURI(records[0].data.APPROVAL_TITLE)             			
	            };
	         
	            me.callAjax(me, '/asp/asp001w_01/ApprovalDelete.suvila', params, me.onAppDelCallback , false , true);
	            
	            
	        }  
        }); 
    },
    onAppDelCallback:function(me, success, res, record){
    	var msgType = "알림";
    	
    	if(!success){
    		Ext.Msg.alert('오류', record.msg);
    	}else{
    		me.getViewModel().getStore('ds_approval').commitChanges();
    		Ext.Msg.alert('알림', record.msg);
    	}
    	
    },
    onAppSave : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_approval').getCount();
    	
    	 me.lookupReference('appUptData').setExValue("");
    	 me.lookupReference('appNewData').setExValue("");
    	
    	var dataCnt =0;
    	
    	for(var i =0; i < rowCount ; i++){
    		var appTitle = me.lookupReference('asp001w_01_b').getStore().getAt(i).data.APPROVAL_TITLE;
    		if( appTitle == null || appTitle.trim()  == "" ){
    			Ext.Msg.alert('알림', '결재담당자를 입력하세요.');    			
    			return;
    		}    		
    	}
    	
    	var jsonNewData = [];
        var records = this.getViewModel().getStore('ds_approval').getNewRecords();
        for (var i=0; i < records.length; i++){
        	jsonNewData.push(records[i].data);
        	dataCnt ++;
        }
        
        me.lookupReference('appNewData').setExValue(Ext.encode(jsonNewData));
        console.log('appNewData', me.lookupReference('appNewData').getValue() );
        
        var jsonUptData = [];
        records = this.getViewModel().getStore('ds_approval').getUpdatedRecords();
        for (var i=0; i < records.length; i++){
        	console.log('getUpdatedRecords', records[i].data);
        	jsonUptData.push(records[i].data);
        	dataCnt ++;
        }
        me.lookupReference('appUptData').setExValue(Ext.encode(jsonUptData));
        
        
        if(dataCnt != 0){
        	me.callForm(me, '/asp/asp001w_01/ApprovalSave.suvila', me.onAppSaveCallback , false);
        }else{
        	Ext.Msg.alert('알림', '변경된 자료가 없습니다.');
        }
        
        
    },
    onAppSaveCallback : function(me, success, form, action){
    	var callback = Ext.decode(action.response.responseText);
    	var msgType = "알림";
    	
    	
    	
    	if(!success){
    		Ext.Msg.alert('오류', callback.msg);
    	}else{
    		me.getViewModel().getStore('ds_approval').commitChanges();
    		Ext.Msg.alert('알림', callback.msg);
    		
    		me.lookupReference('appNewData').setExValue("");
    		me.lookupReference('appUptData').setExValue("");
    	}
    },
    onAddTemple : function(){
    	var me = this;
    	var rowCount = me.getViewModel().getStore('ds_main').getCount();
    	
    	for(var i =0; i < rowCount ; i++){
    		var templeNm = me.lookupReference('asp001w_01_a').getStore().getAt(i).data.TEMPLE_NM;
    		if( templeNm == null || templeNm.trim()  == ""   ){
    			Ext.Msg.alert('경고', '사찰명을 입력하세요.');
    			return;    			
    		}    		
    	}
    	
    	var selection = this.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection();
    	
    	var data = {    		    		   
    		SQL_MODE : 'INSERT'  ,
    		SECT_CD : 1,
    		DEATH_TYPE : 1,
    		SMS_YN : 'Y',
    		USE_YN : 'T',
    		SEARCH_GBN : 'NAME_KOR',
    		ACT_LIMIT : 100,
    		PRINT_YEONDEUNG_YN : 'T',
    		REC_RESULT_TYPE : 'F',
    		PRICE_CARD_TEMPLE : 0,
    		USER_LIMIT : 0
        };
    	
    	
    	me.lookupReference('sin_sms_yn').setValue('Y');
    	me.lookupReference('sin_birth_yn').setValue('Y');
    	me.lookupReference('sin_group_yn').setValue('Y');
    	
    	me.getViewModel().getStore('ds_main').add(data);
    	me.lookupReference('asp001w_01_a').getView().select(rowCount);    	
    	
    	me.lookupReference('asp001w_01_a').plugins[0].startEditByPosition({
            row: rowCount,
            column: 1
        });
    	
    	me.lookupReference('txt_admin_id').setReadOnly(false);
    	
    	me.lookupReference('asp001w_01_b').getStore().removeAll();
    },
    onSaveTemple : function(){
    	var me = this;
    	if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
    	
    	var sqlMode =  me.lookupReference('txt_sql_mode').getValue();
    	
    	Ext.MessageBox.confirm('경고', '저장하시겠습니까?', function(btn){  
    		if (btn == 'yes') {
    			
    			if(sqlMode == "INSERT"){
    				me.callForm(me, '/asp/asp001w_01/Save.suvila', me.SaveTempleCallback , false);
    			}else{
    				me.callForm(me, '/asp/asp001w_01/Save.suvila', me.onUptTempleCallback , false);
    			}
    		}
    	}); 
    },
    SaveTempleCallback : function(me, success, form, action){
    	var callback = Ext.decode(action.response.responseText);
    	var msgType = "경고";
    	if(success){
    		msgType = "알림";
    		me.onSearchItems();
    	}
    	Ext.Msg.alert(msgType, callback.msg);
    },
    onUptTempleCallback : function(me, success, form, action){
    	var callback = Ext.decode(action.response.responseText);
    	var FILE_CNT = callback.data.FILE_CNT;
    	
    	if(success){
    		
    		var selectedRecord = me.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection()[0];
            var selectIndex = me.getViewModel().getStore('ds_main').indexOf(selectedRecord);
    		me.getViewModel().getStore('ds_main').getAt(selectIndex).data.FILE_CNT = FILE_CNT;
    		me.getViewModel().getStore('ds_main').commitChanges();
    		
    		if(FILE_CNT == 1){
    			me.lookupReference('down_img').show();
        		me.lookupReference('del_img').show();
    		}else{
    			me.lookupReference('down_img').hide();
        		me.lookupReference('del_img').hide();
    		}
    		
    		Ext.Msg.alert('알림', callback.msg);
    	}else{
    		Ext.Msg.alert('경고', callback.msg);
    	}
    },
    onDownImg : function (){
    	var me = this;
    	var selection = this.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection();
    	var templeCd = selection[0].data.TEMPLE_CD;
    	
    	
    	var params = {
    		V_FILE_TEMPLE_CD : templeCd 	
    	};
    	me.callAjax(me, '/asp/asp001w_01/selectImage.suvila', params, me.onDownImgCallback , false , true);
    },
    onDownImgCallback : function (me, success, res, record, opts){
    	var callback = Ext.decode(res.responseText);
    	
    	console.log('onDownImgCallback success', success);
    	console.log('onDownImgCallback opts', opts.params.V_FILE_TEMPLE_CD);
    	
    	var V_FILE_TEMPLE_CD = opts.params.V_FILE_TEMPLE_CD;
    	
    	if(!success){
    		Ext.Msg.alert('경고', record.msg);
    	}else{
    		
    		var imgUrl = '/asp/asp001w_01/selectImageDown.suvila?V_FILE_TEMPLE_CD='+V_FILE_TEMPLE_CD;
    		Ext.DomHelper.append(Ext.getBody(),{ 
    	    	tag: 'iframe', 
    	    	frameBorder: 0, 
    	    	width: 0, 
    	    	height: 0, 
    	    	css: 'display:none;visibility:hidden;height:0px;', 
    	    	src: imgUrl
        	});
    	}
    	
    },
    onDelImg : function (){
    	var me        = this;
    	var selection = this.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection();
    	var templeCd  = selection[0].data.TEMPLE_CD;
    	
    	var params = {
    		V_FILE_TEMPLE_CD : templeCd 	
    	};
    	
    	Ext.MessageBox.confirm('경고', '삭제하시겠습니까?', function(btn){  
	        if (btn == 'yes') {  
	        	me.callAjax(me, '/asp/asp001w_01/delectImage.suvila', params, me.onDelImgCallback , false , true);
	        }  
        }); 
    	
    },
    onDelImgCallback : function (me, success, res, record, opts){
    	var callback = Ext.decode(res.responseText);
    	
    	console.log('onDelImgCallback record', record);
    	console.log('onDelImgCallback res', res);
    	
    	var msgType = "경고";
    	if(success){
    		msgType = "알림";
    		var selectedRecord = me.lookupReference('asp001w_01_a').getView().getSelectionModel().getSelection()[0];
            var selectIndex = me.getViewModel().getStore('ds_main').indexOf(selectedRecord);
    		
            me.lookupReference('down_img').hide();
    		me.lookupReference('del_img').hide();
    		
    		me.getViewModel().getStore('ds_main').getAt(selectIndex).data.FILE_CNT = 0;
    		me.lookupReference('txt_file_cnt').setValue(0);
    		me.getViewModel().getStore('ds_main').commitChanges();
    	}
    	Ext.Msg.alert(msgType, callback.msg);
    }
    
    
})