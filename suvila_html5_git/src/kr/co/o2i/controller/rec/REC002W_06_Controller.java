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
import kr.co.o2i.dao.rec.REC002W_06DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC002W_06/*")
class REC002W_06_Controller extends DefaultController {

	
	@Autowired
	REC002W_06DAO REC002W_06dao;
	
	
	
	@RequestMapping(value="selectGD.suvila")
	public @ResponseBody Map<String,Object> selectGD ( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			storeInfo.put("list", REC002W_06dao.SELECT_GDREC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD
	
	
	@RequestMapping(value="selectGD_sel.suvila")
	public @ResponseBody Map<String,Object> selectGD_sel ( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			storeInfo.put("list", REC002W_06dao.SELECT_GDREC_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD_sel
	
	
	@RequestMapping(value="selectBS.suvila")
	public @ResponseBody Map<String,Object> selectBS ( Map<String, Object> map
			                                          ,HttpServletRequest request
			                                          ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			storeInfo.put("list", REC002W_06dao.SELECT_BSREC(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD
	
	
	@RequestMapping(value="selectBS_sel.suvila")
	public @ResponseBody Map<String,Object> selectBS_sel ( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
						
			if("F".equals( param.getString("V_DEATH_GBN") )) {
				storeInfo.put("list", REC002W_06dao.SELECT_BSREC_CH1(param));
			}else {
				storeInfo.put("list", REC002W_06dao.SELECT_BSREC_CH3(param));
			}
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectGD_sel
	
	
}//REC002W_06_Controller 
