Ext.define('ExFrm.view.rec.rec000p_02_7Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_7',
    onCalled:function(data){
        var me = this;
        console.log('onCalled', data);
      
        var params = {
    		 V_TEMPLE_CD  : data.TEMPLE_CD
    		,V_ACCEPT_SEQ : data.ACCEPT_SEQ
    		,V_SEQ        : data.SEQ
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_list', '', params ,me.dsListCallback);
    	},50);
    },
    dsListCallback : function(me, success, form, action){
    	me.lookupReference('rec003p_22_1').getView().select(0);
    	
    	
    	if( me.getViewModel().getStore('ds_bokwi').getCount() <= 0 ){
    		setTimeout(function(){
        		me.callStore(me, 'ds_master', '', action._params ,me.dsMasterCallback);
        	},50);
    	}else{
    		exCommon.msgAlert('검색된 데이터가 없습니다.');
    	}
    	
    	
    },
    dsMasterCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_event', '', action._params ,me.dsEventCallback);
    	},50);
    },
    dsEventCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_death', '', action._params ,me.dsDeathCallback);
    	},50);
    },
    dsDeathCallback : function(me, success, form, action){
    	setTimeout(function(){
    		me.callStore(me, 'ds_bokwi', '', action._params ,me.dsBokwiCallback);
    	},50);
    },
    dsBokwiCallback : function(me, success, form, action){
    	
    	var row = me.getViewModel().getStore('ds_bokwi').getCount();
    	
    	
    	for(var i = 0; i < row ; i++){
    		
    		var data ={
    			 SORT_SEQ_1    : exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('SORT_SEQ'), '')
    			,HYO_REL_1     : exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('HYO_REL'), '')
    			,BOKWEJA_NM_1  : exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWEJA_NM'), '')
    			,BOKWI_GUBUN_1 : exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWI_GUBUN'), '')
    			,SORT_SEQ_2    : ''
    			,HYO_REL_2     : ''
    			,BOKWEJA_NM_2  : ''
    			,SORT_SEQ_2    : ''
    		}
    		
    		/*
    		var SORT_SEQ_1    = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('SORT_SEQ'), '');
    		var HYO_REL_1     = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('HYO_REL'), '');
    		var BOKWEJA_NM_1  = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWEJA_NM'), '');
    		var BOKWI_GUBUN_1 = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWI_GUBUN'), '');
    		*/
    		
    		if(i == (row - 1)){
    			me.getViewModel().getStore('ds_bokwi_multi').add(data);
    			break;
    		}
    		i++;
    		data.SORT_SEQ_2    = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('SORT_SEQ'), '');
    		data.HYO_REL_2     = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('HYO_REL'), '');
    		data.BOKWEJA_NM_2  = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWEJA_NM'), '');
    		data.BOKWI_GUBUN_2 = exCommon.getRepVal(me.getViewModel().getStore('ds_bokwi').getAt(i).get('BOKWI_GUBUN'), '');
    		me.getViewModel().getStore('ds_bokwi_multi').add(data);
    	}
    },
    onInit:function(me){},
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onAfterRender:function(me){
    	
    	
    },
    onPrint : function(){
    	var me = this;
    	
    	var dsRow = me.getViewModel().getStore('ds_list').getCount();
    	var rd_gidoGbn = me.lookupReference('rd_paperGbn').getValue().rd_paperGbn;
    	
    	console.log('rd_gidoGbn = ', rd_gidoGbn);
    	
    	var params      = {};
    	var jsonAllData = {};
    	if(rd_gidoGbn == 0 || rd_gidoGbn == '0'){
    		
        	
        	var A_HYO_REL    = '';
        	var A_BOKWIJA_NM = '';
        	
        	
        	var jsonListData = [];
        	for(var i = 0; i < me.getViewModel().getStore('ds_list').getCount() ; i++){
        		var record = me.getViewModel().getStore('ds_list').getAt(i);
        		
        		record.set("SPECIAL",  me.lookupReference('txt_wish').getExValue());
        		
        		var JOIN_SEQ   = exCommon.getRepVal( record.get("JOIN_SEQ") , '');
        		var HYO_REL    = exCommon.getRepVal( record.get("HYO_REL") , '');
        		var BOKWIJA_NM = exCommon.getRepVal( record.get("BOKWIJA_NM") , '');
        		
        		if(JOIN_SEQ == '1' || ( A_HYO_REL != HYO_REL || A_BOKWIJA_NM !=  BOKWIJA_NM) && HYO_REL != ''  ){
        			record.set("PRO_NAME_KOR",  BOKWIJA_NM );
        		}
        		A_HYO_REL    = HYO_REL;
        		A_BOKWIJA_NM = BOKWIJA_NM;
        		
        		jsonListData.push(record.data);
        	}// i
        	
        	var jsonMasterData = [];
        	for(var i = 0; i < me.getViewModel().getStore('ds_master').getCount() ; i++){
        		var record = me.getViewModel().getStore('ds_master').getAt(i);
        		record.data.MONK_NM    = exCommon.getRepVal( record.data.MONK_NM , '');
        		record.data.WISH       = exCommon.getRepVal( me.lookupReference('txt_wish').getExValue() , '');
        		record.data.DAEJU_ADDR = exCommon.getRepVal( record.data.DAEJU_ADDR1 , '') + ' ' + exCommon.getRepVal( record.data.DAEJU_ADDR2 , '');
        		record.data.ACCEPT_GBN = '6';
        		jsonMasterData.push(record.data);
        	}// for
        	
        	var jsonEventData = [];
        	for(var i = 0; i < me.getViewModel().getStore('ds_event').getCount() ; i++){
        		var record = me.getViewModel().getStore('ds_event').getAt(i);
        		jsonEventData.push(record.data);
        	}// for
        	
        	var jsonDeathData = [];
        	for(var i = 0; i < me.getViewModel().getStore('ds_death').getCount() ; i++){
        		var record = me.getViewModel().getStore('ds_death').getAt(i);
        		jsonDeathData.push(record.data);
        	}// for
        	
        	var jsonBokwiData = [];
        	for(var i = 0; i < me.getViewModel().getStore('ds_bokwi_multi').getCount() ; i++){
        		var record = me.getViewModel().getStore('ds_bokwi_multi').getAt(i);
        		jsonBokwiData.push(record.data);
        	}// for
        	
        	jsonAllData = {
      			 'master'  : jsonMasterData
      			,'event'   : jsonEventData
      			,'death'   : jsonDeathData
      			,'bokwi'   : jsonBokwiData
      			,'list'    : jsonListData
      		}
        	params = {
        		 FILE_PATH  : '/rec000p_02_5_rp_list1.ozr' 
        		,PRINT_DATA : jsonAllData
        	};
        	
    	}
    	else{
    		var WEPAE_INDEX = 1;  /*-- 위패 COUNT (MAX = 4)--*/
    		var CNT         = me.getViewModel().getStore('ds_list').getAt(0).get("CNT");
    		var	ROW         = CNT;
    		
    		var jsonPrintData = [];
    		for(var i=0 ; i< ROW ; i++){
    			
    			
    			var BOK_INFO  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("HYO_REL"), '') + ' ' + 
    						    exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BOKWEJA_NM"), '') + ' '+ 
    						    exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BOK_KIBU_HAN"), '');
    			var DECE_REL1 = ''; var BON_SEX_NM1 = ''; var DECE_BUD_NM1 = ''; var DEATH_HAN1 = '';
    			var DECE_REL2 = ''; var BON_SEX_NM2 = ''; var DECE_BUD_NM2 = ''; var DEATH_HAN2 = '';
    			var DECE_REL3 = ''; var BON_SEX_NM3 = ''; var DECE_BUD_NM3 = ''; var DEATH_HAN3 = '';
    			var DECE_REL4 = ''; var BON_SEX_NM4 = ''; var DECE_BUD_NM4 = ''; var DEATH_HAN4 = '';
    			
    			if(CNT >= 1){
    				DECE_REL1    = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_REL"), '');
    				BON_SEX_NM1  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BON_SEX_NM"), '');
    				DECE_BUD_NM1 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_BUD_NM"), '');
    				DEATH_HAN1   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DEATH_HAN"), '');
    			}
    			
    			if(CNT >= 2){
    				i++;
    				DECE_REL2    = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_REL"), '');
    				BON_SEX_NM2  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BON_SEX_NM"), '');
    				DECE_BUD_NM2 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_BUD_NM"), '');
    				DEATH_HAN2   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DEATH_HAN"), '');
    			}
    			
    			if(CNT >= 3){
    				i++;
    				DECE_REL3    = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_REL"), '');
    				BON_SEX_NM3  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BON_SEX_NM"), '');
    				DECE_BUD_NM3 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_BUD_NM"), '');
    				DEATH_HAN3   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DEATH_HAN"), '');
    			}
    			
    			if(CNT >= 4){
    				i++;
    				console.log( me.getViewModel().getStore('ds_list').getAt(i) );
    				DECE_REL4    = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_REL"), '');
    				BON_SEX_NM4  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("BON_SEX_NM"), '');
    				DECE_BUD_NM4 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DECE_BUD_NM"), '');
    				DEATH_HAN4   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("DEATH_HAN"), '');
    				CNT -= 4;
    			}
    			var data ={
    				 DECE_REL1    : DECE_REL1
    				,BON_SEX_NM1  : BON_SEX_NM1
    				,DECE_BUD_NM1 : DECE_BUD_NM1
    				,DEATH_HAN1   : DEATH_HAN1
    				,DECE_REL2    : DECE_REL2
    				,BON_SEX_NM2  : BON_SEX_NM2
    				,DECE_BUD_NM2 : DECE_BUD_NM2
    				,DEATH_HAN2   : DEATH_HAN2
    				,DECE_REL3    : DECE_REL3
    				,BON_SEX_NM3  : BON_SEX_NM3
    				,DECE_BUD_NM3 : DECE_BUD_NM3
    				,DEATH_HAN3   : DEATH_HAN3
    				,DECE_REL4    : DECE_REL4
    				,BON_SEX_NM4  : BON_SEX_NM4
    				,DECE_BUD_NM4 : DECE_BUD_NM4
    				,DEATH_HAN4   : DEATH_HAN4
    				,BOK_INFO     : BOK_INFO
    			};
    			
    			jsonPrintData.push( data );
    			
    		}// for i
    		
    		jsonAllData = {
   	 			 'info'  : jsonPrintData
       		}
    		params = {
           		 FILE_PATH  : '/rec000p_02_5_rp_list2.ozr' 
           		,PRINT_DATA : jsonAllData
           	};
    		
    	}
    	
    	console.log(params );
    	
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
        },100);
    },
    
})