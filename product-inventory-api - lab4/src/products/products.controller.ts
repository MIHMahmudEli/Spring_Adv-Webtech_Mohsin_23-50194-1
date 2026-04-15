import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';  
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get("search")
  search(@Query("keyword") keyword: string) {
    return this.productsService.search(keyword);
  }

  @Get("category/:cat")
  findByCategory(@Param("cat") cat: string) {
    return this.productsService.findByCategory(cat);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(Number(id));
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() partialUpdateProductDto: PartialUpdateProductDto) {
    return this.productsService.update(Number(id), partialUpdateProductDto);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.replace(Number(id), updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(Number(id));
  }

  @Patch(':id/toggle')
  toggleActive(@Param('id') id: string) {
    return this.productsService.toggleActive(Number(id));
  }
}
