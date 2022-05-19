package kr.co.o2i.util;


import java.util.Calendar;

/**
 * 날짜 처리와 관련된 메쏘드를 가진다.
 *
 */
public class DateTimeUtil {
	private DateTimeUtil() {
	}

	/**
	 * @return dayOfWeek을 리턴합니다.
	 */
	public static int getDayOfWeek() {
		return getDayOfWeek(Calendar.getInstance());
	}


	/**
	 * @return dayOfWeek을 리턴합니다.
	 */
	public static int getDayOfWeek(Calendar cal) {
		return cal.get(Calendar.DAY_OF_WEEK);
	}


	/**
	 * @return day을 리턴합니다.
	 */
	public static int getDay() {
		return getDay(Calendar.getInstance());
	}


	/**
	 * @return day을 리턴합니다.
	 */
	public static int getDay(Calendar cal) {
		return cal.get(Calendar.DATE);
	}

	/**
	 * @return month을 리턴합니다.
	 */
	public static int getMonth() {
		return getMonth(Calendar.getInstance());
	}

	/**
	 * @return month을 리턴합니다.
	 */
	public static int getMonth(Calendar cal) {
		return cal.get(Calendar.MONTH) + 1;
	}

	/**
	 * @return year을 리턴합니다.
	 */
	public static int getYear() {
		return getYear(Calendar.getInstance());
	}

	/**
	 * @return year을 리턴합니다.
	 */
	public static int getYear(Calendar cal) {
		return cal.get(Calendar.YEAR);
	}

	/**
	 * @return lastDayOfMonth을 리턴합니다.
	 */
	public static int getLastDayOfMonth() {
		return getLastDayOfMonth(Calendar.getInstance());
	}

	/**
	 * @return lastDayOfMonth을 리턴합니다.
	 */
	public static int getLastDayOfMonth(Calendar cal) {
		return cal.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	private static java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat();

	/**
	 * @return 현재 시스템 일자를 "yyyy/MM/dd" 형식으로 바꾼 문자열.
	 */
	public static String getDate() {
		return getDate("yyyy/MM/dd");
	}

	/**
	 * 현재 시스템 일자를 주어진 형식으로 바꾼 문자열을 돌려 준다.
	 *
	 * @param pattern 문자열로 바꿀 형식. 예) "yyyy/MM/dd HH:mm:ss"
	 * @return 현재 시스템 일자를 주어진 형식으로 바꾼 문자열.
	 */
	public static String getDate(String pattern) {
		return getDate(pattern, new java.util.Date());
	}


	/**
	 * 현재 시스템 일자를 주어진 형식으로 바꾼 문자열을 돌려 준다.
	 *
	 * @param pattern 문자열로 바꿀 형식. 예) "yyyy/MM/dd HH:mm:ss"
	 * @param date    java.util.Date 객체.
	 * @return 현재 시스템 일자를 주어진 형식으로 바꾼 문자열.
	 */
	public static String getDate(String pattern, java.util.Date date) {
		String dateStr = null;

		synchronized (sdf) {
			sdf.applyPattern(pattern);

			dateStr = sdf.format(date);
		}

		return dateStr;
	}
	
    /**	 
     * 월기준 날짜계산 함수 (기준일 / 월수 (1, -1), 전월/다음월)
     * @param kijun_date
     * @param Interval
     * @return
     */
	public static int GetIntervalMonth(int kijun_date, int Interval)
	{
		int iYear	 	= kijun_date / 10000;
		int iMonth		= (kijun_date / 100) % 100;
		int retYear	= 0;
		int retMonth	= 0;

		// 현재는 전월/다음월만 가능
		if (Interval != 1 &&  Interval != -1) {
			return -1;
		}

		if (iMonth + Interval > 12) {
			retYear		= iYear + 1;
			retMonth 	= 1;
		}
		else if (iMonth + Interval < 1) {
			retYear		= iYear - 1;
			retMonth 	= 12;
		}
		else {
			retYear		= iYear;
			retMonth 	= iMonth + Interval;
		}

		String retStrMonth = "";
		if (retMonth < 10)
			retStrMonth = "0" + retMonth;
		else
			retStrMonth = "" + retMonth;

		String retYearMonth = retYear + retStrMonth;

		return Integer.parseInt(retYearMonth);
	}

	/**
	 * Method Name  : nextDay
	 * Description  : 몇일후의 날짜를 구한다. -값을 주면 전일을 구한다
	 * @Parameter   : String date,int dayCnt,String format("yyyyMMdd"), String outFormat
	 * @Return      : String date
	 * @ 2002.05.22 Soyoung Park
	 *
	 */
	public static String nextDay(String date,int dayCnt,String format, String outFormat)
	{
		java.text.SimpleDateFormat formatter =  new java.text.SimpleDateFormat (format, java.util.Locale.KOREA);
		java.text.SimpleDateFormat outFormatter =  new java.text.SimpleDateFormat (outFormat, java.util.Locale.KOREA);

		java.util.Date d1 = null;
		long dayCount = dayCnt;
		try {
			d1 = formatter.parse(date);
		} catch(java.text.ParseException e) {
			return date;
		}
		if ( !formatter.format(d1).equals(date) ) return date;


		long duration = d1.getTime();
		if ( duration < 0 ) return "";

		d1.setTime(duration + (1000L * 60L * 60L * 24L * dayCount));

		return outFormatter.format(d1);
	}
	
	
}