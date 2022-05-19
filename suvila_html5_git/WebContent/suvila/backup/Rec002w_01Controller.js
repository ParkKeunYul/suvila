Ext.define('ExFrm.view.rec.Rec002w_01Controller', {
    extend: 'ExFrm.view.base.ViewController',
    alias: 'controller.rec002w_01',
    onMainInfo:function(params){
        var me = this;
        
        me.callStore(me, 'mainInfo', 'mainGridArrows', params, me.onMainInfoCallback)
    },
    onMainInfoCallback:function(me, success, records, operation){
        if(success == true){
           /*
			
           */
        }
    },
    onDetailInfo:function(params){
        var me = this;
        
        me.callStore(me, 'detailInfo', 'detailGridArrows', params, me.onDetailInfoCallback);
    
    },
    onDetailInfoCallback:function(me, success, records, operation){
        if(success == true){
           /*
			
           */
        }
    },
    onSearch:function(){
        var me = this;
        // 조회조건 추가할것.
        var params = {
        
        };
        me.callAjax(me, './json/daeju.json', params, me.onSearchDeajuCallback);
        me.callStore(me, 'familyList', '', params);
        me.callStore(me, 'younggaList', '', params);
        me.callStore(me, 'recpList', '', params);
    },
    onSearchDeajuCallback:function(me, success, response, record, opt ){
        console.log('arguments', arguments);
        if(success == true){
            console.log('arguments2', record.data.info.daejuBudNo);
            me.lookupReference('daejuBudNo').setValue(record.data.info.daejuBudNo);
            // 기타항목설정.
        }
    },
    onCalled:function(params){
    },
    onInit:function(me){
    },
    onTabChange:function(tappanel, panel){
        console.log('arguments', arguments);
        if(panel.title=='기도'){
            this.lookupReference('hideArea1').setHidden(true);
            this.lookupReference('hideArea2').setHidden(true);
            this.lookupReference('hideArea3').setHidden(true);
        }
        else if(panel.title=='불사'){
            this.lookupReference('hideArea1').setHidden(false);
            this.lookupReference('hideArea2').setHidden(false);
            this.lookupReference('hideArea3').setHidden(false);
        } else {
            this.lookupReference('hideArea1').setHidden(false);
            this.lookupReference('hideArea2').setHidden(false);
            this.lookupReference('hideArea3').setHidden(true);
        }
    }
})
