export function formatCurrency (amout: number ) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amout)
}

export function getImagePath(imageStr: string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com';
    if (imageStr.startsWith(cloudinaryBaseUrl)) {
        return imageStr;
    } else {
        return `/products/${imageStr}.jpg`;
    }
}
