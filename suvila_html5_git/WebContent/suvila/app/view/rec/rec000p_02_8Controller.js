Ext.define('ExFrm.view.rec.rec000p_02_8Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_8',
    onCalled:function(data){
        var me = this;
        console.log('onCalled', data);
      
        var params = {
    		 V_TEMPLE_CD  : data.TEMPLE_CD
    		,V_ACCEPT_SEQ : data.ACCEPT_SEQ
    		,V_SEQ        : data.SEQ
    		,V_ACCEPT_GBN : data.ACCEPT_GBN
    		,V_EVENT_CD   : data.EVENT_CD
    		,V_EVENT_DATE : data.EVENT_DATE
    		,V_WEPAECNT   : data.WEPAECNT
    		,V_ACCEPT_SEQ1: data.ACCEPT_SEQ
    		,V_ACCEPT_SEQ2: ''
    		,V_ACCEPT_SEQ3: ''
    		,V_ACCEPT_SEQ4: ''
    		,V_ACCEPT_SEQ5: ''
    		,V_ACCEPT_SEQ6: ''
    	};
    	
    	setTimeout(function(){
    		me.callStore(me, 'ds_list', '', params ,me.dsListCallback);
    	},50);
    	
    	/*
    	me.getViewModel().getStore('ds_temp').removeAll();
    	me.getViewModel().getStore('ds_temp').add(data);
    	*/
    },
    dsListCallback : function(me, success, form, action){
    	console.log('dsListCallback = ', action._params);
    	setTimeout(function(){
    		me.callStore(me, 'ds_chukwon_chonhon', '', action._params , null);
    	},50);
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
    	//sin001p_07_rp_main
    	
    	
    	var rd_gidoGbn =  me.lookupReference('rd_gidoGbn').getValue().rd_gidoGbn;
    	
    	if(rd_gidoGbn == 1){
    		me.onPrintChonhon(me);
    	}
    	else if(rd_gidoGbn == 2){
    		me.onPrintPray(me);
    	}
    	else if(rd_gidoGbn == 3){
    		//rec004w_06_rp_chukwon_chonhon
    		me.onPrintChukwonChonhon(me);
    	}else{
    		me.onPrintWepaeBackjung(me);
    	}
    },
    onPrintWepaeBackjung : function(me){
    	var g_row = me.getViewModel().getStore('ds_list').getCount();
    	
    	var WEPAE_INDEX = 1;  /*-- 위패 COUNT (MAX = 5)--*/
		var WEPAE_COUNT = 1;  /*-- 위패 번호 --*/
		var	WEPAE_CNT	= 1;  /*-- 위패 번호 출력용--*/
		var JOIN_SEQ	= 1;  /*-- 위패 동참자 SEQ --*/
    	
		var jsonPrintData   = [];
    	var jsonAllData     = {};
    	
    	
    	var seq_idx      = me.getViewModel().getStore('ds_list').getAt(0).get("WEPAE_SEQ_CNT"); //3
    	
    	for(var j = 0; j < g_row ; j++){
    		var g_record  = me.getViewModel().getStore('ds_list').getAt(j);
    		var CHECK_P   = exCommon.getRepVal(g_record.get("CHECK_P"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
    			var varchar1  = '';  var varchar2  = ''; var varchar3  = ''; var varchar4  = ''; var varchar5  = '';
				var varchar6  = '';  var varchar7  = ''; var varchar8  = ''; var varchar9  = ''; var varchar10 = '';
				var varchar11 = '';  var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
				var varchar16 = '';  var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = '';
				var varchar21 = ''; 
				
				varchar2  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("HYO_REL"), '');
				varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BOKWIJA_NM"), '');
				varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BOKWI_HAN_NM"), '');
				varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("EVENT_SEQ"), '');
				
				if(seq_idx == 1){
					varchar9   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar10  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar11  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar12  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					
				}else if(seq_idx == 2){
					varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
				}else if(seq_idx == 3){
					varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar9   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar10   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar11   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar12   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
				}else if(seq_idx >= 4){
					console.log(j , '--->'+ seq_idx);
					varchar5   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar6   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar7   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar8   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar9   =  exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar10   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar11   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar12   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar13   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar14   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar15   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar16   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					j++;
					varchar17   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
					varchar18   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
					varchar19   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_BUD_NM"), '').replace(/ /g,"");
					varchar20   = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DEATH_HAN"), '');
					seq_idx -= 4;
					// 단일이라서
					console.log(jsonPrintData);
				}
				
				var subData = {
					 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3 , varchar4  : varchar4 , varchar5  : varchar5
					,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8 , varchar9  : varchar9 , varchar10 : varchar10
					,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13, varchar14 : varchar14, varchar15 : varchar15
					,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18, varchar19 : varchar19, varchar20 : varchar20
					,varchar21 : varchar21 
				};
				jsonPrintData.push(subData);
    		}// if CHECK_P
    	}// for j
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	//console.log('jsonAllData = ', jsonAllData);
    	//console.log( Ext.encode(jsonAllData) );
    	
    	var params = {
 			 FILE_PATH  : '/rec004w_06_rp_wepae_backjung.ozr' 
 			,PRINT_DATA : jsonAllData
		};
   		
   		setTimeout(function(){
       		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    	
	},
    onPrintPray : function(me){
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	var jsonBaseData  = [];
    	var jsonPrayData  = [];
    	var jsonChonData  = [];
    	
    	// 축원
    	for(var i = 0; i < me.getViewModel().getStore('ds_chukwon_chonhon').getCount() ; i++){
    		var record = me.getViewModel().getStore('ds_chukwon_chonhon').getAt(i);
    		var BAND   = exCommon.getRepVal(record.get("BAND"), '');
    		
    		if(BAND != 1){
    			break;
    		}
    		
    		var subData = {
				REPRESEN_REL    : exCommon.getRepVal(record.get("REPRESEN_REL"), '')
			   ,SEXAGENARY_NM   : exCommon.getRepVal(record.get("GANJI_NM"), '')
			   ,NAME_KOR        : exCommon.getRepVal(record.get("SINDO_NAME"), '')
			   ,BIRTHDAY        : exCommon.getRepVal(record.get("BIRTHDAY"), '')
			   ,AGE             : exCommon.getRepVal(record.get("AGE"), '')
			   ,ORGINATE        : ''
    		};
    		jsonPrayData.push(subData);
    		
    	}// for i
    	
    	jsonBaseData = {
       		 BUD_CODE : me.getViewModel().getStore('ds_list').getAt(0).get("BUD_CODE")
   			,ADDR_ALL : me.getViewModel().getStore('ds_list').getAt(0).get("ADDR1") + ' ' + me.getViewModel().getStore('ds_list').getAt(0).get("ADDR2")
   			,WISH     : me.lookupReference('txt_wish').getExValue()
   			,TELNO    : me.getViewModel().getStore('ds_chukwon_chonhon').getAt(0).get("TELNO")
   		    ,ZIP_CD   : me.getViewModel().getStore('ds_list').getAt(0).get("ZIP_CD")
   			,prayList : jsonPrayData
   		    ,chonList : jsonChonData
       	}
       	jsonPrintData.push(jsonBaseData);
       	
       	jsonAllData = {
       		"info" : jsonPrintData
       	};
       	
       	console.log( jsonAllData );
       	var params = {
  			 FILE_PATH  : '/rec004w_06_rp_chukwon_chonhon.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
        	
    	setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
      },100);
    },
    onPrintChukwonChonhon : function(me){
    	var g_row = me.getViewModel().getStore('ds_list').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	var jsonBaseData  = [];
    	var jsonPrayData  = [];
    	var jsonChonData  = [];
    	
    	// 축원
    	for(var i = 0; i < me.getViewModel().getStore('ds_chukwon_chonhon').getCount() ; i++){
    		var record = me.getViewModel().getStore('ds_chukwon_chonhon').getAt(i);
    		var BAND   = exCommon.getRepVal(record.get("BAND"), '');
    		
    		if(BAND != 1){
    			break;
    		}
    		
    		var subData = {
				REPRESEN_REL    : exCommon.getRepVal(record.get("REPRESEN_REL"), '')
			   ,SEXAGENARY_NM   : exCommon.getRepVal(record.get("GANJI_NM"), '')
			   ,NAME_KOR        : exCommon.getRepVal(record.get("SINDO_NAME"), '')
			   ,BIRTHDAY        : exCommon.getRepVal(record.get("BIRTHDAY"), '')
			   ,AGE             : exCommon.getRepVal(record.get("AGE"), '')
			   ,ORGINATE        : ''
    		};
    		jsonPrayData.push(subData);
    		
    	}// for i
    	
    	// 천혼
    	var flag = true;
    	var cnt  = 0;
    	var A_HYO_REL      = '';
    	var A_BOKWIJA_NM   = '';
    	var A_BOKWI_NM     = '';
    	for(var i = 0; i < g_row ; i++){
    		var k_record  = me.getViewModel().getStore('ds_list').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(k_record.get("CHECK_P"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
				//console.log(k_record);
				
				var BUD_CODE      = exCommon.getRepVal(k_record.get("BUD_CODE"), '');
				var ADDR_ALL      = exCommon.getRepVal(k_record.get("ADDR_ALL"), '');
				var BOKWIJA_NM    = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
				var HYO_REL       = exCommon.getRepVal(k_record.get("HYO_REL"), '');
				var TEMPLE_NM     = exCommon.user.sect_nm + '  '+exCommon.user.templeNm;
				var DECE_REL      = exCommon.getRepVal(k_record.get("DECE_REL_MANG"), '');
				var BON_NM        = exCommon.getRepVal(k_record.get("BON_SEX_NM"), '');
				var NAME_KOR      = exCommon.getRepVal(k_record.get("NAME_KOR"), '');
				var DEATH_KOR     = exCommon.getRepVal(k_record.get("DEATH_KOR"), '');
				var DECE_BUD_NM   = exCommon.getRepVal(k_record.get("DECE_BUD_NM"), '');
				var PAGE_SKIP     = exCommon.getRepVal(k_record.get("PAGE_SKIP"), '');	
				var BOK_NAME_KOR  = '';
				var BOKWI_NM      = exCommon.getRepVal(k_record.get("BOKWI_NM"), '');
				
				if(HYO_REL == ''){
					HYO_REL = A_HYO_REL;
				}else{
					HYO_REL   = HYO_REL;
					A_HYO_REL = HYO_REL
				}
				
				if(A_BOKWIJA_NM != BOKWIJA_NM){
					A_BOKWIJA_NM = BOKWIJA_NM;
				}else{
					BOKWIJA_NM   = '';
					HYO_REL      = '';
					HYO_REL      = '';
					BOKWI_NM     = '';
				}
				
				var data = {
					 BUD_CODE     : BUD_CODE
					,ADDR_ALL     : ADDR_ALL
					,HYO_REL      : HYO_REL
					,TEMPLE_NM    : TEMPLE_NM
					,DECE_REL     : DECE_REL
					,BON_NM       : BON_NM
					,NAME_KOR     : DECE_BUD_NM
					,DEATH_KOR    : DEATH_KOR
					,PAGE_SKIP    : PAGE_SKIP
					,BOK_NAME_KOR : BOKWIJA_NM
					,BOKWI_NM     : BOKWI_NM
				}
				jsonChonData.push(data);
				
    		}
    		
    	}// for
    	
    	jsonBaseData = {
    		 BUD_CODE : me.getViewModel().getStore('ds_list').getAt(0).get("BUD_CODE")
			,ADDR_ALL : me.getViewModel().getStore('ds_list').getAt(0).get("ADDR1") + ' ' + me.getViewModel().getStore('ds_list').getAt(0).get("ADDR2")
			,WISH     : me.lookupReference('txt_wish').getExValue()
			,TELNO    : me.getViewModel().getStore('ds_chukwon_chonhon').getAt(0).get("TELNO")
		    ,ZIP_CD   : me.getViewModel().getStore('ds_list').getAt(0).get("ZIP_CD")
			,prayList : jsonPrayData
		    ,chonList : jsonChonData
    	}
    	jsonPrintData.push(jsonBaseData);
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	console.log( jsonAllData );
    	var params = {
   			 FILE_PATH  : '/rec004w_06_rp_chukwon_chonhon.ozr' 
   			,PRINT_DATA : jsonAllData
   		};
         	
     	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    },
    onPrintChonhon : function(me){
    	var g_row = me.getViewModel().getStore('ds_list').getCount();
		
		var jsonAllData   = {};
    	var jsonPrintData = [];
    	var jsonBaseData  = [];
    	var jsonPrayData = [];
    	
    	var flag = true;
    	var cnt  = 0;
    	var A_HYO_REL      = '';
    	var A_BOKWIJA_NM   = '';
    	var A_BOKWI_NM     = '';
    	for(var i = 0; i < g_row ; i++){
    		var k_record  = me.getViewModel().getStore('ds_list').getAt(i);
    		var CHECK_P   = exCommon.getRepVal(k_record.get("CHECK_P"), '');
    		
    		if(CHECK_P  || CHECK_P == true || CHECK_P =='T'){
				//console.log(k_record);
				
				var BUD_CODE      = exCommon.getRepVal(k_record.get("BUD_CODE"), '');
				var ADDR_ALL      = exCommon.getRepVal(k_record.get("ADDR_ALL"), '');
				var BOKWIJA_NM    = exCommon.getRepVal(k_record.get("BOKWIJA_NM"), '');
				var HYO_REL       = exCommon.getRepVal(k_record.get("HYO_REL"), '');
				var TEMPLE_NM     = exCommon.user.sect_nm + '  '+exCommon.user.templeNm;
				var DECE_REL      = exCommon.getRepVal(k_record.get("DECE_REL_MANG"), '');
				var BON_NM        = exCommon.getRepVal(k_record.get("BON_SEX_NM"), '');
				var NAME_KOR      = exCommon.getRepVal(k_record.get("NAME_KOR"), '');
				var DEATH_KOR     = exCommon.getRepVal(k_record.get("DEATH_KOR"), '');
				var DECE_BUD_NM   = exCommon.getRepVal(k_record.get("DECE_BUD_NM"), '');
				var PAGE_SKIP     = exCommon.getRepVal(k_record.get("PAGE_SKIP"), '');	
				var BOK_NAME_KOR  = '';
				var BOKWI_NM      = exCommon.getRepVal(k_record.get("BOKWI_NM"), '');
				
				if(HYO_REL == ''){
					HYO_REL = A_HYO_REL;
				}else{
					HYO_REL   = HYO_REL;
					A_HYO_REL = HYO_REL
				}
				
				if(A_BOKWIJA_NM != BOKWIJA_NM){
					A_BOKWIJA_NM = BOKWIJA_NM;
				}else{
					BOKWIJA_NM   = '';
					HYO_REL      = '';
					HYO_REL      = '';
					BOKWI_NM     = '';
				}
				
				var data = {
					 BUD_CODE     : BUD_CODE
					,ADDR_ALL     : ADDR_ALL
					,HYO_REL      : HYO_REL
					,TEMPLE_NM    : TEMPLE_NM
					,DECE_REL     : DECE_REL
					,BON_NM       : BON_NM
					,NAME_KOR     : DECE_BUD_NM
					,DEATH_KOR    : DEATH_KOR
					,PAGE_SKIP    : PAGE_SKIP
					,BOK_NAME_KOR : BOKWIJA_NM
					,BOKWI_NM     : BOKWI_NM
				}
				jsonPrayData.push(data);
				
    		}
    		
    		
    		
    	}// for
    	
    	jsonBaseData = {
    		 BUD_CODE : me.getViewModel().getStore('ds_list').getAt(0).get("BUD_CODE")
			,ADDR_ALL : me.getViewModel().getStore('ds_list').getAt(0).get("ADDR1") + ' ' + me.getViewModel().getStore('ds_list').getAt(0).get("ADDR2")
			,WISH     : me.lookupReference('txt_wish').getExValue()
			,prayList : jsonPrayData
    	}
    	jsonPrintData.push(jsonBaseData);
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	
    	console.log( jsonAllData );
    	var params = {
   			 FILE_PATH  : '/rec001w_06_rp_ID_CH_02Rec.ozr' 
   			,PRINT_DATA : jsonAllData
   		};
         	
     	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    }
    
})