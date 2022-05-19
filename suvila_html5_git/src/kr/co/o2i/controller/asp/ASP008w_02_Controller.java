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
import kr.co.o2i.dao.asp.ASP008w_02DAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/asp008w_02/*")
public class ASP008w_02_Controller extends DefaultController {

	@Autowired
	ASP008w_02DAO ASP008w_02dao;
	
	
	@RequestMapping(value="selectAcctGbn.suvila")
	public @ResponseBody Map<String,Object> selectCMS(Map<String, Object> map
			                                         ,HttpServletRequest request
			                                         ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			storeInfo.put("list", ASP008w_02dao.SELECT_ACCT_GBN(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectKwan.suvila")
	public @ResponseBody Map<String,Object> selectKwan(Map<String, Object> map
										              ,HttpServletRequest request
										              ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println("param = "+ param);
			
			storeInfo.put("list", ASP008w_02dao.SELECT_KWAN(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectKwanDetail.suvila")
	public @ResponseBody Map<String,Object> selectKwanDetail(Map<String, Object> map
										              		,HttpServletRequest request
										              		,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			storeInfo.put("list", ASP008w_02dao.SELECT_KWAN_DETAIL(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectHang.suvila")
	public @ResponseBody Map<String,Object> selectHang(Map<String, Object> map
										              ,HttpServletRequest request
										              ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			storeInfo.put("list", ASP008w_02dao.SELECT_HANG(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectHangDetail.suvila")
	public @ResponseBody Map<String,Object> selectHangDetail(Map<String, Object> map
										              		,HttpServletRequest request
										              		,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			System.out.println("param = "+ param);
			
			param.put("V_HANG_NM", URLDecoder.decode(param.getString("V_HANG_NM"), "UTF-8"));
			
			storeInfo.put("list", ASP008w_02dao.SELECT_HANG_DETAIL(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectMok.suvila")
	public @ResponseBody Map<String,Object> selectMok(Map<String, Object> map
										             ,HttpServletRequest request
										             ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			storeInfo.put("list", ASP008w_02dao.SELECT_MOK(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="selectMokDetail.suvila")
	public @ResponseBody Map<String,Object> selectMokDetail(Map<String, Object> map
										              	   ,HttpServletRequest request
										              	   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_HANG_NM", URLDecoder.decode(param.getString("V_HANG_NM"), "UTF-8"));
			param.put("V_MOK_NM", URLDecoder.decode(param.getString("V_MOK_NM"), "UTF-8"));
			
			storeInfo.put("list", ASP008w_02dao.SELECT_MOK_DETAIL(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="selectMokUse.suvila")
	public @ResponseBody Map<String,Object> selectMokUse(Map<String, Object> map
										              	,HttpServletRequest request
										              	,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_HANG_NM", URLDecoder.decode(param.getString("V_HANG_NM"), "UTF-8"));
			param.put("V_MOK_NM", URLDecoder.decode(param.getString("V_MOK_NM"), "UTF-8"));
			
			storeInfo.put("list", ASP008w_02dao.SELECT_MOK_USE(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	
	
	
	@RequestMapping(value="kwanSave.suvila")
	public @ResponseBody Map<String,Object> leftSave(Map<String, Object> map
												    ,HttpServletRequest request
												    ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String addData = param.getString("addData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(addData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag =  ASP008w_02dao.transactKwanSave(param, addList , uptList , delList);
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
	
	
	@RequestMapping(value="hangSave.suvila")
	public @ResponseBody Map<String,Object> hangSave(Map<String, Object> map
												    ,HttpServletRequest request
												    ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String addData = param.getString("addData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(addData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag =  ASP008w_02dao.transactHangSave(param, addList , uptList , delList);
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
	
	@RequestMapping(value="mokSave.suvila")
	public @ResponseBody Map<String,Object> mokSave(Map<String, Object> map
												   ,HttpServletRequest request
												   ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String addData = param.getString("addData","");
			String uptData = param.getString("uptData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(addData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			
			
			boolean dbFlag =  ASP008w_02dao.transactMokSave(param, addList , uptList);
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

	@RequestMapping(value="mokDetailSave.suvila")
	public @ResponseBody Map<String,Object> mokDetailSave(Map<String, Object> map
												   		 ,HttpServletRequest request
												   		 ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_USER_ID", adminSession.get("USER_ID"));
			
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			
			boolean dbFlag = ASP008w_02dao.transactMokDetailSave(param, uptList, delList);
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
	
	
	@RequestMapping(value="saveAcctGbn.suvila")
	public @ResponseBody Map<String,Object> saveAcctGbn(Map<String, Object> map
													    ,HttpServletRequest request
													    ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			param.put("NAME", URLDecoder.decode(param.getString("NAME"), "UTF-8"));
			
			boolean dbFlag = ASP008w_02dao.saveAcctGbn(param);
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
	
}

