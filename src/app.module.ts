import { Module } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { UserModule } from '@src/user/user.module';
import { EmailModule } from '@src/email/email.module';
import { AuthModule } from '@src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { MongooseModule } from '@nestjs/mongoose';
import { cacheConfig } from '@src/config/cache.config';
import { dbConfig } from '@src/config/db.config';
import { DiaryModule } from './diary/diary.module';
import { FriendModule } from './friend/friend.module';
import { MyHomeModule } from './my-home/my-home.module';
import { RoomModule } from './room/room.module';
import { PushModule } from './push/push.module';
import { FileManagerModule } from './file-manager/file-manager.module';

@Module({
	imports: [
		/********* CONFIG SETTING *********/
		ConfigModule.forRoot({
			cache: true,
			isGlobal: true,
			envFilePath: `.env.${process.env.NODE_ENV}`
		}),
		/********* CACHE SETTING *********/
		CacheModule.registerAsync(cacheConfig),
		/******* DATABASE SETTING ********/
		MongooseModule.forRootAsync(dbConfig),
		/********* CUSTOM MODULES *********/
		UserModule,
		EmailModule,
		AuthModule,
		DiaryModule,
		FriendModule,
		MyHomeModule,
		RoomModule,
		PushModule,
		FileManagerModule
	],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
