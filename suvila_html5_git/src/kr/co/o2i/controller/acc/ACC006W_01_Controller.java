package kr.co.o2i.controller.acc;

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
import kr.co.o2i.dao.acc.ACC001W_01DAO;
import kr.co.o2i.dao.acc.ACC006W_01DAO;
import kr.co.o2i.dao.cad.CAD001W_01DAO;

@Controller
@RequestMapping ("/acc/ACC006W_01/*")
public class ACC006W_01_Controller extends DefaultController {

	@Autowired
	ACC006W_01DAO ACC006W_01dao;
	
	@RequestMapping(value="selectACC.suvila")
	public @ResponseBody Map<String,Object> selectACC(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String V_REMARK = URLDecoder.decode(param.getString("V_REMARK"), "UTF-8");
			param.put("V_REMARK", V_REMARK);
			
			storeInfo.put("list", ACC006W_01dao.SELECT_ACC(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="selectChongmu.suvila")
	public @ResponseBody Map<String,Object> selectChongmu(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			storeInfo.put("list", ACC006W_01dao.SELECT_CHONGMU(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="appendAcc.suvila")
	public @ResponseBody Map<String,Object> appendAcc( Map<String, Object> map
												      ,HttpServletRequest request
												      ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			boolean dbFlag = ACC006W_01dao.appendAcc(param, addList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	@RequestMapping(value="saveChongmu.suvila")
	public @ResponseBody Map<String,Object> saveChongmu( Map<String, Object> map
												        ,HttpServletRequest request
												        ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String uptData = param.getString("uptData","");
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag = ACC006W_01dao.saveChongmu(param, uptList);
			if(dbFlag){
				rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			}else{
				rtnData = StringUtil.rtnError(rtnData);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		return rtnData;
	}
	
	
}//ACC006W_01_Controller
