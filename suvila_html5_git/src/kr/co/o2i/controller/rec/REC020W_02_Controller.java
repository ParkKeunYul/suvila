package kr.co.o2i.controller.rec;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.controller.com.DefaultController;
import kr.co.o2i.dao.rec.REC020W_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC020W_02/*")
class REC020W_02_Controller extends DefaultController {

	
	@Autowired
	REC020W_02DAO REC020W_02dao;
	
	
	@RequestMapping(value="kindInfo.suvila")
	public @ResponseBody Map<String,Object> kindInfo( Map<String, Object> map
													 ,HttpServletRequest request
													 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_ACCEPT_GBN", "2");
			
			//System.out.println(param);
			
			storeInfo.put("list", REC020W_02dao.SELECT_TSKIND(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="detailKindInfo.suvila")
	public @ResponseBody Map<String,Object> detailKindInfo( Map<String, Object> map
														   ,HttpServletRequest request
														   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC020W_02dao.SELECT_TSKIND_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	@RequestMapping(value="selectHis.suvila")
	public @ResponseBody Map<String,Object> selectHis( Map<String, Object> map
													  ,HttpServletRequest request
													  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_ACCEPT_GBN", "2");
			
			storeInfo.put("list", REC020W_02dao.SELECT_TEMPLE_STAY_HIS(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//kindInfo
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save( Map<String, Object> map
												 ,HttpServletRequest request
												 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String ds_TSRec      	   = param.getString("ds_TSRec","");
			String ds_acceptRecAmt = param.getString("ds_acceptRecAmt","");
			String ds_sms          = param.getString("ds_sms","");
			String ds_pgCardInfo   = param.getString("ds_pgCardInfo","");
			
			
			List<Map<String, Object>> RecList       = StringUtil.jsonToArray(ds_TSRec);
			List<Map<String, Object>> accList       = StringUtil.jsonToArray(ds_acceptRecAmt);
			List<Map<String, Object>> smsList       = StringUtil.jsonToArray(ds_sms);
			List<Map<String, Object>> cardList      = StringUtil.jsonToArray(ds_pgCardInfo);
			
			
			boolean dbFlag = REC020W_02dao.save( param
												,RecList
												,accList.get(0)
												,smsList
												,cardList);			
			
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
		
}//REC002W_02_Controller 
