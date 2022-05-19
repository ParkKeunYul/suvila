package kr.co.o2i.controller.ser;

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
import kr.co.o2i.util.StringUtil;
import kr.co.o2i.dao.ser.SER001W_01DAO;

@Controller
@RequestMapping ("/ser/SER001W_01/*")
public class SER001W_01_Controller extends DefaultController {

	@Autowired
	SER001W_01DAO SER001W_01dao;
	
	@RequestMapping(value="UserSelect.suvila")
	public @ResponseBody Map<String,Object> UserSelect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("C_USER_ID"  , adminSession.get("USER_ID"));
			
			String user_nm = URLDecoder.decode(param.getString("user_nm"), "UTF-8");
			param.put("user_nm", user_nm);
			
			
			storeInfo.put("list", SER001W_01dao.UserSelect(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="UserSelectTab1.suvila")
	public @ResponseBody Map<String,Object> UserSelectTab1(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , param.get("USER_ID"));
			
			System.out.println();
			
			
			storeInfo.put("list", SER001W_01dao.SELECT_ASP_TEMPLE_USER_FAMILY_MGT(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="UserSelectTab2.suvila")
	public @ResponseBody Map<String,Object> UserSelectTab2(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , param.get("USER_ID"));
			
			storeInfo.put("list", SER001W_01dao.SELECT_ASP_TEMPLE_USER_SCHOLAR(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="UserSelectTab3.suvila")
	public @ResponseBody Map<String,Object> UserSelectTab3(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , param.get("USER_ID"));
			
			storeInfo.put("list", SER001W_01dao.SELECT_ASP_TEMPLE_USER_EDU_MGT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	

	@RequestMapping(value="UserSave.suvila")
	public @ResponseBody Map<String,Object> UserSave( Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("C_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , adminSession.get("V_REMOTE"));
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			
			int  saveFlag =  SER001W_01dao.save(param,addList ,  uptList);
			if(saveFlag == 1){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else if(saveFlag == -1){
				rtnData = StringUtil.rtnError(rtnData , "이미 사용중입니다.<br>사용하실 ID를 다시 입력하세요.");
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//UserSave
	
	@RequestMapping(value="UserSaveTab.suvila")
	public @ResponseBody Map<String,Object> UserSaveTab( Map<String, Object> map
			                                            ,HttpServletRequest request
			                                            ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
		
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("C_USER_ID"  , adminSession.get("USER_ID"));
			
			
			
			String newData1 = param.getString("newData1","");
			String uptData1 = param.getString("uptData1","");
			String delData1 = param.getString("delData1","");
			
			List<Map<String, Object>> addList1 = StringUtil.jsonToArray(newData1);
			List<Map<String, Object>> uptList1 = StringUtil.jsonToArray(uptData1);
			List<Map<String, Object>> delList1 = StringUtil.jsonToArray(delData1);
			
			
			String newData2 = param.getString("newData2","");
			String uptData2 = param.getString("uptData2","");
			String delData2 = param.getString("delData2","");
			
			List<Map<String, Object>> addList2 = StringUtil.jsonToArray(newData2);
			List<Map<String, Object>> uptList2 = StringUtil.jsonToArray(uptData2);
			List<Map<String, Object>> delList2 = StringUtil.jsonToArray(delData2);
			
			
			String newData3 = param.getString("newData3","");
			String uptData3 = param.getString("uptData3","");
			String delData3 = param.getString("delData3","");
			
			List<Map<String, Object>> addList3 = StringUtil.jsonToArray(newData3);
			List<Map<String, Object>> uptList3 = StringUtil.jsonToArray(uptData3);
			List<Map<String, Object>> delList3 = StringUtil.jsonToArray(delData3);
			
			
			
			boolean saveFlag =SER001W_01dao.saveTab( param
					                                ,addList1, addList2, addList3
					                                ,uptList1, uptList2, uptList3
					                                ,delList1, delList2, delList3);
			
			if(saveFlag){
				rtnData = StringUtil.rtnSuc(rtnData,  storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
	
}//SER001W_01_Controller
