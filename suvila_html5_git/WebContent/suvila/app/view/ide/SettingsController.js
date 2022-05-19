Ext.define('ExFrm.view.ide.SettingsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.settings',
    init:function(){
    	var me = this;
    	Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileRead.jsp?path=' + lboServerPath + '/app/view/ide/Config.js',
			callback:function(obj, success, resObj){
		    	var strCont = resObj.responseText;
		    	var serverPathCont = '';
		    	var applicationNameCont = '';
		    	var screenWidthCont = '';
		    	var screenHeightCont = '';
		    	var strContLen = strCont.length;
				for (var i = 0; i < strContLen -10; i++)
			    {
			        if (strCont.substring(i, i+13) == "lboServerPath")
			        {
			            for(var j=i+1; j< strContLen; j++)
			            {
			                if(strCont.substring(j,j+1) == '\'')
			                {
			                    strtDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			            for (var j = i + 1; j < strContLen; j++)
			            {
			                if (strCont.substring(j,j+1) == '\'')
			                {
			                    endDefine = j+1;
			                    i = j;
			                    break;
			                }
			            }
			            serverPathCont = strCont.substring(strtDefine, endDefine); 
			        }
			        
			        if (strCont.substring(i, i+18) == "lboApplicationName")
			        {
			            for(var j=i+1; j< strContLen; j++)
			            {
			                if(strCont.substring(j,j+1) == '\'')
			                {
			                    strtDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			            for (var j = i + 1; j < strContLen; j++)
			            {
			                if (strCont.substring(j,j+1) == '\'')
			                {
			                    endDefine = j+1;
			                    i = j;
			                    break;
			                }
			            }
			            applicationNameCont = strCont.substring(strtDefine, endDefine); 
			        }
			        if (strCont.substring(i, i+14) == "lboScreenWidth")
			        {
			            for(var j=i+1; j< strContLen; j++)
			            {
			                if(strCont.substring(j,j+1) == '=')
			                {
			                    strtDefine = j+1;
			                    i = j;
			                    break;
			                }
			            }
			            for (var j = i + 1; j < strContLen; j++)
			            {
			                if (strCont.substring(j,j+1) == ';')
			                {
			                    endDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			            screenWidthCont = strCont.substring(strtDefine, endDefine); 
			        }	
			        if (strCont.substring(i, i+15) == "lboScreenHeight")
			        {
			            for(var j=i+1; j< strContLen; j++)
			            {
			                if(strCont.substring(j,j+1) == '=')
			                {
			                    strtDefine = j+1;
			                    i = j;
			                    break;
			                }
			            }
			            for (var j = i + 1; j < strContLen; j++)
			            {
			                if (strCont.substring(j,j+1) == ';')
			                {
			                    endDefine = j;
			                    i = j;
			                    break;
			                }
			            }
			            screenHeightCont = strCont.substring(strtDefine, endDefine); 
			        }				        		        			        
			    }
			    console.log('serverPathCont',serverPathCont);
			    me.lookupReference('serverPath').setValue(serverPathCont);
			    me.lookupReference('applicationName').setValue(applicationNameCont);
			    me.lookupReference('screenWidth').setValue(screenWidthCont);
			    me.lookupReference('screenHeight').setValue(screenHeightCont);		    	
		    }
		});    	
    },
    onSave:function(){
		strContent = 
			"var lboServerPath=" + this.lookupReference('serverPath').getValue() + ";\n" + 
			"var lboApplicationName=" + this.lookupReference('applicationName').getValue() + ";\n" + 
			"var lboScreenWidth=" + this.lookupReference('screenWidth').getValue() + ";\n" + 
			"var lboScreenHeight=" + this.lookupReference('screenHeight').getValue() + ";\n"; 
		
		Ext.Ajax.request({
			type:'ajax',
			url:'./jsp/fileWrite.jsp',
			params:{
				path: lboServerPath + lboUserServerPath + 
					lboFileSeperator + 'app' + 
					lboFileSeperator + 'view' + 
					lboFileSeperator + 'ide' + 
					lboFileSeperator + 'Config.js',
				content:strContent
			},
			success:function(res){
				var obj = JSON.parse(res.responseText);
				console.log('obj', obj);
				if(obj.success == false) {
					Ext.Msg.alert(getLboLangItem('오류'), obj.msg);
					return;
				}
				Ext.Msg.alert("확인", '저장하였습니다.');
				this.getView().destroy();
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText);
			}					
		});   
    } 
});