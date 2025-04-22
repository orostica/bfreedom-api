import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 
  const config = new DocumentBuilder()
    .setTitle('BFreedom API')
    .setDescription('The BFreedom API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    const ducument = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, ducument);

    await app.listen(3000);
}
bootstrap();
