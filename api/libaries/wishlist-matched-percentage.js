const { map, isEqual, includes } = require('lodash')

exports.isThisStoreShouldCheck = (wishlist, products) => {
  let isThisStoreShouldCheck = false

  map(wishlist, item => {
    const itemCatePropArray = item.categoryProps || []
    let itemSubCatePropArray = item.subCategoryProps || []

    const pointForNameMatched = 1
    const maxPoint =
      itemCatePropArray.length +
      itemSubCatePropArray.length +
      pointForNameMatched
    let point = 0

    map(products, prod => {
      const prodCatePropArray = prod.categoryProps
      const prodSubCatePropArray = prod.subCategoryProps

      // CATEGORY CHECKING
      const itemCategoryId = item.categoryId
      const productCategoryId = prod.categoryId
      if (!isEqual(itemCategoryId, productCategoryId)) {
        return false
      }

      // SUB CATEGORY CHECKING
      const itemSubCateId = item.subCategoryId
      const prodSubCateId = prod.subCategoryId
      if (!isEqual(itemSubCateId, prodSubCateId)) {
        return false
      }

      // NAME CHECKING
      const itemName = item.name
      const prodName = prod.name

      if (includes(itemName, prodName)) {
        point += 1
      }

      // CATEGORY PROPS CHECKING
      map(itemCatePropArray, itemCateProp => {
        const itemCatePropId = itemCateProp.categoryPropId
        const itemCatePropValue = itemCateProp.value
        map(prodCatePropArray, prodCateProp => {
          const prodCatePropId = prodCateProp.categoryPropId
          const prodCatePropValue = prodCateProp.value
          if (isEqual(itemCatePropId, prodCatePropId)) {
            if (isEqual(itemCatePropValue, prodCatePropValue)) {
              point += 1
            }
          }
        })
      })

      // SUB CATEGORY PROPS CHECKING
      map(itemSubCatePropArray, itemSubCateProp => {
        const itemSubCatePropId = itemSubCateProp.subCategoryPropId
        const itemSubCatePropValue = itemSubCateProp.value
        map(prodSubCatePropArray, prodSubCateProp => {
          const prodSubCatePropId = prodSubCateProp.subCategoryPropId
          const prodSubCatePropValue = prodSubCateProp.value
          if (isEqual(itemSubCatePropId, prodSubCatePropId)) {
            if (isEqual(itemSubCatePropValue, prodSubCatePropValue)) {
              point += 1
            }
          }
        })
      })
    })

    // PECENTAGE CALCULATION
    const matchedPercentage = (point / maxPoint) * 100
    if (matchedPercentage >= 60) {
      isThisStoreShouldCheck = true
      return true
    }
  })

  return isThisStoreShouldCheck
}

exports.productWithRecommendation = (wishlist, products) => {
  let productWithRec = []

  const itemCatePropArray = wishlist.categoryProps || []
  let itemSubCatePropArray = wishlist.subCategoryProps || []

  const pointForNameMatched = 1
  const maxPoint =
    itemCatePropArray.length + itemSubCatePropArray.length + pointForNameMatched

  map(products, prod => {
    let point = 0
    const prodCatePropArray = prod.categoryProps
    const prodSubCatePropArray = prod.subCategoryProps

    // CATEGORY CHECKING
    const itemCategoryId = wishlist.categoryId
    const productCategoryId = prod.categoryId.toString()
    if (!isEqual(itemCategoryId, productCategoryId)) {
      return false
    }

    // SUB CATEGORY CHECKING
    const itemSubCateId = wishlist.subCategoryId
    const prodSubCateId = prod.subCategoryId.toString()
    if (!isEqual(itemSubCateId, prodSubCateId)) {
      return false
    }

    // NAME CHECKING
    const itemName = wishlist.name
    const prodName = prod.name
    if (includes(prodName, itemName)) {
      point += 1
    }

    // CATEGORY PROPS CHECKING
    map(itemCatePropArray, itemCateProp => {
      const itemCatePropId = itemCateProp.categoryPropId
      const itemCatePropValue = itemCateProp.value
      map(prodCatePropArray, prodCateProp => {
        const prodCatePropId = prodCateProp.propId.toString()
        const prodCatePropValue = prodCateProp.value
        if (isEqual(itemCatePropId, prodCatePropId)) {
          if (isEqual(itemCatePropValue, prodCatePropValue)) {
            point += 1
          }
        }
      })
    })

    // SUB CATEGORY PROPS CHECKING
    map(itemSubCatePropArray, itemSubCateProp => {
      const itemSubCatePropId = itemSubCateProp.subCategoryPropId
      const itemSubCatePropValue = itemSubCateProp.value
      map(prodSubCatePropArray, prodSubCateProp => {
        const prodSubCatePropId = prodSubCateProp.propId.toString()
        const prodSubCatePropValue = prodSubCateProp.value
        if (isEqual(itemSubCatePropId, prodSubCatePropId)) {
          if (isEqual(itemSubCatePropValue, prodSubCatePropValue)) {
            point += 1
          }
        }
      })
    })

    // PECENTAGE CALCULATION
    const matchedPercentage = (point / maxPoint) * 100
    if (maxPoint <= 3 && matchedPercentage >= 30) {
      prod.recommended = true
      prod.matchedPercentage = matchedPercentage
      return productWithRec.push(prod)
    }

    if (matchedPercentage >= 60) {
      prod.recommended = true
      prod.matchedPercentage = matchedPercentage
      return productWithRec.push(prod)
    }

    prod.matchedPercentage = matchedPercentage
    return productWithRec.push(prod)
  })

  return productWithRec
}
