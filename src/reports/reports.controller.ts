// reports/reports.controller.ts
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(AuthGuard('jwt')) // Protect all endpoints of the controller
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('deleted-products')
  async getDeletedProductsPercentage() {
    return {
      percentage: await this.reportsService.getDeletedProductsPercentage(),
    };
  }

  @Get('non-deleted-products')
  async getNonDeletedProductsPercentage(
    @Query('hasPrice') hasPrice?: boolean,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    return {
      percentage: await this.reportsService.getNonDeletedProductsPercentage(
        hasPrice,
        startDate ? new Date(startDate) : undefined,
        endDate ? new Date(endDate) : undefined,
      ),
    };
  }

  @Get('top-5-expensive')
  async getTop5MostExpensiveProducts() {
    return {
      products: await this.reportsService.getTop5MostExpensiveProducts(),
    };
  }
}
