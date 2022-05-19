Ext.define('ExFrm.view.ide.MainMr', {
    extend: 'Ext.panel.Panel',
    requires: [
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		//'ExFrm.view.user.UserShowList',
		'ExFrm.view.ide.MainCssController',
		'ExFrm.view.ide.CssMaker',
		'ExFrm.view.ide.Settings'
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
	isRootView:true,
    items: [
    {
		region:'north',
		height:50,		
		bodyStyle:'background-color:rgb(21, 127, 204)',
    	//collapsible:true,
		layout:'hbox',
		items:[{
			flex:1,
			bodyStyle:'background-color:rgb(21, 127, 204)',
			html: '<a name="appTitle"><h2><font color="white">&nbsp;&nbsp;&nbsp;ExGen Framework Ver 1.2.1', //   &nbsp;&nbsp;-&nbsp;&nbsp; ' + lboUserProjectName + '</font></h2></a>',
		}]
    },{
    	region:'north',
    	layout:'hbox',
    	//bodyStyle:'background-color:rgb(21, 127, 204)',
        bodyStyle:'background-color:rgb(21, 127, 204)',
        defaults:{
            //bodyStyle:'background-color:red'
        },
    	items:[
		/*
    	{
    		xtype:'button',
    		text:'위젯관리자',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'위젯배포관리',
 					html:"<iframe src=\'./indexwidgetdeploy.jsp' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	}*//*,{
    		xtype:'button',
    		text:'CSS관리자',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'CSS관리자',
 					html:"<iframe src=\'./indexcss.html' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	},{
    		xtype:'button',
    		text:'메인화면구성',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'매인화면구성',
 					html:"<iframe src=\'./indexinit.html' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	}*/{
    		xtype:'tbspacer',
    		flex:1,
    	},{
    		xtype:'button',
    		text:getLboLangItem('템플릿 만들기'),
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:getLboLangItem('템플릿 만들기'),
 					html:"<iframe src=\'./indextemplate.jsp' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	},{
    		xtype:'button',
    		text:getLboLangItem('화면 만들기'),
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
                    cellpadding:'0 0 0 0',
                    margin:'0 0 0 0',
    				closable:true,
		    		autoShow:true,
		    		title: getLboLangItem('화면 만들기'), 
 					html:"<iframe src=\'./indexsimplemaker.jsp' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	}/*,{
    		xtype:'button',
    		text:getLboLangItem('프리미엄 화면 만들기'),
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
                    cellpadding:'0 0 0 0',
                    margin:'0 0 0 0',
    				closable:true,
		    		autoShow:true,
		    		title:getLboLangItem('화면 만들기'),
 					html:"<iframe src=\'./indexsimplemaker.jsp?premiumkind=premium' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	}*/,{
    		xtype:'button',
    		text:getLboLangItem('배포화면 보기'),
    		handler:function(){
    			window.open('./index.jsp', '_blank');
    			/*
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'심플메이커',
 					html:"<iframe src=\'./indexsimplemaker.html' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);
    			*/		
    		}
    	},{
            xtype:'button',
            text:'DEV MODE',
            handler:function(){
                if(exCommon.loadingMode == 'dev'){
                    exCommon.setLoadingMode('test');
                    this.setText('TEST MDOE'); 
                    this.setStyle({background:'red'});
                }
                else {
                    exCommon.setLoadingMode('dev');
                    this.setText('DEV MODE'); 
                    this.setStyle({background:'rgb(21, 127, 204)'})
                }  
            }
        },{
            xtype:'button',
            text:'ERROR-MESSAGE MODE',
            handler:function(){
                if(exCommon.debugMode == 'message'){
                    exCommon.setDebugMode('console');
                    this.setText('ERROR-CONSOLE MODE'); 
                    this.setStyle({background:'red'});
                }
                else {
                    exCommon.setDebugMode('message');
                    this.setText('ERROR-MESSAGE MODE'); 
                    this.setStyle({background:'rgb(21, 127, 204)'})
                }  
            }
        }/*,{
            xtype:'button',
            text:'English',
            handler:function(){
                if(this.getText()=='English'){
                    this.setText('Korean'); 
                }
                else {
                    this.setText('English'); 
                }  
            }
        },{
    		xtype:'button',
    		text:'로그인',
    		handler:function(){
    			var panel= Ext.create('Ext.window.Window',{
    				closable:true,
		    		autoShow:true,
		    		title:'로그인',
		    		width:300,
		    		height:200,
		    		items:[
		    		{
		    			xtype:'textfield',
		    			fieldLabel:'아이디',
		    			reference:'userId'
		    		},{
		    			xtype:'textfield',
		    			fieldLabel:'패스워드',
		    			reference:'password'
		    		},{
		    			xtype:'combobox',
		    			displayField:'name',
		    			fieldLabel:'언어선택',
		    			valueField:'code',
		    			store:{
		    				data:[
		    				{ name:'한글', code:'kr'},
		    				{ name:'영문', code:'en'}
		    				]
		    			}
		    		},{
		    			layout:{
		    				type:'hbox',
		    				pack:'center'
		    			},
		    			items:[
		    			{
		    				xtype:'button',
		    				text:'로그인'
		    			}]
		    		}]
 				});
 				panel.show();
		
    		}
    	}*//*,{
    		xtype:'button',
    		text:'컴포넌트',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'컴포넌트',
 					html:"<iframe src=\'http://www.miraeweb.com/sencha-charts/' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);	    					
    		}
    	},{
    		xtype:'button',
    		text:'도움말',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'도움말',
 					html:"<iframe src=\'http://www.miraeweb.com/sencha-ext-js/' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);	    				
    		}
    	}*//*,{
    		xtype:'button',
    		text:'통합개발',
    		handler:function(){
    			var panel= Ext.create('Ext.panel.Panel',{
    				closable:true,
		    		autoShow:true,
		    		title:'통합개발',
 					html:"<iframe src=\'./indexide.html' width=\'100%\' height=\'100%\' frameborder=0 webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
 				});
 				console.log(Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0]);
 				Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].add(panel);
    			Ext.ComponentQuery.query('tabpanel[name=mainMr]')[0].getLayout().setActiveItem(panel);		
    		}
    	}*//*,{
    		xtype:'button',
    		text:'환경설정',
    		handler:function(){
 				var panel = Ext.create('ExFrm.view.ide.Settings');
 				panel.show();
    		}   	
    	}*/]
    },{
        region: 'west',
        xtype: 'ideleftmenu',
        name: 'ideLeftMenu',
        width:250,
        split:true,
        //padding:'5 5 5 5',
        items:[]
    },{
        region: 'center',
        xtype: 'tabpanel',
        name: 'mainMr',
        padding:'5 5 5 5',
        items:[{
			title:'시작하기',
			padding:'10 10 10 10',
			scrollable:true,
			loader:{
				url:'./resources/intro/intro.html',
				autoLoad:true
			}
		}]
    }]
});
