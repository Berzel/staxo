export default function productImage(product, size) {

    const image = product.images[0].sizes.filter(s => s.size === size)[0]
        ?? product.images[0].sizes.filter(s => s.size === 'default')[0]

    return image.url
}