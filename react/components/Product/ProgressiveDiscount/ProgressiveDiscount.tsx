import { useCssHandles } from 'vtex.css-handles'
import React, { useEffect } from 'react'
import { DescontoProgressivoProps } from './types'
import { useProductDispatch } from 'vtex.product-context/ProductDispatchContext'
import { getDefaultSeller } from './helpers/seller'
import { useProduct } from 'vtex.product-context'

export const CSS_HANDLES = [
  'container',
  'wrapper',
  'number',
  'units',
  'discounts',
  'text',
] as const

const ProgressiveDiscount: StorefrontFunctionComponent<
  DescontoProgressivoProps
> = ({ value = 1, discountText = '' }) => {
  const dispatch = useProductDispatch()
  const product = useProduct()
  const descontoClusterHighlights = product?.product?.productClusters.length
  const desconto = product?.product?.productClusters
  const { handles } = useCssHandles(CSS_HANDLES);
  const hasDesconto = desconto?.some((productCluster) =>
    productCluster?.name?.toLowerCase()?.includes('desconto progressivo')
  )
  // const descontoClusterHighlights = product?.product?.clusterHighlights.length
  // const desconto = product?.product?.clusterHighlights

  const onChange = () => {
    dispatch({ type: 'SET_QUANTITY', args: { quantity: value } })
  }

  // seta o valor do desconto
  const productContextValue = useProduct()

  var productQuantity: any = productContextValue?.selectedQuantity

  // @ts-ignore
  const seller: any = getDefaultSeller(
    // @ts-ignore
    productContextValue?.selectedItem?.sellers.map((sellers, Price) => {
      return sellers.commertialOffer.Price
    })
  )

  const availableQuantity =
    getDefaultSeller(productContextValue?.selectedItem?.sellers)
      ?.commertialOffer?.AvailableQuantity || 0
  const isAvailable = availableQuantity > 0
  const isValueGreaterThanQuantity = value <= availableQuantity

  function descontoCalc(discountRate: any) {
    const discount = seller - seller * discountRate

    const newDesconto = discount.toFixed(2).toString().replace('.', ',')

    let newPrice = document?.querySelector<HTMLElement>(
      '.vtex-product-price-1-x-sellingPrice--product__price .vtex-product-price-1-x-customSellingPrice--product__price.valor-final'
    )!
    let oldPriceMain = document?.querySelector<HTMLElement>(
      '.vtex-product-price-1-x-sellingPrice--product__price .vtex-product-price-1-x-sellingPriceValue--product__price'
    )!

    oldPriceMain ? (oldPriceMain.style.display = 'none') : null

    if (!newPrice) {
      newPrice = window?.document?.createElement('div')
      newPrice?.classList.add('valor-final')
      newPrice?.classList.add(
        'vtex-product-price-1-x-customSellingPrice--product__price'
      )

      const oldPrice = window?.document?.querySelector(
        '.vtex-product-price-1-x-sellingPrice--product__price'
      )

      oldPrice?.append(newPrice)
    } else {
      newPrice ? (newPrice.style.display = 'block') : null
    }
    // @ts-ignore
    return (newPrice?.innerText = `R$ ${newDesconto}`)
  }

  useEffect(() => {
    console.log('Passei')
    console.log(descontoClusterHighlights, 'descontoClusterHighlights')
    if (productQuantity < 10) {
      let oldPriceMain = document?.querySelector<HTMLElement>(
        '.vtex-product-price-1-x-sellingPrice--product__price .vtex-product-price-1-x-sellingPriceValue--product__price'
      )!

      if (!oldPriceMain) {
        return
      } else {
        oldPriceMain ? (oldPriceMain.style.display = 'block') : null
      }

      let newPrice = document?.querySelector<HTMLElement>(
        '.vtex-product-price-1-x-sellingPrice--product__price .vtex-product-price-1-x-customSellingPrice--product__price.valor-final'
      )!

      if (newPrice) {
        newPrice ? (newPrice.style.display = 'none') : null
      }
    }

    if (productQuantity >= 4 && productQuantity <= 7) {
      descontoCalc(0.02)
    }

    if (productQuantity >= 8 && productQuantity <= 11) {
      descontoCalc(0.03)
    }

    if (productQuantity >= 12 && productQuantity <= 23) {
      descontoCalc(0.04)
    }

    if (productQuantity >= 24 && productQuantity <= 35) {
      descontoCalc(0.06)
    }
    if (productQuantity >= 36) {
      descontoCalc(0.08)
    }
  }, [productQuantity, productContextValue?.selectedItem])

  return (
    <div className={`${handles.container}`}>
      {/* {descontoClusterHighlights != 0 && desconto?.[0].id == '140' ? ( */}
      {descontoClusterHighlights != 0 &&
      hasDesconto &&
      isAvailable &&
      isValueGreaterThanQuantity ? (
        <label className={`${handles.wrapper}`} onClick={onChange}>
          <span className={`${handles.number}`}>
            {value}
            {value >= 50 ? '+' : ''}
          </span>
          <span className={`${handles.units}`}>Unidades</span>
          <span className={`${handles.discounts}`}>
            {discountText}% <span className={`${handles.text}`}>off</span>
          </span>
        </label>
      ) : null}
    </div>
  )
}

export default ProgressiveDiscount
