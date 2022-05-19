package kr.co.o2i.interceptor;

import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.o2i.util.StringUtil;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {
	
	@Override
	@SuppressWarnings("unchecked")
	public boolean preHandle(HttpServletRequest request,HttpServletResponse response, Object handler) throws Exception {
	   
		
		//String url = request.getServletPath();
		HttpSession session = request.getSession(false);
		if (session == null) {
			
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			String rtnData = "{'success':false,'msg':'로그인 세션이 종료되었습니다.<br/> 다시 로그인해주세요.'}";
			PrintWriter writer = response.getWriter();
			writer.println(rtnData);
			
			return false;
		}
		else{
			Map<String, Object> adminSession = (Map<String, Object>)session.getAttribute("adminSession");
			if (adminSession == null) {
				
				response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html; charset=UTF-8");
				String rtnData = "{'success':false,'msg':'로그인 세션이  종료되었습니다.<br/>다시 로그인해주세요.'}";
				PrintWriter writer = response.getWriter();
				writer.println(rtnData);
				 
				return false;
			}else{
				/*response.setCharacterEncoding("UTF-8");
				response.setContentType("text/html; charset=UTF-8");
				String rtnData = "{'success':false,'msg':'세션이 종료되었습니다.다시 로그인해주세요.'}";
				PrintWriter writer = response.getWriter();
				writer.println(rtnData);*/
				
				return true;
			}
		}
		
	//	 return true;
	}
}
