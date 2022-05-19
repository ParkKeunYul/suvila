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
import kr.co.o2i.dao.rec.REC018W_01DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/rec/REC018W_01/*")
class REC018W_01_Controller extends DefaultController {

	
	@Autowired
	REC018W_01DAO REC018W_01dao;
	
	
	@RequestMapping(value="General.suvila")
	public @ResponseBody Map<String,Object> General( Map<String, Object> map
												    ,HttpServletRequest request
												    ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC018W_01dao.SELECT_General(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//General
	
	
	@RequestMapping(value="General_ex1.suvila")
	public @ResponseBody Map<String,Object> General_ex1( Map<String, Object> map
												    	,HttpServletRequest request
												    	,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC018W_01dao.SELECT_DONATION_PRINT_EXCEL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//General
	
	
	@RequestMapping(value="General_ex2.suvila")
	public @ResponseBody Map<String,Object> General_ex2( Map<String, Object> map
												    	,HttpServletRequest request
												    	,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			storeInfo.put("list", REC018W_01dao.SELECT_DONATION_PRINT_EXCEL2(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//General
	
	
	@RequestMapping(value="Detail.suvila")
	public @ResponseBody Map<String,Object> Detail( Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			
			storeInfo.put("list", REC018W_01dao.SELECT_Detail(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//General
	
	@RequestMapping(value="saveAddr.suvila")
	public @ResponseBody Map<String,Object> saveAddr( Map<String, Object> map
													 ,HttpServletRequest request
												     ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println(param);
			
			boolean dbFlag = REC018W_01dao.UPDATE_DONATION_ADDR(param);
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
	}//
	
	
	@RequestMapping(value="saveCancel.suvila")
	public @ResponseBody Map<String,Object> saveCancel( Map<String, Object> map
													   ,HttpServletRequest request
													   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try {
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			System.out.println(param);
			
			boolean dbFlag = REC018W_01dao.UPDATE_DONATION_CANCEL_DETAIL(param);
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
	}//
	
	
	@RequestMapping(value="Print.suvila")
	public @ResponseBody Map<String,Object> Print( Map<String, Object> map
												  ,HttpServletRequest request
												  ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD" , adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"    , request.getRemoteAddr());
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			List<Map<String, Object>> list = REC018W_01dao.SELECT_DONATION_PRINT(param , addList);
			storeInfo.put("list", list);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//Year
	
		
}//REC018W_01_Controller 
