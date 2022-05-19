package kr.co.o2i.controller.asp;

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
import kr.co.o2i.dao.asp.ASP003w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp003w_01/*")
public class ASP003w_01_Controller extends DefaultController {

	@Autowired
	ASP003w_01DAO ASP003w_01dao;
	
	
	/* 그룹리스트  */
	@RequestMapping(value="GroupSelect.suvila")
	public @ResponseBody Map<String,Object> GroupSelect(Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String V_SEARCH_VALUE = URLDecoder.decode(param.getString("V_SEARCH_VALUE", ""), "UTF-8");
			param.put("V_SEARCH_VALUE", V_SEARCH_VALUE);
			
			storeInfo.put("list", ASP003w_01dao.GroupSelect(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/*그룹코드 저장*/
	@RequestMapping(value="groupSave.suvila")
	public @ResponseBody Map<String,Object> groupSave (Map<String, Object> map
											          ,HttpServletRequest request
											          ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("UPT_USER", adminSession.get("USER_ID"));
			param.put("CRT_USER", adminSession.get("USER_ID"));
			
			
			String newData = StringUtil.getJosnParam(param.getString("groupNewData"));
			String uptData = StringUtil.getJosnParam(param.getString("groupUptData"));
			
			System.out.println(param);
			System.out.println(newData);
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			boolean dbFlag =  ASP003w_01dao.transactGroupSave(addList, uptList, param);
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
	
	/*공통코드*/
	@RequestMapping(value="CodeSelect.suvila")
	public @ResponseBody Map<String,Object> CodeSelect(Map<String, Object> map
											          ,HttpServletRequest request
											          ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP003w_01dao.CodeSelect(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/*공통코드 저장*/
	@RequestMapping(value="codeSave.suvila")
	public @ResponseBody Map<String,Object> codeSave (Map<String, Object> map
											         ,HttpServletRequest request
											         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("UPT_USER", adminSession.get("USER_ID"));
			param.put("CRT_USER", adminSession.get("USER_ID"));
			
			
			
			String newData = StringUtil.getJosnParam(param.getString("codeNewData"));
			String uptData = StringUtil.getJosnParam(param.getString("codeUptData"));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag =  ASP003w_01dao.transactCodeSave(addList, uptList, param);
			
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
	}//codeSave
	
	
	
	
}

