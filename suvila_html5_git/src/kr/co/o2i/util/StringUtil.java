package kr.co.o2i.util;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URLEncoder;
import java.nio.ByteBuffer;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.text.NumberFormat;
import java.text.ParseException;
import java.util.Enumeration;
import java.util.StringTokenizer;
import java.util.Vector;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import org.json.simple.JSONObject;
import org.json.simple.JSONArray;
import org.json.simple.JSONValue;
import org.springframework.web.multipart.MultipartFile;

import kr.co.o2i.common.Const;
import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;

public class StringUtil {
	
	@SuppressWarnings("unchecked")
	public static List<Map<String, Object>> jsonToArray(String json){
		List<Map<String, Object>> list =  new ArrayList< Map<String, Object> >();
		try{
			
			if(json != null || !"".equals(json)){
				Object obj = JSONValue.parseWithException(json);
				JSONArray array = (JSONArray)obj;
				
				for(int i=0;i<array.size();i++) {
					list.add((Map<String, Object>)array.get(i));
		 	    }
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@SuppressWarnings("unchecked")
	public static Map<String, Object> jsonToMap(String json){
		List<Map<String, Object>> list =  new ArrayList< Map<String, Object> >();
		try{
			
			if(json != null || !"".equals(json)){
				Object obj = JSONValue.parseWithException(json);
				JSONArray array = (JSONArray)obj;
				
				return (Map<String, Object>)array.get(0);
			}
			
		}catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static String StringNull(Object o){
		try{
			return o.toString();
		}catch (Exception e) {
			return "";
		}
	}
	
	public static int ObjectToInt(Object o){
		try{
			return Integer.parseInt(o.toString());
		}catch (Exception e) {
			return 0;
		}
	}
	
	
	public static Map<String, Object> setTractBaseParam( Map<String , Object> info
			                                            ,CommonMap param){
		try{
			info.put("V_REMOTE", param.getString("V_REMOTE", ""));
			info.put("UPT_USER", param.getString("UPT_USER", ""));
			info.put("CRT_USER", param.getString("CRT_USER", ""));
		}catch (Exception e) {
			return info;
		}
		return info;
	}
	
	public static int ObjToInt(Object o){
		try{
			return Integer.parseInt(o.toString());
		}catch (Exception e) {
			return 0;
		}
	}
	
	public static int ObjToInt(Object o , int rep){
		try{
			return Integer.parseInt(o.toString());
		}catch (Exception e) {
			return 0;
		}
	}
	
	
	public static String ObjToStr(Object o){
		try{
			return o.toString();
		}catch (Exception e) {
			return "";
		}
	}
	
	
	public static String ObjToStr(Object o, String replace){
		try{
			return o.toString();
		}catch (Exception e) {
			return replace;
		}
	}
	
	public static boolean ObjToBol(Object o){
		try{
			System.out.println("ObjToBol = "+ o);			
			
			return (boolean)o;
		}catch (Exception e) {
			System.out.println("try ObjToBol = "+ o);
			
			String value = o.toString();
			if("true".equals(value)){
				return true;
			}else{
				return false;
			}
		}
	}
	
	public static String StrBolToTF(String s){
		try{
			
			if("true".equals(s)){
				return "T";
			}else{
				return "F";
			}
		}catch (Exception e) {
			return "F";
		}
	}
	
	
	public static String setSearchValue(CommonMap param){
		try{
			return URLEncoder.encode( param.getString("search_value", "") ,"UTF-8");  
		}catch (Exception e) {
			return "";
		}
	}
	
	public static String setSearchValue(CommonMap param, String name){
		try{
			return URLEncoder.encode( param.getString(name, "") ,"UTF-8");  
		}catch (Exception e) {
			return "";
		}
	}
	
	public static Map<String, Object> convertContents(Map<String, Object> param){
		try{
			/*String sContents = StringNull(param.get("contents"));
			if(!sContents.equals("")){
				param.put("contents", sContents.replaceAll(">","&gt;").replaceAll("<","&lt;").replaceAll("'","&quot;") );
			}*/
			
			String sTitle = StringNull(param.get("title"));
			if(!sTitle.equals("")){
				param.put("title", sTitle.replaceAll(">" ,"&gt;").replaceAll("<" ,"&lt;").replaceAll("'" ,"&#39;").replaceAll("\"" ,"&quot;") );
			}
			
			return param;
		}catch (Exception e) {
			return param;
		}
	}
	
		public static String ascToksc (String str)  throws Exception {
			if (str == null) return null;
			
			return new String (str.getBytes("8859_1"),"KSC5601");
		}
		public static String kscToasc ( String str )  throws Exception {
			if (str == null) return null;
			
			return new String (str.getBytes("KSC5601"),"8859_1");
		}
		
		public static String toHangul (String str) {
			String sValue = "";
			String newStr = null;
			if (str == null || str.equals("") == true) return sValue;
			try {
				newStr = new String( str.getBytes("8859_1"), "KSC5601" );
			}
			catch (Exception e) {
				;
			}
			// ?????? encoding ??? ??????????????? ????????? ????????????.
			if ( newStr != null && str.length() == newStr.length()) {
				return str;
			}
			else {
				return newStr;
			}
		}
		public  static String NVL(String strSrc, String strTgt) throws Exception {
			try {
				if (strSrc == null || "".equals(strSrc)) {
					return strTgt;
				}
			}
			catch (Exception e) {
				;
			}
			return strSrc;
		}
		

		/**
		 * 3???????????? , ??????(String).
		 */
		public static String commaString(String str) {
			String s=str;
			StringBuffer sb=new StringBuffer(s);
			int index=-3;

			for (int i=s.trim().length() ; i>3 ; i-=3) {
				sb.insert(i+index,",");
			}

			return sb.toString();
		}

		/**
		 * 3???????????? , ??????(int).
		 */
		public static String commaInt(int won) {
			DecimalFormat df=new DecimalFormat("###,###");
			return df.format(won);
		}

		/**
		 * 3???????????? , ??????(long).
		 */
		 public static String commaLong(long won) {
			 NumberFormat n=NumberFormat.getInstance();
			 return n.format(won);
		 }

		/**
		 * ????????? ????????? ????????? ????????? ?????????
		 */
		public static long numberParser(String str) throws ParseException {
			long value=0L;
			NumberFormat n=NumberFormat.getInstance();
			Number num=(Number)n.parse(str);
			value=num.longValue();

			return value;
		}

		/**
		 * Null ???????????? ""???, ????????? ????????? trim()??? ??????
		 */
		public static String correct(String str) {
			if(str != null) {
				return str.trim();
			} else {
				return "";
			}
		}

		/**
		 * ?????? ????????? ??????
		 */
		public static String removeChar(String str, char ch) {
			int len = str.length();
			StringBuffer sBuff = new StringBuffer(len);
			for(int i=0; i < len; i++) {
				char c = str.charAt(i);
				if(c != ch) {
					sBuff.append(c);
				}
			}

			return sBuff.toString();
		}

		/**
		 * ????????? ??????
		 */
		public static String removeEnterChar(String str) {
			String result="";
			if (str == null && "".equals(str)) {
				result="";
			} else {
				StringTokenizer st=new StringTokenizer (str,"\r\n",false);
				while (st.hasMoreTokens()) {
					String nt=st.nextToken();
					result=result+nt+"$enter$";
				}
			}
			return result;
		}

		/**
		 *CR LF ??? ?????? ????????? ???????????? ?????? ???
		 */
		public String removeCRLF(String comment){
			StringBuffer buffer = new StringBuffer();
			StringTokenizer st = new StringTokenizer(comment, "\t\n\r\f");
			while (st.hasMoreTokens()) {
				buffer.append(st.nextToken());
			}
			return buffer.toString();
		}

		/**
		 * ?????? ????????? ??????
		 */
		public static int countChar(String str, char ch) {
			int count = 0;

			for(int i = str.length() -1; i >= 0; i--) {
				if(str.charAt(i) == ch) {
					count++;
				}
			}

			return count;
		}

		/**
		 * String?????? Interger??? ????????????.
		 * @param i  String
		 * @return Integer Value
		 */
		public static int S2I(String i)
		{
			int ret;
			if (i == null ) return 0;
		
			try {
				ret = Integer.parseInt(i);
			}
			catch(Exception e){
				return 0;
			}
			return ret;
		}	
		
		/**
		 * String?????? Interger??? ????????????.
		 * @param i  ?????? String
		 * @param def ????????? ????????? ???.
		 * @return Integer Value
		 */
		public static int S2I(String i, int def)
		{
			int ret;
			if (i == null ) return def;

			try {
				ret = Integer.parseInt(i);
			}
			catch(Exception e){
				return def;
			}
			return ret;
		}


		/**
		 * String?????? Long?????? ????????????.
		 * @param i  String
		 * @return Long Value
		 */
		public static long S2L(String i)
		{
			long ret;
			if (i == null ) return 0;
		
			try {
				ret = Long.parseLong(i);
			}
			catch(Exception e){
				return 0;
			}
			return ret;
		}	
		

		/**
		 * ???????????? substring()?????? ????????? ??? ????????? ????????? ?????????????????? ??????????????? ?????? ????????? ????????? ??????.
		 *
		 * @param str ??????????????? ?????? ?????????
		 * @param byteLength ????????? ????????? ??????
		 * @return int-?????? subString()?????? ????????? ????????? ??????
		 */
		public static int getCutLength(String str,int byteLength) {
			int length=str.length();
			int retLength = 0;
			int tempSize = 0;
			int asc;

			for (int i=1 ; i<=length ; i++)	{
				asc=(int)str.charAt(i-1);
				if (asc > 127) {
					if (byteLength > tempSize) {
						tempSize += 2;
						retLength++;
					}
				} else {
					if (byteLength > tempSize) {
						tempSize++;
						retLength++;
					}
				}
			}

			return retLength;
		} 

		/**
		* ??????????????? ???????????? ?????? str ???????????? ????????? keyword ??? ????????? 
		* ????????? ????????? ????????? ??????????????? ????????? ????????? ?????? Method markKeyword.(jdk 1.4??????)
		*
		* @param str ???????????????
		* @param keyword ???????????????
		* @return String ???????????????
		*/
		public static String markKeyword(String str, String keyword) {
			keyword=replace(replace(replace(keyword, "[", "["), ")", ")"),"(", "(");

			Pattern p=Pattern.compile(keyword,Pattern.CASE_INSENSITIVE);
			Matcher m=p.matcher(str);
			int start=0;
			int lastEnd=0;
			StringBuffer sbuf=new StringBuffer();
			while(m.find()) {
				start=m.start();
				sbuf.append(str.substring(lastEnd,start)).append("<font color='red'>"+m.group()+"</font>");
				lastEnd=m.end();
			} 
			return sbuf.append(str.substring(lastEnd)).toString() ;
		}

		/**
		 * ??????????????? ?????? ????????? ?????? ???????????? ???????????? ????????? 
		 *
		 * @param str ?????? ?????????
		 * @param oldString ????????? ?????????
		 * @param newString ????????? ?????????
		 * @return String ?????? ?????????
		 */
		public static String replace(String str,String oldStr,String newStr) {
			if (str == null) {
				return null;
			}
			if (oldStr == null || newStr == null || oldStr.length() == 0) {
				return str;
			}

			int i=str.lastIndexOf(oldStr);
			if (i < 0)
				return str;

			StringBuffer sbuf=new StringBuffer(str);

			while (i >= 0) {
				sbuf.replace(i,(i+oldStr.length()),newStr);
				i=str.lastIndexOf(oldStr,i-1);
			}
			return sbuf.toString();
		}

		/** 
		 * ??????????????? Property????????? ?????? ????????????. Property ????????? 'key=value'???????????? ???????????? ?????? ????????????. 
		 * ???, ??????????????? ????????? ???????????? ????????? ??? ?????? ?????? ?????? ??? Property??? ???????????? '::'??? ????????????.<br> 
		 * Example<br> 
		 * <code> 
		 * String source="key1=value1::key2=value2::key3=value3";<br> 
		 * String key="key2";<br> 
		 * String value=CommonUtil.getParam(source,key,"Default Value");<br> 
		 * </code> 
		 * ?????? ????????? ?????? ?????? "value2" ??????. 
		 * 
		 * @param source ??????????????? ????????? ?????? ????????? 
		 * @param key ????????? ??? ????????? 
		 * @param defaultValue ?????? Key??? ???????????? ?????? ????????? ????????? ????????? 
		 * @return ????????? Property??? Value 
		 */ 
		public static String getParam( String source, String key, String defaultValue ) { 
			if (source == null || key == null) { 
				return defaultValue; 
			} 
			int i=source.indexOf(key+"="); 
			if (i < 0) { 
				return defaultValue; 
			} 
			int j=i+key.length()+1; 
			int k=source.indexOf("::",j); 
			if (k < 0) { 
				k = source.length(); 
			} 
			try { 
				return source.substring(j,k); 
			} catch (Exception _ex) { 
				return defaultValue; 
			} 
		} 

		/** 
		 * ???????????? ?????? ??????????????? ???????????? ??????.<br> 
		 * <code> 
		 * String source="abcdefg";<br> 
		 * String result=CommonUtil.capitalize(source);<br> 
		 * </code> <code>result</code>??? <code>"Abcdefg"</code> ??? ????????? ??????. 
		 * 
		 * @param  s  ?????? ????????? 
		 * @return    ???????????? ??? ????????? 
		 */ 
		public static String capitalize(String s) { 
			return (s != null && !s.equals("")) ? s.substring(0,1).toUpperCase()+s.substring(1).toLowerCase() : s; 
		} 

		/** 
		 * ?????? ??????????????? target ???????????? ?????? ????????????.<br> 
		 * <code> 
		 * String source="Onwer is [I] statues.";<br> 
		 * String result=CommonUtil.replaceWord(source,"[I]","fool");<br> 
		 * </code> <code>result</code>??? <code>"Onwer is fool statues."</code> ??? ????????? 
		 * ??????. 
		 * 
		 * @param s ?????? ????????? 
		 * @param s1 ????????? ????????? 
		 * @param s2 ???????????? ????????? ????????? 
		 * @return ????????? ????????? 
		 */ 
		public static String replaceWord(String s,String s1,String s2 ) { 
			 
			StringBuffer stringbuffer=new StringBuffer(s.length()); 
			int j=0; 
			for (int i=s.indexOf(s1,j) ; i!=-1 ; i=s.indexOf(s1,j)) { 
				stringbuffer.append(s.substring(j,i)); 
				stringbuffer.append(s2); 
				j=i+s1.length(); 
			} 

			if (j < s.length()) { 
				stringbuffer.append(s.substring(j)); 
			} 
			return stringbuffer.toString(); 
		} 

		/** 
		 * ????????? ?????? ????????? ???????????? ????????????. ?????? ??? ???????????? ????????? ?????????????????? ????????????.<br> 
		 * <code> 
		 * String[] source=new String[] {"AAA","BBB","CCC"};<br> 
		 * String result=CommonUtil.join(source,"+");<br> 
		 * </code> <code>result</code>??? <code>"AAA+BBB+CCC"</code>??? ????????? ??????. 
		 * 
		 * @param aobj ???????????? ?????? ?????? 
		 * @param s ??? ??????????????? ?????? ????????? 
		 * @return ????????? ????????? 
		 */ 
		public static String join(Object aobj[],String s) { 
			StringBuffer stringbuffer=new StringBuffer(); 
			int i=aobj.length; 
			if (i > 0) { 
				stringbuffer.append(aobj[0].toString()); 
			} 
			for (int j=1 ; j<i ; j++) { 
				stringbuffer.append(s); 
				stringbuffer.append(aobj[j].toString()); 
			} 

			return stringbuffer.toString(); 
		} 

		/** 
		 * ???????????? ????????? Token Seperator??? Tokenize??????.<br> 
		 * <code> 
		 * String source="Text token\tis A Good\nAnd bad.";<br> 
		 * String[] result=CommonUtil.split(source," \t\n");<br> 
		 * </code> <code>result</code>??? <code>"Text","token","is","A","Good","And","bad."</code> 
		 * ??? ????????? ??????. 
		 * 
		 * @param s ?????? ????????? 
		 * @param s1 Token Seperators 
		 * @return ???????????? ?????? 
		 */ 
		public static String[] split(String s,String s1) { 
			StringTokenizer stringtokenizer=new StringTokenizer(s,s1); 
			int i=stringtokenizer.countTokens(); 
			String as[]=new String[i]; 
			for (int j=0 ; j<i ; j++) { 
				as[j]=stringtokenizer.nextToken(); 
			} 

			return as; 
		} 

		/** 
		 * ????????? Vector??? ?????????.<br> 
		 * 
		 * 
		 * @param array ?????? ?????? 
		 * @return ????????? ?????? ????????? ????????? Vector 
		 */ 
		public static Vector toVector(Object[] array) { 
			if (array == null) { 
				return null; 
			} 

			Vector vec=new Vector(array.length); 

			for (int i=0 ; i<array.length ; i++) { 
				vec.add(i,array[i]); 
			} 
			return vec; 
		} 

		/** 
		 * ???????????? ????????? ????????????. 
		 */ 
		public static String[] sortStringArray(String[] source) { 
			java.util.Arrays.sort(source); 
			return source;
		} 

		/** 
		 * ?????? ????????? ????????????. 
		 */ 
		public static int[] sortIntArray(int[] source) {
			 int temp;

			 for (int i=0 ; i<source.length ; i++) {
				 for (int j=i+1 ; j<source.length ; j++) {
					 if (source[i] > source[j]) { // >:asc,<:desc
						temp=source[i];
						source[i]=source[j];
						source[j]=temp;
					 }
				 }
			 }

			 return source;
		}

		/** 
		 * ???????????? Enemration??? ????????? ????????? ????????????. 
		 */ 
		public static String[] sortStringArray(Enumeration source) { 
			Vector buf=new Vector(); 
			while(source.hasMoreElements()) { 
				buf.add(source.nextElement()); 
			} 
			String[] buf2=new String[buf.size()]; 

			for(int i=0 ; i<buf.size(); i++) { 
				Object obj=buf.get(i); 
				if (obj instanceof String) { 
					buf2[i]=(String)obj; 
				} else { 
					throw new IllegalArgumentException("Not String Array"); 
				} 
			} 
			java.util.Arrays.sort(buf2); 
			return buf2; 
		} 

		/** 
		 * Oracle??? ???????????? ?????????????????? 1?????? ?????? ???????????? 2?????? ??????????????????. <br> 
		 * 
		 * @param s ?????? ????????? 
		 * @return ????????? ????????? 
		 */ 
		public static String escape(String s) { 
			String retvalue=s; 
			if (s.indexOf("'") != -1) { 
				StringBuffer hold=new StringBuffer(); 
				char c; 
				for (int i=0 ; i<s.length() ; i++) { 
					if ((c=s.charAt(i)) == '\'') 
						hold.append ("''"); 
					else 
						hold.append(c); 
				} 
				retvalue=hold.toString(); 
			} 
			return retvalue; 
		} 

		/** 
		 * ???????????? ???????????? ????????? ????????? ????????? ???????????? ???????????? ?????????. 
		 * ??????????????? reply??? ?????? ?????? ????????? ?????? ????????????. 
		 *
		 * @param msg ????????? ????????? 
		 * @param str ?????? ?????????
		 * @return ????????? ????????? 
		 */ 
		public static String reContent(String msg,String str) { 
			msg=specialChar(msg); 
			StringBuffer sb=new StringBuffer(); 
			sb.append(str); 
			for(int i=0 ; i<msg.length() ; i++) { 
				if(msg.charAt(i) == '\n') { 
					sb.append(msg.charAt(i)); 
					sb.append(str); 
				} else { 
					sb.append(msg.charAt(i)); 
				} 
			} 
			return sb.toString(); 
		} 
		/** 
	     * ???????????? ???????????? &, ", \, <, > ?????? ????????? &amp;, &quot;, &#039, &lt; , &gt;??? ????????????. 
	     *
		 * @param msg ????????? ????????? 
	     * @return ????????? ????????? 
	     */ 
		public static String specialChar(String msg) { 
			StringBuffer sb = new StringBuffer(); 
			for(int i=0 ; i<msg.length() ; i++) { 
				if(msg.charAt(i) == '&') { 
					sb.append("&amp;"); 
				} else if(msg.charAt(i) == '"') { 
					sb.append("&quot;"); 
				} else if(msg.charAt(i) == '\'') { 
					sb.append("&#039;"); 
				} else if(msg.charAt(i) == '<') { 
					sb.append("&lt;"); 
				} else if(msg.charAt(i) == '>') { 
					sb.append("&gt;"); 
				} else { 
					sb.append(msg.charAt(i)); 
				}
			} 
			return sb.toString(); 
		}

		/** 
		 * ????????? ?????? ????????? ??????.<br> 
		 * \n ??? <br>, \t ??? &nbsp;&nbsp;&nbsp; ??? ' ' ??? &nbsp;??? ?????? ????????????. 
		 *
		 * @param msg ????????? ????????? 
		 * @return ????????? ????????? 
		 */ 
		public static String whiteSpace(String msg) { 
			StringBuffer sb = new StringBuffer(); 
			for(int i=0 ; i<msg.length() ; i++) { 
				if(msg.charAt(i) == '\n') { 
					sb.append("<br>"); 
				} else if(msg.charAt(i) == '\t') { 
					sb.append("&nbsp;&nbsp;&nbsp;"); 
				} else if(msg.charAt(i) == ' ') { 
//					sb.append("&nbsp;"); 
					sb.append(" "); 
				} else {
					sb.append(msg.charAt(i)); 
				} 
			}
			return sb.toString(); 
		} 

		//Change Month
		public static String changeMonth(int month)
		{
			String mon = "00";
			if(month == 1) mon = "01";
			else if(month == 2) mon = "02";
			else if(month == 3) mon = "03";
			else if(month == 4) mon = "04";
			else if(month == 5) mon = "05";
			else if(month == 6) mon = "06";
			else if(month == 7) mon = "07";
			else if(month == 8) mon = "08";
			else if(month == 9) mon = "09";
			else if(month == 10) mon = "10";
			else if(month == 11) mon = "11";
			else if(month == 12) mon = "12";

			return mon;
		}

		// ?????? ????????? ????????????
		public static String getFileExt(String fileName) {

			String tempFile="";
			String iconImage="default";
			String[] iconName={"hwp","ai","avi","bmp","cs","dll","doc","exe","fla","gif","htm","html","jpg","js","mdb","mp3","df","ppt","rdp","swf","swt","txt","vsd","xls","xml","zip","pdf"};
			boolean iconTemp=false;
			
			if (fileName == null || "".equals(fileName)) {
			} else {
				tempFile=fileName.trim();

				int start=tempFile.lastIndexOf(".");
				int end=tempFile.length();
				iconImage=tempFile.substring(start+1,end).toLowerCase();

				for(int j=0 ; j<iconName.length;j++){
					if(iconImage.equals(iconName[j])){
						iconTemp=true;
						break;
					}
				}
			}

			if(!iconTemp){
				iconImage = "default";
			}

			return iconImage;

		}

		public static String P2M(String yyyymmdd) {
			LunarCalendar lc = new LunarCalendar();
			return lc.toLunar(yyyymmdd);
		}
		
		public static String M2P(String yyyymmdd) {
			LunarCalendar lc = new LunarCalendar();
			return lc.fromLunar(yyyymmdd);
		}

		public static void main(String[] args) {
			System.out.println(P2M("19730308"));
			System.out.println(M2P("19730308"));
			
		}
		
		public  static String NVLREC(String strSrc, String strTgt) throws Exception {
			try {
				if (strSrc == null || "".equals(strSrc)) {
					return strTgt;
				}else{
					return "= '"+strSrc+"'";
				}
			}
			catch (Exception e) {
				;
			}
			return strSrc;
		}
		
		public static String maptoString(Map map , String targetName){
			try{
				return map.get(targetName).toString();
			}catch(Exception e){
				return "";
			}
		}

	  /**
	   * ???????????? byte ?????? ??????(????????? 2byte??????)
	   *
	   * @param       strText(????????????)
	   * @return      strLength(byte length)
	   * @exception   Exception
	   */
		public static int byteLength(String strText) throws Exception {           
		  int subject_len = strText.length();
		  int strLength = 0;
		  char tempChar[] = new char[subject_len];
		  for (int i=0; i<subject_len; i++) {
		    tempChar[i]= strText .charAt(i) ;
		    if (tempChar[i] < 128) {
		      strLength++;
		    }
		    else {
		      strLength += 2;
		    }
		  }
		  return strLength;
		}
		
		public static double ObjToDouble(Object o , double d){
			try{
				return Double.parseDouble(o.toString());
			}catch(Exception e){
				return d;
			}
		}
		
		public static String ObjToString(Object o , String d){
			try{
				return o.toString();
			}catch(Exception e){
				return d;
			}
		}
	
	
	
	
	public static String recoverContents(Object contents){
		String s= StringNull(contents);
		try{
			s = s.replaceAll("&gt;",">").replaceAll("&lt;","<").replaceAll("&quot;","'");
		}catch (Exception e) {
		//	e.printStackTrace();
			s = "";
		}
		return s;
	}
	
	public static String convertString(Object conObject){
		String s= StringNull(conObject);
		try{
			s = s.replaceAll(">" ,"&gt;")
				 .replaceAll("<" ,"&lt;")
				 .replaceAll("'" ,"&#39;")
				 .replaceAll("\"" ,"&quot;");
		}catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}
	
	public static String base64Encode(byte[] encodeBytes) {
		BASE64Encoder base64Encoder = new BASE64Encoder();
		ByteArrayInputStream bin = new ByteArrayInputStream(encodeBytes);
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		byte[] buf = null;

		try {
			base64Encoder.encodeBuffer(bin, bout);

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			buf = bout.toByteArray();
			try {
				bout.close();
				bin.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return new String(buf).trim();
	}

	public static byte[] base64Decode(String strDecode) {
		strDecode = StringNull(strDecode);
		BASE64Decoder base64Decoder = new BASE64Decoder();
		ByteArrayInputStream bin = new ByteArrayInputStream(
				strDecode.getBytes());
		ByteArrayOutputStream bout = new ByteArrayOutputStream();
		byte[] buf = null;

		try {
			base64Decoder.decodeBuffer(bin, bout);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			buf = bout.toByteArray();
			try {
				bout.close();
				bin.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}

		return buf;
	}
	
	public static Map<String,Object> reqWord(Map<String,Object> rtnData,
			                                String msg){
		rtnData.put("success", false);
		rtnData.put("msg", msg+"??? ???????????????.");
		
		return rtnData;
	}
	
	public static Map<String,Object> rtnError(Map<String,Object> rtnData){
		rtnData.put("success", false);		
		rtnData.put("msg", Const.ERR_MSG);
		rtnData.put("data", "");
		return rtnData;
	}
	
	
	public static Map<String,Object> rtnError(Map<String,Object> rtnData, String Msg){
		rtnData.put("success", false);		
		rtnData.put("msg",Msg);
		rtnData.put("data", "");
		return rtnData;
	}
	
	
	
	public static Map<String,Object> rtnSuc(Map<String,Object> rtnData,
											Map<String,Object> storeInfo){
		rtnData.put("msg", Const.SUC_MSG);
		rtnData.put("success", true);
		rtnData.put("data", storeInfo);
		return rtnData;
	}
	
	public static Map<String,Object> rtnSuc(Map<String,Object> rtnData,
											Map<String,Object> storeInfo,
											String msg){
			rtnData.put("msg", msg);
			rtnData.put("success", true);
			rtnData.put("data", storeInfo);
			return rtnData;
	}
	
	
	public static Map<String,Object> rtnSucMsg(Map<String,Object> rtnData,											
											   String msg){
		rtnData.put("msg",  msg);
		rtnData.put("success", true);
		rtnData.put("data", null);
		return rtnData;
	}
			
	public static boolean fileIsExit(MultipartFile FILE_NAME){
		
		try{
			if(FILE_NAME.getOriginalFilename() != null && !"".equals(FILE_NAME.getOriginalFilename() )){
				return true;
			}
			return false;
		}catch (Exception e) {
			return false;
		}
	}
	
	public static String getJosnParam(String s) {
		try {
			
			if(s.indexOf("[,") == 0) {
				s = s.replace("[,", "");
				
				s = s.substring(0 , s.lastIndexOf(']'));
				
			}
			return s;
		}catch (Exception e) {
			return s;
		}
	}
	
	
		
	/*public static List<Map<String, Object>> jsonToArray(String json){
		List<Map<String, Object>> list = new ArrayList<Map<String, Object>>();
		JSONParser parser = new JSONParser();
	    JSONArray arr = (JSONArray) parser.parse(json);
	    
	    for (Object jsonObject : arr) {
	        System.out.println("jsonObject>>"+jsonObject);
	        list.add((Map<String, Object>)jsonObject);
	    }
	    return list;
	}*/
	
	public static JSONObject getJsonStringFromMap( Map<String, Object> map ){
	      JSONObject jsonObject = new JSONObject();
	      for( Map.Entry<String, Object> entry : map.entrySet() ) {
	          String key = entry.getKey();
	          Object value = entry.getValue();
	          jsonObject.put(key, value);
	      }
	      
	      return jsonObject;
	 }
	
}
