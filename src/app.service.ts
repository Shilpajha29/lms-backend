import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { successResponse } from './common/http/response.util.js';

@Injectable()
export class AppService implements OnModuleInit{
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly dataSource: DataSource){}

  async onModuleInit(){
    try{
      await this.dataSource.query('SELECT 1');
      this.logger.log('Database Connected')
    }catch(error){
      this.logger.error('Database Connection check failed', error);
    }
  }

  getRootPayload(){
    return successResponse('LMS Platform Api',{
      version:'1.0.0',
      status: 'running',
      timestamp: new Date().toISOString(),
    })
  }
  getHealthPayload() {
    return successResponse('Server is healthy',{
      status: 'ok',
      uptime: process.uptime,
      timestamp: new Date().toISOString(),
    })
  }
}
