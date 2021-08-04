export interface Widget {
    product: Product,
    reviews: ReviewData[],
}

// export interface Product {
//     [key: string]: { [key: string]: string }[]
// }

export interface Rating_details {
        label: string,
        name: string,
        value: number,
}

export interface Review_photos {
    owner_id: string,
    url_large: string,
    url_original: string,
    url_small: string,
    url_thumb: string,
}

export interface Product {
rating: number,
rating_details: Rating_details[],
review_photos: Review_photos[],
reviews_count: 32,
photos: Review_photos[],

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


export interface Comment {
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
    comments: Comment[]
    cons: null,
    created_at: string,
    dimensions: null,
    dislikes: number,
    headline: null,
    likes: number,
    order_number: string,
    origin: string,
    photos: Review_photos[],
    is_verified: boolean,
    pros: null,
    published_at: string,
    rating: number,
    rating_details: Rating_details[],
    recommended: true,
    updated_at: string,
}