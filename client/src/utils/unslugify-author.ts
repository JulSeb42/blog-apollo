/*=============================================== Unslugify author ===============================================*/

import { capitalize } from "./"

export const unslugifyAuthor = (str: string) => {
    const splitted = str.split("-")

    for (let i = 0; i < splitted.length; i++) {
        splitted[i] = capitalize(splitted[i])
    }

    return splitted.join(" ")
}
