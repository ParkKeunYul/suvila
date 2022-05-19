Ext.define('ExFrm.view.com.postModel', {
    extend:'Ext.app.ViewModel', 
    alias: 'viewmodel.post', 
    stores:{ 
        addrInfo:{
            fields:['field1'],
            proxy:{
                type:'ajax',
                url: '/asp/post/select.suvila',
                timeout : 1000*60*60,
                reader:{
                    type:'json',
                    rootProperty:'data.list',
                    keepRawData:true	
                }
            },
            autoLoad:false            
        },
        doName:{
            fields:['field1'],
            data:[{
                value:'ASP_DORO_KANGWON', display:'강원도'
            },{
                value:'ASP_DORO_GYUNGGI', display:'경기도'
            },{
                value:'ASP_DORO_GYUNGBUK', display:'경상북도'
            },{
                value:'ASP_DORO_GYUNGNAM', display:'경상남도'
            },{
                value:'ASP_DORO_KWANGJU', display:'광주광역시'
            },{
                value:'ASP_DORO_DAEGU', display:'대구광역시'
            },{
                value:'ASP_DORO_DAEJUN', display:'대전광역시'
            },{
                value:'ASP_DORO_BUSAN', display:'부산광역시'
            },{
                value:'ASP_DORO_SEOUL', display:'서울특별시'
            },{
                value:'ASP_DORO_SEJONG', display:'세종특별자치시'
            },{
                value:'ASP_DORO_ULSAN', display:'울산광역시'
            },{
                value:'ASP_DORO_INCHEON', display:'인천광역시'
            },{
                value:'ASP_DORO_JUNBUK', display:'전라북도'
            },{
                value:'ASP_DORO_JUNNAM', display:'전라남도'
            },{
                value:'ASP_DORO_JEJU', display:'제주특별자치도'
            },{
                value:'ASP_DORO_CHUNGBUK', display:'충청북도'
            },{
                value:'ASP_DORO_CHUNGNAM', display:'충청남도'           
            }],
            autoLoad:true
        }
    }
});