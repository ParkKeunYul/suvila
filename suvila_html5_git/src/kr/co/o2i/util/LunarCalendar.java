package kr.co.o2i.util;

import com.ibm.icu.util.Calendar ; 
import com.ibm.icu.util.ChineseCalendar ;

public class LunarCalendar {
	private Calendar cal ; 
	   private ChineseCalendar cc ; 


	   public LunarCalendar() { 
	      // default TimeZone, Locale 을 사용.. 
	      cal = Calendar.getInstance() ; 
	      cc = new ChineseCalendar(); 
	   } 

	   public static String[] lunarYearLabel = {
		   //갑, 을, 병, 정, 무, 기, 경, 신, 임, 계
		   //자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해
		   "갑자", "을축", "병인", "정묘", "무진", "기사", "경오", "신미", "임신", "계유",
		   "갑술", "을해", "병자", "정축", "무인", "기묘", "경진", "신사", "임오", "계미",
		   "갑신", "을유", "병술", "정해", "무자", "기축", "경인", "신묘", "임진", "계사",
		   "갑오", "을미", "병신", "정유", "무술", "기해", "경자", "신축", "임인", "계묘",
		   "갑진", "을사", "병오", "정미", "무신", "기유", "경술", "신해", "임자", "계축",
		   "갑인", "을묘", "병진", "정사", "무오", "기미", "경신", "신유", "임술", "계해" 
	   };

	   /** 
	   *   음력(yyyyMMdd) -> 양력(yyyyMMdd) 
	   * 
	   */ 
	   public synchronized String toLunar( String yyyymmdd ) { 
	      if(    yyyymmdd == null ) 
	         return "" ; 

	      String date = yyyymmdd.trim() ; 
	      if( date.length() != 8 ) { 
	         if( date.length() == 4 ) 
	            date = date + "0101" ; 
	         else if( date.length() == 6 ) 
	            date = date + "01" ; 
	         else if( date.length() > 8 ) 
	            date = date.substring(0,8) ; 
	         else 
	            return "" ; 
	      } 

	      cal.set( Calendar.YEAR, Integer.parseInt(date.substring(0,4)) ) ; 
	      cal.set( Calendar.MONTH, Integer.parseInt(date.substring(4,6))-1 ) ; 
	      cal.set( Calendar.DAY_OF_MONTH, Integer.parseInt(date.substring(6)) ) ; 

	      cc.setTimeInMillis( cal.getTimeInMillis() ) ; 

	      // ChinessCalendar.YEAR 는 1~60 까지의 값만 가지고 , ChinessCalendar.EXTENDED_YEAR 는 Calendar.YEAR 값과 2637 만큼의 차이를 가집니다. 
	      int y = cc.get(ChineseCalendar.EXTENDED_YEAR)-2637 ; 
	      int m = cc.get(ChineseCalendar.MONTH)+1 ; 
	      int d = cc.get(ChineseCalendar.DAY_OF_MONTH) ;

	      StringBuffer ret = new StringBuffer() ; 
	      if( y < 1000 ) 
	         ret.append( "0" ) ; 
	      else if( y < 100 ) 
	         ret.append( "00" ) ; 
	      else if( y < 10 ) 
	         ret.append( "000" ) ; 
	      ret.append( y ) ; 

	      if( m < 10 ) 
	         ret.append( "0" ) ; 
	      ret.append( m ) ; 

	      if( d < 10 ) 
	         ret.append( "0" ) ; 
	      ret.append( d ) ;
	      ret.append( (cc.get(ChineseCalendar.IS_LEAP_MONTH) == 1) ? "T" : "F" ) ;
	      ret.append( lunarYearLabel[cc.get(Calendar.YEAR)-1] ) ;
	      ret.append(CommonUtil.emptyTozero(cc.get(Calendar.YEAR),2)  ) ;

	      return ret.toString() ; 
	   } 


	   /** 
	   *   양력(yyyyMMdd) -> 음력(yyyyMMdd) 
	   * 
	   */ 
	   public synchronized String fromLunar( String yyyymmdd ) { 
	      if(    yyyymmdd == null ) 
	         return "" ; 

	      String date = yyyymmdd.trim() ; 
	      if( date.length() != 8 ) { 
	         if( date.length() == 4 ) 
	            date = date + "0101" ; 
	         else if( date.length() == 6 ) 
	            date = date + "01" ; 
	         else if( date.length() > 8 ) 
	            date = date.substring(0,8) ; 
	         else 
	            return "" ; 
	      } 

	      cc.set( ChineseCalendar.EXTENDED_YEAR, Integer.parseInt(date.substring(0,4))+2637 ) ; 
	      cc.set( ChineseCalendar.MONTH, Integer.parseInt(date.substring(4,6))-1 ) ; 
	      cc.set( ChineseCalendar.DAY_OF_MONTH, Integer.parseInt(date.substring(6)) ) ; 

	      cal.setTimeInMillis( cc.getTimeInMillis() ) ; 

	      int y = cal.get(Calendar.YEAR) ; 
	      int m = cal.get(Calendar.MONTH)+1 ; 
	      int d = cal.get(Calendar.DAY_OF_MONTH) ; 

	      StringBuffer ret = new StringBuffer() ; 
	      if( y < 1000 ) 
	         ret.append( "0" ) ; 
	      else if( y < 100 ) 
	         ret.append( "00" ) ; 
	      else if( y < 10 ) 
	         ret.append( "000" ) ; 
	      ret.append( y ) ; 

	      if( m < 10 ) 
	         ret.append( "0" ) ; 
	      ret.append( m ) ; 

	      if( d < 10 ) 
	         ret.append( "0" ) ; 
	      ret.append( d ) ; 
	      ret.append( (cc.get(ChineseCalendar.IS_LEAP_MONTH) == 1) ? "T" : "F" ) ;
	      ret.append( lunarYearLabel[cc.get(Calendar.YEAR)-1] ) ;
	      ret.append( CommonUtil.emptyTozero(cc.get(Calendar.YEAR),2) ) ;

	      return ret.toString() ; 
	   } 
}
