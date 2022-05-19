package kr.co.o2i.dao.rec;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface REC002W_10DAO {

	
	/* # 전각코드 조회 # */
	public  List<Map<String,Object>> SELECT_Jungak(@Param("param")CommonMap param);
	
	/* # 등급 조회 # */
	public  List<Map<String,Object>> SELECT_Grade(@Param("param")CommonMap param);
	
	/* # 금액관리 조회  # */
	public  List<Map<String,Object>> SELECT_REC_DEUNG_PRICE_MGT(@Param("param")CommonMap param);
	
	/* 등번호관리 ( 행 열관리 )  */
	public  List<Map<String,Object>> SELECT_Deng_NEW(@Param("param")CommonMap param);
	
	
	/* # 등번호 신도정보 #  */
	public  List<Map<String,Object>> SELECT_SindoInfo(@Param("param")CommonMap param);
	
	
	/* 등번호관리 ( 행 열관리 )  */
	public  List<Map<String,Object>> SELECT_Building(@Param("param")CommonMap param);
	
	
	
	
}
