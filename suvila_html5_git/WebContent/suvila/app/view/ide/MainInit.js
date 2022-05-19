Ext.define('ExFrm.view.ide.MainInit', {
    extend: 'Ext.panel.Panel',
    requires: [
    	'ExFrm.view.ide.MainInitController'
    /*
		'ExFrm.view.ide.IdeLeftMenu',
		'ExFrm.view.ide.IdeToolsMenu',
		'ExFrm.view.ide.TmplLeftMenu',
		//'ExFrm.view.user.UserShowList',
		'ExFrm.view.ide.MainTemplateController',
		'ExFrm.view.ide.TmplPartList',
		'ExFrm.view.ide.TmplMainPartList'
    */
    ],
    xtype: 'idemain',
    controller: 'idemain',
    layout: 'border',
    items: [
    {
    	region:'north',
    	layout:'hbox',
    	html:'메인화면은 프로젝트 시작 후 일반적으로 한번만 작업하게 됩니다.' + 
    	     '만약 다시 작업할 경우 기존화면(로그인, 초기화면, 메뉴구성)은 코드가 수정됩니다.' + 
    	     '기존의 코드가 작성되어 있다면 백업하신 후 시작하시기 바랍니다.' 
    	/*
    	items:[
    	{
    		xtype:'button',
    		text:'새로운 템플릿',
    		handler:'onNewTmpl'
    	},{
    		flex:1
    	}]
    	*/
    }/*,{
    	height:'100%',
        region:'west',
        xtype:'tmplleftmenu',
        width:200,
    },{
    	height:'100%',
    	region:'east',
    	width:300,
    	layout:'border',
    	items:[{
    		region:'north',
    		xtype:'tmplmainpartlist',
    		height:350,
    		scrollable:true,
    		split: true, 
    	},{
    		region:'center',
    		xtype:'tmplpartlist'
    	}]
    }*/,{
        region: 'center',
        height:'100%',
        /*
        xtype: 'tabpanel',
        name: 'mainbar',
        scrollable:true,
        */
        layout:{
        	type:'vbox',
        	//align:'stretch'
        },
        items:[
        {
        	xtype:'combobox',
        	fieldLabel:'유형선택',
        	queryMode:'local',
        	displayField:'name',
        	valueField:'code',
        	reference:'selectType',
        	store:{
        		fields:['name','code'],
        		data:[
        			{name:'메뉴', code:'01'},
        			{name:'초기화면->메인(메뉴)', code:'02'},
        			{name:'로그인->초기화면->메인(메뉴)', code:'03'},
        		]
        	}
    	},{
    		xtype:'button',
    		text:'조회',
    		handler:'onSearch'
    	},{
    		visible:false,
    		reference:'loginPanel',
    		html:'1. 로그인페이지를 만듭니다.' + 
    			'<br> 아이디, 패스워드 기반으로 만듭니다.'
    	},{
    		visible:false,
    		reference:'initPanel',
    		html:'2. 초기화면을 만듭니다.(html로 화면을 구성하세요.)' + 
    			'<br> HTML코드를 넣을 수 있는 배경을 기본적으로 만듭니다.'
    	},{
    		visible:false,
    		reference:'menuPanel',
    		items:[
    		{
    			html:'3. 메뉴를 구성합니다.<br> 아래 메뉴 중 선택하세요.',
    		},{
	        	xtype:'combobox',
	        	fieldLabel:'유형선택',
	        	reference:'menuType',
	        	queryMode:'local',
	        	displayField:'name',
	        	valueField:'code',
	        	store:{
	        		fields:['name','code'],
	        		data:[
	        			{name:'좌측형 메뉴', code:'01'},
	        			{name:'상단->좌측형 메뉴', code:'02'},
	        			{name:'윈도우 데스트탑형', code:'03'}
	        		]
	        	}
	    	}]
    	}],
    	buttons:[
    	{
    		xtype:'button',
    		text:'생성',
    		handler:'onCreateMain'
    		
    	}]
    }]
});
