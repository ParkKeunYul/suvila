package kr.co.o2i.controller.com;

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

import kr.co.o2i.dao.com.CodeSearchDAO;
import kr.co.o2i.dao.com.CodeSearchProcDAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/CodeSearch/*")
public class CodeSearchController extends DefaultController{

	@Autowired
	CodeSearchDAO CodeSearchdao;
	
	@Autowired
	CodeSearchProcDAO CodeSearchProcDao;
	
	@RequestMapping(value="ComCode.suvila")
	public @ResponseBody Map<String,Object> ComCode(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			String group_cd = param.getString("group_cd", "");
			if("".equals(group_cd)|| group_cd == null){
				group_cd = param.getString("v_group_cd", "IEGBN");
				param.put("group_cd", group_cd);
			}
			
			
			List<Map<String, Object>> list = CodeSearchdao.CODESEARCH(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	@RequestMapping(value="ComCodeAll.suvila")
	public @ResponseBody Map<String,Object> ComCodeAll(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			List<Map<String, Object>> list = CodeSearchdao.CODESEARCHALL(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	
	@RequestMapping(value="ComCodeSelect.suvila")
	public @ResponseBody Map<String,Object> ComCodeSelect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			List<Map<String, Object>> list = CodeSearchdao.CODESEARCHSELECT(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
	@RequestMapping(value="CodeSearchBonSelect.suvila")
	public @ResponseBody Map<String,Object> CodeSearchBonSelect(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		param.put("group_cd", "BON"); 
		
		try{
			
			param.put("remark", URLDecoder.decode(param.getString("remark"), "UTF-8"));
		
			
			List<Map<String, Object>> list = CodeSearchdao.CODESEARCHBONSELECT(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	
	@RequestMapping(value="acctGbn.suvila")
	public @ResponseBody Map<String,Object> acctGbn(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));

			List<Map<String, Object>> list = CodeSearchdao.ACCTGBN(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="kwan.suvila")
	public @ResponseBody Map<String,Object> kwan(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));

			String V_MOK_NAME = param.getString("V_MOK_NAME", "");
			if(!"".equals(V_MOK_NAME)) param.put("V_MOK_NAME",  URLDecoder.decode(V_MOK_NAME, "UTF-8") );
			
			
			param.put("V_ACCT_GBN", param.getString("V_ACCT_GBN", "1") );
			param.put("V_IE_GBN"  , param.getString("V_IE_GBN" , "I") );
			param.put("V_HANG"    , param.getString("V_HANG", "0") );
			param.put("V_MOK"     , param.getString("V_MOK" , "0") );
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_KWAN(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="hang.suvila")
	public @ResponseBody Map<String,Object> hang(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			param.put("V_KWAN", param.getString("V_KWAN", "1") );
			
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_HANG(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="mok.suvila")
	public @ResponseBody Map<String,Object> mok(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_MOK(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="mokName.suvila")
	public @ResponseBody Map<String,Object> mokName(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			
			String V_MOK_NAME = URLDecoder.decode(param.getString("V_MOK_NAME"), "UTF-8");;
			param.put("V_MOK_NAME", V_MOK_NAME);
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_MOK_NAME(param);
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	@RequestMapping(value="mokSave.suvila")
	public @ResponseBody Map<String,Object> mokSave(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , adminSession.get("V_REMOTE"));
			
			String newData = param.getString("newData","");
			String uptData = param.getString("uptData","");
			String delData = param.getString("delData","");
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			List<Map<String, Object>> uptList = StringUtil.jsonToArray(uptData);
			List<Map<String, Object>> delList = StringUtil.jsonToArray(delData);
			
			boolean dbFlag = CodeSearchProcDao.mokSave(param, addList, uptList, delList);
			
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
	
	
	/* 공통코드조회*/
	@RequestMapping(value="templeuser.suvila")
	public @ResponseBody Map<String,Object> templeuser(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("temple_cd", adminSession.get("TEMPLE_CD"));
			param.put("user_id"  , adminSession.get("USER_ID"));
			
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_TEMPLEUSER(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	/* 공통코드조회*/
	@RequestMapping(value="sindoClassMgt.suvila")
	public @ResponseBody Map<String,Object> sindoClassMgt(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_CLASS_MGT(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	/* 스님조회*/
	@RequestMapping(value="monk.suvila")
	public @ResponseBody Map<String,Object> monk(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			
			List<Map<String, Object>> list = CodeSearchdao.SELECT_MONK(param);
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
		
	}
	
	
	@RequestMapping(value="sindoClassMgtSave.suvila")
	public @ResponseBody Map<String,Object> sindoClassMgtSave( Map<String, Object> map
												 		  	  ,HttpServletRequest request
												 		  	  ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			boolean dbFlag = CodeSearchProcDao.sindoClassMgtSave(param, addList);
			
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
	
	@RequestMapping(value="sindoClassSave.suvila")
	public @ResponseBody Map<String,Object> sindoClassSave( Map<String, Object> map
												 		  ,HttpServletRequest request
												          ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			param.put("V_REMOTE"   , request.getRemoteAddr());
			
			String newData = StringUtil.getJosnParam(param.getString("newData",""));
			
			List<Map<String, Object>> addList = StringUtil.jsonToArray(newData);
			
			
			boolean dbFlag = CodeSearchProcDao.sindoClassSave(param, addList);
			
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
	
	
}
