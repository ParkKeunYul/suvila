Ext.define('ExFrm.view.demo.Demo001Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.demo001',
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', '', params, me.onMainInfoCallback)
    },
    onMainInfoCallback:function(me, success, records, operation){
        if(success == true){
        }
    },
    onDetailInfo:function(params){
        var me = this;
        
        me.callStore(me, 'detailInfo', 'detailGridArrows', params, me.onDetailInfoCallback)
    },
    onDetailInfoCallback:function(me, success, records, operation){
        if(success == true){
        }
    },
    onSearchItems:function(){
       
        var custNameSrch = this.lookupReference('custNameSrch').getValue();  //고객명
        var birthSrch = this.lookupReference('birthSrch').getValue();  //생년월일
        var params = {
            
                custNameSrch:custNameSrch,  //고객명
                birthSrch:birthSrch,  //생년월일
        };
        this.onMainInfo(params);
    },
    onMainTree:function(){
       
        var custNo = this.lookupReference('custNo').getValue();  //고객번호
        var custName = this.lookupReference('custName').getValue();  //고객명
        var birth = this.lookupReference('birth').getValue();  //생년월일
        var point = this.lookupReference('point').getValue();  //포인트
        var addr = this.lookupReference('addr').getValue();  //주소
        var params = {
            custNo:custNo,  //고객번호
            custName:custName,  //고객명
            birth:birth,  //생년월일
            point:point,  //포인트
            addr:addr  //주소
        };
        this.onDetailInfo(params);
    },
    onHelp:function(){},
    onMainTreeClick:function( tablepanel, record, item, index, e, eOpts ){
        var me = this;
    var params = {};
         me.callStore(me, 'detailInfo', '', params, me.detailInfoCallback);
    },
    detailInfoCallback:function(me, success, records, operation){
        // add your code
    },
    onSetValues:function(){
        var me = this;
		me.lookupReference('wtest2').setExValue('1');
		me.lookupReference('wtest3').setExValue('20160101');
		me.lookupReference('wtest4').setExValue('1');
		me.lookupReference('wtest5').setExValue('1');
		me.lookupReference('wtest6').setExValue('2');
		me.lookupReference('wtest7').setExValue(['1','2']);
		me.lookupReference('wtest8').setExValue('2');
		me.lookupReference('wtest9').setExValue('1');
		//me.lookupReference('wtest10').setExValue('1'); // 파일을 설정할 수 없음.
		me.lookupReference('wtest11').setExValue('1');
    },
    onGetValues:function(){
        var me = this;
		console.log('텍스트숫자', me.lookupReference('wtest2').getExValue());
		console.log('날짜타입', me.lookupReference('wtest3').getExValue());
		console.log('콤보박스', me.lookupReference('wtest4').getExValue());
		console.log('체크박스', me.lookupReference('wtest5').getExValue());
		console.log('라디오버튼', me.lookupReference('wtest6').getExValue());
		console.log('체크박스그룹', me.lookupReference('wtest7').getExValue()); // 체크박스그룹은 컴포넌트별로 읽을것.
		console.log('라디어버튼그룹', me.lookupReference('wtest8').getExValue());	// 선택된 값을 보냄.
        //console.log('wtest9', me.lookupReference('wtest9'), me.lookupReference('wtest9').getValue());
		
		console.log('텍스트영억', me.lookupReference('wtest9').getExValue());
		console.log('텍스트/파일', me.lookupReference('wtest10').getExValue());
		console.log('HTML에디터', me.lookupReference('wtest11').getExValue());
    },
    onSubmitValues:function(){
        var me = this;
        me.callForm(me, './aaa');
    },
    onValidation:function(){
        var me = this;
        if(me.lookupReference('regform').invalidateForm() == false){
            return;
        }
        // 계속진행
    },
    onReLogin:function(){
        var me = this;
        me.openWindow('ExFrm.view.login.ReLogin');
    }
})