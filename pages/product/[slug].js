import React from 'react'

import { client, ulrFor, urlFor } from '../../lib/client'

const ProductDetails = ({ product, products }) => {
    const { image, name, details, price } = product
  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img src={urlFor(image && image[0])} />
                </div>
                {/* <div className='small-images-container'>
                    {image?.map((item, i) => (
                        <img src={urlFor(item)}
                        className=''
                        onMouseEnter=''/>
                    ))}
                </div> */}
            </div>
            <div className='product-details-desc'>
                <h1>{name}</h1>
                <div className='reviews'>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"]{
        Slug {
            current
        }
    }`

    const products = await client.fetch(query);

    const paths = products.map((product) => ({

        params: {
            slug: product.Slug.current
        }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}


export const getStaticProps = async ({ params: { slug }}) => {
    const query = `*[_type == "product" && Slug.current == '${slug}'][0]`;
    const productsQuery = `*[_type == "product"]`

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
  
    return {
      props: {product, products}
    }
  }

export default ProductDetails