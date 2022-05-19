Ext.define('ExFrm.view.sin.sin001p_07_000031Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.sin001p_07_000031',
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
        			FMLY_BIRTHDAY = LUNAR_SOLAR_NM + BIRTHDAY.substr(0,4)+'年' + BIRTHDAY.substr(4,2)+'月' + BIRTHDAY.substr(6,2) + '日生'
        		}else{
        			
        		}
        		
        		try{
        			if(death_type == 1){
        				BIRTHDAY = (nowYear - birthYear + 1) + '세';
        			}else{
        				BIRTHDAY =BIRTHDAY.substr(0,4)+'年' + BIRTHDAY.substr(4,2)+'月' + BIRTHDAY.substr(6,2) + '日生';
        			}
        			
        			
        		}catch (e) {}
        		
        	}else{
        		BIRTHDAY      = '';
        	}
        	        	
        	
        	data.FMLY_BIRTHDAY = FMLY_BIRTHDAY;
        	data.BIRTHDAY = BIRTHDAY;
        	
        	me.getViewModel().getStore('ds_pray_temp').add(data);
        	
        	BUD_CODE = record.get("BUD_CODE");
        	
        }// for
        
        me.lookupReference('bokwi_area').setHidden(true);
        
        var params ={
        	V_BUD_CODE : BUD_CODE
        };
        
        
        setTimeout(function(){
    		me.callStore(me, 'ds_bokwi', '', params ,me.dsBokCallback);
    	},50);
        
    },
    onInit:function(me){},
    onClose : function(){
    	var me = this;
    	me.getView().destroy();
    },
    onAfterRender:function(me){
    	
    	
    },
    dsBokCallback : function(me, success, form, action){
    	me.lookupReference('lc_bokwi').setExValue('00000');
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_cheanHon', '', action._params ,me.cheanHonCallback);
    	},50);
    },
    cheanHonCallback : function(me, success, form, action){
    	me.lookupReference('sin001p_07_b').getView().select(0);
    	me.lookupReference('sin001p_07_a').getView().select(0);
    },
    onRadioClick : function(field, newValue, oldValue, options){
    	var me = this;
    	//console.log(newValue.rd_gidoGbn);
    	if(newValue.rd_gidoGbn == '2'){
    		me.lookupReference('sin001p_07_a').setHidden(true);    		
    		me.lookupReference('sin001p_07_b').setHidden(false);
    		me.lookupReference('bokwi_area').setHidden(false);
    	}else if(newValue.rd_gidoGbn == '1'){
    		me.lookupReference('sin001p_07_a').setHidden(false);    		
    		me.lookupReference('sin001p_07_b').setHidden(true);
    		me.lookupReference('bokwi_area').setHidden(true);
    	}
    },
    onYoungCheck : function(vt , nowValue , oldValue){
    	var me = this;
    	
    	var row = me.getViewModel().getStore('ds_cheanHon').getCount();
    	
    	
    	for(var i = 0; i<row ; i++){
    		var record = me.getViewModel().getStore('ds_cheanHon').getAt(i);
    		var PAGE_SKIP = record.get("PAGE_SKIP");
    		
    		if('00000' == nowValue){
    			record.set("CHECK_P",true)
    		}else{
    			record.set("CHECK_P",false)
    			if(PAGE_SKIP == nowValue){
    				record.set("CHECK_P",true)
    			}
    			
    		}
    	}// for
    	
    },
    onPrint : function(){
    	var me = this;
    	var rd_gidoGbn = me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn;
    	
    	
    	var jsonPrayData   = [];
    	
    	
    	
    	
    	if(rd_gidoGbn == 1 ){
    		var addr     = '';
        	var bud_code = '';
    		
    		var p_row = me.getViewModel().getStore('ds_pray_temp').getCount();
    		
    		
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
    				var BIRTHDAY = exCommon.getRepVal(record.get("BIRTHDAY"), '');
    				try{
    					BIRTHDAY = BIRTHDAY.substr(0,4)+'年' + BIRTHDAY.substr(4,2)+'月' + BIRTHDAY.substr(6,2) + '日生';
    				}catch (e) {
    					BIRTHDAY = exCommon.getRepVal(record.get("BIRTHDAY"), '');
					}
    				
    				var data = {
   	    				 REPRESEN_REL    :  exCommon.getRepVal(record.get("REPRESEN_REL"), '')
   	    				,NAME_KOR        :  exCommon.getRepVal(record.get("NAME_KOR"), '')
   	    				,BIRTHDAY        :  exCommon.getRepVal(record.get("BIRTHDAY"), '')	   
   	    			}    			
   	    			jsonPrayData.push(data);
    				
    				addr     = exCommon.getRepVal(record.get("ADDR1"), '') + ' ' + exCommon.getRepVal(record.get("ADDR2"), '');
    				bud_code = exCommon.getRepVal(record.get("BUD_CODE"), '');
    			}// if CHECK_P
    			
    		}// for
    		
    		
    		var jsonBasicData = {
   				 ADDR     : addr
   				,BUD_CODE : bud_code
   				,TODAY    : exCommon.setDateFormat( exCommon.getNowDate() )
   			}
   			
   			var allData = {
    			 "base"  : jsonBasicData    			 
    			,"fInfo" : jsonPrayData
    		}
    		
    		var params = {
	  			 FILE_PATH  : '/sin001p_07_000031_rp_chukWon.ozr' 
	  			,PRINT_DATA : allData
	  		};
	    	
	    	setTimeout(function(){
	    		me.openPopup('ExFrm.view.com.print',  params, null);
	       	},100);
    		
    	}// if
    	else if(rd_gidoGbn == 2){
    		var c_row = me.getViewModel().getStore('ds_cheanHon').getCount();
    		
    		
    		var flag      = false;
    		var fDataIndex = -1;
    		
    		
    		var baseData = '';
    		
    		var A_PAGE_SKIP   = '';
    		var PAGE_SKIP_CNT =  0;
    		var fIdex_PAGE    = -1;
    		var PAGE_ARRAY    = [];
    		var TOP_DATA      = [];
    		
    		for(var i = 0 ; i < c_row ; i++){
    			var record = me.getViewModel().getStore('ds_cheanHon').getAt(i);
    			
    			if(record.get("CHECK_P") || record.get("CHECK_P") == true || record.get("CHECK_P") == 'T'){
        			if(fIdex_PAGE == -1){
        				A_PAGE_SKIP = record.get("PAGE_SKIP");
        				PAGE_SKIP_CNT++;   
        				PAGE_ARRAY.push(A_PAGE_SKIP);
        			}
        			
        			if(A_PAGE_SKIP != record.get("PAGE_SKIP")){
        				A_PAGE_SKIP = record.get("PAGE_SKIP");
        				PAGE_SKIP_CNT++;
        				PAGE_ARRAY.push(A_PAGE_SKIP);
        			}
        			fIdex_PAGE = i;
    			}
    		}
    		/*
    		console.log('PAGE_ARRAY = ', PAGE_ARRAY);
    		console.log('PAGE_ARRAY.length = ', PAGE_ARRAY.length);
    		*/
    		for(var i = 0 ; i< PAGE_ARRAY.length; i++){
    			var findRecord = me.getViewModel().getStore('ds_cheanHon').findRecord('PAGE_SKIP', PAGE_ARRAY[i], 0, false, true, true);
    			/*console.log('findRecord = ', findRecord);*/
    			
    			
    			var jsonYoung = []
    			
    			for(var j = 0 ; j < c_row ; j++){
    				var record = me.getViewModel().getStore('ds_cheanHon').getAt(j);
    				if(record.get("CHECK_P") || record.get("CHECK_P") == true || record.get("CHECK_P") == 'T'){
    					
    					if(PAGE_ARRAY[i] == record.get("PAGE_SKIP")){
    						var data = {
				    			 MANG          :  exCommon.getRepVal(record.get("MANG"), '')
								,DECE_REL      :  exCommon.getRepVal(record.get("DECE_REL"), '')
								,BON_SGBN      :  exCommon.getRepVal(record.get("BON_SGBN"), '')	   
								,NAME_KOR      :  exCommon.getRepVal(record.get("NAME_KOR"), '')
								,SPIRITUAL_GBN :  exCommon.getRepVal(record.get("SPIRITUAL_GBN"), '')
							}    			
	    					jsonYoung.push(data);
    					}
    				}
    			}// sub for
    			
    			var jsonBasicData = {
	  				 ADDR               : findRecord.get("ADDR")
	  				,BUD_CODE           : findRecord.get("BUD_CODE")
	  				,HYO_REL            : findRecord.get("HYO_REL")
	  				,BOKWI_NAME_KOR     : findRecord.get("BOKWI_NAME_KOR")
	  				,BOKWI_KIBU_GBN_NM  : findRecord.get("BOKWI_KIBU_GBN_NM")
	  				,TODAY              : exCommon.setDateFormat( exCommon.getNowDate() )
	  				,prayList           : jsonYoung
	  			}
    			TOP_DATA.push(jsonBasicData);
    		}// for 
    		
    		var allData = {
      			 "all"  : TOP_DATA    			 
      		}
    		
    		console.log(allData);
    	
    		
       		var params = {
   	  			 FILE_PATH  : '/sin001p_07_000031_rp_cheanHon.ozr' 
   	  			,PRINT_DATA : allData
   	  		};
   	    	
   	    	setTimeout(function(){
   	    		me.openPopup('ExFrm.view.com.print',  params, null);
   	       	},100);
    		
		}
    	return false;    	
    },
})