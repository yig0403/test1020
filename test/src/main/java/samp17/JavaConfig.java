package samp17;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
// xml파일을 java로 변경
@Configuration
public class JavaConfig {
	@Bean
	public MemberDao memberDao() {
		return new MemberDaoImpl();		
	}
	@Bean
	public MemberService memberService() {
		return new MemberServiceImpl();		
	}
}