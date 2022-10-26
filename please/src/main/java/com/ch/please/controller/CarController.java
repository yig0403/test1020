package com.ch.please.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ch.please.model.Car;
import com.ch.please.service.CarService;
import com.ch.please.service.PagingBean;

@Controller
public class CarController {
	@Autowired
	private CarService cs;
	
	@RequestMapping("/car/carList")
	    public String initList() {
		return "/car/carList";
	}
	
	@RequestMapping("carList")
	public String list(Car car, String pageNum,Model model) {
		int rowPerPage = 20; // 한 화면에 보여주는 갯수
		if (pageNum == null || pageNum.equals("")) pageNum = "1";
		int currentPage = Integer.parseInt(pageNum);
		int total = cs.getTotal(car);		
		int startRow = (currentPage - 1) * rowPerPage + 1;
		int endRow = startRow + rowPerPage - 1;
		int num = total - startRow + 1;
		car.setStartRow(startRow);
		car.setEndRow(endRow);
		List<Car> list = cs.list(car);
		PagingBean pb = new PagingBean(currentPage, rowPerPage, total);
		

//		매개변수로 넘어온 데이터 데이터를 다시 같은 jsp로 전달할 때는 model.addAttribute생략 가능
		model.addAttribute("car", car);
		model.addAttribute("num", num);
		model.addAttribute("list", list);
		model.addAttribute("pb", pb);
		return "/car/carList";
	}
}
