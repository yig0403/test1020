package com.ch.please.service;

import java.util.List;

import com.ch.please.model.Car;

public interface CarService {

	int getTotal(Car car);

	List<Car> list(Car car);

}
