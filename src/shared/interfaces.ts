export interface Widget {
  product: Product,
  reviews: ReviewData[],
}

// export interface Product {
//     [key: string]: { [key: string]: string }[]
// }

export interface RatingDetails {
  label: string,
  name: string,
  value: number,
}

export interface ReviewPhotos {
  owner_id: string,
  url_large: string,
  url_original: string,
  url_small: string,
  url_thumb: string,
}

export interface Product {
  rating: number,
  rating_details: RatingDetails[],
  review_photos: ReviewPhotos[],
  reviews_count: 32,
  photos: ReviewPhotos[],

}

export interface Author {
  avatar_url: string | null,
  details: {
    label: string,
    name: string,
    value: string,
  }[] | null,
  initials: string,
  location: string,
  name: string,
}

export interface CommentData extends ReviewData {
  author: Author,
  author_avatar_url: null
  author_name: string,
  body: string,
  created_at: string,
  dislikes: number,
  likes: number,
  text: string,
  updated_at: string,
}

export interface ReviewData extends Product {
  author: Author,
  body: string,
  comments: CommentData[]
  cons: null,
  created_at: string,
  dimensions: null,
  dislikes: number,
  headline: null,
  likes: number,
  order_number: string,
  origin: string,
  photos: ReviewPhotos[],
  is_verified: boolean,
  id: string,
  pros: null,
  published_at: string,
  rating: number,
  rating_details: RatingDetails[],
  recommended: true,
  updated_at: string,
}
