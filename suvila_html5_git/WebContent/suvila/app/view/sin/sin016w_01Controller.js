Ext.define('ExFrm.view.sin.sin016w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin016w_01',    
    onCalled:function(params){
    },
    onInit:function(me){
    	var params = {};
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	me.lookupReference('me_SDate').setExValue( today );
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_yn_issue', '', null , me.dsYnIssueCallback);
    	},50);
    	
    	setTimeout(function(){
    		me.onSelect();
    	},650);
    	
    },
    dsYnIssueCallback : function(me, success, form, action){
    	
    },
    onSelect : function (sel_row_index){
    	var me = this;
    	
    	
    	var sel_row_index = sel_row_index;
    	if(isNaN(sel_row_index)){
    		sel_row_index = 0;
    	}
    	var G_ROW_INDEX = exCommon.getRepVal(sel_row_index , 0);
    	
    	var param = {
    		 V_ACT_DATE : me.lookupReference('me_SDate').getExValue()
    		,G_ROW_INDEX        : G_ROW_INDEX
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_main', '', param , me.dsDetailCallback);
    	},50);
    },
    dsDetailCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('rec030w_01_a').getView().select(action._params.G_ROW_INDEX);
    	}
    },
    onSelectionChange : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		me.lookupReference('memo').setExValue(record[0].get("MEMO"));
    		me.onDeleteFile();
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    onSaveInfo : function(){
    	var me = this;
    	
    	var selection = me.lookupReference('rec030w_01_a').getView().getSelectionModel().getSelection()[0]; 
    	
    	var jsonNewData = [];
    	jsonNewData.push(selection.data);
    	me.lookupReference('newData').setExValue(Ext.encode(jsonNewData));
    	
    	
    	Ext.MessageBox.confirm('??????', '??????????????????????', function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC030W_01/saveSindoCardNew.suvila', me.onSaveCallback , false);
    			},50);
    		}
    	});
    },
    onSaveCallback : function(me, success, form, action){
    	console.log('action',action);
    	
    	if(success){
    		exCommon.msgAlert('?????????????????????.');
    		
    		var selectedRecord = me.lookupReference('rec030w_01_a').getView().getSelectionModel().getSelection()[0];
    		var rowIndex       = me.lookupReference('rec030w_01_a').getStore().indexOf(selectedRecord);
    		
    		me.onSelect(rowIndex);    		
    	}else{
    		exCommon.msgAlert('?????? ??????????????????.');
    	}
    },
    onCancel : function(){
    	var me = this;
    	
    	var cnt  = me.getViewModel().getStore('ds_main').getCount();
    	var flag = 0;
    	
    	var jsonUptData = [];
    	
    	for(var i = 0; i < cnt ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if(record.get("CHECK_P")){
    			if( !record.get("ISSUE_STATE") == "1" ){
    				exCommon.msgAlert('???????????? ????????? ?????? ???????????????.');
    				me.lookupReference('rec030w_01_a').getView().select(i);
    				return;
    			}else{
    				record.set("DEL_YN", 'F');
    				jsonUptData.push(record.data);
    				flag++;
    			}
    		}
    	}// for i
    	console.log('flag = ', flag);
    	if(flag <= 0 ){
    		exCommon.msgAlert('?????? ?????? ???????????????.');
    		return;
    	}
    	me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
    	
    	Ext.MessageBox.confirm('??????', '???????????? ?????? ????????????????', function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC030W_01/cancelSinCard.suvila', me.onCancelCallback , false);
    			},50);
    		}
    	});
    	
    },
    onCancelCallback : function(me, success, form, action){
    	if(success){
    		exCommon.msgAlert('?????? ???????????????.');
    		me.onSelect();
    	}else{
    		exCommon.msgAlert('?????? ??????????????????.');
    		return;
    	}
    },
    onDelete : function(){
    	var me = this;
    	
    	var cnt  = me.getViewModel().getStore('ds_main').getCount();
    	var flag = 0;
    	
    	var jsonUptData = [];
    	
    	for(var i = 0; i < cnt ; i++){
    		var record = me.getViewModel().getStore('ds_main').getAt(i);
    		
    		if(record.get("CHECK_P")){
    			if( !record.get("ISSUE_STATE") == "1" ){
    				exCommon.msgAlert('???????????? ????????? ?????? ???????????????.');
    				me.lookupReference('rec030w_01_a').getView().select(i);
    				return;
    			}else{
    				record.set("DEL_YN", 'T');
    				jsonUptData.push(record.data);
    				flag++;
    			}
    		}
    	}// for i
    	
    	console.log('flag = ', flag);
    	if(flag <= 0 ){
    		exCommon.msgAlert('?????? ?????? ???????????????.');
    		return;
    	}
    	me.lookupReference('uptData').setExValue(Ext.encode(jsonUptData));
    	
    	Ext.MessageBox.confirm('??????', '???????????? ??????????????????????', function(btn){
    		if (btn == 'yes') {
    			setTimeout(function(){
    				me.callForm(me, '/rec/REC030W_01/deleteSinCard.suvila', me.onCancelCallback , false);
    			},50);
    		}
    	});
    	
    },
    onExcel : function (){
    	var me = this;
    	var grid = me.lookupReference('rec030w_01_a');
    	
    	exCommon.excelDown(grid, 'apply_sin_card', '???????????????',  me.getViewModel().getStore('ds_main').getCount());
    },
    onChangeFile:function(input, fileName){
    	var me = this;
    	
    	console.log('input = ', input);
    	console.log('fileName = ', fileName);
    	
    	var file = input.fileInputEl.dom.files[0];
    	
        if( file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png' || file.type == 'image/gif'){
        }else {
            Ext.Msg.alert('??????', '????????? jpeg, jpg, png, gif ????????? ???????????????.');
            return;
        }
    	
    	var reader = new FileReader();
        reader.onload = function (e) {
            me.lookupReference('image').setSrc(e.target.result); 
            me.lookupReference('fileName').setValue(fileName); 
        }
        reader.readAsDataURL(file);
    },
    onDeleteFile:function(){
        var me  = this;
        me.lookupReference('file').reset();
        me.lookupReference('fileName').reset();
        me.lookupReference('image').setSrc('');
    }
})