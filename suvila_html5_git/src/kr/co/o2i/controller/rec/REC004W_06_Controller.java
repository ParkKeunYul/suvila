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
import kr.co.o2i.dao.rec.REC004W_06DAO;

@Controller
@RequestMapping ("/rec/REC004W_06/*")
public class REC004W_06_Controller extends DefaultController {

	@Autowired
	REC004W_06DAO REC004W_06dao;
	
	@RequestMapping(value="selectDetail.suvila")
	public @ResponseBody Map<String,Object> selectDetail( Map<String, Object> map
			                                             ,HttpServletRequest request
			                                             ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectDetail
	
	@RequestMapping(value="selectDetail1.suvila")
	public @ResponseBody Map<String,Object> selectDetail1( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_PRINT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectDetail1
	
	@RequestMapping(value="selectDetail2.suvila")
	public @ResponseBody Map<String,Object> selectDetail2( Map<String, Object> map
			                                              ,HttpServletRequest request
			                                              ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_PRINT_PRAY(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectDetail2
	
	
	@RequestMapping(value="selectChukwonChonhon.suvila")
	public @ResponseBody Map<String,Object> selectChukwonChonhon( Map<String, Object> map
			                                              		 ,HttpServletRequest request
			                                              		 ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_CHUKWON_CHONHON(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectChukwonChonhon
	
	
	@RequestMapping(value="selectSpirit.suvila")
	public @ResponseBody Map<String,Object> selectSpirit( Map<String, Object> map
			                                             ,HttpServletRequest request
			                                             ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_SPIRIT(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectSpirit
	
	
	@RequestMapping(value="selectDetail_000031.suvila")
	public @ResponseBody Map<String,Object> selectDetail_000031( Map<String, Object> map
			                                             	    ,HttpServletRequest request
			                                             	    ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_DETAIL(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectSpirit
	
	@RequestMapping(value="selectDetail1_000031.suvila")
	public @ResponseBody Map<String,Object> selectDetail1_000031( Map<String, Object> map
			                                             	    ,HttpServletRequest request
			                                             	    ,HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			storeInfo.put("list", REC004W_06dao.SELECT_PRINT_000031(param));
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}//selectSpirit
	
}//REC004W_04_Controller
