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

import kr.co.o2i.dao.com.BudSearchDAO;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/asp/BudSearch/*")
public class BudSearchController extends DefaultController{
	

	@Autowired
	BudSearchDAO BudSearchdao;
	
	@RequestMapping(value="sindo.suvila")
	public @ResponseBody Map<String,Object> sindo(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
	
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			String V_SEARCH_GBN  = param.getString("V_SEARCH_GBN");
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			
			
			List<Map<String,Object>> list = null;
			
			
			System.out.println("V_SEARCH_GBN = "+ param.getString("V_SEARCH_GBN"));
			
			if("CARD".equals(V_SEARCH_GBN) ||  "CARD_NO".equals(V_SEARCH_GBN)){
				list = BudSearchdao.SINDO_SELECT_CARD(param);
			}
			else if( "YOUNGGA".equals(V_SEARCH_GBN) ){
				System.out.println("111111");
				list = BudSearchdao.YOUNGGA_SELECT(param);
			}
			else{ 
				list = BudSearchdao.SINDO_SELECT(param);
			}
			
			storeInfo.put("list", list);
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		
		
		
		return rtnData;
	}
	
	@RequestMapping(value="hwaju.suvila")
	public @ResponseBody Map<String,Object> hwaju(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			System.out.println("hwaju = "+ param.getString("V_SEARCH_WORD"));
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			System.out.println("V_SEARCH_WORD ="+ V_SEARCH_WORD);
			
			
			storeInfo.put("list", BudSearchdao.HWAJU_SELECT(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		
		return rtnData;
	}
	
	@RequestMapping(value="death.suvila")
	public @ResponseBody Map<String,Object> death(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			String V_SEARCH_WORD = URLDecoder.decode(param.getString("V_SEARCH_WORD"), "UTF-8");
			param.put("V_SEARCH_WORD", V_SEARCH_WORD);
			
			
			
			
			storeInfo.put("list", BudSearchdao.DECE_SELECT(param));
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData);
		}
		
		return rtnData;
	}
}
