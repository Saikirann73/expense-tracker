import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [
    {
      provide: "Application_Config",
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        try {
          return {
            reportsCronInterval: configService.get<string>("REPORTS_CRON"),
            mongoDbConnectionString: configService.get<string>("MONGO_CONNECTION_STRING")
          };
        } catch (e) {
          throw e;
        }
      },
    },
  ],
  exports: ["Application_Config"],
})
export class ConfigurationModule { }
