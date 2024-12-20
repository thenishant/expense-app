export const typesData = ['Expense', 'Investment', 'Income'];
export const paymentModeData = ["💳 Credit Card", "🏛 Bank Account", "💵 Cash"];
export const incomeCategoryType = ['💼 Interest', '📈 ROI', '💼 Salary', '💳 Credit Exchange'];
export const investmentCategoryType = ['📈 Stocks', '💹 Mutual Funds'];

export const categories = {
    '🏦 Loan': ['📑 Personal Loan', '🚗 Car Loan', '🏠 Mortgage', '🎓 Education Loan', '📊 Business Loan', '🔄 Debt Repayment'],
    '🍺 Alcohol': ['🍺 Beer', '🍷 Wine', '🥃 Spirits', '🍾 Liquor', '🍹 Cocktails', '🍻 Bar Drinks'],
    '🛍 Shopping': ['👚 Clothing', '💻 Electronics', '🧸 Toys', '💄 Beauty Products', '⚽ Sporting Goods'],
    '🥗 Grocery': ['🛒 Supermarket', '🏞️ Farmers Market', '🍏 Organic', '🔍 Bulk Items', '🐶 Pet Supplies'],
    '🍔 Eatery': ['🍴 Cafeteria', '🍫 Snacks', '🍹 Beverages', '🌭 Street Food', '🍟 Fast Food'],
    '🍽 Restaurant': ['🍽️ Dining', '🍔 Fast Food', '☕ Café', '🍽️ Takeaway'],
    '🏕 Leisure': ['🌍 Travel', '🎭 Entertainment', '🏞️ Outdoor Activities', '🎮 Gaming', '🎬 Movies', '🎮 Video Games'],
    '🏠 Home': ['🏡 Utilities', '🛋️ Furniture', '🔧 Appliances', '⚒️ Maintenance', '🏠 Home Improvement'],
    '🚗 Travel': ['⛽️ Petrol', '🚖 Cab Booking', '🚗 Tolls', '🗒 Tickets'],
    '🎁 Gift': ['🎉 Birthday', '💑 Anniversary', '🎄 Holiday', '👰 Wedding', '🎁 Gift Cards'],
    '🏥 Insurance': ['💖 Health', '🩼 Life', '🚗 Car', '🏠 Home', '🌍 Travel', '🐕 Pet Insurance'],
    '🩺 Medical': ['🩺 Doctor Visits', '💊 Prescriptions', '🏥 Hospital Bills', '💉 Medicines'],
    '📺 Bills': ['🎬 Streaming', '🌐 Internet', '💪 Gym', '⚡ Electricity', '🚰 Water', '🚗 Gas', '📱 Mobile', '📺 Cable'],
    '🎓 Education': ['📚 Books & Supplies', '🎓 Online Courses', '🛠️ Workshops', '🎓 Events'],
    '💆 Personal Care': ['💆 Body Care', '🛍️ Products']
};

export const getMainCategories = () => {
    return Object.keys(categories);
};

export const getSubCategories = (mainCategory) => {
    const category = categories[mainCategory];
    return category || null;
};
