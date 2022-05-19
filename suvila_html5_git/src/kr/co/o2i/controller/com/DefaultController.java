package kr.co.o2i.controller.com;

import java.net.InetAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;

import kr.co.o2i.util.CommonMap;
import kr.co.o2i.util.PageUtil;
import kr.co.o2i.util.StringUtil;

public class DefaultController {
static public Logger logger = Logger.getLogger(DefaultController.class);
	
	@Autowired
	public HttpServletRequest request;
	@Autowired
	public SqlSession sqlSession;
	public  Map<String, Object> adminSession = null;
	public  Map<String, Object> menuSession = null;
	public  CommonMap param;
	
	
	public Map<String,Object> rtnData = null;
	public Map<String,Object> storeInfo = null;
	public boolean rtnSuccess =  true;
	public String rtnMsg     = "저장";
	public String rtnMsgSave = "저장하였습니다.";
	
	
	
	
	public void setParam(CommonMap param) {
		this.param = param;
	}


	@PostConstruct
	public void init() {
	}
	
	
	@ModelAttribute("menu")
	public Map<String, Object> menu(HttpServletRequest request, HttpServletResponse response,HttpSession session)throws Exception{
		Map<String, Object> menu = new HashMap<String, Object>();
		// 현재 메뉴
		String url = request.getServletPath();
		param = new CommonMap(request);
		
		param.put("CLIENT_IP", request.getRemoteAddr());			
		param.put("V_REMOTE", request.getRemoteAddr());
		param.put("SERVER_IP", InetAddress.getLocalHost().getHostAddress());
			
		return menu;			
	}
	
	
	@SuppressWarnings("unchecked")
	@ModelAttribute("adminInfo")
	public Map<String, Object> memberInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
	    HttpSession session = request.getSession(false);
	   	if(session != null) {
	   		
	   		adminSession = (Map<String, Object>)session.getAttribute("adminSession");
	   		
	   		if(adminSession!=null){
	   			try{
	   				param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
	   				param.put("V_USER_ID", adminSession.get("USER_ID"));
	   				param.put("V_REMOTE", adminSession.get("remote"));
	   				param.put("V_TEMPLE_NM", adminSession.get("TEMPLE_NM"));
	   			}catch (Exception e) {}
	   			
	   		}else{
	   			System.out.println("login session xxx");
	   			return null;
	   		}
	   	}else{
	   		return null;
	   	}
	   	return adminSession;
	}
	
	@SuppressWarnings("unchecked")
	@ModelAttribute("menuInfo")
	public Map<String, Object> menuadminInfo(HttpServletRequest request, HttpServletResponse response) throws Exception {
	   /*try{
		   HttpSession session = request.getSession(false);
		   	if(session != null) {
		   		menuSession = (Map<String, Object>)session.getAttribute("menuSession");
		   	}
	   }catch (Exception e) {
		   System.out.println("menu session XX");
	   }*/
	   return menuSession;
	}
}
