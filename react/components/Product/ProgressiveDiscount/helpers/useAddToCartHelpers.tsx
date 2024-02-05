/* eslint-disable prettier/prettier */
import { pathOr } from 'ramda'

const useAddToCartHelpers = () => {
  const mapItemToCart = (
    product: any,
    selectedItem: any,
    selectedQuantity: any = 1,
    selectedSeller: any
  ) => {
    if (
      !product ||
      !selectedItem ||
      !selectedSeller ||
      !selectedSeller.commertialOffer
    ) {
      return null
    }

    if (!selectedSeller || !selectedSeller.commertialOffer) {
      selectedSeller = selectedItem.sellers[0]
    }

    return {
      assemblyOptions: {
        added: [],
        removed: [],
        parentPrice: selectedSeller.commertialOffer.Price * 100,
      },
      index: 0,
      id: selectedItem.itemId,
      productId: product.productId,
      quantity: selectedQuantity,
      uniqueId: '',
      detailUrl: `/${product.linkText}/p`,
      name: product.productName,
      brand: product.brand,
      category:
        product.categories && product.categories.length > 0
          ? product.categories[0]
          : '',
      productRefId: product.productReference,
      seller: selectedSeller.sellerId,
      variant: selectedItem.name,
      skuName: selectedItem.name,
      price: selectedSeller.commertialOffer.PriceWithoutDiscount * 100,
      listPrice: selectedSeller.commertialOffer.ListPrice * 100,
      sellingPrice: selectedSeller.commertialOffer.Price * 100,
      sellingPriceWithAssemblies: selectedSeller.commertialOffer.Price * 100,
      measurementUnit: selectedItem.measurementUnit,
      skuSpecifications: [],
      options: [],
      imageUrl: selectedItem.images[0].imageUrl,
      referenceId: selectedItem.referenceId,
    }
  }

  const adjustSkuItemForPixelEvent = (skuItem: any) => {
    // Changes this `/Apparel & Accessories/Clothing/Tops/`
    // to this `Apparel & Accessories/Clothing/Tops`
    const category = skuItem.category ? skuItem.category.slice(1, -1) : ''

    return {
      skuId: skuItem.id,
      variant: skuItem.variant,
      price: skuItem.price,
      name: skuItem.name,
      quantity: skuItem.quantity,
      productId: skuItem.productId,
      productRefId: skuItem.productRefId,
      brand: skuItem.brand,
      category,
      detailUrl: skuItem.detailUrl,
      imageUrl: skuItem.imageUrl,
      referenceId: pathOr('', ['referenceId', '0', 'Value'], skuItem),
    }
  }

  return { mapItemToCart, adjustSkuItemForPixelEvent }
}

export default useAddToCartHelpers