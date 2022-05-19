package kr.co.o2i.controller.com;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.o2i.dao.com.MenuDAO;
import kr.co.o2i.session.AdminSessionMgr;
import kr.co.o2i.util.StringUtil;



@Controller
@RequestMapping ("/asp/menu/*")
public class MenuController extends DefaultController {

	@Autowired
	MenuDAO menuDAO;
	
	
	public String MSG_ERR = "메뉴구성중 오류가 발생하였습니다.<br/>사찰관리 > 메뉴권한 설정에서 오류가<br/>발생된 아이디의 권한을 확인하세요.  <br>관련문의 : 070-7860-7900<br>(주)오투아이 수비라담당자.";
	
	// 좌측 메뉴
	@RequestMapping(value="menuLeft.suvila")
	public @ResponseBody Map<String,Object> menuLeft(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response)throws Exception{
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		
		try{
			AdminSessionMgr asm = new AdminSessionMgr(request);
			asm.getSession(request);
			
			
			param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			
			List<Map<String, Object>> selectmenuListTemp = menuDAO.selectmenuDao(param);
			Map<String, Object> menuMap  = new HashMap<String, Object>();
			
			param.put("temple_cd", adminSession.get("TEMPLE_CD")  );
	   		param.put("user_id"  , adminSession.get("USER_ID")  );
			
			
	   		
	   		
			for(int i = 0 ; i <selectmenuListTemp.size() ; i++ ){
				Map<String, Object> infoTemp = selectmenuListTemp.get(i);
				
				
				String MENU_GBN    = StringUtil.ObjToStr(infoTemp.get("MENU_GBN"));
				String SERVICE_GBN = StringUtil.StringNull( infoTemp.get("SERVICE_GBN"));
				
				param.put("service_gbn", SERVICE_GBN);
				List<Map<String, Object>> treeMenuList = menuDAO.TreeMenuDao(param);
				
				
				Map<String, Object> childMap            = new HashMap<String, Object>();
				List<Map<String, Object>> secMenuList   = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> thirdMenuList = new ArrayList<Map<String, Object>>();
				Map<String, Object> infoSubTemp         = null;
				
				
				String twoNavText = "";
				for(int j = 0; j<treeMenuList.size() ; j++){
					
					int menuLvl = StringUtil.ObjectToInt( treeMenuList.get(j).get("MENU_LVL") );				
					
					if(menuLvl == 2 && j == 0){									
						 infoSubTemp = treeMenuList.get(j);
						 
						 twoNavText = infoTemp.get("MENU_NM") + " > " + infoSubTemp.get("text");
						 infoSubTemp.put("nav_text", twoNavText);
					}
					else if((menuLvl == 2 && j != 0)    ){
						
						
						try{
							infoSubTemp.put("children", thirdMenuList);
						}catch (Exception e) {}
						try{
							secMenuList.add(infoSubTemp);
						}catch (Exception e) {}
						
						thirdMenuList = new ArrayList<Map<String, Object>>();
						infoSubTemp = treeMenuList.get(j);
						twoNavText = infoTemp.get("MENU_NM") + " > " + infoSubTemp.get("text");
						infoSubTemp.put("nav_text", twoNavText);
					}
					else if( j == (treeMenuList.size() -1) ){	
						Map<String, Object> thirdSubTemp = treeMenuList.get(j);
						
						try{
							thirdMenuList.add(thirdSubTemp);
						}catch (Exception e) {}
						
						try{
							infoSubTemp.put("children", thirdMenuList);
						}catch (Exception e) {}
						
						try{
							secMenuList.add(infoSubTemp);
						}catch (Exception e) {}
						
						
					}
					else if(menuLvl == 3 ) {
						Map<String, Object> thirdSubTemp = treeMenuList.get(j);
						
						try{
							thirdSubTemp.put("nav_text", twoNavText + " > " + thirdSubTemp.get("text"));
							thirdMenuList.add(thirdSubTemp);
						}catch (Exception e) {}
						
					}
					else{
						// System.out.println( j +" :" + (treeMenuList.size() -1) );
					}
				}
				childMap.put("children", secMenuList);
				menuMap.put("topMenu"+(i+1), childMap);
			}
			
			storeInfo.put("info", menuMap);
			
			rtnData.put("data", storeInfo);
			rtnData.put("success", rtnSuccess);
			rtnData.put("msg", "MENU LEFT AREA");
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData , MSG_ERR);
		}
		
