
export class AddProductDto {
    private readonly name: string;
    private readonly description: string;
    private readonly sku: string;
    private readonly price: number;
    private readonly discountPrice?: number;
    private readonly discountPercentage?: number;
    private readonly isActive: boolean;
    private readonly images: string[];
    private readonly categoryId: number;
    private readonly brandId: number;
    private readonly createdBy: string;


    constructor(
        name: string,
        description: string,
        sku: string,
        price: number,
        isActive: boolean,
        images: string[],
        categoryId: number,
        brandId: number,
        createdBy: string,
        discountPrice?: number,
        discountPercentage?: number,
    ) {

        this.name = name;
        this.description = description;
        this.sku = sku;
        this.price = price;
        this.discountPrice = discountPrice;
        this.discountPercentage = discountPercentage;
        this.isActive = isActive;
        this.images = images;
        this.categoryId = categoryId;
        this.brandId = brandId;
        this.createdBy = createdBy;

    }


    getName(): string {
        return this.name;
    }
    getDescription(): string {
        return this.description;
    }

    getSku(): string {
        return this.sku;
    }

    getPrice(): number {
        return this.price;
    }

    getDiscountPrice(): number|undefined {
        return this.discountPrice;
    }

    getDiscountPercentage(): number|undefined {
        return this.discountPercentage;
    }

    getIsActive(): boolean {
        return this.isActive;
    }

    getImages(): string[] {
        return this.images;
    }
    getCategoryId(): number {
        return this.categoryId;
    }

    getBrandId(): number {
        return this.brandId;
    }


    getCreatedBy(): string {
        return this.createdBy;
    }



}
