Ext.define('ExFrm.view.login.Login',{
    extend:'Ext.form.Panel',
    alias:'widget.login',
    requires:[
    	 'ExFrm.view.login.LoginController'
    	,'ExFrm.view.login.LoginModel'
    ],
    controller:'login',
    viewModel:{
        type:'login'
    },
    name:'regForm',
    layout:{
        type:'vbox',        
        /*align:'stretch'*/
    },
    width : 1000,
    height : 600,
    relogin:'false',    
    html:''+
    '<style>'+
	'    /*font*/'+
	'    @import url("https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&display=swap");'+
	'    @font-face {'+
	'    	font-family: "Gmarket Sans"; font-style: normal; font-weight: 700;'+
	'    	src: local("Gmarket Sans Bold"), local("GmarketSans-Bold"),'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansBold.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansBold.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */'+
	'    }'+
	'    @font-face {'+
	'    	font-family: "Gmarket Sans"; font-style: normal; font-weight: 500;'+
	'    	src: local("Gmarket Sans Medium"), local("GmarketSans-Medium"),'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansMedium.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansMedium.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */'+
	'    } '+
	'   @font-face {'+
	'    	font-family: "Gmarket Sans"; font-style: normal; font-weight: 300;'+
	'    	src: local("Gmarket Sans Light"), local("GmarketSans-Light"),'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansLight.woff2") format("woff2"), /* Chrome 26+, Opera 23+, Firefox 39+ */'+
	'    	url("http://script.ebay.co.kr/fonts/GmarketSansLight.woff") format("woff"); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */'+
	'    }'+	
	'    html{overflow-y: scroll;}'+
	'    html, body {height:100%; font-family: "Nanum Gothic","나눔고딕","돋움","Dotum","맑은 고딕","Malgun Gothic",Sans-Serif; -webkit-text-size-adjust:none;}'+
	'    body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,form,fieldset,p,span,button,th,td,a {border:0;margin:0;padding:0; font-weight:normal;box-sizing: border-box;}'+
	'    h1,h2,h3,h4,h5,h6,dt{font-family: "Nanum Gothic","나눔고딕","돋움","Dotum","맑은 고딕","Malgun Gothic",Sans-Serif;}'+
	'    h1,h2,h3,h4,h5,h6{letter-spacing:-1px;}'+
	'    body {height:100%; font-size:16px; color:#191919; line-height:1.5;}'+
	'    img{border:0;vertical-align:top;}'+
	'    fieldset{margin:0;padding:0;border:0;}'+
	'    textarea{margin:0;border:1px solid #cccccc; font-size:14px;}'+
	'    select,input{ vertical-align:middle;}'+
	'    ul,ol{list-style-type:none;}'+
	'    dt,dd,h1,h2,h3,h4,h5,h6{margin:0;padding:0;}'+
	'    input[type=text], input[type=password], [type=checkbox]{border:1px solid #e3e3e3; height:50px; padding-left:10px; box-sizing:border-box; border-radius:0px;}'+		
	'    /* normalize */'+
	'    a{background-color:transparent;-webkit-text-decoration-skip:objects; color:#323232; text-decoration:none}'+
	'    a:active, a:hover{outline-width:0;text-decoration:underline;}'+
	'    abbr[title]{text-decoration:underline; text-decoration:underline dotted;border-bottom:none;-webkit-text-decoration:underline dotted;}'+
	'    b,strong{font-weight:700;/* font-weight:bolder; */}'+
	'    img{border-style:none;}'+
	'    sub,sup{position:relative;font-size:75%;line-height:;vertical-align:baseline;}'+
	'    sub{bottom:-.25em;}'+
	'    sup{top:-.5em;}'+
	'    small{font-size:80%;}'+
	'    hr{overflow:visible;-webkit-box-sizing:content-box;box-sizing:content-box;height:;}'+
	'    pre{overflow:auto;}'+
	'    code,kbd,pre,samp{font-family:monospace,monospace;}'+
	'    audio,canvas,video{display:inline-block;}'+
	'    audio:not([controls]){display:none;height:;}'+
	'    svg:not(:root){overflow:hidden;}'+
	'    textarea{overflow:auto;}'+
	'    summary{display:list-item;}'+
	'    template{display:none;}'+
	'    [hidden]{display:none;}'+
	'    button,input{overflow:visible;}'+
	'    button,select{text-transform:none;}'+
	'    [type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button; cursor:pointer;}'+
	'    [type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none;}'+
	'    [type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:ButtonText dotted 1px;}'+
	'    [type=checkbox],[type=radio]{-webkit-box-sizing:border-box;box-sizing:border-box;padding:0; width:18px; height:18px; border:1px solid #eaeaea;}'+
	'    [type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto;}'+
	'    [type=search]{outline-offset:-2px;-webkit-appearance:textfield;}'+
	'    [type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none;}'+
	'    ::-webkit-file-upload-button{font:inherit;-webkit-appearance:button;}'+
	'    /* a,button {outline:1px dotted red;} */				'+	
	'    #ext-element-1{background:#eeeeee; font-family:"Nanum Gothic","나눔고딕","돋움","Dotum","맑은 고딕","Malgun Gothic",Sans-Serif; color:#1d1d1d; -webkit-text-size-adjust:none;}'+	
	'    #wrap {width:1000px; height:600px; background:#ffffff; margin:0 auto; box-shadow: 0px 0px 30px -30px #000000, 0px 0px 30px -30px #000000; margin-top:200px; }'+
	'    .loginArea {display:inline-block; width:650px; height:450px; float:left; padding:120px 80px 0 80px;}'+
	'    .loginArea .title {width:100%; text-align:center; font-weight:500; font-family: "Gmarket Sans", sans-serif; font-size:26px; margin-bottom:30px;}'+
	'    .loginArea input[type=text], .loginArea input[type=password] {width:310px;}'+
	'    .loginArea [type=button] {width:160px; height:110px; background:#a79c67; color:#ffffff; border-radius:10px; border:none; font-weight:500; font-family: "Gmarket Sans", sans-serif; font-size:18px;}'+
	'    .loginArea ul li:first-child {width:330px; float:left;}'+
	'    .loginArea ul li:last-child {display:block; font-size:14px; font-weight:700; margin-top:10px;}'+		
	'    .popupArea {width:350px; height:450px; float:right;}'+	
	'    .bannerArea {display:inline-block; width:100%; height:150px; color:#ffffff;}'+
	'    .bannerArea ul li {float:left; height:150px;}'+
	'    .bannerArea .cscenter {width:475px; background:#a79c67; border-right:1px solid #c0bcbb; text-align:center; padding:15px 0;}'+
	'    .cscenter_span_tit {font-weight:500; font-family: "Gmarket Sans", sans-serif; font-size:18px; margin-bottom:5px;}'+
	'    .cscenter_span {font-weight:700; font-family: "Gmarket Sans", sans-serif; font-size:26px;}'+
	'    .bannerArea .cscenter p:last-child {text-align:left; font-size:14px; font-weight:700; padding-left:60px; margin-top:5px;}'+
	'    .bannerArea .remote {width:175px; border-right:1px solid #c0bcbb; background:#795e53 url("images/icon_remote.png") no-repeat center 30px; text-align:center;font-family: "Gmarket Sans", sans-serif; }'+
	'    .remote_a {display:inline-block; width:100%; height:150px; font-family: "Gmarket Sans", sans-serif; font-size:16px; color:#ffffff; }'+
	'    .remote_span {display:inline-block; margin:95px auto 0 auto;}'+
	'    .bannerArea .etc {width:350px; background:#a59f9d; font-weight:500; font-family: "Gmarket Sans", sans-serif; font-size:16px;}'+
	'    .etc_bg_a {display:inline-block; width:50%; height:150px; color:#ffffff;}'+
	'    .etc_bg_a span {display:inline-block; margin-top:95px;font-size:16px;}'+
	'    .etc_bg01 {background: url("./resources/img/login/bg_banner01.png") no-repeat center 30px; border-right:1px solid #c0bcbb; text-align:center; float:left;}'+
	'    .etc_bg02 {background: url("./resources/img/login/bg_banner02.png") no-repeat center 30px; text-align:center;}'+
	'    .x-btn-inner-default-small{font-size:18px;background:#a79c67;color:#ffffff;border-radius:10px;border:none;font-weight:500;font-family:Gmarket Sans,sans-serif;height: 25px;line-height:25px;}'+
	'    .x-btn-button-default-small{min-height:25px;}'+
	' </style>',
	bodyStyle:{
	   	 "background-color":"#eeeeee"
	},
	items :[{
		height : 200,
		width  : '100%',
		bodyStyle:{
		   	 "background-color":"#eeeeee"
		},
	},{
		bodyStyle:{
		   	 "background-color":"#eeeeee"
		},
		layout : 'hbox',
		width  : '100%',
		hegiht : 450,
		items  : [{
			flex : 1,
		},{
			layout:'vbox',
            items:[{
                layout : 'hbox',
                height : 450,
                width  : 1000,
                /*width  : '100%',*/
                items  : [{
                	width  : 650,
                	height : 450,
                	layout : 'vbox',
                	items  : [{
                		height : 120
                	},{
                		width : 650,
                		height : 39 ,
                		html : '<p style="width:650px; text-align:center; font-weight:500; font-family: Gmarket Sans, sans-serif; font-size:26px;height:39px;line-height:39px;">종무행정통합관리 시스템 수비라</p>'
                	},{
                		height : 30
                	},{
                        layout:{
                            type:'hbox',
                            align:'stretch'
                        },
                        items:[{
                        	width : 80
                        },{
                            layout:{
                                type:'vbox',
                                pack:'middle',
                                align:'stretch'
                            },
                            items:[{
                            	height : 6
                            },{
                                fieldStyle      :'boder:none',
                                xtype           :'textfield',
                                labelAlign      :'right',
                                name            :'user_id',
                                reference       :'userId',
                                enableKeyEvents : true,
                                height          : 50,
                                width           : 310,
                                listeners       : {
                              	   keyup : 'onSearchEnter'
                                 },
                            },{
                            	height : 4
                            },{
                                fieldStyle :'boder:none',
                                xtype      :'textfield',
                                labelAlign :'right',
                                name       :'passwd',
                                reference  :'password',
                                inputType  : 'password',
                                enableKeyEvents : true,
                                height          : 50,
                                width           : 310,
                                listeners       : {
                              	   keyup : 'onSearchEnter'
                                 },
                                 
                            }]
                        },{
                            xtype:'tbspacer',
                            width:10
                        },{
                        	
                            layout:'vbox',
                            items:[{
                                xtype:'tbspacer',
                                flex:1
                            },{
                                style   :'background:#a79c67;color:#ffffff;border-radius:10px;border:none;font-weight:500;font-family:Gmarket Sans,sans-serif;font-size:25px;text-transform:none;',
                                xtype   :'button',
                                text    :'로그인',
                                height  :110,
                                width   : 160,
                                reference:'mainGridPrev',
                                handler:'onLogin'
                            },{
                                xtype:'tbspacer',
                                flex:1
                            }]
                        
                        }]
                	},{
                		height : 10
                	},{
                		layout : 'hbox',
                    	items  : [{
                    		width : 80
                    	},{
                    		xtype       : 'checkbox',
                        	reference   : 'passid',
                        	labelSeparator: '',
                        	name        : 'passid',
                            hideLabel   : true,
                            boxLabel   : '<span style="font-weight:700;font-size:14px;">아이디/비밀번호 저장</span>',
                            fieldLabel : '<span style="font-weight:700;font-size:14px;">아이디/비밀번호 저장</span>',
                    	}]
                	}]
                },{
                	width : 350,
                	html:'<img src="./resources/img/login/bg_main.jpg" width="350px;">',
                	height : 450,
                }]
            },{
            	layout : 'hbox',
            	height : 150,
            	width  : 1000,
            	items  : [{
            		width : 650,
            		height : 150,
            		layout: 'hbox',
            		items : [{
            			width : 475,
            			html : '<div style="width:475px;height:150px;padding:15px 0;background:#a79c67;color:#ffffff;text-align:center;">'+
            			'<p class="cscenter_span_tit" style="margin-bottom:17px;margin-top:10px;">시스템 장애문의 / 교육 사용법 안내</p>'+
            			'<span class="cscenter_span">02-6748-5212</span>'+
            			'<p style="text-align:left;font-size:14px;font-weight:700;padding-left:60px;margin-top:17px;">· 평일 : 오전 9시 ~ 오후 6시 (점심 : 오후 12시 ~ 오후 1시)<br/>· 토 / 일 / 공휴일 휴무</p>'+
            			'</div>',
            		},{
            			width : 1
            		},{
            			flex : 1,
            			html : '<div style="width:100%;height:150px;background:#795e53 url(./resources/img/login/icon_remote.png) no-repeat center 30px;text-align:center;">'+
            			'<a class="remote_a" href="http://www.startsupport.com/topscom" target="_blank"><span class="remote_span">원격지원 연결하기</span></a>'+            			
            			'</div>',
            		},{
            			width : 1
            		}]
            	
            	},{
            		flex   : 1,
            		layout : 'hbox',
            		height : 150,
            		items  : [{
            			flex : 1,
            			html : '<div style="background:#a59f9d;width:100%;height:180px;">'+
            			'<a href="https://www.formtec.co.kr/product/product_list.html?cid=010103" target="_blank" class="etc_bg01 etc_bg_a"><span>라벨출력 용지보기</span></a>'+
            			'<a href="http://www.withtemple.com/" target="_blank" class="etc_bg02 etc_bg_a"><span>사찰 홈페이지 제작</span></a>'+
            			'</div>'
            		}]	
            	}]
            }]
		},{
			flex : 1,
		}]
	}]
})