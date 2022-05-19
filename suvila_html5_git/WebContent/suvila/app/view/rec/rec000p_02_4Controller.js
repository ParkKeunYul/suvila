Ext.define('ExFrm.view.rec.rec000p_02_4Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec000p_02_4',
    onCalled:function(data){
        var me = this;
        console.log('onCalled', data);
      
        var params = {
    		 V_TEMPLE_CD  : data.TEMPLE_CD
    		,V_ACCEPT_SEQ : data.ACCEPT_SEQ
    		,V_SEQ        : data.SEQ
    		,V_ACCEPT_GBN : data.ACCEPT_GBN
    		,V_PROD_CODE  : data.PROD_CODE
    		,V_JUNGAK_CD  : data.JUNGAK_CD
    		,V_LIGHT_NO   : data.LIGHT_NO
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
    	
    	var record 		 = me.getViewModel().getStore('ds_list').getAt(0).data;
    	console.log(record);
    	var DEATH_YN     = record.DEATH_YN;
    	if(DEATH_YN == 'T'){
    //		 me.lookupReference('rp_acceptGbn').setHidden(true);
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
    	
    	var record = me.getViewModel().getStore('ds_list').getAt(0).data;
    	
    	
    	var DEATH_YN     = record.DEATH_YN;
    	var rp_acceptGbn = me.lookupReference('rp_acceptGbn').getValue().rp_acceptGbn;

    	if(DEATH_YN == 'F'){
    		if(rp_acceptGbn == 0){ 
    			me.inPrintType1();
    			
    		}else{ 
    			me.inPrintType2();
    		}
    	}
    	else{
   			me.inPrintType3( rp_acceptGbn );
    	}
    },
    inPrintType3 : function(rp_acceptGbn){
    	var me = this;
    	
    	var g_row        = me.getViewModel().getStore('ds_list').getCount();
    	
    	var A_PAGE_SKIP_NEW= '';
    	var A_CNT;
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var varchar1 = '';  var varchar2 = '';  var varchar3  = ''; var varchar4 = '';  var varchar5  = '';
    	var varchar6 = '';  var varchar7 = '';  var varchar8  = ''; var varchar9 = '';  var varchar10 = ''; 
    	var varchar11 = ''; var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
    	var varchar16 = ''; var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = ''; 
    	var varchar21 = ''; var varchar22 = ''; var varchar23 = ''; var varchar24 = ''; var varchar25 = '';
    	var varchar99 = '';
    	
    	
    	for(var j = 0; j < g_row ; j++){
    		
    		var CNT           = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("CNT"), '');
    		var PAGE_SKIP_NEW = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("PAGE_SKIP_NEW"), '');
    		
    		
    		if(j== 0){
    			A_PAGE_SKIP_NEW = PAGE_SKIP_NEW;
    			A_CNT           = CNT;
    		}
    		
    		if(A_PAGE_SKIP_NEW != PAGE_SKIP_NEW){
    			A_PAGE_SKIP_NEW = PAGE_SKIP_NEW;
    			A_CNT           = CNT;
    		}
    		
    		
    		
    		varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
        	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
        	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
        	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
        	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
        	varchar99 = '';
    		
    		
        	
        	varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("LIGHT_NO"), '');
			varchar22 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("ADDR1"), '') +' '+
						exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("ADDR2"), '').replace(/[-]/g,'·');
			varchar24 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("HYO_REL"), '') + " " +
						exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BOK_NAME_KOR"), '')
			varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("TEMPLE_NM"), '');
			
			if(A_CNT >= 1){
				varchar25 = 'default1';
				
				varchar1 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
				varchar2 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
				varchar3 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				varchar4 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("YOUNGGA"), '');
			}
			
			if(A_CNT >= 2){
				j++;
				varchar25 = 'default2';
				
				varchar5 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
				varchar6 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
				varchar7 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				varchar8 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("YOUNGGA"), '');
				
			}// if
			
			if(A_CNT >= 3){
				j++;
				varchar25 = 'default2';
				
				varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
				varchar10 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
				varchar11 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				varchar12 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("YOUNGGA"), '');
				
			}// if
			
			if(A_CNT >= 4){
				j++;
				varchar25 = 'default2';
				
				varchar13  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
				varchar14 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
				varchar15 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				varchar16 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("YOUNGGA"), '');
			}// if
			
			if(A_CNT >= 5){
				j++;
				varchar25 = 'default5';
				
				varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("DECE_REL"), '');
				varchar18 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("BON_SEX_NM"), '');
				varchar19 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				varchar20 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("YOUNGGA"), '');
				A_CNT -= 5;
				
			}// if
			
			var jsonYDdata = {
				 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3  ,varchar4  : varchar4  ,varchar5  : varchar5 
				,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8  ,varchar9  : varchar9  ,varchar10 : varchar10
				,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13 ,varchar14 : varchar14 ,varchar15 : varchar15
				,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18 ,varchar19 : varchar19 ,varchar20 : varchar20
				,varchar21 : varchar21 , varchar22 : varchar22 , varchar23 : varchar23 ,varchar24 : varchar24 ,varchar25 : varchar25
				,varchar99 : varchar99
			};
			jsonPrintData.push(jsonYDdata);
    	}
    	
    	jsonAllData = {
    		"info" : jsonPrintData
    	};
    	console.log( jsonAllData );
    	
    	
    	var FILE_PATH = '/rec001w_06_rp_YDRec_03.ozr';
    	if(rp_acceptGbn == 1){
    		FILE_PATH = '/rec001w_06_rp_YDRec_03_2.ozr';
    	}
    	
    	//rp_acceptGbn
    	
    	var params = {
   			 FILE_PATH  : FILE_PATH 
   			,PRINT_DATA : jsonAllData
   		};
    	
    	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100)
    },
    inPrintType2 : function(){
    	var me = this;
    	
    	var g_row        = me.getViewModel().getStore('ds_list').getCount();
    	
    	var jsonAllData   = {};
    	var jsonPrintData = [];
    	
    	
    	var varchar1 = '';  var varchar2 = '';  var varchar3  = ''; var varchar4 = '';  var varchar5  = '';
    	var varchar6 = '';  var varchar7 = '';  var varchar8  = ''; var varchar9 = '';  var varchar10 = ''; 
    	var varchar11 = ''; var varchar12 = ''; var varchar13 = ''; var varchar14 = ''; var varchar15 = '';
    	var varchar16 = ''; var varchar17 = ''; var varchar18 = ''; var varchar19 = ''; var varchar20 = ''; 
    	var varchar21 = ''; var varchar22 = ''; var varchar23 = ''; var varchar24 = ''; var varchar25 = '';
    	var varchar99 = ''; var varchar30 = ''; var varchar31 = '';
    	
    	var CNT             = g_row;
		var maxUp           = false;
		var daeju_name      = '';
		var daeju_ganji     = '';
		var addr1           = '';
		var addr2           = '';
		var daeju_no        = '';
		var dongcham_bud_no = '';
    	
		var k_record = me.getViewModel().getStore('ds_list').getAt(0);
		addr1       = exCommon.getRepVal(k_record.get("ADDR1"), '');
		addr2       = exCommon.getRepVal(k_record.get("ADDR2"), '').replace(/[-]/g,'·');
		daeju_name  = exCommon.getRepVal(k_record.get("NAME_KOR"), '');  								
		daeju_ganji = exCommon.getRepVal(k_record.get("SEXAGENARY_NM"), '');
		
		
		for(var j =0 ;j<g_row;j++){
			var j_record = me.getViewModel().getStore('ds_list').getAt(j);
			if(maxUp){
				varchar1 = '';  varchar2 = '';  varchar3  = ''; varchar4 = '';  varchar5  = '';
            	varchar6 = '';  varchar7 = '';  varchar8  = ''; varchar9 = '';  varchar10 = ''; 
            	varchar11 = ''; varchar12 = ''; varchar13 = ''; varchar14 = ''; varchar15 = '';
            	varchar16 = ''; varchar17 = ''; varchar18 = ''; varchar19 = ''; varchar20 = ''; 
            	varchar21 = ''; varchar22 = ''; varchar23 = ''; varchar24 = ''; varchar25 = '';
            	varchar99 = ''; varchar30 = ''; varchar31 = '';
			}
			
			varchar23 = addr2;
			varchar22 = addr1 +' ' + addr2;												
			varchar21 = me.getViewModel().getStore('ds_list').getAt(0).get("LIGHT_NO");
			varchar99 = exCommon.user.templeNm;
			
			if(CNT >= 1){
				varchar24 = 'default1';
				varchar1  = daeju_ganji;
				varchar2  = daeju_name;
			}
			
			if(CNT >= 2){
				console.log(j+'CNT = ', CNT);
				varchar24 = 'default2';
				if(!maxUp){
					j++
				}
				varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 3){
				varchar24 = 'default3';
				j++
				varchar5  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar6  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 4){
				varchar24 = 'default4';
				j++;
				console.log('j = ', j);
				varchar7  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar8  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 5){
				varchar24 = 'default5';
				j++
				varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar10  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 6){
				varchar24 = 'default6';
				j++
				varchar11  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar12  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 7){
				varchar24 = 'default7';
				j++
				varchar13  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar14  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 8){
				varchar24 = 'default9';
				j++
				varchar15  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar16  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 9){
				varchar24 = 'default9';
				j++
				varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar18  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 10){
				varchar24 = 'default10';
				j++
				varchar19  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar20  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
			}
			
			if(CNT >= 11){
				varchar24 = 'default10';
				j++
				varchar30  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("SEXAGENARY_NM"), '');
				varchar31  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(j).get("NAME_KOR"), '');
				CNT -= 10;
				maxUp = true;
			}
			var jsonYDdata = {
				 varchar1  : varchar1  , varchar2  : varchar2  , varchar3  : varchar3  ,varchar4  : varchar4  ,varchar5  : varchar5 
				,varchar6  : varchar6  , varchar7  : varchar7  , varchar8  : varchar8  ,varchar9  : varchar9  ,varchar10 : varchar10
				,varchar11 : varchar11 , varchar12 : varchar12 , varchar13 : varchar13 ,varchar14 : varchar14 ,varchar15 : varchar15
				,varchar16 : varchar16 , varchar17 : varchar17 , varchar18 : varchar18 ,varchar19 : varchar19 ,varchar20 : varchar20
				,varchar21 : varchar21 , varchar22 : varchar22 , varchar23 : varchar23 ,varchar24 : varchar24 ,varchar25 : varchar25
				,varchar99 : varchar99 , varchar30 : varchar30 , varchar31 : varchar31 
			};
			jsonPrintData.push(jsonYDdata);
		}// for i
		
		jsonAllData = {
    		"info" : jsonPrintData
    	};
    	console.log( jsonAllData );
    	
    	var params = {
   			 FILE_PATH  : '/rec001w_06_rp_YDRec_06.ozr' 
   			,PRINT_DATA : jsonAllData
   		};
         	
     	setTimeout(function(){
     		me.openPopup('ExFrm.view.com.print',  params, null);
       },100);
    },
    inPrintType1 : function(){
    	var me = this;
    	
    	var g_row        = me.getViewModel().getStore('ds_list').getCount();
    	
    	var jsonPrintData   = [];
    	var jsonAllData     = {};
    	var addr1           = '';
		var addr2           = '';
		var daeju_no        = '';
		var dongcham_bud_no = '';
		
		for(var i =0 ;i<g_row;i++){
			var record = me.getViewModel().getStore('ds_list').getAt(i);
			if(i==0){
				addr1 = record.get("ADDR1");
				addr2 = record.get("ADDR2");
			}
			daeju_no        = record.get("DAEJU_NO");
			dongcham_bud_no = record.get("DONGCHAM_BUD_NO");

			if(daeju_no == dongcham_bud_no){
				addr1 = record.get("ADDR1");
				addr2 = record.get("ADDR2");
			}
		}// for 
		
		
		var idx1 = 24;
		
		var varchar24;
		var varchar1  = ''; var varchar2  = ''; var varchar3  = '';  var varchar4  = '';  var varchar5  = '';  var varchar6  = '';
		var varchar7  = ''; var varchar8  = ''; var varchar9  = '';  var varchar10 = '';  var varchar11 = '';  var varchar12 = '';
		var varchar13 = ''; var varchar14 = ''; var varchar15 = '';  var varchar16 = '';  var varchar17 = '';  var varchar18 = '';
		var varchar19 = ''; var varchar20 = ''; var varchar21 = '';  var varchar22 = '';  var varchar23 = '';  var varchar99 = '';
		
		varchar23 = addr2;
		varchar22 = addr1+' '+ addr2;
		varchar21 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(0).get("LIGHT_NO"),'');
		varchar99 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(0).get("TEMPLE_NM"),'');
		
		var CNT = g_row;
		
		for(var i =0 ;i<g_row;i++){
			if(CNT >= 1){
				varchar24 = 'default1';  	
				varchar1  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar2  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 2){
				i++;
				varchar24 = 'default2';
				varchar3  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar4  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 3){
				i++;
				varchar24 = 'default3';
				varchar5  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar6  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 4){
				i++;
				varchar24 = 'default4';
				varchar7  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar8  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 5){
				i++;
				varchar24 = 'default5';
				varchar9  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar10 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 6){
				i++;
				varchar24 = 'default6';
				varchar11 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar12 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 7){
				i++;
				varchar24 = 'default7';
				varchar13 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar14 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 8){
				i++;
				varchar24 = 'default8';    						    						
				varchar15 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar16 = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');    						
			}
			
			if(CNT >= 9){
				i++;
				varchar24 = 'default9';
				varchar17  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar18  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
			}
			
			if(CNT >= 10){
				i++;
				varchar24 = 'default9';
				varchar19  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("SEXAGENARY_NM"),'');
				varchar20  = exCommon.getRepVal(me.getViewModel().getStore('ds_list').getAt(i).get("NAME_KOR"),'');
				CNT -= 10;
			}
			
			var subData = {
					 varchar1  : exCommon.getRepVal(varchar1,'')  ,varchar2  : exCommon.getRepVal(varchar2,'')
					,varchar3  : exCommon.getRepVal(varchar3,'')  ,varchar4  : exCommon.getRepVal(varchar4,'')
					,varchar5  : exCommon.getRepVal(varchar5,'')  ,varchar6  : exCommon.getRepVal(varchar6,'')
					,varchar7  : exCommon.getRepVal(varchar7,'')  ,varchar8  : exCommon.getRepVal(varchar8,'')
					,varchar9  : exCommon.getRepVal(varchar9,'')  ,varchar10 : exCommon.getRepVal(varchar10,'')
					,varchar11 : exCommon.getRepVal(varchar11,'') ,varchar12 : exCommon.getRepVal(varchar12,'')
					,varchar13 : exCommon.getRepVal(varchar13,'') ,varchar14 : exCommon.getRepVal(varchar14,'')
					,varchar15 : exCommon.getRepVal(varchar15,'') ,varchar16 : exCommon.getRepVal(varchar16,'')
					,varchar17 : exCommon.getRepVal(varchar17,'') ,varchar18 : exCommon.getRepVal(varchar18,'')
					,varchar19 : exCommon.getRepVal(varchar19,'') ,varchar20 : exCommon.getRepVal(varchar20,'')
					,varchar21 : exCommon.getRepVal(varchar21,'') ,varchar22 : exCommon.getRepVal(varchar22,'')
					,varchar23 : exCommon.getRepVal(varchar23,'') ,varchar24 : exCommon.getRepVal(varchar24,'')
					,varchar99 : varchar99
				}
				jsonPrintData.push(subData);
		}//
		jsonAllData = {
    		"info" : jsonPrintData
    	};
		
		console.log(jsonAllData);
		var params = {
  			 FILE_PATH  : '/rec001w_06_rp_YDRec_02.ozr' 
  			,PRINT_DATA : jsonAllData
  		};
		
		setTimeout(function(){
    		me.openPopup('ExFrm.view.com.print',  params, null);
       	},100);
    }
})