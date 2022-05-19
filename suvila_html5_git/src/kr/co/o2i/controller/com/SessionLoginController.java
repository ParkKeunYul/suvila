package kr.co.o2i.controller.com;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


import  java.net.InetAddress;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.com.SessionLoginDAO;
import kr.co.o2i.session.AdminSessionMgr;
import kr.co.o2i.util.StringUtil;


@Controller
public class SessionLoginController extends DefaultController {

	
	
	@Autowired
	SessionLoginDAO SessionLogindao;
	
	@RequestMapping(value="/asp/sessionLogin/login.suvila")
	public @ResponseBody Map<String,Object> login(Map<String, Object> map
								            ,HttpServletRequest request
								            ,HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			Map<String, Object> info = SessionLogindao.SESSION_LOGIN(param);
			
			if(info != null){
				info.put("PASSWD", "");
				info.put("V_AUTH_ADMIN_YN", "Y" );
				
				AdminSessionMgr asm = new AdminSessionMgr(request);
				
				HttpSession session = request.getSession(false);
				session.setAttribute("adminSession", info);
				asm.setSession(info, request);;
				
				storeInfo.put("info", info);
			}
			
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}// login
	
	
	@RequestMapping(value="/asp/card/get_ip.suvila")
	public @ResponseBody Map<String,Object> getIP( Map<String, Object> map
									              ,HttpServletRequest request
									              ,HttpServletResponse response){
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		try{
			
			
			
			List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
			
			Map<String, Object> info = new HashMap<String, Object>();
			
			
			InetAddress inet = InetAddress.getLocalHost();
			
			info.put("UserIP", request.getRemoteAddr());
			info.put("MallIP", inet.getHostAddress());
			
			list.add(info);
			
			storeInfo.put("list", list);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
			
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
}


