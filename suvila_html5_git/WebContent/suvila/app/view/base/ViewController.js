Ext.define('ExFrm.view.base.ViewController', {
    extend: 'Ext.app.ViewController',
    openPanel:null,
    openReceiveMethod:null,
    openParams:null,
    isMask:false,
    mask:{},
    showMask:function(){
    	try{this.mask.show();}catch(e){}
    },
    hideMask:function(){
    	try{this.mask.hide();}catch(e){}
    },
	auth:'READ',
	getAuth:function(){
		if(this.auth == null){
			this.auth = 'READ';
		}
		return this.auth;
	},
	setAuth:function(auth){
		this.auth = auth;
	},
	setCommonCode:function(obj,groupValue,selectedValue){
		ExFrm.app.getController('AppController').setCommonDataStore(obj, groupValue, selectedValue);
	},
	
	
	setCommonCodeReal:function(obj, groupValue, selectedValue, callbackMethod){
		ExFrm.app.getController('AppController').setCommonDataStoreReal(obj, groupValue, selectedValue, callbackMethod);				
	}, 
    afterRender:function(content){
    	if(exCommon.initReady == false){
    		return;
    	}
    	var me = this;
		me.mask = new Ext.LoadMask(content, {msg:"잠시만 기다려 주세요..."});	
    	if(me.isMask == true){ 			
			me.mask.show();   
		}
		me.onAfterRender(content);	
    },
    onAfterRender:function(content){
    },
    called:function(openParams, openPanel, openReceiveMethod ){
    	this.openPanel = openPanel;
    	this.openReceiveMethod = openReceiveMethod;
    	this.openParams = openParams;
    	this.onCalled(this.openParams);
    },
    onCalled:function(){
    },   
    receiveTo:function(params,closeCls){
    	try{
    		if(this.openReceiveMethod != null){
    	    	this.openReceiveMethod(params, this.openPanel);
    	    }
        	if(closeCls != null &&  closeCls == true){
        		this.getView().destroy();
        	}
    	}catch (e) {
			console.log('e = ', e);
		}
    },
    movePage:function(url, params, receiveMethod){
    	ExFrm.app.getController('AppController').movePage(url, params, this, receiveMethod); 
    },
    openWindow:function(url,  params, receiveMethod){
    	ExFrm.app.getController('AppController').openWindow(url,  params, this, receiveMethod);
    },
    openPopup:function(url,  params, receiveMethod){
    	ExFrm.app.getController('AppController').openPopup(url,  params, this, receiveMethod);
    },
    init:function(){
    	if(exCommon.initReady == false){
    		return;
    	}
    	this.baseInit(arguments);
    },
    baseInit:function(){
    	var me = this;
    	me.onInit(me,arguments);
    },
    onInit:function(me){
    },
    // Store 
    callStore:function(me, storeName, listArrowName, params, receiveMethod, baseMsgCls, async){
    	var me=this;
    	if(listArrowName != null &&  listArrowName.trim().length != 0){
        	me.lookupReference(listArrowName).setParams(params);
        }
        if(me.getViewModel().getStore(storeName) == null){
            Ext.Msg.alert('오류', storeName + '를 찾을 수 없습니다.');
            return;
        }
	    var asynchronousLoad = true;
		if(async != null){
			asynchronousLoad = async
		}
        me.getViewModel().getStore(storeName).load({
            params:params,
			asynchronousLoad:asynchronousLoad,
            callback:function(records, operation, success){
		        if(success == true){
                    if(listArrowName != null &&  listArrowName.trim().length != 0){
                        me.lookupReference(listArrowName).initInfo();
                    }
		        }
		        else if(success == false){
		        	console.log('callStore', success);
		        	if(baseMsgCls == null || me.baseMsgCls == true){     	
			            try{
			            	var msg = me.getViewModel().getStore(storeName).getProxy().getReader().rawData.msg
			            	
			            	if(msg == "세션이 종료되었습니다.다시 로그인해주세요."){
			            		alert(msg);
		            			location.href='/';
			            	}else{
			            		Ext.Msg.alert('오류', msg);
			            	}
			            }catch(e){
							try{
								var record = Ext.JSON.decode(operation._response.responseText);
								
								if(record.msg == "세션이 종료되었습니다.다시 로그인해주세요."){
									alert(record.msg);
			            			location.href='/';
								}else{
									Ext.Msg.alert('오류', record.msg);
								}
							}catch(e){
								try{
									var msg = operation.error									
									
									if(msg == "세션이 종료되었습니다.다시 로그인해주세요."){
										alert(msg);
					            		location.href='/';
									}else{
										Ext.Msg.alert('오류', msg);
									}
								}catch(e){
									Ext.Msg.alert('오류', '시스템 장애 발생!! 관리자에게 문의 하십시요.');
								}
							}
			            }
			        }
		        }
		        else if(success == "relogin"){
		        	console.log('relogin', success);
		        }
		        if(receiveMethod!= null){
		        	receiveMethod(me, success, records, operation);   	
		        }    	
		    },
            scope:me,
        });
    },                        
    // Ajax  
    callAjax:function(me, url, params, receiveMethod, baseMsgCls, async){
		var asyncCls = true;
		if(async != null){
			asyncCls = async;
		}
        Ext.Ajax.request({
            type:'ajax',
            url:url,
            params:params,
			async:asyncCls,
            headers: {'Accept' : 'application/json' }, 
            scope:this,
            success:function(res, opts){
		    	var record = Ext.JSON.decode(res.responseText);
                if(record.success == null){
                    alert('응답에 success가 정상적으로 설정되지 않았습니다.');
                }
		        if(record.success == true){
			        if(receiveMethod != null){
				        receiveMethod(me, true, res, record, opts);
				    }
		        }else {
		        	if(baseMsgCls == null || baseMsgCls == true){
			            Ext.Msg.alert("오류", record.msg);
			        }
		            if(receiveMethod != null){
		            	receiveMethod(me, false, res, null, opts);
		            }
		        }
		    },
            failure:function(res){  
		    	console.log('baseAjaxFailCallback');
		    	if(baseMsgCls == null || baseMsgCls == true){
					console.log('res', res);
		           	Ext.Msg.alert("오류", res);
		        }    	
		        if(receiveMethod != null){
		        	receiveMethod(me, false, res);
		        }
		    }
        });    	
    },                    
    // Form 콜
    callForm:function(me, url, receiveMethod, baseMsgCls){
		var form = me.lookupReference('regform').getForm();
		
		form.url=url;		
		form.submit({
			scope:me,
			success:function(form, action){
		    	if(baseMsgCls == null || baseMsgCls == true){
			    	Ext.Msg.alert('확인', action.result.msg);
			    }
		        if(receiveMethod != null){
			        receiveMethod(me, true, form, action);
			    }
		    },
			failure:function(form, action){
		    	
				try{
					var callBackData = Ext.decode(action.response.responseText);									
					if(callBackData.msg == "세션이 종료되었습니다.다시 로그인해주세요."){
						alert(callBackData.msg);
	            		location.href='/';
					}
				}catch (e) {}
				
				
		    	if(baseMsgCls == null || baseMsgCls == true){
			    	try{
			    		var callBackData = Ext.decode(action.response.responseText);
						Ext.Msg.alert('오류', callBackData.msg);
				    }catch(e){
				    	Ext.Msg.alert('오류', action.response.responseText);
				    }
				}
		        if(receiveMethod != null){
			        receiveMethod(me, false, form, action);
			    }
		    }
		});
		
    },
    callForm2:function(me, url, receiveMethod, baseMsgCls){
		var form = me.lookupReference('regform2').getForm();
		
		form.url=url;		
		form.submit({
			scope:me,
			success:function(form, action){
		    
		    	if(baseMsgCls == null || baseMsgCls == true){
			    	Ext.Msg.alert('확인', action.result.msg);
			    }
		        if(receiveMethod != null){
			        receiveMethod(me, true, form, action);
			    }
		    },
			failure:function(form, action){
		    	
				try{
					var callBackData = Ext.decode(action.response.responseText);									
					if(callBackData.msg == "세션이 종료되었습니다.다시 로그인해주세요."){
						alert(callBackData.msg);
	            		location.href='/';
					}
				}catch (e) {}
				
				
		    	if(baseMsgCls == null || baseMsgCls == true){
			    	try{
			    		var callBackData = Ext.decode(action.response.responseText);
						Ext.Msg.alert('오류', callBackData.msg);
				    }catch(e){
				    	Ext.Msg.alert('오류', action.response.responseText);
				    }
				}
		        if(receiveMethod != null){
			        receiveMethod(me, false, form, action);
			    }
		    }
		});
		
    },
});
