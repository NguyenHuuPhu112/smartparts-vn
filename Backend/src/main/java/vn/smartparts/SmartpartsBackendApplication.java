package vn.smartparts;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SmartpartsBackendApplication {

    public static void main(String[] args) {
        SpringApplication app = new SpringApplication(SmartpartsBackendApplication.class);
        app.addInitializers(new vn.smartparts.config.DotenvApplicationInitializer());
        app.run(args);
    }
}
