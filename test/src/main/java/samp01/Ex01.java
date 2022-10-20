package samp01;
//  Ex01은 MessageBeanKr객체로 만들어서 사용한다
//     "        "      을 의존한다
//  좋은 시스템이란 : 결합도 낮고 응집도가 높은 시스템 => upgrade용이
public class Ex01 {
	public static void main(String[] args) {
//		MessageBeanKr mbk = new MessageBeanKr();
		MessageBeanEn mbe = new MessageBeanEn();
//		mbk.sayHello("바이든");
		mbe.sayHello("바이든");
	}
}