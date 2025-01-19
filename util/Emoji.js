export function removeEmojisOnForm(inputData) {
    function removeEmoji(value) {
        if (typeof value === 'string') {
            return value.replace(/\p{Emoji}/gu, '').trim();
        }
        return value;
    }

    return Object.fromEntries(Object.entries(inputData).map(([key, value]) => [key, key === 'date' ? value : removeEmoji(value)]));
}
