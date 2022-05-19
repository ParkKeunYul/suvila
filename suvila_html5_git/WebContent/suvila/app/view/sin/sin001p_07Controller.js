Ext.define('ExFrm.view.sin.sin001p_07Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_07',
    onCalled:function(store){
        var me = this;
        console.log('onCalled', store);
      
        var cnt       =   store.getCount();
        var BUD_CODE  = "";
        for(i = 0 ; i < cnt ; i++){
        	var record = store.getAt(i);
        	record.set("CHECK_P", true);
        	
        	var data = record.data;
        	
        	var TEMPLE_CD      = data.TEMPLE_CD;
        	var BIRTHDAY       = exCommon.getRepVal(data.BIRTHDAY,'');
        	var LUNAR_SOLAR    = exCommon.getRepVal(data.LUNAR_SOLAR,'');
        	var death_type     = exCommon.user.death_type;
        	var LUNAR_SOLAR_NM = '음 ';
        	if(LUNAR_SOLAR == 'F'){
        		LUNAR_SOLAR_NM = '양 '
        	}
        	
        	
        	var FMLY_BIRTHDAY = '';
        	
        	if(BIRTHDAY.length == 8){
        		
        		var nowYear   = parseInt( exCommon.setDateFormat( exCommon.getNowDate() ).substr(0,4))
            	var birthYear = parseInt( BIRTHDAY.substr(0,4) );
        		
        		if(death_type == 1){
        			FMLY_BIRTHDAY = LUNAR_SOLAR_NM + BIRTHDAY.substr(0,4)+'년' + BIRTHDAY.substr(4,2)+'월' + BIRTHDAY.substr(6,2) + '일'
        		}
        		
        		try{
        			BIRTHDAY = (nowYear - birthYear + 1) + '세';
        		}catch (e) {}
        		
        	}else{
        		BIRTHDAY      = '';
        	}
        	
        	
        	data.FMLY_BIRTHDAY = FMLY_BIRTHDAY;
        	data.BIRTHDAY = BIRTHDAY;
        	
        	me.getViewModel().getStore('ds_pray_temp').add(data);
        	
        	BUD_CODE = record.get("BUD_CODE");
        	
        }// for
        
        var params ={
        	V_BUD_CODE : BUD_CODE
        };
        
        setTimeout(function(){
    		me.callStore(me, 'ds_cheanHon', '', params ,me.cheanHonCallback);
    	},50);
        
    },
    onInit:function(me){},
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onAfterRender:function(me){
    	
    	
    },
    cheanHonCallback : function(me, success, form, action){
    	me.lookupReference('sin001p_07_b').getView().select(0);
    	me.lookupReference('sin001p_07_a').getView().select(0);
    },
    onRadioClick : function(field, newValue, oldValue, options){
    	var me = this;
    	if(newValue.rd_gidoGbn == '3'){
    		me.lookupReference('upDownArea').setHidden(true);
    		me.lookupReference('sin001p_07_a').setHidden(false);    		
    		me.lookupReference('sin001p_07_b').setHidden(false);
    	}else if(newValue.rd_gidoGbn == '2'){
    		me.lookupReference('upDownArea').setHidden(false);
    		me.lookupReference('sin001p_07_a').setHidden(true);    		
    		me.lookupReference('sin001p_07_b').setHidden(false);
    	}else if(newValue.rd_gidoGbn == '1'){
    		me.lookupReference('upDownArea').setHidden(false);
    		me.lookupReference('sin001p_07_a').setHidden(false);    		
    		me.lookupReference('sin001p_07_b').setHidden(true);
    	}
    	    	    	    	
    },
    onPrint : function(){
    	var me = this;
    	
    	var rd_gidoGbn = me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn;
    	

    	
    	var jsonPrayData   = [];
    	
    	if(rd_gidoGbn == 1 || rd_gidoGbn == 3){
    		var p_row = me.getViewModel().getStore('ds_pray_temp').getCount();
    		var pCnt  = 1;
    		
    		var daejuData;
    		var firData;
    		
    		for(var i = 0 ; i < p_row ; i++){
    			var record = me.getViewModel().getStore('ds_pray_temp').getAt(i);
    			
    			var SEXAGENARY      = exCommon.getRepVal(record.get("SEXAGENARY"), '');
    			if(SEXAGENARY == '선택생'  || SEXAGENARY == '선택'){
    				SEXAGENARY = '';
    			}
    			
    			var FMLY_SEXAGENARY = exCommon.getRepVal(record.get("FMLY_SEXAGENARY"), '');
    			if(FMLY_SEXAGENARY == '0'  || FMLY_SEXAGENARY == '1'){
    				FMLY_SEXAGENARY = '';
    			}
    			
    			if(record.get("CHECK_P") || record.get("CHECK_P") == true || record.get("CHECK_P") == 'T'){
    				var data = {
	    				 REPRESEN_REL    :  exCommon.getRepVal(record.get("REPRESEN_REL"), '')
	    				,FMLY_SEXAGENARY :  exCommon.getRepVal(record.get("FMLY_SEXAGENARY"), '')
	    				,NAME_KOR        :  exCommon.getRepVal(record.get("NAME_KOR"), '')
	    				,FMLY_BIRTHDAY   :  exCommon.getRepVal(record.get("FMLY_BIRTHDAY"), '')
	    				,BIRTHDAY        :  exCommon.getRepVal(record.get("BIRTHDAY"), '')	   
	    			}    			
	    			jsonPrayData.push(data);
    				
    				
    				var ZIP_CD   =  exCommon.getRepVal(record.get("ZIP_CD"), '');
    				var DAEJU_YN =  exCommon.getRepVal(record.get("DAEJU_YN"), '');
    				
    				console.log('DAEJU_YN = ', DAEJU_YN);
    				
    				if(ZIP_CD.length == 6){
    					ZIP_CD = ZIP_CD.substring(0,3) +"-"+ ZIP_CD.substring(3,6);
    				}
    				
    				
    				var TELNO1   = exCommon.getRepVal(record.get("TELNO1"), '');
    				var TELNO2   = exCommon.getRepVal(record.get("TELNO2"), '');
    				var TELNO3   = exCommon.getRepVal(record.get("TELNO3"), '');
    				var TELNO    = "("+TELNO1+")" + TELNO2+ "-" +  TELNO3;
    					TELNO    = TELNO.replace('()-', '');  
    				var BUD_CODE = exCommon.getRepVal(record.get("BUD_CODE"), '');
    				var ADDR     = exCommon.getRepVal(record.get("ADDR1"), '') + " " + 
    						       exCommon.getRepVal(record.get("ADDR2"), '') + " " + 
    						       exCommon.getRepVal(record.get("ADDR3"), '');
    				
    				
    				if(pCnt == 1){
    					firData = {
    						 BUD_CODE : BUD_CODE
    						,TELNO    : TELNO  
    						,ADDR     : ADDR
    						,ZIP_CD   : ZIP_CD
    						,WISH     : me.lookupReference('txt_wish').getExValue()
    						,FDATE    : ''
    					};
    				}
    				
    				if(DAEJU_YN == 1){
    					daejuData = {
       						 BUD_CODE : BUD_CODE
       						,TELNO    : TELNO  
       						,ADDR     : ADDR
       						,ZIP_CD   : ZIP_CD
       						,WISH     : me.lookupReference('txt_wish').getExValue()
       						,FDATE    : ''
       					};
    				}
    				pCnt ++;
    			}
    			    			    			
    		}// for i
    		var jsonBasicData;
    		if(pCnt == p_row ){ 
    			jsonBasicData = daejuData;			
    		}else{
    			jsonBasicData = firData;
    		}
    		
    		var jsonYoungcData = [];
    		var y_row          = me.getViewModel().getStore('ds_cheanHon').getCount();
    		
    		    		    		
    		if(rd_gidoGbn == 3){
    			for(var i = 0 ; i < y_row ; i++){
        			var record  = me.getViewModel().getStore('ds_cheanHon').getAt(i);
        			var CHECK_P = exCommon.getRepVal(record.get("CHECK_P"), '');
        			
        			
        			if( CHECK_P || CHECK_P == true || CHECK_P == 'T'){
        				var HYO_REL      = exCommon.getRepVal(record.get("HYO_REL"), '');
        				var BOK_NAME_KOR = exCommon.getRepVal(record.get("BOK_NAME_KOR"), '');
        				var BOKWI_NM     = exCommon.getRepVal(record.get("BOKWI_NM"), '');
        				var BON_NM       = exCommon.getRepVal(record.get("BON_NM"), '');
        				var DECE_REL     = exCommon.getRepVal(record.get("DECE_REL"), '');
        				var NAME_KOR     = exCommon.getRepVal(record.get("NAME_KOR"), '');
        				var DEATH_KOR    = exCommon.getRepVal(record.get("DEATH_KOR"), '');
        				
        				var data ={
        					 HYO_REL      : HYO_REL
        					,BOK_NAME_KOR : BOK_NAME_KOR
        					,BOKWI_NM     : BOKWI_NM
        					,BON_NM       : BON_NM
        					,DECE_REL     : DECE_REL
        					,NAME_KOR     : NAME_KOR
        					,DEATH_KOR    : DEATH_KOR
        				};
        				jsonYoungcData.push(data);
        				
        			}// CHECK_P if
        		}// for y_row
    		}
    		var allData = {
    			 "base"  : jsonBasicData    			 
    			,"fInfo" : jsonPrayData
    			,"YInfo" : jsonYoungcData
    		}
    		console.log(allData);
    		
    		
    		me.lookupReference('allData').setExValue(Ext.encode(allData));
    		console.log(me.lookupReference('allData').getExValue());
    		
    		
    		var params = {
	  			 FILE_PATH  : '/sin001p_07_rp_main.ozr' 
	  			,PRINT_DATA : allData
	  		};
	    	
	    	setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.print',  params, null);
	       	},100);
    		
    	}// if
    	else if(rd_gidoGbn == 2){
			var jsonYoungcData = [];
    		var y_row          = me.getViewModel().getStore('ds_cheanHon').getCount();
    		
    		
    		var a_VALUE;
    		var Ycnt = 1;
    		
    		var f_record;
    		
    		for(var i = 0 ; i < y_row ; i++){
    			var record  = me.getViewModel().getStore('ds_cheanHon').getAt(i);
    			var CHECK_P = exCommon.getRepVal(record.get("CHECK_P"), '');
    			
    			
    			if( CHECK_P || CHECK_P == true || CHECK_P == 'T'){
    				var HYO_REL      = exCommon.getRepVal(record.get("HYO_REL"), '');
    				var BOK_NAME_KOR = exCommon.getRepVal(record.get("BOK_NAME_KOR"), '');
    				var BOKWI_NM     = exCommon.getRepVal(record.get("BOKWI_NM"), '');
    				var BON_NM       = exCommon.getRepVal(record.get("BON_NM"), '');
    				var DECE_REL     = exCommon.getRepVal(record.get("DECE_REL"), '');
    				var NAME_KOR     = exCommon.getRepVal(record.get("NAME_KOR"), '');
    				var DEATH_KOR    = exCommon.getRepVal(record.get("DEATH_KOR"), '');
    				
    				
    				if(a_VALUE == HYO_REL+''+BOK_NAME_KOR+''+BOKWI_NM){    					
    					HYO_REL      = '';
    					BOK_NAME_KOR = '';
    					BOKWI_NM     = '';
    				}else{
    					a_VALUE = HYO_REL+''+BOK_NAME_KOR+''+BOKWI_NM;
    				}
    				
    				
    				var data ={
    					 HYO_REL      : HYO_REL
    					,BOK_NAME_KOR : BOK_NAME_KOR
    					,BOKWI_NM     : BOKWI_NM
    					,BON_NM       : BON_NM
    					,DECE_REL     : DECE_REL
    					,NAME_KOR     : NAME_KOR
    					,DEATH_KOR    : DEATH_KOR
    				};
    				jsonYoungcData.push(data);
    				
    				if(Ycnt == 1){
    					f_record = record;
    				}
    				
    				Ycnt++;
    			}// CHECK_P if
    		}// for y_row
    		
    		
    		var jsonBasicData = {
    				BUD_CODE : exCommon.getRepVal(f_record.get("BUD_CODE"), '')
			  	   ,ADDR     : exCommon.getRepVal(f_record.get("ADDR1"), '')+' ' + exCommon.getRepVal(f_record.get("ADDR2"), '')
				   ,WISH     : me.lookupReference('txt_wish').getExValue()
    		}
    		
    		var allData = {
       			 "base"  : jsonBasicData
       			,"YInfo" : jsonYoungcData
       		}
       		/*me.lookupReference('allData').setExValue(Ext.encode(allData));
       		console.log(me.lookupReference('allData').getExValue());*/
    		
    		var params = {
   	  			 FILE_PATH  : '/sin001p_07_rp_cheanHon.ozr' 
   	  			,PRINT_DATA : allData
   	  		};
   	    	
   	    	setTimeout(function(){
   	    		me.openPopup('ExFrm.view.com.print',  params, null);
   	       	},100);
    		
		}
    	
    	return false;    	
    },
    onFamilyUp : function(){
    	var me  = this;

    	var storenNm = 'ds_pray_temp';
    	var gridNm   = 'sin001p_07_a';
    	
    	if( me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn == '2' ){
    		storenNm = 'ds_cheanHon';
        	gridNm   = 'sin001p_07_b';
    	}
    	var rowCnt = me.getViewModel().getStore(storenNm).getCount();
    	
    	if(rowCnt == 0){
    		return;
    	}
    	
    	var selection = me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference(gridNm).getStore().indexOf(selection);
    	
    	if(_idx == 0){
			return false;
		}
    	var selection_data  = selection.data;
    	
    	me.getViewModel().getStore(storenNm).remove(selection);
    	me.getViewModel().getStore(storenNm).insert(_idx-1,selection_data);    
    	me.lookupReference(gridNm).getView().select(_idx-1);
    	
    },
    onFamilyDown : function(){
    	var me  = this;
    	
    	var storenNm = 'ds_pray_temp';
    	var gridNm   = 'sin001p_07_a';
    	
    	if( me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn == '2' ){
    		storenNm = 'ds_cheanHon';
        	gridNm   = 'sin001p_07_b';
    	}
    	var rowCnt = me.getViewModel().getStore(storenNm).getCount();
    	
    	if(rowCnt == 0){
    		return;
    	}
    	
    	var selection = me.lookupReference(gridNm).getView().getSelectionModel().getSelection()[0];
    	var _idx      = me.lookupReference(gridNm).getStore().indexOf(selection);
    	
    	if(rowCnt == (_idx+1) ){
    		return;
    	}
    	var selection_data  = selection.data;
    	
    	me.getViewModel().getStore(storenNm).remove(selection);
    	me.getViewModel().getStore(storenNm).insert(_idx+1,selection_data);
    	me.lookupReference(gridNm).getView().select(_idx+1);
    	
    }
})