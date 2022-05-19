package kr.co.o2i.dao.com;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import kr.co.o2i.util.CommonMap;

public interface CodeSearchDAO {

	/*	공통코드조회 */
	public  List<Map<String,Object>> CODESEARCH(@Param("param")CommonMap param);
	
	/*	공통코드조회 - AL */
	public  List<Map<String,Object>> CODESEARCHALL(@Param("param")CommonMap param);
	
	/*	공통코드조회 - 선택 */
	public  List<Map<String,Object>> CODESEARCHSELECT(@Param("param")CommonMap param);
	
	/*	공통코드 단일건조회 */
	public  List<Map<String,Object>> CODE_SELECT_ONE(@Param("param")CommonMap param);
	
	/*	공통코드조회(본) - 선택 */
	public  List<Map<String,Object>> CODESEARCHBONSELECT(@Param("param")CommonMap param);
	
	/*	사찰코드조회 */
	public  List<Map<String,Object>> TEMPLESEARCH(@Param("param")CommonMap param);
	
	/*	사찰코드조회 - ALL */
	public  List<Map<String,Object>> TEMPLESEARCHALL(@Param("param")CommonMap param);
	
	/*	사찰코드조회 - 선택 */
	public  List<Map<String,Object>> TEMPLESEARCHSELECT(@Param("param")CommonMap param);
	
	/*	접수항목조회 - 선택 */
	public  List<Map<String,Object>> RECSEARCHSELECT(@Param("param")CommonMap param);
	
	/*	전각코드조회 */
	public  List<Map<String,Object>> JUNGAKCODESEARCH(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> ACCTGBN(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_KWAN(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_HANG(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_MOK(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_MOK_NAME(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_TEMPLEUSER(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_CLASS_MGT(@Param("param")CommonMap param);
	
	public  List<Map<String,Object>> SELECT_MONK(@Param("param")CommonMap param);
	
	
	
}
