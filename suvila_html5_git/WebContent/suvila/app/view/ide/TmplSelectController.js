Ext.define('ExFrm.view.ide.TmplSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tmplselect',
	page:1,
	limit:10,
	totCount:0,
	scrollBottomCls:false,
	init:function(){
		this.onSearch();
	},
    onSearch:function(){
		var me = this;
		this.page= 1;
		this.totCount = 0;
		if(lboPremium == true){
			this.getViewModel().getStore('searchInfo').getProxy().url = './jsp/tmplLinkList.jsp?path=' + lboServerPath + 
				lboFileSeperator + "lib" + lboFileSeperator + "tmpljs" +lboFileSeperator+"link" + lboFileSeperator + lboProjectId + lboFileSeperator;
		}
        this.getViewModel().getStore('searchInfo').load({
//        	params:{
//        		krnNm:srchkrnNm,
//                valtPrc:srchvaltPrc
//        	},
        	limit:me.limit,
        	callback:this.onSearchCallback,
        	scope:this
        }); 
        
        // 테스트 데이터
        /*
	    this.getViewModel().getStore('searchInfo').setData(
	    	[
	    	 {field2:'1'},
		     {field2:'1'},
		     {field2:'1'}
		    ]);
		*/
    },
	onSearchCallback:function(records, operation, success){
    	console.log('onSearchkCallback',records);
		if(success == true){  
			this.totCount = this.getViewModel().getStore('searchInfo').getProxy().getReader().rawData.data.testSize; //수정하세요.
			//this.lookupReference('mainGridTot').setHtml('총건수 ['+ this.totCount + ']');
        }
        else if(success == false){
        	try{
    			Ext.Msg.alert(getLboLangItem('오류'), this.getViewModel().getStore('searchInfo').getProxy().getReader().rawData.msg);
    		}
    		catch(e){
    			console.log(e);
    			Ext.Msg.alert(getLboLangItem('오류'), operation.error.response.responseText.replace(/\'/g,' '));
    		}
    	}     	
    },
	onScrollEnd:function(){
        console.log('onScrollEnd');
    	if( this.scrollBottomCls == true){
    		return;
    	}
    	if( this.scrollBottomCls == false &&
    		this.page * this.limit > this.totCount ) {
			if(getLboLang() == 'english')
				Ext.Msg.alert('info', 'There is no data.');
			else 	
    			Ext.Msg.alert('확인', '더이상 조회할 내용이 없습니다.');
    		this.scrollBottomCls = true;
    		return;
		}        
		this.page++;
        var me = this;
        /*
        var srchkrnNm=  this.lookupReference('srchkrnNm').getValue();
        var srchvaltPrc=  this.lookupReference('srchvaltPrc').getValue();
        */
		console.log('page',this.page);
		Ext.Ajax.request({
			type:'ajax',
			url:this.getViewModel().getStore('searchInfo').proxy.url,
			params:{
				/*
				krnNm:srchkrnNm,
                valtPrc:srchvaltPrc,
				*/
				page:me.page,
				limit:me.limit
			},
			success:function(res){
				var obj = Ext.JSON.decode(res.responseText);
				if(obj.success == true){
					console.log(obj.data.test);
					me.getViewModel().getStore('searchInfo').add(obj.data.test);
					//Ext.Msg.alert("확인", "조회완료!!");  
				}
				else {
					Ext.Msg.alert(getLboLangItem("오류"), obj.msg);
					me.page--;
				}
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText.replace(/\'/g,' '));
				me.page--;
			}
		});
	},
	gridInfo:{},
	tmplViewCode:'',
	tmplModelCode:'',
	tmplControlCode:'',
    onDblClickMain:function(dv, record, item, index, e){
    	console.log(arguments);
    	var me = this;
    	
    	var fileName = record.data.name.substring(0,record.data.name.length - 5);
    	//this.lookupReference('tmplImg').setSrc('./resources/tmpljs/link/img/' + 
    	//	fileName + '.link.png');  
    	this.lookupReference('prjPath').setValue(lboServerPath);
    	this.lookupReference('tmplName').setValue(record.data.name);
		console.log('fileName' + fileName);
		console.log('url:' +'./lib/tmpljs/' + fileName + '.link'); 
		
		var url = './lib/tmpljs/link/' + fileName + '.link'
		if(lboPremium == true){
			url = './lib/tmpljs/link/' + lboProjectId + '/' + fileName + '.link'
		}
		// LINK 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:url,
			success:function(res){
				console.log('응답',res.responseText);
				var obj = Ext.JSON.decode(res.responseText);
				if(obj.success == true){
					console.log('>>>>', './lib/tmpljs/' + fileName);
					console.log('>>>>', obj.gridInfo);
					me.gridInfo = obj.gridInfo;					  
				}
				else {
					Ext.Msg.alert(getLboLangItem("오류"), obj.msg);
				}
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});    	
		// VIEW 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./lib/tmpljs/tmpl/' + fileName + '_view.js',
			success:function(res){
				me.tmplViewCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});		
		// CONTROLLER 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./lib/tmpljs/tmpl/' + fileName + '_controller.js',
			success:function(res){
				me.tmplControllerCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});
		// MODEL 가져오기
		Ext.Ajax.request({
			type:'ajax',
			url:'./lib/tmpljs/tmpl/' + fileName + '_model.js',
			success:function(res){
				me.tmplModelCode = res.responseText;
			},
			failure:function(res){
				Ext.Msg.alert(getLboLangItem("오류"), res.responseText);
			}
		});		
		var panel =Ext.ComponentQuery.query('imageshow')[0];
		if( panel !=null ){
			panel.show();    
			panel.setImage(fileName, './lib/tmpljs/link/img/' + fileName + '.link.png');
		}
		else {
		 	panel = Ext.create('ExFrm.view.ide.ImageShow');
			panel.show();    
			panel.setImage(fileName, './lib/tmpljs/link/img/' + fileName + '.link.png');
		}
    },	
    onSelectTemplate:function(){
        if(getLboLang() == 'english'){
			if(this.lookupReference('prjPath').getValue().trim().length == 0){
				this.lookupReference('prjPath').focus(true);
				Ext.Msg.alert('Error', 'Input Project path');
				return;
			}
			if(this.lookupReference('tmplName').getValue().trim().length == 0){
				this.lookupReference('tmplName').focus(true);
				Ext.Msg.alert('Error', 'Select Tempalte');
				return;
			}
			if(this.lookupReference('appName').getValue().trim().length == 0){
				this.lookupReference('appName').focus(true);
				Ext.Msg.alert('Error', 'App Name is blank');
				return;
			}      
			if(this.lookupReference('folderName').getValue().trim().length == 0){
				this.lookupReference('folderName').focus(true);
				Ext.Msg.alert('Error', 'Input folder name');
				return;
			}  
			if(this.lookupReference('xtypeName').getValue().trim().length == 0){
				this.lookupReference('xtypeName').focus(true);
				Ext.Msg.alert('Error', 'input xtype');
				return;
			}     
			if(this.lookupReference('panelType').getValue().trim().length == 0){
				this.lookupReference('panelType').focus(true);
				Ext.Msg.alert('Error', 'Input panel type');
				return;
			}  
		}
		else {
			if(this.lookupReference('prjPath').getValue().trim().length == 0){
				this.lookupReference('prjPath').focus(true);
				Ext.Msg.alert('확인', '프로젝트 경로를 확인하십시오.');
				return;
			}
			if(this.lookupReference('tmplName').getValue().trim().length == 0){
				this.lookupReference('tmplName').focus(true);
				Ext.Msg.alert('확인', '템플릿명을 입력하십시오.');
				return;
			}
			if(this.lookupReference('appName').getValue().trim().length == 0){
				this.lookupReference('appName').focus(true);
				Ext.Msg.alert('확인', '앱 명을 확인하십시오.');
				return;
			}      
			if(this.lookupReference('folderName').getValue().trim().length == 0){
				this.lookupReference('folderName').focus(true);
				Ext.Msg.alert('확인', '폴더명을 입력하십시오');
				return;
			}  
			if(this.lookupReference('xtypeName').getValue().trim().length == 0){
				this.lookupReference('xtypeName').focus(true);
				Ext.Msg.alert('확인', 'xType을 입력하십시오');
				return;
			}     
			if(this.lookupReference('panelType').getValue().trim().length == 0){
				this.lookupReference('panelType').focus(true);
				Ext.Msg.alert('확인', '패널타입을 선택하십시오');
				return;
			}          
		}   
    	var me = this;
		var params = {
			prjPath: this.lookupReference('prjPath').getValue(),
			tmplName: this.lookupReference('tmplName').getValue(),
			appName: this.lookupReference('appName').getValue(),
			folderName: this.lookupReference('folderName').getValue(),
			viewName: this.lookupReference('viewName').getValue(),
			xtypeName:this.lookupReference('xtypeName').getValue(),
			panelType:this.lookupReference('panelType').getValue(),
			chkViewController:this.lookupReference('chkViewController').checked,
			chkViewModel:this.lookupReference('chkViewModel').checked,		
			gridInfo: me.gridInfo,
			tmplViewCode: me.tmplViewCode,
			tmplControllerCode: me.tmplControllerCode,
			tmplModelCode: me.tmplModelCode
		};
		console.log('>>>>>>>>>' + this.lookupReference('chkViewController').checked);

/*		
{
	explain:'스크롤 그리드를 이용한 단순 조회 템플릿',
	gridCount:2,
	gridInfo0:{
		title:'조회조건(폼)',
		kind:'fieldset_search',
		prefix:'srch',
		columns:0,
		rows:1
	},
 	gridInfo1:{
		title:'조회결과(그리드)',
		kind:'grid_page',
		prefix:'',
		columns:0,
		rows:0
	}
}
*/		
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
			chkViewController:this.lookupReference('chkViewController').checked,
			chkViewModel:this.lookupReference('chkViewModel').checked,
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
	},
	onLinkReg:function(){
		// 등록화면으로 연동
		Ext.Msg.alert('확인','등록화면연동');
	},
	onLinkUpd:function(){
		// 변경화면으로 연동
		Ext.Msg.alert('확인','변경화면연동');
	},
	onLinkDel:function(){
		// 삭제화면으로 연동
		Ext.Msg.alert('확인','삭제화면연동');
	},
	onLinkSrch:function(){
		// 조회화면으로 연동
		Ext.Msg.alert('확인','조회화면연동');
	},
	onMyMenu:function(){
		Pef.app.getController('AppController').onMyMenu(this.getView().url, this.getView().title);  
	},
	onHelp:function(){
 		Pef.app.getController('AppController').onHelp(this.getView().helpFile); 
	}	
});

/*
// 폼 파라미터를 정의함.배포전 삭제요망 Reference사용용도임.
    this.lookupReferenece('srchKrnNm').setValue(obj.test.krnNm);	// í•œê¸€ëª…
    this.lookupReferenece('srchValtPrc').setValue(obj.test.valtPrc);	// í‰ê°€ê°€ê²©
    this.lookupReferenece('mainField2').setValue(obj.test.field2);	// í•„ë“œëª…2

*/