		return rtnData;
	}
	
	
	// START MENU
	@RequestMapping(value="menuStart.suvila")
	public @ResponseBody Map<String,Object> menuStart(Map<String, Object> map,HttpServletRequest request, HttpServletResponse response){
		
		
		Map<String, Object> rtnData   = new HashMap<String, Object>();
		Map<String, Object> storeInfo = new HashMap<String, Object>();
		
		try{
			param.put("temple_cd"  , adminSession.get("TEMPLE_CD")  );
	   		param.put("user_id"    , adminSession.get("USER_ID")  );
	   		param.put("V_TEMPLE_CD", adminSession.get("TEMPLE_CD"));
			param.put("V_USER_ID"  , adminSession.get("USER_ID"));
			
			List<Map<String, Object>> selectmenuListTemp = menuDAO.selectmenuDao(param);
			List<Map<String, Object>> selectmenuList     = new ArrayList<Map<String, Object>>();
			
			
			
			
			for(int i = 0 ; i <selectmenuListTemp.size() ; i++ ){
				Map<String, Object> infoTemp = selectmenuListTemp.get(i);			
				
				Map<String, Object> menuMap  = new HashMap<String, Object>();
				
				
				infoTemp.put("leftMenu", (i+1));
				infoTemp.put("text", infoTemp.get("MENU_NM"));			
				infoTemp.put("handler", "onLeftMenu");
				
								
				
				String SERVICE_GBN = StringUtil.StringNull( infoTemp.get("SERVICE_GBN"));
				
				param.put("service_gbn", SERVICE_GBN);
				
				
				
				List<Map<String, Object>> treeMenuList  = menuDAO.TreeMenuDao(param);
				Map<String, Object> childMap            = new HashMap<String, Object>();
				List<Map<String, Object>> secMenuList   = new ArrayList<Map<String, Object>>();
				List<Map<String, Object>> thirdMenuList = new ArrayList<Map<String, Object>>();
				Map<String, Object>       infoSubTemp   = null;
				
				
				
				String sTypeMenu="";
				
				Map<String, Object> tempSecMenuRoop = new HashMap<String, Object>();
				
				String twoDepthNavName = "";
				for(int j = 0; j<treeMenuList.size() ; j++){
					
					infoSubTemp    = treeMenuList.get(j);
					
					
					String menu_gbn = StringUtil.ObjToStr( infoSubTemp.get("MENU_GBN") );
					int menuLvl     = StringUtil.ObjectToInt( infoSubTemp.get("MENU_LVL") );
					infoSubTemp.put("nav_text", infoTemp.get("MENU_NM") + " > " + infoSubTemp.get("text"));
					infoSubTemp.put("leftMenu", (i+1));
					
					
					if("P".equals(menu_gbn) && menuLvl == 2){
						
						try{
							secMenuList.add(infoSubTemp);
						}catch (Exception e) {}
						
						
					}
					else if("M".equals(menu_gbn) && menuLvl == 2){	
						twoDepthNavName = infoSubTemp.get("nav_text")+"";
						
						if(!"".equals(sTypeMenu)){ 
							Map<String, Object> thirMenuItems  = new HashMap<String, Object>();
							thirMenuItems.put("items", thirdMenuList);
							
							
							tempSecMenuRoop.put("menu", thirMenuItems);
							secMenuList.add(tempSecMenuRoop);
							
							try{}catch (Exception e) {}
							try{}catch (Exception e) {}
							try{}catch (Exception e) {}
							
							thirdMenuList = new ArrayList<Map<String, Object>>();
						}
						tempSecMenuRoop = infoSubTemp;
						sTypeMenu = StringUtil.ObjToStr(infoSubTemp.get("name"));
					}else if("P".equals(menu_gbn) && menuLvl == 3){
						
						
						try{
							infoSubTemp.put("nav_text", twoDepthNavName+" > " + infoSubTemp.get("text"));
							thirdMenuList.add(infoSubTemp);
						}catch (Exception e) {}
						
						if(  j == (treeMenuList.size() -1)  ){
							Map<String, Object> thirMenuItems  = new HashMap<String, Object>();
							
							try{
								thirMenuItems.put("items", thirdMenuList);
							}catch (Exception e) {}
							try{
								tempSecMenuRoop.put("menu", thirMenuItems);
							}catch (Exception e) {}
							try{
								secMenuList.add(tempSecMenuRoop);
							}catch (Exception e) {}
							
							thirdMenuList = new ArrayList<Map<String, Object>>();
							sTypeMenu = "";
						}
						
					}
				}// for j
				childMap.put("items", secMenuList);
				infoTemp.put("menu", childMap);
				
				selectmenuList.add(infoTemp);// 최상의
			}// for i
			
			storeInfo.put("list", selectmenuList);
			//storeInfo.put("treeMenu", treeMenuList);
			
			rtnData.put("data", storeInfo);
			rtnData.put("success", rtnSuccess);
			rtnData.put("msg", "MENU START BUTTON ST");
		}catch (Exception e) {
			e.printStackTrace();
			rtnData = StringUtil.rtnError(rtnData , MSG_ERR);
		}
		
		return rtnData;
	}
	
	
}// MenuController
