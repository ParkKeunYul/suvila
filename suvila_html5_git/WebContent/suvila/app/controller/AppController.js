Ext.define('ExFrm.controller.AppController', { 
    extend: 'Ext.app.Controller',
    config:{
        refs:{
            main:'main',
            login:'login',
            mainBar: 'main tabpanel[name=mainbar]',
            mainDesktop:'maindesktop',
            mainView:'maindesktop panel[name=mainView]',
            mainDesktopToolbar:'maindesktop panel[name=mainView] toolbar[name=mainDesktopToolbar]',
            leftMenu: 'leftmenu',
        },
        /*
        routes:{
            '': {
                action:'onExit'
            }
        }
        */
    },
    mainScreenCls:'desktop',   // tabpanel, desktop
    onExit:function(){
    //  console.log('onExit');
      if(confirm('OOO 시스템을 완전히 빠져나가시겠습니까?') == true){
//          //history.go(-1);
          location.href='/';
      } 
      else {
          this.redirectTo("ExFrm");
      } 
    },
    setMainBar:function(url, menuName){
        var d = new Date();
        sessionStorage.setItem("timeout", d.setMinutes(0));
        //console.log('setMainBar', arguments);
        var a = true;
        /*
        if(a== true){
            Ext.Msg.alert('확인', '메뉴연동 준비중');
            return;
        }
        */
        var mainBar = this.getMainBar();
        var findTitle = false;
     //   console.log(mainBar);
        var menuCount = mainBar.getTabBar().items.items.length;
        for(i=0; i < mainBar.getTabBar().items.items.length; i++){
          //  console.log('find!!!');
          //  console.log(mainBar.getTabBar(i));
            if(url == mainBar.getTabBar(i).items.items[i].url){
                mainBar.getLayout().setActiveItem(i);
                findTitle = true;
                break;
            }
        }      
        if(findTitle == false){
      //      console.log('cant find!!!');
            try{
                panel.destroy();
            }catch(e){
                console.log(e);
            }
            //Ext.require(url);
        //    console.log('url', url);            
            var panel = Ext.create(url,{
                autoShow:true,
                autoDestroy:true
            });    
            
            mainBar.add(panel);       
            mainBar.getTabBar().items.items[menuCount].url = url;     
            mainBar.getLayout().setActiveItem(panel);
            
        }
    },
    // url, params, this, receiveMethod
    movePage:function(url, params, opener, receiveMethod){
        var d = new Date();
        sessionStorage.setItem("timeout", d.setMinutes(0));
        var mainBar = this.getMainBar();
        var findTitle = false;
        var panel;
      //  console.log(mainBar);
        var menuCount = mainBar.getTabBar().items.items.length;
        for(i=0; i < mainBar.getTabBar().items.items.length; i++){  
            console.log(mainBar.getTabBar(i));
            if(url == mainBar.getTabBar(i).items.items[i].url){
                mainBar.getLayout().setActiveItem(i);
                panel = mainBar.getLayout().getActiveItem();
                findTitle = true;
                break;
            }
        }      
        if(findTitle == false){
            panel = Ext.create(url,{
                autoShow:true,
            });    
            mainBar.add(panel);
            mainBar.getTabBar().items.items[menuCount].url = url;    
            mainBar.getLayout().setActiveItem(panel);
        }
        panel.getController().called(params, opener, receiveMethod);
     //   console.log('----------3');
        //console.log(menu.getController());
    },
    openWindow:function(url, menuName, params, opener, receiveMethod , navName){
        /*
        var d = new Date();
        sessionStorage.setItem("timeout", d.setMinutes(0));
        console.log('openPopup');
        console.log('params', params);
        */
        // 메뉴데이터에서 menuName을 읽어온다. 
        //var menuName = '테스트화면';
        //console.log('>> 존재하는 윈도우 찾기', Ext.ComponentQuery.query('exwindowmain[title=' + menuName + ']'));
        //debugger;
        //console.log('>> 존재하는 윈도우 찾기2', this.getMainView());

    	
    	var navTtitle =  url;
    	try{
    		if(navTtitle != "" && navTtitle.lastIndexOf('.') != -1){
            	navTtitle = navTtitle.substring(  navTtitle.lastIndexOf('.')+1 , navTtitle.length  )
            }
    	}catch (e) {}
        
    	/*console.log('navName', navName);
    	console.log('opener', opener);
    	console.log('receiveMethod', receiveMethod);*/
        
        var menuTopName = navTtitle + " " + navName;
    	
    	
        var me = this;

        //if(Ext.ComponentQuery.query('exwindowmain[title=' + menuName + ']').length > 0){
        if(Ext.ComponentQuery.query('exwindowmain[title=' + menuTopName + ']').length > 0){
         
        	
        	Ext.ComponentQuery.query('exwindowmain[title=' + menuTopName + ']')[0].show();
            Ext.ComponentQuery.query('exwindowmain[title=' + menuTopName + ']')[0].focus();


        } else {
            
            if(Ext.ComponentQuery.query('exwindowmain').length > 15){
                Ext.Msg.alert('확인','보여줄 수 있는 화면의 개수는 최대 15개까지 가능합니다. 미사용중인 화면을 닫고 실행하십시오.');
                return;
            }
            
            
            var windowPanel = Ext.create(url,{
                autoShow:true,
                //hidden:true,
                //title:menuName,
                title:menuTopName,
                constrain:true,
                constrainTo:me.getMainView().body,
                animateTarget:me.getMainDesktopToolbar().down('[name=startButton]').el
            });
            /*
			Ext.create('Ext.fx.Anim', {
				target: windowPanel,
				duration: 1000,
				from: {
					opacity: 0,       // Transparent
				},
				to: {
					opacity:1
				}
			});
            */
            
            /*
            setTimeout(function(){
                windowPanel.setHidden(false);
            },1000);
            */
            //화면에 FULL로 뜨도록 처리
            windowPanel.setWidth(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getWidth()-1);
            windowPanel.setHeight(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].getHeight()-37);
            windowPanel.alignTo(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].body, 'tl-tl');
            windowPanel.setMargin(Ext.ComponentQuery.query('maindesktop panel[name=mainView]')[0].setMargin('0 0 0 1'));
            //처리속도 개선

            setTimeout(function(){

                windowPanel.getController().called(params, opener, receiveMethod);
                
                me.getMainDesktop().down('[name=mainDesktopToolbar]').down('[name=windowsList]').add({
                    text:menuName,
                    //text:windowPanel.title,
                    panelWindowId:windowPanel.id,
                    handler:'onActiveMenuList'
                }); 

                me.getMainDesktop().down('[name=addedContainer]').add({
                    xtype:'button',
                    flex:1,
                    maxWidth:120,
                    text:menuName,
                    //text:windowPanel.title,
                    panelWindowId:windowPanel.id,
                    handler:'onActiveMenuList',
                    listeners:{	
                        afterrender:function(me){
                            me.el.addListener('contextmenu', function (e){
                                e.preventDefault();
                                e.cancelBubble = true;
                                //me.up('[isRootView=true]').getController().openContextMenu(e);
                                
                                Ext.Msg.confirm('확인', '화면을 닫겠습니까?', function(btn,msg,obj){
                                    if(btn == 'yes'){
                                        Ext.getCmp(windowPanel.id).destroy();
                                    }
                                });
                                
                                return false;
                            }); 	 			
                        }
                    }
                })
            },50);
        }
    },    
    openPopup:function(url, params, opener, receiveMethod){
    //    console.log('openPopup');
        var windowPanel = Ext.create(url,{
            autoShow:true,
            constrain:true,
            constrainTo:this.getMainView().body,
            isModal:true,
            modal:true,
        });
        //(openParams, openPanel, openReceiveMethod 
        windowPanel.getController().called(params, opener, receiveMethod);
    },
    checkSession:function(){
        /*
        각 로직에 다음 코드를 삽입할것.
        var d = new Date();
        sessionStorage.setItem("timeout", d.setMinutes(0));
        */
        var d = new Date();
        var d2 = d.setMinutes(10);
    //    console.log('>>', d2, d2-d);//600000
        sessionStorage.setItem("timeout", d.setMinutes(0));
     //   console.log(sessionStorage, sessionStorage.getItem("relogin"));
        //this.loopSession(this);
    },
    loopSession:function(me){
        setTimeout(function(){
            var setD = sessionStorage.getItem("timeout");
            var curD = new Date().setMinutes(0);
            if(curD - setD < 540000){
                // 아직 9분이 지나지 않았다. 
      //          console.log("9분이 지나지 않음" + (curD - setD));
                // this.openWindow(...); 로그인페이지.
            }
            else if(curD - setD < 600000){
                // 아직 10분이 지나지 않았다. 
         //       console.log("10분이 지나지 않음" + (curD - setD));
                // window.close();  // 닫아버린다. 
            }
            else {
                // 이미 10분이 지났다. 
         //       console.log("10분이 지남" +  + (curD - setD));
            }
            console.log('loopSession');
            me.loopSession(me)
        }, 1000);
    },
    setCommonDataStore:function(obj, groupCd, selectedValue){
   //     console.log('obj', obj);
        if(obj.exCommonType == 'combobox'){
        //    console.log('공통코드 ', obj);
            Ext.getStore('CommonStore').suspendEvents();
            Ext.getStore('CommonStore').clearFilter();
            Ext.getStore('CommonStore').filter('groupCd',groupCd);    
            Ext.getStore('CommonStore').each(function(record){
                obj.getStore().add(record.copy());
           //     console.log('코드조회', obj.getStore().getData());
            });
            Ext.getStore('CommonStore').resumeEvents();
            if(selectedValue != null){
                obj.setValue(selectedValue);
            }
        }
        else if(obj.exCommonType=='checkbox'){
        //    console.log('1공통코드 ', obj);
            Ext.getStore('CommonStore').suspendEvents();
            Ext.getStore('CommonStore').clearFilter();
            Ext.getStore('CommonStore').filter('groupCd',groupCd);
            Ext.getStore('CommonStore').each(function(record){
            //    console.log('record', record);
                obj.addItem(record.data);
            });
            Ext.getStore('CommonStore').resumeEvents();
            if(selectedValue != null){
                obj.setExValue(selectedValue);
            }            
        }
        else if(obj.exCommonType=='radio'){
        //    console.log('2공통코드 ', obj);
            Ext.getStore('CommonStore').suspendEvents();
            Ext.getStore('CommonStore').clearFilter();
            Ext.getStore('CommonStore').filter('groupCd',groupCd);
            Ext.getStore('CommonStore').each(function(record){
           //     console.log('record', record);
                obj.addItem(record.data);
            });
            Ext.getStore('CommonStore').resumeEvents();
            if(selectedValue != null){
                obj.setExValue(selectedValue);
            }            
        }
    },
    setCommonDataStoreReal:function(obj, groupCd, selectedValue, callbackFunc){
        Ext.Ajax.request({
            type:'ajax',
            //url:'./test/sampleCommon.jsp?groupCd=' + groupCd,
            url:'./extra/json/common/common.json',
            success:function(res){
          //      console.log('정상', res);
                var resobj = Ext.JSON.decode(res.responseText);
                if(resobj.success == true){
                	Ext.getStore('CommonStore').filter('groupCd',groupCd);
                	
                	
              //      console.log(resobj);
                    if(obj.exCommonType == 'combobox'){
                        obj.getStore().add(resobj.data.list);
                        if(selectedValue != null){
                            obj.setExValue(selectedValue);
                        }
                        if(callbackFunc != null){
                            callbackFunc('success', obj);
                        }
                    }
                    else if(obj.exCommonType == 'checkbox'){
                        for(var i=0; i< resobj.data.list.length; i++){
                            obj.addItem(resobj.data.list[i]);
                        }
                        if(selectedValue != null){
                            obj.setExValue(selectedValue);
                        }
                        if(callbackFunc != null){
                            callbackFunc('success', obj);
                        }                        
                    }
                    else if(obj.exCommonType == 'radio'){
                        for(var i=0; i< resobj.data.list.length; i++){
                            obj.addItem(resobj.data.list[i]);
                        }
                        if(selectedValue != null){
                            obj.setExValue(selectedValue);
                        }
                        if(callbackFunc != null){
                            callbackFunc('success', obj);
                        }
                    }
                }
                else {
                    Ext.Msg.alert("오류", obj.msg);
                    if(callbackFunc != null){
                        callbackFunc('fail');
                    }                    
                }
            },
            failure:function(res){
         //       console.log('오류',res);
                Ext.Msg.alert("화면초기화 오류", res);
                if(callbackFunc != null){
                    callbackFunc('fail');
                }                  
            }
        });
    },    
    setUrlDataStoreReal:function(obj, url, selectedValue, callbackFunc){
        Ext.Ajax.request({
            type:'ajax',
            url:url,
            success:function(res){
          //      console.log('정상', res);
                var resobj = Ext.JSON.decode(res.responseText);
                if(resobj.success == true){
          //          console.log(resobj);
                    obj.getStore().add(resobj.data.list);
                    if(selectedValue != null){
                        obj.setValue(selectedValue);
                    }
                    if(callbackFunc != null){
                        callbackFunc('success');
                    }                      
                }
                else {
                    Ext.Msg.alert("오류", obj.msg);
                    if(callbackFunc != null){
                        callbackFunc('fail');
                    }                      
                }
            },
            failure:function(res){
          //      console.log('오류',res);
                Ext.Msg.alert("화면초기화 오류", res);
                if(callbackFunc != null){
                    callbackFunc('fail');
                }                  
            }
        });
    },
    loginAfter:function(loginPanel){
        
        var me = this;
        // 1. 공통코드를 가져온다. 
        // 2. 메뉴를 가져온다. 
        // 3. 화면을 띄운다.     
        //me.checkSession();  
        me.getCommonCode();
    },   
    getCommonCode:function(){
        var me = this;
        
        Ext.getStore('StipulcationStore').load({});
        
        Ext.getStore('CommonStore').getProxy().url= './extra/json/common/common.json';
        Ext.getStore('CommonStore').load({
            callback:function(records,operation,success){
                if(success == false){
                    Ext.Msg.alert('오류', '공통코드를 불러올수 없습니다.');
                    return;
                }
                  me.getDesktopMenu();
            }
        });        
    },
    getMenu:function(){
        var me = this;
        console.log('AppController getMenu');
        Ext.Ajax.request({
            type:'ajax',
          url:'./extra/json/menu/menuLeft.json', //tab
        //   url : '/asp/menu/menuLeft.suvila',
            success:function(res){
           //     console.log('정상', res);
                var resobj = Ext.JSON.decode(res.responseText);
                if(resobj.success == true){
              //      console.log('resobj', resobj);
                    exCommon.menu.topMenu1 = resobj.data.info.topMenu1;
                    exCommon.menu.topMenu2 = resobj.data.info.topMenu2;
                    exCommon.menu.topMenu3 = resobj.data.info.topMenu3;
                    exCommon.menu.topMenu4 = resobj.data.info.topMenu4;
                    exCommon.menu.topMenu5 = resobj.data.info.topMenu5;
                    exCommon.menu.topMenu6 = resobj.data.info.topMenu6;
                    exCommon.menu.topMenu7 = resobj.data.info.topMenu7;
                    exCommon.menu.topMenu8 = resobj.data.info.topMenu8;
                    // 초기화면으로 이동
                    //console.log('가져오기 완료');
                    
                    // 탭패널 구조일 경우 
                    //me.getMain().add(Ext.create('ExFrm.view.main.MainPanel'));
                    //me.getMain().remove(me.getLogin(), true);
                    me.getLeftMenu().regData(exCommon.menu.topMenu1);                    
                    //me.getLeftMenu().regData(exCommon.menu.topMenu3);
                    
                    console.log( me.getLeftMenu() );
                    
                }
                else {
                	console.log('App obj = ', resobj);
                    Ext.Msg.alert("오류", resobj.msg);
                                    
                }
            },
            failure:function(res){
                console.log('오류',res);
                Ext.Msg.alert("오류", res);
                me.getLeftMenu().regData(exCommon.menu.topMenu1);                 
            }
        });
    },
    getDesktopMenu:function(){
        var me = this;
        Ext.Ajax.request({
            type:'ajax',
         //  url : '/asp/menu/menuStart.suvila',
          url:'./extra/json/menu/menuStart.json', //tab
            success:function(res){
            //    console.log('정상', res);
                var resobj = Ext.JSON.decode(res.responseText);
                if(resobj.success == true){
              //      console.log('resobj', resobj);

                    var menus = resobj.data.list;
                    
                    // 초기화면으로 이동
                  //  console.log('가져오기 완료');
                    var mainDesktop = Ext.create('ExFrm.view.main.MainDesktop')

                    me.getMain().add(mainDesktop);
                    var mainDesktopToolbar = mainDesktop.down('[name=mainDesktopToolbar]');
              //      console.log(mainDesktopToolbar);
              //      console.log(mainDesktopToolbar.down('[name=startButton]'));
                    //debugger;
                   mainDesktopToolbar.down('[name=startButton]').menu.add(menus);
                    /*
                    console.log('this.getMainDesktopToolbar()', mainDesktopToolbar);
                    for(var i=0; i < menus.length; i++){
                        console.log(menus[i]);
                        mainDesktopToolbar.insert(i+4, menus[i]);   // 위치조정시 수정 
                    } 
                    */                   
                    /*
                    console.log('this.getMainDesktopToolbar()', me.getMainDesktopToolbar());
                    for(var i=0; i < menus.length; i++){
                        me.getMainDesktopToolbar().insert(menus[i], i + 1);
                    }
                    */
                    me.getMain().remove(me.getLogin(), true);
                    me.getMenu();
                }
                else {
                    Ext.Msg.alert("오류", obj.msg);
                                    
                }
            },
            failure:function(res){
                console.log('오류',res);
                Ext.Msg.alert("오류", res);
                me.getLeftMenu().regData(exCommon.menu.topMenu1);                 
            }
        });
    }, 
    setMainBarDestroy:function(panelId){
        var mainDesktopToolbar = this.getMainDesktop().down('[name=mainDesktopToolbar]');
       // console.log(mainDesktopToolbar.down('[name=windowsList]'),mainDesktopToolbar.down('[panelWindowId=' + panelId + ']'))
        mainDesktopToolbar.down('[name=windowsList]').remove(mainDesktopToolbar.down('[panelWindowId=' + panelId + ']'));

        this.getMainDesktop().down('[name=addedContainer]').remove(this.getMainDesktop().down('[name=addedContainer]').down('[panelWindowId=' + panelId + ']'));
        //mainDesktopToolbar.remove(this.getMainToolBar().down('[name=windowsList]').down('[panelWindowId=' + panelId + ']'));
    },       
    setLeftMenu:function(kind){
        //console.log('obj', obj);
        var me = this;
        if(kind=='1'){
           me.getLeftMenu().regData(exCommon.menu.topMenu1);
        }
        else if(kind=='2'){
           me.getLeftMenu().regData(exCommon.menu.topMenu2);
        }
        else if(kind=='3'){
           me.getLeftMenu().regData(exCommon.menu.topMenu3);
        }                
        else if(kind=='4'){
           me.getLeftMenu().regData(exCommon.menu.topMenu4);
        }                
        else if(kind=='5'){
           me.getLeftMenu().regData(exCommon.menu.topMenu5);
        }                
        else if(kind=='6'){
           me.getLeftMenu().regData(exCommon.menu.topMenu6);
        }                
        else if(kind=='7'){
           me.getLeftMenu().regData(exCommon.menu.topMenu7);
        }   
        else if(kind=='8'){
           me.getLeftMenu().regData(exCommon.menu.topMenu8);
        }                
    }
   
});