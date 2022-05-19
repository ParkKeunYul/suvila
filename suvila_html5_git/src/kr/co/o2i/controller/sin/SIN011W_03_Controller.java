package kr.co.o2i.controller.sin;

import java.net.URLDecoder;
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
import kr.co.o2i.dao.sin.SIN011W_03DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/sin/SIN011W_03/*")
public class SIN011W_03_Controller extends DefaultController{
	

	@Autowired
	SIN011W_03DAO Sin011W_03Dao;
	
	
	@RequestMapping(value="selectResult.suvila")
	public @ResponseBody Map<String,Object> selectResult( Map<String, Object> map
														,HttpServletRequest request
													    ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			storeInfo.put("list", Sin011W_03Dao.SELECT_INFO(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}// selectResult
	
	@RequestMapping(value="resultReq.suvila")
	public @ResponseBody Map<String,Object> resultReq( Map<String, Object> map
													  ,HttpServletRequest request
												      ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String ds_main_temp   = param.getString("ds_main_temp","");
			String ds_card_detail = param.getString("ds_card_detail","");
			
			
			System.out.println( ds_main_temp );
			System.out.println( ds_card_detail );
			
			List<Map<String, Object>> dsCardList   = StringUtil.jsonToArray(ds_card_detail);
			List<Map<String, Object>> dsMainList   = StringUtil.jsonToArray(ds_main_temp);
			
			boolean dbFlag =  false;
			
			dbFlag = Sin011W_03Dao.resultReq(param ,dsCardList.get(0), dsMainList);
			
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
	}// save
	
	
	@RequestMapping(value="updateCancel.suvila")
	public @ResponseBody Map<String,Object> updateCancel( Map<String, Object> map
													  	 ,HttpServletRequest request
													  	 ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String upt_data   = param.getString("upt_data","");
			
			List<Map<String, Object>> uptList   = StringUtil.jsonToArray(upt_data);
			
			boolean dbFlag =  false;
			
			dbFlag = Sin011W_03Dao.cancelCardPay(param ,uptList);
			
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
	}// updateCancel
	
	@RequestMapping(value="saveRemark.suvila")
	public @ResponseBody Map<String,Object> saveRemark( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			param.put("V_USER_ID"   , adminSession.get("USER_ID"));
			
			String upt_data   = param.getString("upt_data","");
			
			List<Map<String, Object>> uptList   = StringUtil.jsonToArray(upt_data);
			
			boolean dbFlag =  false;
			
			dbFlag = Sin011W_03Dao.updateRemark(param ,uptList);
			
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
	}// saveRemark
	
}
