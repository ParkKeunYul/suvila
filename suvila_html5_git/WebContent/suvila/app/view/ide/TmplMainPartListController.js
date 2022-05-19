Ext.define('ExFrm.view.ide.TmplMainPartListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplmainpartlist',
	init:function(){
		this.onSearch();
	},
    onSearch:function(){
    	console.log(this, "onSearch called");
		var me = this;
		this.page= 1;
		this.totCount = 0;
        this.getViewModel().getStore('searchInfo').load({
        	callback:this.onSearchCallback,
        	scope:this
        }); 
    },
	onSearchCallback:function(records, operation, success){
    	console.log('onSearchkCallback',records);
		if(success == true){  
			this.totCount = this.getViewModel().getStore('searchInfo').getProxy().getReader().rawData.data.testSize; //수정하세요.
        }
        else if(success == false){
        	try{
    			Ext.Msg.alert('오류', this.getViewModel().getStore('searchInfo').getProxy().getReader().rawData.msg);
    		}
    		catch(e){
    			console.log(e);
    			Ext.Msg.alert('오류', operation.error.response.responseText.replace(/\'/g,' '));
    		}
    	}     	
    },
	gridInfo:{},
	tmplViewCode:'',
	tmplModelCode:'',
	tmplControlCode:'',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log(arguments);
    	me = this;
    	
    	var fileName = record.data.name.substring(0,record.data.name.length - 5);
    	this.lookupReference('tmplImg').setHtml('<img width="100%" src="./resources/tmplimg/' + 
    		fileName + '.png">');  
    	this.lookupReference('prjPath').setValue(lboServerPath);
    	this.lookupReference('tmplName').setValue(record.data.name);

		// LINK 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./resources/tmpljs/' + fileName + '.link',
			success:function(res){
				var obj = Ext.JSON.decode(res.responseText);
				if(obj.success == true){
					console.log(obj.data.gridInfo);
					me.gridInfo = obj.data.gridInfo;					  
				}
				else {
					Ext.Msg.alert("오류", obj.msg);
				}
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
			}
		});    	
		// VIEW 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./resources/tmpljs/' + fileName + '_view.js',
			success:function(res){
				me.tmplViewCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
			}
		});		
		// CONTROLLER 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./resources/tmpljs/' + fileName + '_controller.js',
			success:function(res){
				me.tmplControllerCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
			}
		});
		// MODEL 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./resources/tmpljs/' + fileName + '_model.js',
			success:function(res){
				me.tmplModelCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert("오류", res.responseText.replace(/\'/g,' '));
			}
		});		    	
    },	
    onSelectTemplate:function(){
    	var me = this;
		var params = {
			prjPath: this.lookupReference('prjPath').getValue(),
			tmplName: this.lookupReference('tmplName').getValue(),
			appName: this.lookupReference('appName').getValue(),
			folderName: this.lookupReference('folderName').getValue(),
			viewName: this.lookupReference('viewName').getValue(),
			gridInfo: me.gridInfo,
			tmplViewCode: me.tmplViewCode,
			tmplControllerCode: me.tmplControllerCode,
			tmplModelCode: me.tmplModelCode
		};	
		ExFrm.app.getController('IdeController').movePage('ExFrm.view.ide.TmplCreate','템플릿생성',params);    	
    },
    onSelectTemplateTest:function(){
    	var me = this;
    	this.lookupReference('appName').setValue('ExFrm');
    	this.lookupReference('folderName').setValue('test');
    	this.lookupReference('viewName').setValue('Test001');
		var params = {
			prjPath: this.lookupReference('prjPath').getValue(),
			tmplName: this.lookupReference('tmplName').getValue(),
			appName: this.lookupReference('appName').getValue(),
			folderName: this.lookupReference('folderName').getValue(),
			viewName: this.lookupReference('viewName').getValue(),
			gridInfo: me.gridInfo,
			tmplViewCode: me.tmplViewCode,
			tmplControllerCode: me.tmplControllerCode,
			tmplModelCode: me.tmplModelCode
		};
		ExFrm.app.getController('IdeController').movePage('ExFrm.view.ide.TmplCreate','템플릿생성',params);    	    	
    },
	onReg:function(){
		// 등록화면으로 연동
		Ext.Msg.alert('확인','등록화면연동');
		var form = this.lookupReference('regform').getForm();
		if(form.isValid() == false){
			return;
		}
		form.url="./jsp/reg.jsp";
		form.submit({
			success:function(form, action){
				Ext.Msg.alert('확인', action.result.msg);
				// 폼을 클리어하려면
				form.reset();
				// this.onSearch();
			},
			failure:function(form, action){
				if(action.result.msg == undefined){
					Ext.Msg.alert('오류1', action.response.responseText.replace(/\'/g,' '));
				}
				else{
					Ext.Msg.alert('오류', action.result.msg);
				}
			}
		});
	}	
});