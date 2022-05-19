package kr.co.o2i.controller.com;

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
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/TempleSearch/*")
public class TempleSearchController extends DefaultController{

	
	@Autowired
	CodeSearchDAO CodeSearchdao;
	
	
	/* 사찰코드조회 */
	@RequestMapping(value="TempleCode.suvila")
	public @ResponseBody Map<String,Object> TempleCode(Map<String, Object> map
												      ,HttpServletRequest request
												      ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			List<Map<String,Object> >  CODESEARCH  =  CodeSearchdao.TEMPLESEARCH(param);

			storeInfo.put("list", CODESEARCH);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping(value="TempleCodeAll.suvila")
	public @ResponseBody Map<String,Object> TempleCodeAll(Map<String, Object> map
												         ,HttpServletRequest request
												         ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			List<Map<String,Object> >  CODESEARCH  =  CodeSearchdao.TEMPLESEARCHALL(param);

			storeInfo.put("list", CODESEARCH);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	
}
