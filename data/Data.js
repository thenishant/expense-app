export const typesData = ['Expense', 'Investment', 'Income'];
export const paymentModeData = ["💳 Credit Card", "🏛 Bank Account", "💵 Cash"];
export const incomeCategoryType = ['💼 Interest', '📈 ROI', '💼 Salary', '💵 Reimbursement', '💳 Credit Exchange'];
export const investmentCategoryType = ['📈 Stocks', '💹 Mutual Funds'];

export const categories = {
    '🏦 Loan': ['📑 Personal', '🚗 Car', '🏠 Home', '🎓 Education', '📊 Business', '🔄 Debt Repayment'],
    '🍺 Alcohol': ['🍺 Beer', '🍷 Wine', '🍾 Liquor', '🍹 Cocktails',],
    '🛍 Shopping': ['👚 Clothing', '💻 Electronics', '🧸 Toys', '💄 Beauty Products', '⚽ Sporting Goods'],
    '🥗 Grocery': ['🥒 Vegetables', '🍉 Fruits', '🥡 Dairy', '📱 Online Grocery', '🍞 Bakery'],
    '🍽 Eating': ['🍽️ Restaurant', '📱 Online', '🍹 Beverages', '🍽 Takeaway'],
    '🏕 Leisure': ['🌍 Travel', '🎭 Entertainment', '🏞️ Activities', '🎮 Gaming', '🎬 Movies', '🍻 Restaurant'],
    '🏠 Home': ['🏡 Utilities', '🛋️ Maid', '🔧 Items', '🏠 Home Improvement'],
    '🚗 Travel': ['⛽ Petrol', '🚖 Cab', '🚗 Tolls', '🗒 Tickets'],
    '🎁 Gift': ['🎉 Birthday', '💑 Anniversary', '🎄 Holiday', '👰 Wedding', '🎁 Gift Cards'],
    '🏥 Insurance': ['💖 Health', '🩼 Life'],
    '🩺 Medical': ['🩺 Doctor Visits', '💊 Medicines', '🦷 Dental', '👓 Optical'],
    '📺 Bills': ['🌐 Internet', '💪 Gym', '⚡ Electricity', '🚰 Water', '📱 Mobile', '📺 Cable'],
    '🎓 Education': ['📚 Books', '🎓 Courses', '🛠️ Workshops', '🎓 Events'],
    '💆 Personal Care': ['💆 Body Care', '🛍️ Products'],
    '👶 Family': ['👶 Baby', '👩 Wife']
};

export const getMainCategories = () => {
    return Object.keys(categories);
};

export const getSubCategories = (mainCategory) => {
    if (!mainCategory) {
        return [];
    }
    if (!categories[mainCategory]) {
        return [];
    }
    const category = categories[mainCategory];
    return category || null;
};
