import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PartialUpdateProductDto } from './dto/partial-update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, ILike } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';




@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }


  async create(createProductDto: CreateProductDto) {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return {
      message: "Product created successfully",
      data: savedProduct
    };
  }

  async findAll() {
    const products = await this.productRepository.find({
      order: {
        createdAt: "DESC"
      }
    });
    return {
      message: "Products fetched successfully",
      count: products.length,
      data: products
    };
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return {
      message: "Product fetched successfully",
      data: product
    }
  }

  async update(id: number, partialUpdateProductDto: PartialUpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, partialUpdateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    return {
      message: "Product updated successfully",
      data: updatedProduct,
    };
  }

  async replace(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, updateProductDto);
    const updatedProduct = await this.productRepository.save(product);
    return {
      message: "Product replaced successfully",
      data: updatedProduct,
    };
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.remove(product);
    return {
      message: "Product removed successfully",
      id: id
    };
  }

  async findByCategory(category: string) {
    const products = await this.productRepository.find({
      where: { category: ILike(category) },
    });
    if (products.length === 0) {
      throw new NotFoundException(`Products with category ${category} not found`);
    }
    return {
      message: "Products fetched successfully by category",
      count: products.length,
      data: products
    };
  }

  async search(keyword: string) {
    const products = await this.productRepository.find({
      where: {
        name: ILike(`%${keyword}%`),
      },
    });
    if (products.length === 0) {
      throw new NotFoundException(`Products with keyword ${keyword} not found`);
    }
    return {
      message: "Products fetched successfully by keyword",
      count: products.length,
      data: products
    };
  }

  async toggleActive(id: number) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    product.isActive = !product.isActive;
    const updatedProduct = await this.productRepository.save(product);
    return {
      message: "Product status toggled successfully",
      data: updatedProduct,
    };
  }
}
