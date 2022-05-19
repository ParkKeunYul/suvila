package kr.co.o2i.util;

import kr.co.o2i.common.Const;


public class URI_Convert {
	
	public static String Converting(String uri){
		String tiles = uri.replaceAll(".do", ""); 
		if(uri.indexOf("/admin") == 0){
			tiles += Const.aTiles;
		}
		else{
			tiles += Const.uTiles;
		}
		
		return tiles;
	}
	
	
	public static String ConvertingTest(String uri){
		String tiles = uri.replaceAll(".do", ""); 
		return tiles;
	}
}
