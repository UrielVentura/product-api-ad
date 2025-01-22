import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ReportsService } from './reports.service';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Top5ExpensiveProductsResponseDto } from 'src/products/top-5-expensive.dto';

@ApiTags('Reports')
@Controller('reports')
@UseGuards(AuthGuard('jwt')) // Protect all endpoints of the controller
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('deleted-products')
  @ApiOperation({ summary: 'Get percentage of deleted products' })
  @ApiResponse({ status: 200, description: 'Percentage of deleted products' })
  async getDeletedProductsPercentage() {
    return {
      percentage: await this.reportsService.getDeletedProductsPercentage(),
    };
  }

  @Get('non-deleted-products')
  @ApiOperation({ summary: 'Get percentage of non-deleted products' })
  @ApiQuery({
    name: 'hasPrice',
    required: false,
    type: Boolean,
    description: 'Filter by products with or without price',
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date for custom date range',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date for custom date range',
  })
  @ApiResponse({
    status: 200,
    description: 'Percentage of non-deleted products',
  })
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
  @ApiOperation({ summary: 'Get the top 5 most expensive products' })
  @ApiResponse({
    status: 200,
    description: 'Top 5 most expensive products retrieved successfully',
    type: Top5ExpensiveProductsResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTop5MostExpensiveProducts() {
    return {
      products: await this.reportsService.getTop5MostExpensiveProducts(),
    };
  }
}
