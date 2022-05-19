package kr.co.o2i.controller.cad;

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
import kr.co.o2i.dao.cad.CAD002W_01DAO;

@Controller
@RequestMapping ("/cad/CAD002W_01/*")
public class CAD002W_01_Controller extends DefaultController {

	@Autowired
	CAD002W_01DAO CAD002W_01dao;
	
	@RequestMapping(value="select.suvila")
	public @ResponseBody Map<String,Object> selectCmsMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			param.put("V_CLASS_CD", param.getString("V_CLASS_CD", "0"));
			
			System.out.println(param);
			
			
			storeInfo.put("list", CAD002W_01dao.SELECT_NAME_CARD_GROUP_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	
	@RequestMapping(value="saveGroup.suvila")
	public @ResponseBody Map<String,Object> saveGroup(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			//System.out.println(param);
			
			String newData = param.getString("newData");
			String uptData = param.getString("uptData");
			String delData = param.getString("delData");
			
			
			List<Map<String, Object>> newList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag =   CAD002W_01dao.saveGroup(param, newList , uptList , delList);
			
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
	
	@RequestMapping(value="selectInfo.suvila")
	public @ResponseBody Map<String,Object> selectInfo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			System.out.println(param);
			
			
			storeInfo.put("list", CAD002W_01dao.SELECT_NAME_CARD_INFO(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="saveCard.suvila")
	public @ResponseBody Map<String,Object> saveCard(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String newData = param.getString("newData");
			String delData = param.getString("delData");
			
			
			List<Map<String, Object>> newList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag =   CAD002W_01dao.saveCard(param, newList  , delList);
			
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
	
	
	
}//CAD002W_01_Controller
