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
import kr.co.o2i.dao.asp.ASP006w_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp006w_01/*")
public class ASP006w_01_Controller extends DefaultController {

	@Autowired
	ASP006w_01DAO ASP006w_01dao;
	
	
	/* 문자컬럼관리 조회 */
	@RequestMapping(value="selectItem.suvila")
	public @ResponseBody Map<String,Object> selectItem(Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP006w_01dao.selectItem(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/* 컬럼명 조회 */
	@RequestMapping(value="selectColumn.suvila")
	public @ResponseBody Map<String,Object> selectColumn(Map<String, Object> map
			                                            ,HttpServletRequest request
			                                            ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP006w_01dao.selectColumn(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	/* 테이블명 조회  */
	@RequestMapping(value="selectTable.suvila")
	public @ResponseBody Map<String,Object> selectTable(Map<String, Object> map
			                                           ,HttpServletRequest request
			                                           ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			storeInfo.put("list", ASP006w_01dao.selectTable(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="save.suvila")
	public @ResponseBody Map<String,Object> save(Map<String, Object> map
									            ,HttpServletRequest request
									            ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
		
			param.put("CRT_USER", adminSession.get("USER_ID"));
			param.put("UPT_USER", adminSession.get("USER_ID"));
			
			String newData = param.getString("leftNewData","");
			String uptData = param.getString("leftUptData","");
			String delData = param.getString("leftDelData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag = ASP006w_01dao.transactSave(param, addList, uptList, delList);
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
	}//save
	
}//ASP006w_01_Controller

