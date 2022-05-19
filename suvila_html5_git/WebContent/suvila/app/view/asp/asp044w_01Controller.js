Ext.define('ExFrm.view.asp.asp044w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.asp044w_01',    
    onCalled:function(params){
    },
    onHelp:function(){},
    onAfterRender:function(){
    	var me  = this;
    	
    	var today = exCommon.setDateFormat( exCommon.getNowDate() );
    	
    	me.lookupReference('me_AcceptSDateID').setExValue( exCommon.getMinusDay(730) );
		me.lookupReference('me_AcceptEDateID').setExValue( today );
    	
    },   
    onInit:function(me){
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_templeCd', '', null , me.dsTempleCallbak);
    	},50);
    },
    dsTempleCallbak : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_01_a').getView().select(0);
    	}
	},
	onSelectionTemple : function( me2 , record , selections , eOpts ) {
    	var me = this;
    	try{
    		if(record.length <=  0) return false;
    		
    		var selection = me.lookupReference('asp044w_01_a').getView().getSelectionModel().getSelection()[0];
    		
    		var params = {
        		 ASP_V_TEMPLE_CD : selection.get("TEMPLE_CD")
        		,V_ACCEPT_GBN    : 2
    		};
    		
    		setTimeout(function(){
        		me.callStore(me, 'ds_IDJGKindInfo', '', params , me.dsIdKindCallbak);
        	},50);
    		
    	}catch (e) {
    		console.log('e = ', e);
    	}
    },
    dsIdKindCallbak : function(me, success, form, action){
		setTimeout(function(){
    		me.callStore(me, 'ds_IDKindInfo', '', action._params , me.IdKindCallback);
    	},50);
	},
	IdKindCallback : function(me, success, form, action){
		var data ={
			 LIGHT_CODE : ''
			,LIGHT_NM   : '전체'
		}
		
		me.getViewModel().getStore('ds_IDKindInfo').insert(0,data);
		
		
		me.lookupReference('lc_IDJungakInfo').setExValue('0');
		me.lookupReference('lc_IDKindInfo').setExValue('');
		me.lookupReference('close_yn').setExValue('');
		
		me.getViewModel().getStore('ds_IDRec').removeAll();
	},
	onSelect : function(){
		var me  = this;
		
		var selection = me.lookupReference('asp044w_01_a').getView().getSelectionModel().getSelection()[0];
		
		console.log('onSelect');
		console.log(selection);
		console.log(selection.get("TEMPLE_CD"));
		
		var params = {
    		 V_PAY_STATE     	: ''
    		,V_PROPOSAL_BUD_NO  : ''
    		,V_ACCEPT_SDATE 	: exCommon.getRepVal(me.lookupReference('me_AcceptSDateID').getExValue(), '')
    		,V_ACCEPT_EDATE    	: exCommon.getRepVal(me.lookupReference('me_AcceptEDateID').getExValue(), '')
    		,V_CODE        		: exCommon.getRepVal(me.lookupReference('lc_IDKindInfo').getExValue(), '')
    		,V_JUNGAK_CD       	: exCommon.getRepVal(me.lookupReference('lc_IDJungakInfo').getExValue(), '')
    		,VV_USER_ID    		: ''
    		,V_APPROV     		: ''
    		,V_CLASS_CD     	: ''
    		,V_CLOSE_YN     	: exCommon.getRepVal(me.lookupReference('close_yn').getExValue(), '')
    		,VV_TEMPLE_CD       : selection.get("TEMPLE_CD")
    	}
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_IDRec', '', params ,me.onSelectCallback);
    	},10);
	},
	onSelectCallback : function(me, success, form, action){
    	if(success){
    		me.lookupReference('asp044w_01_b').getView().select(0);
    	}
    },
    onJKchange : function(opts , nowValue , oldValue){
    	var me = this;
    	
    	var selection = me.lookupReference('asp044w_01_a').getView().getSelectionModel().getSelection()[0];
    	
    	console.log('onJKchange = ', nowValue);
    	var code = nowValue;
    	
    	if(code != 0){
    		var params = {
    			 V_JUNGAK_CD  : code
    			,VV_TEMPLE_CD : selection.get("TEMPLE_CD")
    			,V_ACCEPT_GBN : 2
    		}
    		
    		
    		setTimeout(function(){
       			me.callStore(me, 'ds_building', '', params ,me.dsBuildCallback);
           	},50);
    		
    		
    		
    	}else{
    		me.resetGridData(me);
    	}
    },
    dsBuildCallback : function(me, success, form, action){
    	if(success){
    		
    		var record = me.getViewModel().getStore('ds_building').getAt(0);
    		
    		me.lookupReference('txt_jungak_nm').setExValue( record.get("JUNGAK_NM") );
    		me.lookupReference('me_verti').setExValue( record.get("VER_LINE") );
    		me.lookupReference('me_horiz').setExValue( record.get("HOZ_LINE") );
    		
    	}else{
    		me.lookupReference('txt_jungak_nm').setExValue( '' );
    		me.lookupReference('me_verti').setExValue( '' );
    		me.lookupReference('me_horiz').setExValue( '' );
    	}
    	
    	setTimeout(function(){
       		me.callStore(me, 'ds_deung', '', action._params ,me.onDsDeungkCallback);
       	},50);
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
    	try{
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
    	}catch (e) {
    		console.log(e);
    	}
    	
    	
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
        }// for
        
        
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
        $('#rec001w_07').hide();
   },
   inSindoInfo : function(sindo_light_no){
	   var me = this;
	   
	   var params = {
	   		 V_JUNGAK_CD  : me.lookupReference('lc_IDJungakInfo').getExValue()
	   		,V_ACCEPT_GBN : 2
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
    onSave : function(){
    	var me = this;
    	
    	var cnt = exCommon.ChangeCount('ds_IDRec', me);
    	
    	if(cnt <=0){
    		exCommon.msgAlert('변동내역이 없습니다.');
    		return false;
    	}
    	
    	
    	exCommon.uptParamSetting(me, 'ds_IDRec', 'uptData');
    	
    	exCommon.fnGridSaveAll( me
    			               ,'ds_IDRec'
    			               ,'newData'
    			               ,'uptData'
    			               ,'delData'
    			               ,'/asp/ASP044W_01/ideungSave.suvila'
    			               , me.onSaveCallback);
    	
    },
    onSaveCallback : function(me, success, form, action) {
    	exCommon.fnGridSaveCallback(me, success, action,'ds_IDRec');
    	if(success){
    		me.onSelect();
    	}
    }
    
	
})