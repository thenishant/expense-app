export const typesData = ['Expense', 'Investment', 'Income'];
export const paymentModeData = ["💳 Credit Card", "🏛 Bank Account", "💵 Cash"];
export const incomeCategoryType = ['💼 Interest', '📈 ROI', '💼 Salary', '💳 Credit Exchange'];
export const investmentCategoryType = ['📈 Stocks', '💹 Mutual Funds'];

export const categories = {
    '🏦 Loan': ['📑 Personal Loan', '🚗 Car Loan', '🏠 Mortgage', '🎓 Education Loan', '📊 Business Loan', '🔄 Debt Repayment'],
    '🍺 Alcohol': ['🍺 Beer', '🍷 Wine', '🥃 Spirits', '🍾 Liquor', '🍹 Cocktails', '🍻 Bar Drinks'],
    '🛍 Shopping': ['👚 Clothing', '💻 Electronics', '🧸 Toys', '💄 Beauty Products', '⚽ Sporting Goods'],
    '🥗 Grocery': ['🥒 Vegetables', '🍉 Fruits', '🥡 Dairy', '📱 Online Grocery'],
    // '🍔 Eatery': ['🍴 Cafeteria', '🍫 Snacks', '🍹 Beverages', '🌭 Street Food', '🍟 Fast Food'],
    '🍽 Eating': ['🍽️ Restaurant', '🍻 Pub', '📱 Online order', '🍔 Fast Food', '🍹 Beverages', '☕ Café', '🍽️ Takeaway'],
    '🏕 Leisure': ['🌍 Travel', '🎭 Entertainment', '🏞️ Outdoor Activities', '🎮 Gaming', '🎬 Movies', '🎮 Video Games'],
    '🏠 Home': ['🏡 Utilities', '🛋️ Maid', '🔧 Appliances', '⚒️ Maintenance', '🏠 Home Improvement'],
    '🚗 Travel': ['⛽️ Petrol', '🚖 Cab Booking', '🚗 Tolls', '🗒 Tickets'],
    '🎁 Gift': ['🎉 Birthday', '💑 Anniversary', '🎄 Holiday', '👰 Wedding', '🎁 Gift Cards'],
    '🏥 Insurance': ['💖 Health', '🩼 Life'],
    '🩺 Medical': ['🩺 Doctor Visits', '💊 Medicines', '🦷 Dental', '👓 Optical'],
    '📺 Bills': ['🌐 Internet', '💪 Gym', '⚡ Electricity', '🚰 Water', '📱 Mobile', '📺 Cable'],
    '🎓 Education': ['📚 Books', '🎓 Courses', '🛠️ Workshops', '🎓 Events'],
    '💆 Personal Care': ['💆 Body Care', '🛍️ Products'],
    '👶 Family': ['👶 Baby', '👦 Toys', '👧 Clothing', '📚 Education', '👩 Wife']
};

export const getMainCategories = () => {
    return Object.keys(categories);
};

export const getSubCategories = (mainCategory) => {
    const category = categories[mainCategory];
    return category || null;
};
