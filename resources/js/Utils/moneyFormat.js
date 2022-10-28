export default function moneyFormat(price) {
    const formatter = new Intl.NumberFormat('en',
        {
            style: 'currency', currency: 'USD' ,
            minimumFractionDigits: (price >= 1000 ? 0 : 2),
            maximumFractionDigits: (price >= 1000 ? 0 : 2)
        }
    );

    return formatter.format(price);
}