package kr.co.o2i.controller.asp;

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
import kr.co.o2i.dao.asp.ASP005w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp005w_01/*")
public class ASP005w_01_Controller extends DefaultController {

	@Autowired
	ASP005w_01DAO ASP005w_01dao;
	
	
	/* 기준 사찰 메뉴 정보 조회  */
	@RequestMapping(value="menuSelect.suvila")
	public @ResponseBody Map<String,Object> menuSelect(Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String V_SERVICE_GBN_L = param.getString("V_SERVICE_GBN_L", "1");
			param.put("V_SERVICE_GBN_L", V_SERVICE_GBN_L);
			
			System.out.println(param);
			
			storeInfo.put("list", ASP005w_01dao.SELECT_SY_MENU(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/*각 사찰별 메뉴 정보 조회*/
	@RequestMapping(value="templeMenuSelect.suvila")
	public @ResponseBody Map<String,Object> TempleMenuSelect(Map<String, Object> map
			                                                ,HttpServletRequest request
			                                                ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String V_SERVICE_GBN_L = param.getString("V_SERVICE_GBN_L", "1");
			String V_SEAR_TEMPLECD = param.getString("V_SEAR_TEMPLECD", "000000");
			param.put("V_SERVICE_GBN_L", V_SERVICE_GBN_L);
			param.put("V_SEAR_TEMPLECD", V_SEAR_TEMPLECD);
			
			System.out.println(param);
			
			storeInfo.put("list", ASP005w_01dao.SEL_SEAR_TEMPLE_MENU(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/*기준사찰 CUD*/
	@RequestMapping(value="baseTempleMenuSave.suvila")
	public @ResponseBody Map<String,Object> baseTempleMenuSave(Map<String, Object> map
												              ,HttpServletRequest request
												              ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			String newData = StringUtil.getJosnParam(param.getString("leftNewData",""));
			String uptData = StringUtil.getJosnParam(param.getString("leftUptData",""));
			String delData = StringUtil.getJosnParam(param.getString("leftDelData",""));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag =  ASP005w_01dao.transactBaseMenuSave(param, addList, uptList, delList);
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
	}// baseTempleMenuSave
	
	
	/*대상사찰 CUD*/
	@RequestMapping(value="leftMenuSave.suvila")
	public @ResponseBody Map<String,Object> leftMenuSave(Map<String, Object> map
													    ,HttpServletRequest request
													    ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			boolean dbFlag = false;
			
			
			String newData = StringUtil.getJosnParam(param.getString("rightNewData",""));
			String delData = StringUtil.getJosnParam(param.getString("rightDelData",""));
			
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			dbFlag = ASP005w_01dao.transactLeftMenuSave(param, addList, delList);
			
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
	}// leftMenuSave
	
	
	
}//ASP005w_01_Controller

