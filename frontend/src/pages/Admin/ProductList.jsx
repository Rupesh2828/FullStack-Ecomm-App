import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useCreateProductMutation, useUploadProductImageMutation } from '../../redux/apis/productApiSlice'
import { useFetchCategoryQuery } from '../../redux/apis/categoryApiSlice'
import { toast } from 'react-toastify'

const ProductList = () => {

    const [image, setImage] = useState('')
    const [name, setName]  = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState(null)

    const navigate = useNavigate()

    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const {data: categories} = useFetchCategoryQuery()

  return (
    <div>
      Product listttt
    </div>
  )
}

export default ProductList
