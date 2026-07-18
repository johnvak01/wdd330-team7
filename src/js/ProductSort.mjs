export default class ProductSort {
    constructor(products) {
        this.products = products;
    }
    sort(type) {
        const sorted = [...this.products];

        switch (type) {
            case "name-az":
                return sorted.sort((a, b) =>
                    a.Name.localeCompare(b.Name)
                );
            case "name-za":
                return sorted.sort((a, b) =>
                    b.Name.localeCompare(a.Name)
                );
            case "name-random":
                return sorted.sort(() =>
                    Math.random() - 0.5
                );
            case "price-low":
                return sorted.sort((a, b) =>
                    a.FinalPrice - b.FinalPrice
                );
            case "price-high":
                return sorted.sort((a, b) =>
                    b.FinalPrice - a.FinalPrice
                );
            case "price-random":
                return sorted.sort(() =>
                    Math.random() - 0.5
                );
            default:
                return sorted;
        }
    }
}
