export function localize(key, lang) {
    if (typeof key != 'string') {
        return ''
    }
    switch (lang) {
        default:
            switch (key.toUpperCase()) {
                case 'PALAVRA':
                    return 'Palavra'
                default:
                    return key
            }

    }
}