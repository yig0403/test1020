package samp17;

import java.util.Date;
import java.util.Scanner;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.AbstractApplicationContext;

public class Ex01 {
	private static MemberService ms;
	private static Scanner sc;
	public static void main(String[] args) {
		sc = new Scanner(System.in);
		AbstractApplicationContext ac =
				new AnnotationConfigApplicationContext(JavaConfig.class);
		ms = ac.getBean(MemberService.class);
		while(true) {
			help();
			System.out.println("명령어를 선택하세요");
			String command = sc.nextLine();
			if (command.equals("6")) break;
			else if (command.equals("1")) insert();
			else if (command.equals("2")) update();
			else if (command.equals("3")) delete();
			else if (command.equals("4")) select();
			else if (command.equals("5")) list();
		}
		System.out.println("프로그램 종료");
		sc.close();	ac.close();
	}
	private static void list() {
		ms.list();		
	}
	private static void select() {
		System.out.println("조회할 아이디를 입력하세요");
		String id = sc.nextLine();	
		ms.select(id);
	}
	private static void delete() {
		System.out.println("삭제할 아이디를 입력하세요");
		String id = sc.nextLine();
		int result = ms.delete(id);
		if (result > 0) System.out.println("삭제성공 ㅋㅋ");
	}
	private static void update() {
		System.out.println("수정할 아이디를 입력하세요");
		String id = sc.nextLine();
		System.out.println("암호를 입력하세요");
		String pass = sc.nextLine();
		System.out.println("암호 확인을 입력하세요");
		String passConfirm = sc.nextLine();
		if (!pass.equals(passConfirm)) {
			System.out.println("암호와 암호확인이 다릅니다");
			return;
		}
		System.out.println("이름을 입력하세요");
		String name = sc.nextLine();
		System.out.println("이메일을 입력하세요");
		String email = sc.nextLine();
		Member member = new Member(id, pass, name, email, new Date());
		int result = ms.update(member);
		if (result > 0) System.out.println("수정 성공 ㅋㅋ");
	}
	private static void insert() {
		System.out.println("아이디를 입력하세요");
		String id = sc.nextLine();
		System.out.println("암호를 입력하세요");
		String pass = sc.nextLine();
		System.out.println("암호 확인을 입력하세요");
		String passConfirm = sc.nextLine();
		if (!pass.equals(passConfirm)) {
			System.out.println("암호와 암호확인이 다릅니다");
			return;
		}
		System.out.println("이름을 입력하세요");
		String name = sc.nextLine();
		System.out.println("이메일을 입력하세요");
		String email = sc.nextLine();
		Member member = new Member(id, pass, name, email, new Date());
		int result = ms.insert(member);
		if (result > 0) System.out.println("입력 성공 ㅋㅋ");
	}
	private static void help() {
		System.out.println();
		System.out.println("1. 입력");
		System.out.println("2. 수정");
		System.out.println("3. 삭제");
		System.out.println("4. 조회");
		System.out.println("5. 목록");
		System.out.println("6. 종료");
		
	}
}
