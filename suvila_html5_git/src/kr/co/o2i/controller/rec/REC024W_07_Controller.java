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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.rec.REC024W_07DAO;

@Controller
@RequestMapping ("/rec/REC024W_07/*")
public class REC024W_07_Controller extends DefaultController {

	@Autowired
	REC024W_07DAO REC024W_07dao;
	
	@RequestMapping(value="selectPrayMgt.suvila")
	public @ResponseBody Map<String,Object> selectGD( Map<String, Object> map
				                                     ,HttpServletRequest request
				                                     ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC024W_07dao.SELECT_REC_ALWAYS_PRAY_MGT(param));
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	@RequestMapping(value="saveMgt")
	public @ResponseBody Map<String,Object> saveMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String newData    = param.getString("newData","");
			String uptData 	  = param.getString("uptData","");
			/*String delData    = param.getString("delData","");*/
			
			
			List<Map<String, Object>> newList      = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			/*List<Map<String, Object>> delList      = StringUtil.jsonToArray(delData);*/
			
			boolean dbFlag = REC024W_07dao.saveMgt(param , newList, uptList);
			
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
	
	
	
	
	
	@RequestMapping(value="selectPrayPriceMgt.suvila")
	public @ResponseBody Map<String,Object> selectPrayPriceMgt( Map<String, Object> map
				                                     		   ,HttpServletRequest request
				                                     		   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC024W_07dao.SELECT_REC_ALWAYS_PRAY_PRICE_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//menuSelect
	
	
	@RequestMapping(value="savePriceMgt")
	public @ResponseBody Map<String,Object> savePriceMgt( Map<String, Object> map
												 	     ,HttpServletRequest request
												 	     ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String newData      				   = param.getString("newData","");
			String uptData      				   = param.getString("uptData","");
			List<Map<String, Object>> newList      = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList      = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = REC024W_07dao.savePriceMgt(param, newList , uptList);			
			
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
	
	
}//REC024W_03
