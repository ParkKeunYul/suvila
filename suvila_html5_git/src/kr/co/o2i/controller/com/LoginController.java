package kr.co.o2i.controller.com;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.common.Const;
import kr.co.o2i.dao.com.LoginDAO;
import kr.co.o2i.session.AdminSessionMgr;
import kr.co.o2i.util.StringUtil;

@Controller
@RequestMapping ("/login/*")
public class LoginController extends DefaultController{
	
	@Autowired
	LoginDAO loginDAO;
	
	
	public void setCookie(HttpServletResponse res, String key , String value, int age){
		Cookie cookie = new Cookie(key,value);
		cookie.setMaxAge(age);
		cookie.setPath("/");
		cookie.setDomain("www.suvila1.org");
		res.addCookie(cookie);
	}
	
	@RequestMapping ("loginPro.suvila")
	public @ResponseBody Map<String,Object> loginPro(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
				
		rtnData   = new HashMap<String, Object>();
		storeInfo = new HashMap<String, Object>();
		try{
			storeInfo = new HashMap<String, Object>();
			String rtnMsg = "";
			
			
			String passwd = param.getString("passwd", "");
			String passid = param.getString("passid", "");
					
			Map<String, Object> loginInfo = loginDAO.getLoginSql(param);
			
			
			
			String USER_USE_YN ="";
			
			try{
				USER_USE_YN = StringUtil.ObjToStr( loginInfo.get("USER_USE_YN"), "" );
				loginInfo.put("remote", request.getRemoteAddr());
			}catch (Exception e) {
				USER_USE_YN = "";
			}
			
			HttpSession session = request.getSession(false);	
			
			if(!"".equals(USER_USE_YN) && USER_USE_YN != null ){
				param.put("USER_NM"   ,loginInfo.get("USER_NM")   );
				param.put("TEMPLE_CD" ,loginInfo.get("TEMPLE_CD") );
				param.put("TEMPLE_NM" ,loginInfo.get("TEMPLE_NM") );
				
				if(!"T".equals(USER_USE_YN)){
					session.setAttribute("adminSession", loginInfo);
					
					param.put("SUCCESS_YN",  "N");
					rtnMsg = "사용중지된 사용자입니다.@관리자에게 문의하여 주십시요.";
					param.put("ERROR_MESSAGE", rtnMsg);
					
					rtnSuccess = false;
				}
				else if(passwd.equals( StringUtil.ObjToStr( loginInfo.get("PASSWD")) ) ){
									
					if(  "T".equals(StringUtil.ObjToStr( loginInfo.get("TEMPLE_USE_YN")))   ){
						rtnMsg = "OK_LOGIN_PROCESS";
						param.put("ERROR_MESSAGE", rtnMsg );
						param.put("SUCCESS_YN",  "Y");
					//	loginDAO.insertLoginLog(param);
						
						if("on".equals(passid)){  
							param.put("USER_ID", param.getString("user_id"));
							
							List< Map<String, Object> > logList = loginDAO.autoLoginSql(param);
							
							if(logList.size() > 0 ){
								param.put("type", 2);
								loginDAO.updateLoginInfo(param);
							}else{
								loginDAO.insertLoginInfo(param);;
							}
							
							setCookie(response, "passid" , "", 0);
							setCookie(response, "passtem", "", 0);
							setCookie(response, "passid",  loginInfo.get("USER_ID").toString(), 60*60*24*365);
							setCookie(response, "passtem", loginInfo.get("TEMPLE_CD").toString(), 60*60*24*365);
						}else{
							setCookie(response, "passid" , "", 0);
							setCookie(response, "passtem", "", 0);
							param.put("type", 1);
						}
						
						loginInfo.put("PASSWD", "");
						
						storeInfo.put("info", loginInfo);
						rtnSuccess = true;
						session.setMaxInactiveInterval(54000);
						session.setAttribute("adminSession", loginInfo);
					}else{
						
						param.put("SUCCESS_YN",  "N");
						rtnMsg = "사용중지된 사찰입니다.@수비라 개발사로 문의하여 주십시요.";
						param.put("ERROR_MESSAGE", rtnMsg );
					//	loginDAO.insertLoginLog(param);
						rtnSuccess = false;
					}// if 사찰 사용우뮤 
				
				}else{
					rtnSuccess = false;
					rtnMsg = "비밀번호가 틀립니다.@관리자에게 문의하여 주십시요.";
					param.put("SUCCESS_YN",  "N");
					param.put("ERROR_MESSAGE",rtnMsg  );
					
					param.put("TEMPLE_CD" ,"" );
					param.put("TEMPLE_NM" ,"" );
				}// if 사용자 사용유무
				
			}else{
				rtnMsg = "등록된 사용자가 아닙니다.@관리자에게 문의하여 주십시요.";
				param.put("ERROR_MESSAGE", rtnMsg );
				rtnSuccess = false;
			}// 사용자 존재여부
			
			
			
			if(!rtnMsg.equals("OK_LOGIN_PROCESS")){
				session.invalidate();
  			}
			
			rtnData.put("msg", rtnMsg.replaceAll("@", "<br/>"));
			rtnData.put("data", storeInfo);
			rtnData.put("success", rtnSuccess);
			
		}catch(Exception e){
			e.printStackTrace();
			
		}
		return rtnData;
		
	}
	
	
	@RequestMapping ("/session_check.suvila")
	public @ResponseBody Map<String, Object> session_check(Map<String, Object> map, HttpServletResponse response){
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			storeInfo.put("list", adminSession);
			
			rtnData = StringUtil.rtnSuc(rtnData, storeInfo);
		}catch (Exception e) {
			rtnData = StringUtil.rtnError(rtnData);
			e.printStackTrace();
		}
		return rtnData;
	}
	
	@RequestMapping ("/logout.suvila")
	public String logout(Map<String, Object> map, HttpServletResponse response){
		
		try{
			
			AdminSessionMgr asm = new AdminSessionMgr(request);
			asm.setLoginOut(request);
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return "redirect:/";
	}
	
	
	@RequestMapping ("/login_check.suvila")
	public @ResponseBody Map<String, Object> login_chekc(Map<String, Object> map, HttpServletResponse response){
		
		Map<String, Object> rtn = new HashMap<String, Object>();
		try{
			
			String user_id    = param.getString("pi"); 
			String temple_cd  = param.getString("pt");
			String client_ip  = request.getRemoteAddr();
			
			String cookie_id = "";
		  	Cookie cookie[] = request.getCookies();
		  	for(int i = 0; i< cookie.length; i++){
		  		if("passid".equals(cookie[i].getName())){
		  			cookie_id = cookie[i].getValue();
		  		}
		  	}
		  	if(!user_id.equals(cookie_id)) user_id = cookie_id;
		  	
		  	param.put("TEMPLE_CD", temple_cd);
			param.put("CLIENT_IP", client_ip);
			param.put("user_id"  , user_id);
		  	
			List<Map<String, Object>> listUser = loginDAO.autoLoginSql(param);
			
			
			if(listUser.size() > 0){
				Map<String, Object> mapUser = listUser.get(0);
				
				rtn.put("ID", mapUser.get("ID"));
				rtn.put("PWD", mapUser.get("PWD"));
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return rtn;
	}
	
	
	public String autoIdPw( HttpServletRequest req
				            ,HttpServletResponse res
				            ,String user_id 
				            ,String temple_cd 
				            ,String client_ip        ){
		try{
			
			
			param.put("TEMPLE_CD", temple_cd);
			param.put("CLIENT_IP", client_ip);
			param.put("user_id", user_id);
			
			List<Map<String, Object>> listUser = loginDAO.autoLoginSql(param);
			
			
			if(listUser.size() > 0){
				Map<String, Object> mapUser = listUser.get(0);
				
				return mapUser.get("ID") + "///"+mapUser.get("PWD");
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}finally{
		}
		return "";
	}
	
	
	
}
