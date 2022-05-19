package kr.co.o2i.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PageUtil {
	public static String getPage( List<Map<String, Object>> list
						                     ,CommonMap param
						                     ,int listCount
						                     ,int lastCount
						                     ,String url){
		String page = "";
		try{
			System.out.println(param);
			int iPage = ParamUtil.getIntValue(param.get("page"), 1);
			int iPageListno = ParamUtil.getIntValue( param.get("pagelistno"), 1);
			
			if(list.size() > 0){
				page+="<div class='paginate'>";
				if(iPage > 10){
				//	page += "<a href='"+url+"?page=1&pagelistno=1"+pageSearch(param)+"'> 처음 </a> \n";
					page += "<a class='pre' href='"+url+"?page="+ (iPageListno-1) *10; 
					page += "&pagelistno="+(iPageListno-1)+pageSearch(param)+"'>";
					page += "<img alt='이전' src='http://static.naver.com/common/paginate/btn_page_prev.gif' width='56' height='27'>  </a>\n";
					
				}
				
				int pagelistnoCnt = iPageListno *10 -9;
				int k = 1;
				for(int i = pagelistnoCnt ; i<=listCount ; i++){
					if(k<=10){
						if(i == iPage){
							page += "<strong><span>"+i+"</span></strong>";
						}else{
							page +="<a href='"+url+"?page="+i+"&pagelistno="+param.get("pagelistno")+pageSearch(param)+"'><span> "+i+"</span> </a> \n";
						}
					}
					k++;
				}
				
				if( (iPageListno * 10) < listCount){
					page += "<a class='next' href='"+url+"?page="+(iPageListno*10 +1 );
					page +=	"&pagelistno="+( iPageListno +1 )+pageSearch(param)+"'>";
					page += "<img alt='다음' src='http://static.naver.com/common/paginate/btn_page_next.gif' width='57' height='27'></a> \n";
				//	page += "<a href='"+url+"?page="+listCount+"&pagelistno="+lastCount+pageSearch(param)+"'> 마지막  </a> \n";
				}
				page+="</div>";
			}
		}catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		return page;
	}
	
	public static String getUserPage( List<Map<String, Object>> list
									             ,CommonMap param
									             ,int listCount
									             ,int lastCount
									             ,String url){
		
		String page = "";
		try{
		//	System.out.println(param);
			int iPage = ParamUtil.getIntValue(param.get("page"), 1);
			int iPageListno = ParamUtil.getIntValue( param.get("pagelistno"), 1);
			
			
			if(list.size() > 0){
				page+="<div class='paging'>";
				
				
				if(iPage > 10){
					page += "<a class='btn_prev00' href='"+url+"?page="+ (iPageListno-1) *10; 
					page += "&pagelistno="+(iPageListno-1)+pageUserSearch(param)+"'><span><img src='/assets/user/images/board_btn_pre.gif'/></span></a>  \n";
				}else{
					page += "<a class='btn_prev00' href='#none'><span><img src='/assets/user/images/board_btn_pre.gif'/></span></a>  \n";
				}
				
				int pagelistnoCnt = iPageListno *10 -9;
				int k = 1;
				for(int i = pagelistnoCnt ; i<=listCount ; i++){
					if(k<=10){
						if(i == iPage){
							page += "<a href='#' class='link_page on' title='현재페이지'>"+i+"</a> \n";
						}else{
							page +="<a class='link_page' href='"+url+"?page="+i+"&pagelistno="+param.get("pagelistno")+pageUserSearch(param)+"'>"+i+"</a> \n";
						}
					}
					k++;
				}
				
				if( (iPageListno * 10) < listCount){
					page += "<a class='btn_next' href='"+url+"?page="+(iPageListno*10 +1 );
					page +=	"&pagelistno="+( iPageListno +1 )+pageUserSearch(param)+"'><span><img src='/assets/user/images/board_btn_next.gif'/></span></a> \n";
				}else{
					page += "<a class='btn_next' href='#none'><span><img src='/assets/user/images/board_btn_next.gif'/></span></a> \n";
				}
				page+="</div>";
			}
		}catch (Exception e) {
			e.printStackTrace();
			page ="";
		}
		return page;
	}
	
	public static String getSchoolrPage( List<Map<String, Object>> list
											            ,CommonMap param
											            ,int listCount
											            ,int lastCount
											            ,String url){
		String page = "";
		try{
			System.out.println(param);
			int iPage = ParamUtil.getIntValue(param.get("page"), 1);
			int iPageListno = ParamUtil.getIntValue( param.get("pagelistno"), 1);
			
			
			if(list.size() > 0){
				page+="<div class='paging'>";
				
				
				if(iPage > 10){
					page += "<a class='btn_prev' href='"+url+"?page="+ (iPageListno-1) *10; 
					page += "&pagelistno="+(iPageListno-1)+pageUserSearch(param)+"'><span>이전</span></a> \n";
				}else{
					page += "<a class='btn_prev' href='#none'><span>이전</span></a> \n";
				}
				
				int pagelistnoCnt = iPageListno *10 -9;
				int k = 1;
				for(int i = pagelistnoCnt ; i<=listCount ; i++){
					if(k<=10){
						if(i == iPage){
							page += "<a href='#' class='link_page on'>"+i+"</a> \n";
						}else{
							page +="<a  class='link_page' href='"+url+"?page="+i+"&pagelistno="+param.get("pagelistno")+pageUserSearch(param)+"'>"+i+"</a> \n";
						}
					}
					k++;
				}
				
				if( (iPageListno * 10) < listCount){
					page += "<a class='btn_next' href='"+url+"?page="+(iPageListno*10 +1 );
					page +=	"&pagelistno="+( iPageListno +1 )+pageUserSearch(param)+"'><span>다음</span></a> \n";
				}else{
					page += "<a class='btn_next' href='#none'><span>다음</span></a> \n";
				}
				page+="</div>";
			}
		}catch (Exception e) {
			e.printStackTrace();
			page ="";
		}
		return page;
	}
	
	public static String getUserCommentPage( List<Map<String, Object>> clist
												             ,CommonMap param
												             ,int clistCount
												             ,String url){
		String page = "";
		try{
			int iPage = ParamUtil.getIntValue(param.get("cpage"), 1);
			int iPageListno = ParamUtil.getIntValue( param.get("cpagelistno"), 1);
			
			if(clist.size() > 0){
				//페이지이 css 적용
				page+="<div class='paginate'>";
				
				
				if(iPage > 10){
					page += "<a class='next' href='"+url+"?cpage="+ (iPageListno-1) *10+"&page="+param.get("page")+"&pagelistno="+param.get("pagelistno"); 
					page += "&seq="+param.get("seq")+"&cpagelistno="+(iPageListno-1)+pageUserSearch(param)+"'>&lt;</a> \n";
					
				}
				
				int pagelistnoCnt = iPageListno *10 -9;
				int k = 1;
				for(int i = pagelistnoCnt ; i<=clistCount ; i++){
					if(k<=10){
						if(i == iPage){
							page += "<a href='#' class='nowPage'>"+i+"</a> \n";
						}else{
							page +="<a href='"+url+"?page="+param.get("page")+"&pagelistno="+param.get("pagelistno")+pageUserSearch(param);
							page +="&seq="+param.get("seq")+"&cpage="+i+"&cpagelistno="+param.get("cpagelistno")+"'>"+i+"</a> \n";
						}
					}
					k++;
				}
				
				if( (iPageListno * 10) < clistCount){
					page += "<a class='prev' href='"+url+"?cpage="+(iPageListno*10 +1 )+"&page="+param.get("page")+"&pagelistno="+param.get("pagelistno");;
					page +=	"&seq="+param.get("seq")+"&cpagelistno="+( iPageListno +1 )+pageUserSearch(param)+"'>&gt;</a> \n";
				}
				page+="</div>";
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return page;
	}
	
	
	
	
	public static String pageSearch(CommonMap bean){
		String search="";
		try{
			if( !StringUtil.StringNull( bean.get("search_value")).equals("") ){
				 search+="&search_title="+bean.get("search_title")+"&search_value="+bean.get("encodeSV");
			}
			String grade = StringUtil.StringNull(bean.get("grade"));
			if(!grade.equals("")){
				search += "&grade="+grade;
			}
			String board_type = StringUtil.StringNull(bean.get("board_type"));
			if(!board_type.equals("")){
				search += "&board_type="+board_type;
			}
			
			String search_flag = StringUtil.StringNull(bean.get("search_flag"));
			if(!board_type.equals("")){
				search += "&search_flag="+search_flag;
			}
			
			String search_year = StringUtil.StringNull(bean.get("search_year"));
			if(!search_year.equals("")){
				search += "&search_year="+search_year;
			}
			
			String search_term = StringUtil.StringNull(bean.get("search_term"));
			if(!search_term.equals("")){
				search += "&search_term="+search_term;
			}

			String reg_date = StringUtil.StringNull(bean.get("search_reg_date"));
			if(!reg_date.equals("")){
				search += "&search_reg_date="+reg_date;
			}
			String name_kor = StringUtil.StringNull(bean.get("search_name_kor"));
			if(!name_kor.equals("")){
				search += "&search_name_kor="+name_kor;
			}
			
			String gender = StringUtil.StringNull(bean.get("search_gender"));
			if(!gender.equals("")){
				search += "&search_gender="+gender;
			}
			
			String form_type = StringUtil.StringNull(bean.get("search_form_type"));
			if(!form_type.equals("")){
				search += "&search_form_type="+form_type;
			}
			
			
			String search_type = StringUtil.StringNull(bean.get("search_type"));
			if(!search_type.equals("")){
				search += "&search_type="+search_type;
			}
			
			String search_major = StringUtil.StringNull(bean.get("search_major"));
			if(!search_major.equals("")){
				search += "&search_major="+search_major;
			}
			
			String search_state = StringUtil.StringNull(bean.get("search_state"));
			if(!search_state.equals("")){
				search += "&search_state="+search_state;
			}
			
			String search_professor = StringUtil.StringNull(bean.get("search_professor"));
			if(!search_professor.equals("")){
				search += "&search_professor="+search_professor;
			}
			
			String search_target = StringUtil.StringNull(bean.get("search_target"));
			if(!search_target.equals("")){
				search += "&search_target="+search_target;
			}
			
			String search_degree = StringUtil.StringNull(bean.get("search_degree"));
			if(!search_degree.equals("")){
				search += "&search_degree="+search_degree;
			}
			String search_id = StringUtil.StringNull(bean.get("search_id"));
			if(!search_id.equals("")){
				search += "&search_id="+search_id;
			}
			String search_cate_seq = StringUtil.StringNull(bean.get("search_cate_seq"));
			if(!search_cate_seq.equals("")){
				search += "&search_cate_seq="+search_cate_seq;
			}
			String search_book_name = StringUtil.StringNull(bean.get("search_book_name"));
			if(!search_book_name.equals("")){
				search += "&search_book_name="+search_book_name;
			}
			String search_author = StringUtil.StringNull(bean.get("search_author"));
			if(!search_author.equals("")){
				search += "&search_author="+search_author;
			}
			
			
			String search_cert = StringUtil.StringNull(bean.get("search_cert"));
			if(!search_cert.equals("")){
				search += "&search_cert="+search_cert;
			}
			
			String search_sdate = StringUtil.StringNull(bean.get("search_sdate"));
			if(!search_sdate.equals("")){
				search += "&search_sdate="+search_sdate;
			}
			
			String search_edate = StringUtil.StringNull(bean.get("search_edate"));
			if(!search_edate.equals("")){
				search += "&search_edate="+search_edate;
			}
			
			String search_lecname = StringUtil.StringNull(bean.get("encodeSLM"));
			if(!search_lecname.equals("")){
				search_lecname += "&search_lecname="+search_edate;
			}
			
		}catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		return search;
	}
	
	public static String pageUserSearch(CommonMap bean){
		String search="";
		try{
			
			if( !StringUtil.StringNull( bean.get("search_value")).equals("") ){
				 search+="&search_title="+bean.get("search_title")+"&search_value="+bean.get("encodeSV");
			}
			String grade = StringUtil.StringNull(bean.get("grade"));
			if(!grade.equals("")){
				search += "&grade="+grade;
			}
			
			String board_type = StringUtil.StringNull(bean.get("board_type"));
			if(board_type.equals("info")){
				search += "&category="+bean.get("category");
			}
			
			if(board_type.equals("photo")){
				search += "&photo_year="+bean.get("photo_year")+"&photo_month="+bean.get("photo_month");
			}
			
			String search_flag = StringUtil.StringNull(bean.get("search_flag"));
			if(!search_flag.equals("")){
				search += "&search_flag="+search_flag;
			}
			
			
			String search_use = StringUtil.StringNull(bean.get("search_use"));
			if(!search_use.equals("")){
				search += "&search_use="+search_use;
			}
			
			
			String search_corse = StringUtil.StringNull(bean.get("search_corse"));
			if(!search_corse.equals("")){
				search += "&search_corse="+search_corse;
			}
			
			String search_lecture_name = StringUtil.StringNull(bean.get("search_lecture_name"));
			if(!search_lecture_name.equals("")){
				search += "&search_lecture_name="+bean.get("encodeSLN");
			}
			
			String book_grps = StringUtil.StringNull(bean.get("BOOK_GRPS"));
			if(!book_grps.equals("")){
				search += "&BOOK_GRPS="+book_grps;
			}
			String search_cate_seq = StringUtil.StringNull(bean.get("search_cate_seq"));
			if(!search_cate_seq.equals("")){
				search += "&search_cate_seq="+search_cate_seq;
			}
			String search_book_name = StringUtil.StringNull(bean.get("search_book_name"));
			if(!search_book_name.equals("")){
				search += "&search_book_name="+search_book_name;
			}
			String search_author = StringUtil.StringNull(bean.get("search_author"));
			if(!search_author.equals("")){
				search += "&search_author="+search_author;
			}
			
			
		}catch (Exception e) {
			e.printStackTrace();
			return "";
		}
		return search;
	}
		
	//메뉴
	public static Map<String, Object> menu(String url,CommonMap param){
		Map<String, Object> menu = new HashMap<String, Object>();
		try{
			if(url.indexOf("/admin/01_totalboard/") != -1){
				menu.put("fmenu", "1");
				menu.put("title", "후기관리 | ");
				menu.put("menuname", "후기관리  >  후기관리");
			}else if(url.indexOf("/admin/02_gallery/") != -1){
				menu.put("fmenu", "2");
				menu.put("title", "갤러리관리 | ");
				menu.put("menuname", "갤러리관리  >  갤러리관리");
			}else if(url.indexOf("/admin/03_apply") != -1 ){
				menu.put("fmenu", "3");
				menu.put("title", "신청관리 | ");
				menu.put("menuname", "신청관리  >  신청관리");
			}else if(url.indexOf("/admin/04_master") != -1){
				menu.put("fmenu", "4");
				menu.put("title", "마스터관리 | ");
				menu.put("menuname", "마스터관리  >  마스터관리");
			}
			
			menu.put("menu_url", url);
		}catch (Exception e) {
			e.printStackTrace();
		}
		return menu;
	}
	
	
	public static Map<String, Object> user_menu(String href,CommonMap param){
		Map<String, Object> menu = new HashMap<String, Object>();
		String url=URI_Convert.ConvertingTest(href);
		System.out.println("***************************url="+url);
		try{
			if(url.startsWith("/menu01")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu01/menu01");
				menu.put("menuTit","14대 달라이라마");
				menu.put("subUrl","/menu01/menu01");
				menu.put("subTit","생애");
				if(url.startsWith("/menu01/menu02")){
					menu.put("subUrl","/menu01/menu02");
					menu.put("subTit","세가지 약속");
				}else if(url.startsWith("/menu01/menu03")){
					menu.put("subUrl","/menu01/menu03");
					menu.put("subTit","일상");
				}else if(url.startsWith("/menu01/menu04")){
					menu.put("subUrl","/menu01/menu04_01");
					menu.put("subTit","탄생지에서 망명");
				}else if(url.startsWith("/menu01/menu05")){
					menu.put("subUrl","/menu01/menu05_list");
					menu.put("subTit","법문");
				}else if(url.startsWith("/menu01/menu06")){
					menu.put("subUrl","/menu01/menu06_01");
					menu.put("subTit","주요인사만남");
				}else if(url.startsWith("/menu01/menu07")){
					menu.put("subUrl","/menu01/menu07");
					menu.put("subTit","주요수상현황");
				}else if(url.startsWith("/menu01/menu08")){
					menu.put("subUrl","/menu01/menu08");
					menu.put("subTit","묻고답하기");
				}else if(url.startsWith("/menu01/menu09")){
					menu.put("subUrl","/menu01/menu09_list");
					menu.put("subTit","뉴스");
				}
				
			}else if(url.startsWith("/menu02")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu02/menu01_list");
				menu.put("menuTit","메세지");
				menu.put("subUrl","/menu02/menu01_list");
				menu.put("subTit","연민");
				if(url.startsWith("/menu02/menu02")){
					menu.put("subUrl","/menu02/menu02_list");
					menu.put("subTit","종교화합");
				}else if(url.startsWith("/menu02/menu03")){
					menu.put("subUrl","/menu02/menu03_list");
					menu.put("subTit","환생");
				}
				
			}else if(url.startsWith("/menu03")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu03/menu01");
				menu.put("menuTit","미디어");
				menu.put("subUrl","/menu03/menu01");
				menu.put("subTit","갤러리");
				if(url.startsWith("/menu03/menu02")){
					menu.put("subUrl","/menu03/menu02_list");
					menu.put("subTit","영상");
				}	
			}else if(url.startsWith("/menu04") ){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu04/menu01");
				menu.put("menuTit","달라이라마 방한추진회");
				menu.put("subUrl","/menu04/menu01");
				menu.put("subTit","방한추진 취지문");
				if(url.startsWith("/menu04/menu02")){
					menu.put("subUrl","/menu04/menu02");
					menu.put("subTit","추진경과");
				}else if(url.startsWith("/menu04/menu03")){
					menu.put("subUrl","/menu04/menu03");
					menu.put("subTit","조직도");
				}else if(url.startsWith("/menu04/menu04")){
					menu.put("subUrl","/menu04/menu04");
					menu.put("subTit","활동일정");
				}else if(url.startsWith("/menu04/menu05")){
					menu.put("subUrl","/menu04/menu05");
					menu.put("subTit","활동모습");
				}	
			}else if(url.startsWith("/menu05")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu05/menu01");
				menu.put("menuTit","방한추진 서명운동");
				menu.put("subUrl","/menu05/menu01");
				menu.put("subTit","서명운동 참여방법");
			}else if(url.startsWith("/menu06")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu06/menu01");
				menu.put("menuTit","추진회 후원");
				menu.put("subUrl","/menu06/menu01");
				menu.put("subTit","후원방법");
				if(url.startsWith("/menu06/menu02")){
					menu.put("subUrl","/menu06/menu02");
					menu.put("subTit","후원신청");
				}else if(url.startsWith("/menu06/menu03")){
					menu.put("subUrl","/menu06/menu03");
					menu.put("subTit","후원현황");
				}else if(url.startsWith("/menu06/menu04")){
					menu.put("subUrl","/menu06/menu04");
					menu.put("subTit","회계보고");
				}	
			}else if(url.startsWith("/menu07")){
				//1차메뉴 정보 담기
				menu.put("menuUrl","/menu07/menu01_list");
				menu.put("menuTit","공지사항");
				menu.put("subUrl","/menu07/menu01_list");
				menu.put("subTit","공지사항");
				
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		return menu;
	}
	
	
	
}
