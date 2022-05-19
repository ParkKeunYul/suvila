function getCookie( cookieName ){
 	var search = cookieName + "=";
 	var cookie = document.cookie;

	if( cookie.length > 0 ){
  		startIndex = cookie.indexOf( cookieName );
 		if( startIndex != -1 ){
  			startIndex += cookieName.length;
  			endIndex = cookie.indexOf( ";", startIndex );
  			if( endIndex == -1) endIndex = cookie.length;
  			return unescape( cookie.substring( startIndex + 1, endIndex ) );
  		}
 	}
}

Ext.define('ExFrm.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    init:function(){
    	
        try{
        	
        	var me = this;
           console.log(exCommon.user.userId);
            
        }
       catch(e){
            console.log('error', e);
        }
    },
    
    adminInfoCallback : function(me, success, form, action){
    	
    	console.log( me.getViewModel().getStore('adminInfo').get("USER_ID") );
    },
    afterRender:function(cmp){
    	var me = this;
    	
    	
    	
    	var pi =getCookie('passid');
    	var pt =getCookie('passtem');
    	if(pi != null && pt != null && pi != undefined && pt != undefined){
    		$.ajax({
    			url:'/login/login_check.suvila',
    			type:'POST',
    			data:'pi='+pi+'&pt='+pt,
    			error: function(){},
    			success: function(data){
    				if(data.ID != null && data.ID != undefined){
    					me.lookupReference('userId').setValue(data.ID)
	    				me.lookupReference('password').setValue(data.PWD)
	    				me.lookupReference('passid').setValue(true)
    				}
    			}
    		});// ajax
    	}// if
    	else{
    		console.log('22222');
    		this.onAutoLogin();
    	}
    	console.log('pi = ', pi);
    	console.log('pt = ', pt);
    },
    onSearchEnter: function(me2, e, eOpts ){
    	var me = this;
    	if(e.keyCode == 13){
    		me.onLogin();
    	}
    },
    onLogin:function(){
        var me = this;
        var form = this.getView().getForm();
        form.url = '/login/loginPro.suvila';
        form.submit({
            scope:me,
            success:function(form, action){
            	console.log('onLogin = ',action.result.data.info )
            	
                exCommon.user.userId      = action.result.data.info.USER_ID;
                exCommon.user.userName    = action.result.data.info.USER_NM;
                exCommon.user.templeCd    = action.result.data.info.TEMPLE_CD;                
                exCommon.user.templeNm    = action.result.data.info.TEMPLE_NM;
                exCommon.user.searchGbn   = action.result.data.info.SEARCH_GBN;
                exCommon.user.mobiletelno = action.result.data.info.MOBILE_TELNO;
                exCommon.user.tel         = action.result.data.info.TELNO;
                exCommon.user.sin_sms_yn  = action.result.data.info.SIN_SMS_YN;
                exCommon.user.death_type  = action.result.data.info.DEATH_TYPE;
                exCommon.user.sect_nm  	  = action.result.data.info.SECT_NM;
                exCommon.user.death_type  = action.result.data.info.DEATH_TYPE;
                exCommon.user.sect_nm     = action.result.data.info.SECT_NM;
                exCommon.user.printFormYn = action.result.data.info.PRINT_FORM_YN;
                exCommon.user.death_type  = action.result.data.info.DEATH_TYPE;
                
                ExFrm.app.getController('AppController').loginAfter(this.getView());    
            },
            failure:function(form, action){
                Ext.Msg.alert('오류', action.result.msg);
            }
        });        
    },
    onAutoLogin : function (){
    	var me = this;
    	
    	var form = this.getView().getForm();
        form.url = '/login/session_check.suvila';
        form.submit({
        	scope:me,
            success:function(form, action){
            	try{
            		var adminInfo  = action.result.data.list;
            		if(adminInfo.USER_ID != null && adminInfo.USER_ID != ''){
            			console.log(action.result.data.info);
            			
            			exCommon.user.userId      = adminInfo.USER_ID;
                        exCommon.user.userName    = adminInfo.USER_NM;
                        exCommon.user.templeCd    = adminInfo.TEMPLE_CD;                
                        exCommon.user.templeNm    = adminInfo.TEMPLE_NM;
                        exCommon.user.searchGbn   = adminInfo.SEARCH_GBN;
                        exCommon.user.mobiletelno = adminInfo.MOBILE_TELNO;
                        exCommon.user.tel         = adminInfo.TELNO;
                        exCommon.user.sin_sms_yn  = adminInfo.SIN_SMS_YN;
                        exCommon.user.death_type  = adminInfo.DEATH_TYPE;
                        exCommon.user.sect_nm  	  = adminInfo.SECT_NM;
                        exCommon.user.death_type  = adminInfo.DEATH_TYPE;
                        exCommon.user.sect_nm     = adminInfo.SECT_NM;
                        exCommon.user.printFormYn = adminInfo.PRINT_FORM_YN;
                        exCommon.user.death_type = adminInfo.DEATH_TYPE;
                        ExFrm.app.getController('AppController').loginAfter(this.getView());
            		}
            	}catch (e) {
            		//console.log(e);
            		console.log('session not');
            	}
            }
        });
    	    	
    },
});